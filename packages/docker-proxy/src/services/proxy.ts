import type { RegistryConfig } from '../types';
import { fetchWithRetry } from '../utils/fetch';
import { parseRegistryInfo } from '../utils/registry';
import { getAuthToken } from './auth';

// 处理CORS请求头
function handleCors(headers: Headers = new Headers()): Headers {
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Docker-Distribution-Api-Version');
    headers.set('Access-Control-Max-Age', '86400');
    return headers;
}

// 处理Docker认证响应
function createAuthRequiredResponse(config: RegistryConfig, repository: string): Response {
    const realm = config.authUrl;
    const service = config.auth?.service || new URL(config.baseUrl).hostname;
    const scope = config.auth?.formatScope?.(repository) || `repository:${repository}:pull`;

    return new Response('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': `Bearer realm="${realm}",service="${service}",scope="${scope}"`,
            'Docker-Distribution-Api-Version': 'registry/2.0',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}

// 处理token请求
async function handleTokenRequest(request: Request, url: URL): Promise<Response> {
    const tokenParameter = {
        headers: new Headers({
            Host: 'auth.docker.io',
            'User-Agent': request.headers.get('User-Agent') || '',
            Accept: request.headers.get('Accept') || '',
            'Accept-Language': request.headers.get('Accept-Language') || '',
            'Accept-Encoding': request.headers.get('Accept-Encoding') || '',
            Connection: 'keep-alive',
            'Cache-Control': 'max-age=0'
        })
    };

    const tokenUrl = `https://auth.docker.io${url.pathname}${url.search}`;

    const response = await fetch(
        new Request(tokenUrl, {
            method: request.method,
            headers: tokenParameter.headers
        })
    );

    // 复制响应头并处理CORS
    const headers = new Headers(response.headers);
    handleCors(headers);

    return new Response(response.body, {
        status: response.status,
        headers
    });
}

// 处理响应头
function handleResponse(response: Response, workerUrl: string): Response {
    const newHeaders = new Headers(response.headers);
    handleCors(newHeaders);

    // 修改 Www-Authenticate 头
    if (newHeaders.has('Www-Authenticate')) {
        const auth = newHeaders.get('Www-Authenticate');
        const authUrlRegex = /https:\/\/auth.docker.io/g;
        newHeaders.set('Www-Authenticate', auth?.replace(authUrlRegex, workerUrl) || '');
    }

    // 设置缓存控制
    newHeaders.set('Cache-Control', 'public, max-age=3600');

    return new Response(response.body, {
        status: response.status,
        headers: newHeaders
    });
}

// 格式化Docker路径
function formatDockerPath(path: string): string {
    if (!path.startsWith('/v2/library/') && /^\/v2\/[^/]+\/[^/]+/.test(path)) {
        return path.replace('/v2/', '/v2/library/');
    }
    return path;
}

// 主要的代理请求处理函数
export async function proxyRequest(request: Request): Promise<Response> {
    try {
        // 处理CORS预检请求
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: handleCors()
            });
        }

        const url = new URL(request.url);
        const workerUrl = `https://${url.hostname}`;

        // 处理token请求
        if (url.pathname.includes('/token')) {
            return handleTokenRequest(request, url);
        }

        const registryInfo = parseRegistryInfo(url.pathname);

        // 处理 v2 API 版本检查请求
        if (registryInfo.isV2Check) {
            return new Response(null, {
                status: 200,
                headers: handleCors(
                    new Headers({
                        'Docker-Distribution-Api-Version': 'registry/2.0'
                    })
                )
            });
        }

        // 确保配置存在
        if (!registryInfo.config) {
            return new Response('Registry configuration not found', {
                status: 500,
                headers: handleCors()
            });
        }

        // 处理Docker路径
        if (registryInfo.registry === 'docker') {
            url.pathname = formatDockerPath(url.pathname);
        }

        // 获取认证token
        let token = '';
        if (registryInfo.config.needAuth) {
            try {
                token = await getAuthToken(registryInfo.config, registryInfo.repository);
            } catch (error) {
                console.error('Auth Error:', error);
                return handleResponse(createAuthRequiredResponse(registryInfo.config, registryInfo.repository), workerUrl);
            }
        }

        // 构建目标URL
        const targetUrl = registryInfo.config.formatTargetUrl(registryInfo.config.baseUrl, registryInfo.repository);

        // 构建请求头
        const headers = new Headers(request.headers);
        headers.set('Host', new URL(registryInfo.config.baseUrl).hostname);

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        // 添加registry配置中定义的特殊请求头
        if (registryInfo.config.headers) {
            for (const [key, value] of Object.entries(registryInfo.config.headers)) {
                headers.set(key, value);
            }
        }

        // 发送代理请求
        const response = await fetchWithRetry(targetUrl, {
            method: request.method,
            headers,
            body: request.body,
            redirect: 'follow'
        });

        // 如果返回401，返回认证要求
        if (response.status === 401) {
            return handleResponse(createAuthRequiredResponse(registryInfo.config, registryInfo.repository), workerUrl);
        }

        // 处理响应
        return handleResponse(response, workerUrl);
    } catch (error: any) {
        console.error('Proxy Error:', error);
        return new Response(`Proxy error: ${error.message}`, {
            status: 502,
            headers: handleCors(
                new Headers({
                    'Content-Type': 'text/plain'
                })
            )
        });
    }
}
