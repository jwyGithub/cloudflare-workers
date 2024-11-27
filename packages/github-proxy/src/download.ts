import { convertToRawUrl } from './shared';

export class Downloader {
    private readonly wsConnection: WebSocket;
    private readonly cache: Cache;
    private readonly ctx: ExecutionContext;
    private maxRetries = 3;
    private readonly allowedTypes = [
        'application/octet-stream',
        'text/plain',
        'application/zip',
        'application/x-zip-compressed',
        'application/x-gzip',
        'text/markdown',
        'application/json',
        'text/javascript',
        'text/typescript',
        'text/css',
        'text/html',
        'application/xml',
        'text/xml',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/svg+xml'
    ];

    constructor(env: Env, ctx: ExecutionContext, wsConnection: WebSocket) {
        this.cache = caches.default;
        this.ctx = ctx;
        this.maxRetries = Math.min(env.MAX_RETRIES ?? 3, 5);
        this.wsConnection = wsConnection;
    }

    private createHeaders(response: Response, fileName?: string): Headers {
        const headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
            'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream'
        });

        if (fileName) {
            headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
        }

        // 保留原始响应的一些重要头信息
        const contentLength = response.headers.get('Content-Length');
        if (contentLength) {
            headers.set('Content-Length', contentLength);
        }

        // 添加跨域相关的头
        headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        headers.set('Access-Control-Max-Age', '86400');

        return headers;
    }

    private async getCachedResponse(url: string): Promise<Response | undefined> {
        try {
            const cacheKey = new Request(new URL(url).href, { method: 'GET' });
            return await this.cache.match(cacheKey);
        } catch {
            return undefined;
        }
    }

    private async cacheResponse(url: string, response: Response): Promise<void> {
        try {
            const cacheKey = new Request(new URL(url).href, { method: 'GET' });
            const clonedResponse = response.clone();
            await this.ctx.waitUntil(this.cache.put(cacheKey, clonedResponse));
        } catch {
            console.error('Failed to cache response');
        }
    }

    private extractFileName(response: Response, url: string): string {
        const contentDisposition = response.headers.get('content-disposition');
        if (contentDisposition) {
            const matches = contentDisposition.match(/filename="?([^"]+)"?/);
            if (matches && matches[1]) {
                return matches[1];
            }
        }
        return decodeURIComponent(url.split('/').pop() || 'download');
    }

    private createGithubRequest(url: string): Request {
        return new Request(url, {
            method: 'GET',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
    }

    private validateContentType(contentType: string | null): void {
        if (!contentType) return;

        const type = contentType.split(';')[0].toLowerCase();
        if (!this.allowedTypes.includes(type)) {
            throw new Error(`Unsupported file type: ${type}`);
        }
    }

    private async fetchWithRetry(request: Request): Promise<Response> {
        let lastError: Error | null = null;

        for (let i = 0; i < this.maxRetries; i++) {
            try {
                const response = await fetch(request);
                if (response.ok) {
                    // 验证内容类型
                    this.validateContentType(response.headers.get('Content-Type'));
                    return response;
                }
                lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
            } catch (error: any) {
                lastError = error;
                if (i < this.maxRetries - 1) {
                    // 指数退避重试
                    await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000));
                    continue;
                }
            }
        }

        throw lastError || new Error('Maximum retries reached');
    }

    private async streamWithRateLimit(response: Response): Promise<Response> {
        // eslint-disable-next-line ts/no-this-alias
        const _this = this;
        const reader = response.body!.getReader();
        const contentLength = response.headers.get('Content-Length');
        let bytesRead = 0;

        const stream = new ReadableStream({
            async pull(controller) {
                try {
                    const { done, value } = await reader.read();

                    if (done) {
                        controller.close();
                        // 发送完成消息
                        if (_this.wsConnection) {
                            _this.wsConnection.send(
                                JSON.stringify({
                                    type: 'progress',
                                    progress: 100,
                                    status: 'complete'
                                })
                            );
                        }
                        return;
                    }

                    bytesRead += value.length;
                    controller.enqueue(value);

                    if (contentLength && _this.wsConnection) {
                        const progress = (bytesRead / Number.parseInt(contentLength)) * 100;
                        _this.wsConnection.send(
                            JSON.stringify({
                                type: 'progress',
                                progress,
                                bytesRead,
                                totalBytes: Number.parseInt(contentLength)
                            })
                        );
                    }
                } catch (error: any) {
                    controller.error(error);
                    if (_this.wsConnection) {
                        _this.wsConnection.send(
                            JSON.stringify({
                                type: 'error',
                                message: error.message
                            })
                        );
                    }
                }
            },
            cancel() {
                reader.cancel();
                if (_this.wsConnection) {
                    _this.wsConnection.send(
                        JSON.stringify({
                            type: 'cancelled'
                        })
                    );
                }
            }
        });

        return new Response(stream, {
            headers: response.headers
        });
    }

    public async download(url: string): Promise<Response> {
        try {
            // 转换为实际的下载URL
            const downloadUrl = convertToRawUrl(url);
            // 检查缓存
            const cachedResponse = await this.getCachedResponse(url);
            if (cachedResponse) {
                return cachedResponse;
            }

            // 发起下载请求
            const githubRequest = this.createGithubRequest(downloadUrl);
            const response = await this.fetchWithRetry(githubRequest);

            // 获取文件名并创建新的响应
            const fileName = this.extractFileName(response, url);
            const headers = this.createHeaders(response, fileName);

            // 使用流式传输并进行速率限制
            const streamResponse = await this.streamWithRateLimit(response);
            const newResponse = new Response(streamResponse.body, {
                status: response.status,
                headers
            });

            // 缓存响应
            await this.cacheResponse(url, newResponse.clone());

            return newResponse;
        } catch (error: any) {
            throw new Error(`Download failed: ${error.message}`);
        }
    }
}
