import { toServerError, toUnauthorized } from '@jiangweiye/worker-service';
import { DownloadHandler } from './download';
import { generateHTML } from './page';
import { ValidateIp } from './validate';
import { WebSocketHandler } from './websocket-handler';

const validate = new ValidateIp();

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        if (request.method === 'OPTIONS') {
            return handleCORS();
        }

        validate.setEnv(env);

        if (!validate.checkIpIsWhitelisted(request)) {
            return toUnauthorized();
        }

        const url = new URL(request.url);

        if (url.pathname === '/') {
            return serveHTML();
        }

        if (url.pathname === '/ws') {
            return handleWebSocket(request);
        }

        return handleDownload(request, url, ctx, env);
    }
} satisfies ExportedHandler<Env>;

function handleCORS(): Response {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    });
}

function handleWebSocket(request: Request): Response {
    if (request.headers.get('Upgrade') !== 'websocket') {
        return new Response('Expected websocket', { status: 400 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    server.accept();
    // eslint-disable-next-line no-new
    new WebSocketHandler(server);

    return new Response(null, {
        status: 101,
        webSocket: client
    });
}

async function handleDownload(_: Request, url: URL, ctx: ExecutionContext, env: Env): Promise<Response> {
    const targetUrl = url.pathname.startsWith('/http') ? url.pathname.slice(1) : `https://github.com${url.pathname}`;

    const pair = new WebSocketPair();
    const [__, server] = Object.values(pair);

    server.accept();
    const downloadHandler = new DownloadHandler(server, targetUrl, ctx, env);

    try {
        return await downloadHandler.download();
    } catch (error: any) {
        return toServerError(error.message || error);
    }
}

function serveHTML(): Response {
    return new Response(generateHTML(), {
        headers: {
            'content-type': 'text/html;charset=UTF-8'
        }
    });
}
