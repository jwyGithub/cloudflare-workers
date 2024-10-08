import { toServerError, toStream, toUnauthorized } from '@jiangweiye/cloudflare-service';
import { ValidateIp } from './validate';

const validateIp = new ValidateIp();

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            const { pathname } = new URL(request.url);
            validateIp.setEnv(env);

            const real_ip = request.headers.get('x-real-ip');

            if (!validateIp.checkIpIsWhitelisted(real_ip)) {
                return toUnauthorized();
            }

            if (pathname === '/favicon.ico') {
                return toStream('', request.headers);
            }

            return await handleRequest(request);
        } catch (error: any) {
            return toServerError(error.message);
        }
    }
};

async function handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const targetUrl = `https://registry.npmjs.org${url.pathname}${url.search}`;
    const method = req.method;
    const headers = new Headers(req.headers);

    const pathStartsWithUser = url.pathname.startsWith('/-/user/org.couchdb.user:');

    // 处理认证
    const proxyReqInit: RequestInit = {
        method,
        headers,
        body: req.body ? req.body : undefined,
        redirect: 'follow'
    };

    // 代理请求到目标 URL
    const proxyReq = new Request(targetUrl, proxyReqInit);

    let resp: Response;
    try {
        resp = await fetch(proxyReq);
    } catch (e) {
        console.error('Failed to send request to npm registry', e);
        return toServerError();
    }

    // npm login // npm adduser
    if (resp.status === 201 && pathStartsWithUser) {
        const contentType = resp.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            let json: any;
            try {
                json = await resp.json();
            } catch (e) {
                console.error('Failed to parse response JSON', e);
                return toServerError();
            }

            const modifiedBody = JSON.stringify(json);
            return new Response(modifiedBody, {
                status: resp.status,
                statusText: resp.statusText,
                headers: resp.headers
            });
        }
    }

    // 检查响应状态码，如果是 101、204、205 或 304，返回没有主体的响应
    if ([101, 204, 205, 304].includes(resp.status)) {
        return new Response(null, {
            status: resp.status,
            statusText: resp.statusText,
            headers: resp.headers
        });
    }

    return new Response(resp.body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: resp.headers
    });
}
