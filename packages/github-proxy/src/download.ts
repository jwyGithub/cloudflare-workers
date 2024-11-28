import type { DownloadOptions, WebSocketMessage } from './types';
import { ERROR_MESSAGES, MAX_FILE_SIZE, TIMEOUT } from './constants';

export class DownloadHandler {
    private ws: WebSocket;
    private url: string;
    private options: DownloadOptions;
    private abortController: AbortController;
    private startTime: number;
    private ctx: ExecutionContext;

    constructor(ws: WebSocket, url: string, ctx: ExecutionContext, env: Env) {
        this.ws = ws;
        this.url = url;
        this.ctx = ctx;
        this.options = {
            maxSize: env.MAX_SIZE ? Number(env.MAX_SIZE) : MAX_FILE_SIZE,
            timeout: TIMEOUT
        };
        this.abortController = new AbortController();
        this.startTime = 0;
    }

    async download(): Promise<Response> {
        try {
            const cache = caches.default;
            const cacheKey = new Request(this.url);

            // 检查缓存
            const cachedResponse = await cache.match(cacheKey);
            if (cachedResponse) {
                this.sendComplete(this.url, Number.parseInt(cachedResponse.headers.get('content-length') || '0'));
                return this.createFinalResponse(cachedResponse);
            }

            // 如果没有缓存，先检查文件大小
            await this.checkFileSize();

            // 执行下载
            const response = await this.fetchWithProgress();

            // 克隆响应用于缓存
            const responseToCache = response.clone();

            // 异步缓存，但不等待它完成
            this.ctx.waitUntil(cache.put(cacheKey, responseToCache));

            return this.createFinalResponse(response);
        } catch (error: any) {
            this.sendError(error);
            throw error;
        }
    }

    private async checkFileSize(): Promise<void> {
        try {
            const headResponse = await fetch(this.url, {
                method: 'HEAD',
                headers: this.getRequestHeaders()
            });

            this.handleErrorResponse(headResponse);

            const contentLength = Number.parseInt(headResponse.headers.get('content-length') || '0');
            if (contentLength > this.options.maxSize) {
                throw new Error(ERROR_MESSAGES.FILE_TOO_LARGE);
            }
        } catch (error: any) {
            if (error.message === ERROR_MESSAGES.FILE_TOO_LARGE) {
                throw error;
            }
            // 如果 HEAD 请求失败，我们将在实际下载时检查文件大小
        }
    }

    private async fetchWithProgress(): Promise<Response> {
        this.startTime = Date.now();
        const signal = this.abortController.signal;

        const response = await fetch(this.url, {
            headers: this.getRequestHeaders(),
            signal
        });

        this.handleErrorResponse(response);

        const contentLength = Number.parseInt(response.headers.get('content-length') || '0');
        const { readable, writable } = new TransformStream();

        // 使用 waitUntil 确保流处理完成
        this.ctx.waitUntil(
            (async () => {
                const writer = writable.getWriter();
                try {
                    await this.streamResponse(response.body!, writer, contentLength);
                } finally {
                    await writer.close();
                }
            })()
        );

        return new Response(readable, {
            headers: this.getResponseHeaders(response)
        });
    }

    private createFinalResponse(response: Response): Response {
        const headers = this.getResponseHeaders(response);
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers
        });
    }

    private async streamResponse(body: ReadableStream, writer: WritableStreamDefaultWriter, totalSize: number): Promise<void> {
        let loaded = 0;
        let lastUpdate = Date.now();
        const reader = body.getReader();

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                loaded += value.length;
                if (loaded > this.options.maxSize) {
                    throw new Error(ERROR_MESSAGES.FILE_TOO_LARGE);
                }

                await writer.write(value);

                const now = Date.now();
                if (now - lastUpdate > 200) {
                    const speed = loaded / ((now - this.startTime) / 1000);
                    this.sendProgress(loaded, totalSize, speed);
                    lastUpdate = now;
                }
            }
        } catch (error) {
            writer.abort(error);
            throw error;
        } finally {
            await writer.close();
            this.sendComplete(this.url, loaded); // 确保这一行位于writer.close之后
        }
    }

    private handleErrorResponse(response: Response): void {
        switch (response.status) {
            case 401:
                throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
            case 403:
                throw new Error(ERROR_MESSAGES.FORBIDDEN);
            case 404:
                throw new Error(ERROR_MESSAGES.NOT_FOUND);
            default:
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
        }
    }

    private getRequestHeaders(): Headers {
        return new Headers({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Connection: 'keep-alive'
        });
    }

    private getResponseHeaders(originalResponse: Response): Headers {
        const headers = new Headers();

        const headersToCopy = ['content-type', 'content-disposition', 'content-length', 'last-modified', 'etag', 'cache-control'];

        headersToCopy.forEach(header => {
            const value = originalResponse.headers.get(header);
            if (value) headers.set(header, value);
        });

        // 设置缓存控制头
        if (!headers.has('cache-control')) {
            headers.set('cache-control', 'public, max-age=86400'); // 24小时缓存
        }

        headers.set('Access-Control-Allow-Origin', '*');

        if (!headers.has('content-disposition')) {
            const filename = this.getFilenameFromUrl(this.url);
            headers.set('Content-Disposition', `attachment; filename="${filename}"`);
        }

        return headers;
    }

    private getFilenameFromUrl(url: string): string {
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            const filename = pathname.split('/').pop() || 'download';
            return decodeURIComponent(filename);
        } catch {
            return 'download';
        }
    }

    private sendProgress(loaded: number, total: number, speed: number): void {
        this.sendMessage({
            type: 'progress',
            loaded,
            total,
            percent: Math.round((loaded / total) * 100),
            speed
        });
    }

    private sendComplete(url: string, size: number): void {
        this.sendMessage({
            type: 'complete',
            url,
            size,
            filename: this.getFilenameFromUrl(url)
        });
    }

    private sendError(error: Error): void {
        this.sendMessage({
            type: 'error',
            code: 500,
            message: error.message || ERROR_MESSAGES.UNKNOWN
        });
    }

    private sendMessage(message: WebSocketMessage): void {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        }
    }
}
