import { toClientError, toServerError, toUnauthorized } from '@jiangweiye/cloudflare-service';
import { Downloader } from './download';
import { getPage } from './page';
import { ValidateIp } from './validate';

const validateIp = new ValidateIp();

let wsConnection: WebSocket | null = null;

// GitHub URL 转换工具

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);

        validateIp.setEnv(env);

        // CORS 预检请求处理
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400'
                }
            });
        }

        // IP 白名单验证
        const real_ip = request.headers.get('x-real-ip');

        if (real_ip && !validateIp.checkIpIsWhitelisted(real_ip)) {
            return toUnauthorized();
        }

        // 处理 WebSocket 连接请求
        if (request.headers.get('Upgrade') === 'websocket') {
            const webSocketPair = new WebSocketPair();
            const [client, server] = Object.values(webSocketPair);

            server.accept();
            wsConnection = server; // 保存 WebSocket 连接

            return new Response(null, {
                status: 101,
                webSocket: client
            });
        }

        const downloader = new Downloader(env, ctx, wsConnection!);

        try {
            if (url.pathname === '/') {
                return new Response(getPage(url), {
                    headers: { 'Content-Type': 'text/html' }
                });
            }

            if (url.pathname === '/download') {
                const downloadUrl = url.searchParams.get('url');
                if (!downloadUrl) {
                    return toClientError('Missing URL parameter');
                }
                return await downloader.download(downloadUrl);
            }

            if (!url.pathname.startsWith('/github/')) {
                return toClientError('Invalid path: Must start with /github/');
            }

            return await downloader.download(url.pathname);
        } catch (error: any) {
            return toServerError(`Internal Server Error: ${error.message}`);
        }
    }
} satisfies ExportedHandler<Env>;
