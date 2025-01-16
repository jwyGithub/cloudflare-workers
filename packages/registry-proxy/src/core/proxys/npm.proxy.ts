import { fetchWithRetry } from 'cloudflare-tools';
import { cors } from '../../shared/shared';

export class NpmProxy {
    private request: Request;
    private ctx: ExecutionContext;
    private url: URL;

    constructor(request: Request, _: Env, ctx: ExecutionContext) {
        this.request = request;
        this.ctx = ctx;
        this.url = new URL(request.url);
    }

    public async forward(upstream: string): Promise<Response> {
        if (this.request.method === 'OPTIONS') {
            return cors(new Response(null));
        }

        const targetUrl = `${upstream}${this.url.pathname}${this.url.search}`;
        const method = this.request.method;
        const headers = new Headers(this.request.headers);
        const pathStartsWithUser = this.url.pathname.startsWith('/-/user/org.couchdb.user:');

        if (method === 'GET' && this.url.pathname.endsWith('.tgz')) {
            const cache = caches.default;
            const response = await cache.match(this.request);

            if (response) {
                return response;
            }

            const proxyReqInit: RequestInit = {
                method,
                headers,
                redirect: 'follow'
            };

            const proxyReq = new Request(targetUrl, proxyReqInit);
            const { data, ok, status } = await fetchWithRetry(proxyReq, { retries: 3 });

            if (ok && status === 200) {
                const clonedResponse = data.clone();
                this.ctx.waitUntil(cache.put(this.request, clonedResponse));
            }

            return data;
        }

        // 其他请求的处理逻辑
        const proxyReqInit: RequestInit = {
            method,
            headers,
            body: this.request.body ? this.request.body : undefined,
            redirect: 'follow'
        };

        const proxyReq = new Request(targetUrl, proxyReqInit);
        const resp = await fetchWithRetry(proxyReq, { retries: 3 }).then(res => res.data);

        // npm login // npm adduser
        if (resp.status === 201 && pathStartsWithUser) {
            return resp;
        }

        // 检查响应状态码，如果是 101、204、205 或 304，返回没有主体的响应
        if ([101, 204, 205, 304].includes(resp.status)) {
            return new Response(null, {
                status: resp.status,
                statusText: resp.statusText,
                headers: resp.headers
            });
        }

        if (method === 'GET') {
            const newHeaders = new Headers(resp.headers);
            newHeaders.set('Cache-Control', 'public, max-age=3600');
            return new Response(resp.body, {
                status: resp.status,
                statusText: resp.statusText,
                headers: newHeaders
            });
        }

        return resp;
    }
}
