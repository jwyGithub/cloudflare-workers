import type { RegistryConfig } from '../types';
import { fetchWithRetry } from '../utils/fetch';
import { parseRegistryInfo } from '../utils/registry';
import { getAuthToken } from './auth';

function handleCors(headers: Headers = new Headers()): Headers {
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    headers.set('Access-Control-Max-Age', '86400');
    return headers;
}

export async function proxyRequest(request: Request): Promise<Response> {
    try {
        // 处理CORS预检请求
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: handleCors()
            });
        }

        const url = new URL(request.url);
        const registryInfo = parseRegistryInfo(url.pathname);

        // 处理 v2 API 版本检查请求
        if (registryInfo.isV2Check) {
            return new Response(null, {
                status: 200,
                headers: handleCors(new Headers({ 'Docker-Distribution-Api-Version': 'registry/2.0' }))
            });
        }

        // 确保配置存在
        if (!registryInfo.config) {
            return new Response('Registry configuration not found', {
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        // 检查缓存
        const cache = caches.default;
        const cacheKey = new Request(url.toString(), request);
        let response = await cache.match(cacheKey);

        if (response) {
            return response;
        }

        // 获取认证token
        let token = '';
        if (registryInfo.config.needAuth) {
            try {
                token = await getAuthToken(registryInfo.config, registryInfo.repository);
                if (!token) {
                    return createAuthRequiredResponse(registryInfo.config, registryInfo.repository);
                }
            } catch (error) {
                console.error('Auth error:', error);
                return createAuthRequiredResponse(registryInfo.config, registryInfo.repository);
            }
        }

        // 构建目标URL
        const targetUrl = registryInfo.config.formatTargetUrl(registryInfo.config.baseUrl, registryInfo.repository);

        // 处理请求头
        const headers = new Headers(request.headers);

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
        response = await fetchWithRetry(targetUrl, {
            method: request.method,
            headers,
            body: request.body,
            redirect: 'follow'
        });

        // 如果返回401，返回认证要求
        if (response.status === 401) {
            return createAuthRequiredResponse(registryInfo.config, registryInfo.repository);
        }

        // 处理响应
        const responseHeaders = handleCors();

        // 复制原始响应的headers
        for (const [key, value] of response.headers.entries()) {
            if (!key.toLowerCase().startsWith('access-control-')) {
                responseHeaders.set(key, value);
            }
        }

        const newResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders
        });

        // 缓存成功的GET请求响应
        if (response.ok && request.method === 'GET') {
            const cacheControl = response.headers.get('Cache-Control');
            if (cacheControl && !cacheControl.includes('no-store')) {
                await cache.put(cacheKey, newResponse.clone());
            }
        }

        return newResponse;
    } catch (error: any) {
        return new Response(`Proxy error: ${error.message}`, {
            status: 502,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
            }
        });
    }
}

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
