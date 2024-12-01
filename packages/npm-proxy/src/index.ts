import { toServerError, toStream, toUnauthorized } from '@jiangweiye/worker-service';
import { ProgressTransformer } from './ProgressTransformer';
import { compressResponse, decompressRequest } from './shared';
import { smartRateLimiter } from './SmartRateLimiter';
import { ValidateIp } from './validate';

const validateIp = new ValidateIp();

// 安全检查配置
const securityConfig = {
    maxContentLength: 100 * 1024 * 1024, // 100MB
    allowedMethods: ['GET', 'PUT', 'POST', 'DELETE'],
    blockedUserAgents: ['curl/7.29.0'] // 示例：阻止特定的User-Agent
};

// 修改 performSecurityChecks 函数
async function performSecurityChecks(request: Request): Promise<Response | null> {
    // 检查请求方法
    if (!securityConfig.allowedMethods.includes(request.method)) {
        return new Response('Method Not Allowed', { status: 405 });
    }

    // 检查内容长度
    const contentLength = Number.parseInt(request.headers.get('content-length') || '0');
    if (contentLength > securityConfig.maxContentLength) {
        return new Response('Content Too Large', { status: 413 });
    }

    // 检查User-Agent
    const userAgent = request.headers.get('user-agent') || '';
    if (securityConfig.blockedUserAgents.some(ua => userAgent.includes(ua))) {
        return new Response('Forbidden User Agent', { status: 403 });
    }

    // 智能限流检查
    const clientIp = request.headers.get('x-real-ip') || '';
    const requestType = getRequestType(request.url, request.method);

    // 确定请求优先级
    let priority = 2; // 默认优先级
    if (isNpmInstallRequest(request)) {
        priority = 1; // npm install 最高优先级
    }

    const canProceed = await smartRateLimiter.acquireToken(clientIp, requestType, priority);
    if (!canProceed) {
        return new Response('Too Many Requests', {
            status: 429,
            headers: {
                'Retry-After': '60',
                'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 60)
            }
        });
    }

    return null;
}

// 修改 handleProgressResponse 函数
async function handleProgressResponse(response: Response): Promise<Response> {
    const contentType = response.headers.get('content-type') || '';
    const contentEncoding = response.headers.get('content-encoding');

    // 检查是否是 npm 进度信息
    if (contentType.includes('application/json') && (response.headers.get('npm-notice') || response.headers.get('npm-in-progress'))) {
        const headers = new Headers(response.headers);

        // 确保这些头信息被正确转发
        const progressHeaders = ['npm-notice', 'npm-in-progress', 'npm-progress', 'npm-json', 'npm-in-progress-details'];

        for (const header of progressHeaders) {
            const value = response.headers.get(header);
            if (value) {
                headers.set(header, value);
            }
        }

        // 处理响应体
        let body = response.body;
        if (contentEncoding === 'gzip' && body) {
            const decompressStream = new DecompressionStream('gzip');
            body = body?.pipeThrough(decompressStream);
        }

        // 使用 ProgressTransformer 处理进度信息
        const progressTransform = new TransformStream(new ProgressTransformer());
        const transformedBody = body?.pipeThrough(progressTransform);

        return new Response(transformedBody, {
            status: response.status,
            statusText: response.statusText,
            headers
        });
    }

    return response;
}

// 添加辅助函数来检测 npm install 请求
function isNpmInstallRequest(request: Request): boolean {
    const userAgent = request.headers.get('user-agent') || '';
    const accept = request.headers.get('accept') || '';

    return (userAgent.includes('npm/') || userAgent.includes('Node')) && request.method === 'GET' && accept.includes('application/json');
}

interface LogEntry {
    timestamp: string;
    method: string;
    path: string;
    status: number;
    duration: number;
    ip: string;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const startTime = Date.now();
        const clientIp = request.headers.get('cf-connecting-ip') || '';

        try {
            // 安全检查
            const securityCheckResult = await performSecurityChecks(request);
            if (securityCheckResult) {
                await logRequest(request, securityCheckResult, startTime, clientIp);
                return securityCheckResult;
            }

            const { pathname } = new URL(request.url);
            validateIp.setEnv(env);

            if (!validateIp.checkIpIsWhitelisted(request)) {
                const response = toUnauthorized();
                await logRequest(request, response, startTime, clientIp);
                return response;
            }

            if (pathname === '/favicon.ico') {
                const response = toStream('', request.headers);
                await logRequest(request, response, startTime, clientIp);
                return response;
            }
            const response = await handleRequest(request);
            await logRequest(request, response, startTime, clientIp);
            return response;
        } catch (error: any) {
            const response = toServerError(error.message);
            await logRequest(request, response, startTime, clientIp);
            return response;
        }
    }
};

function getRequestType(url: string, method: string): 'metadata' | 'tarball' | 'write' {
    if (url.endsWith('.tgz')) {
        return 'tarball';
    }
    if (method !== 'GET') {
        return 'write';
    }
    return 'metadata';
}

async function logRequest(request: Request, response: Response, startTime: number, clientIp: string): Promise<void> {
    const duration = Date.now() - startTime;
    const url = new URL(request.url);

    const logEntry: LogEntry = {
        timestamp: new Date().toISOString(),
        method: request.method,
        path: url.pathname,
        status: response.status,
        duration,
        ip: clientIp
    };

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(logEntry));
}

async function fetchWithRetry(request: Request, retries = 3): Promise<Response> {
    try {
        return await fetch(request);
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchWithRetry(request, retries - 1);
        }
        throw error;
    }
}

async function handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const targetUrl = `https://registry.npmjs.org${url.pathname}${url.search}`;
    const method = req.method;
    const headers = new Headers(req.headers);

    // 添加 npm 进度相关的头信息
    headers.set('accept', 'application/json');
    if (isNpmInstallRequest(req)) {
        headers.set('npm-in-progress', '1');
        headers.set('npm-progress', 'true');
    }

    // 处理认证
    const authHeader = req.headers.get('authorization');
    if (authHeader) {
        headers.set('authorization', authHeader);
    }

    // 处理PUT请求
    if (method === 'PUT') {
        const contentLength = req.headers.get('content-length');
        if (contentLength) {
            headers.set('content-length', contentLength);
        }
    }

    // 处理压缩的请求体
    let request = req;
    if (req.headers.get('content-encoding') === 'gzip') {
        request = await decompressRequest(req);
    }

    const proxyReqInit: RequestInit = {
        method,
        headers,
        body: request.body || undefined,
        redirect: 'follow'
    };

    const proxyReq = new Request(targetUrl, proxyReqInit);

    let resp: Response;
    try {
        resp = await fetchWithRetry(proxyReq);
    } catch (e) {
        console.error('Failed to send request to npm registry', e);
        return toServerError();
    }

    // 处理进度信息
    if (isNpmInstallRequest(req)) {
        return handleProgressResponse(resp);
    }

    // 处理特殊路径
    if (url.pathname.startsWith('/-/')) {
        if (url.pathname.includes('/-/package/') && url.pathname.endsWith('/dist-tags')) {
            return handleDistTags(req, resp);
        }
    }

    // 处理npm login/adduser
    const pathStartsWithUser = url.pathname.startsWith('/-/user/org.couchdb.user:');
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
            return compressResponse(
                new Response(modifiedBody, {
                    status: resp.status,
                    statusText: resp.statusText,
                    headers: resp.headers
                })
            );
        }
    }

    // 处理特殊状态码
    if ([101, 204, 205, 304].includes(resp.status)) {
        return new Response(null, {
            status: resp.status,
            statusText: resp.statusText,
            headers: resp.headers
        });
    }

    // 设置缓存控制
    const cacheControl = resp.headers.get('cache-control');
    if (cacheControl) {
        headers.set('cache-control', cacheControl);
    }

    // 压缩响应
    return compressResponse(
        new Response(resp.body, {
            status: resp.status,
            statusText: resp.statusText,
            headers: resp.headers
        })
    );
}

async function handleDistTags(_: Request, resp: Response): Promise<Response> {
    // 实现dist-tags处理逻辑
    return compressResponse(resp);
}
