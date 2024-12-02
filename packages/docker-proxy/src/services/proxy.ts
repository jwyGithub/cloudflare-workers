import { fetchWithRetry } from '../utils/fetch';
import { parseRegistryInfo } from '../utils/registry';
import { getAuthToken } from './auth';

export async function proxyRequest(request: Request): Promise<Response> {
    // 处理CORS预检请求
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Authorization, Content-Type',
                'Access-Control-Max-Age': '86400'
            }
        });
    }

    const url = new URL(request.url);
    const registryInfo = parseRegistryInfo(url.pathname);

    // 处理 v2 API 版本检查请求
    if (registryInfo.isV2Check) {
        return new Response(null, {
            status: 200,
            headers: {
                'Docker-Distribution-Api-Version': 'registry/2.0',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Authorization, Content-Type'
            }
        });
    }

    // 确保配置存在
    if (!registryInfo.config) {
        return new Response('Registry configuration not found', {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
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
        } catch (error: any) {
            return new Response(`Authentication failed: ${error.message}`, {
                status: 401,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'text/plain'
                }
            });
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
    try {
        response = await fetchWithRetry(targetUrl, {
            method: request.method,
            headers,
            body: request.body,
            redirect: 'follow'
        });

        // 处理响应
        const responseHeaders = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Authorization, Content-Type'
        });

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

        // 缓存响应
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
