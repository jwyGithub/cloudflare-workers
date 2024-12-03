// services/proxy.ts - 代理请求的核心逻辑
import { cacheResponse, cacheTypes, getCacheResponse } from '../utils/cache'; // 缓存相关
import { fetchWithRetry } from '../utils/fetch'; // 发起请求工具
import { formatDockerHubPath, getRegistryConfig } from '../utils/registry'; // 镜像处理相关工具
import { fetchToken, parseAuthenticate } from './auth'; // 认证请求相关

// 代理请求的核心逻辑
async function handleProxyRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // 获取镜像仓库配置
    const config = getRegistryConfig(hostname);
    if (!config) {
        return new Response('Registry not supported', { status: 400 });
    }

    // 判断是否需要认证
    if (config.requiresAuth) {
        const authResponse = await fetchWithRetry(config.authUrl, {
            method: 'GET'
        });

        if (authResponse.status === 401) {
            const authenticateHeader = authResponse.headers.get('WWW-Authenticate');
            if (authenticateHeader) {
                const wwwAuthenticate = parseAuthenticate(authenticateHeader);
                const scope = handleDockerHubScope(url.searchParams.get('scope') || wwwAuthenticate.scope);
                const token = await fetchToken(wwwAuthenticate, scope, request.headers.get('Authorization'));
                return await handleProxyRequestWithAuth(request, token); // 传递 token 进行代理请求
            }
        }
    }

    // 使用缓存，先检查缓存
    const cacheResponseResult = await getCacheResponse(request.url, cacheTypes.MANIFEST);
    if (cacheResponseResult) {
        return cacheResponseResult; // 如果缓存中有结果，直接返回缓存的响应
    }

    // 如果没有缓存，执行真实请求并缓存响应
    return await fetchAndCache(request, cacheTypes.MANIFEST);
}

// 处理 Docker Hub scope 特殊情况
function handleDockerHubScope(scope: string | null): string | null {
    if (scope && scope.startsWith('library/')) {
        return scope;
    }

    if (scope && !scope.includes('/')) {
        return `library/${scope}`;
    }

    return scope;
}

// 发起请求并缓存响应
async function fetchAndCache(request: Request, cacheType: string): Promise<Response> {
    const newRequest = new Request(request);
    const response = await fetchWithRetry(newRequest.url, {
        method: request.method,
        headers: request.headers
    });

    if (response.ok) {
        await cacheResponse(request.url, cacheType, response); // 缓存请求响应
    }

    return response;
}

// 使用 token 进行代理请求
async function handleProxyRequestWithAuth(request: Request, token: string): Promise<Response> {
    const headers = new Headers(request.headers);
    headers.set('Authorization', `Bearer ${token}`);

    // 格式化 Docker Hub 镜像路径（如果是 Docker Hub 请求）
    if (request.url.includes('docker.io')) {
        const newPath = formatDockerHubPath(new URL(request.url).pathname);
        const newUrl = new URL(request.url);
        newUrl.pathname = newPath;
        request = new Request(newUrl, {
            method: request.method,
            headers,
            redirect: 'follow'
        });
    }

    const newRequest = new Request(request);
    return await fetchWithRetry(newRequest.url, {
        method: request.method,
        headers
    });
}

export { handleProxyRequest };
