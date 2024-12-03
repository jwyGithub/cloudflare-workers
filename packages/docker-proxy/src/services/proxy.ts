// // services/proxy.ts - 代理请求的核心逻辑
// import { cacheResponse, cacheTypes, getCacheResponse } from '../utils/cache'; // 缓存相关
// import { fetchWithRetry } from '../utils/fetch'; // 发起请求工具
// import { formatDockerHubPath, getRegistryConfig } from '../utils/registry'; // 镜像处理相关工具
// import { fetchToken, parseAuthenticate } from './auth'; // 认证请求相关

// // 代理请求的核心逻辑
// async function handleProxyRequest(request: Request): Promise<Response> {
//     const url = new URL(request.url);
//     const hostname = url.hostname;

//     // 获取镜像仓库配置
//     const config = getRegistryConfig(hostname);
//     if (!config) {
//         return new Response('Registry not supported', { status: 400 });
//     }

//     // 判断是否需要认证
//     if (config.requiresAuth) {
//         const authResponse = await fetchWithRetry(config.authUrl, {
//             method: 'GET'
//         });

//         if (authResponse.status === 401) {
//             const authenticateHeader = authResponse.headers.get('WWW-Authenticate');
//             if (authenticateHeader) {
//                 const wwwAuthenticate = parseAuthenticate(authenticateHeader);
//                 const scope = handleDockerHubScope(url.searchParams.get('scope') || wwwAuthenticate.scope);
//                 const token = await fetchToken(wwwAuthenticate, scope, request.headers.get('Authorization'));
//                 return await handleProxyRequestWithAuth(request, token); // 传递 token 进行代理请求
//             }
//         }
//     }

//     // 使用缓存，先检查缓存
//     const cacheResponseResult = await getCacheResponse(request.url, cacheTypes.MANIFEST);
//     if (cacheResponseResult) {
//         return cacheResponseResult; // 如果缓存中有结果，直接返回缓存的响应
//     }

//     // 如果没有缓存，执行真实请求并缓存响应
//     return await fetchAndCache(request, cacheTypes.MANIFEST);
// }

// // 处理 Docker Hub scope 特殊情况
// function handleDockerHubScope(scope: string | null): string | null {
//     if (scope && scope.startsWith('library/')) {
//         return scope;
//     }

//     if (scope && !scope.includes('/')) {
//         return `library/${scope}`;
//     }

//     return scope;
// }

// // 发起请求并缓存响应
// async function fetchAndCache(request: Request, cacheType: string): Promise<Response> {
//     const newRequest = new Request(request);
//     const response = await fetchWithRetry(newRequest.url, {
//         method: request.method,
//         headers: request.headers
//     });

//     if (response.ok) {
//         await cacheResponse(request.url, cacheType, response); // 缓存请求响应
//     }

//     return response;
// }

// // 使用 token 进行代理请求
// async function handleProxyRequestWithAuth(request: Request, token: string): Promise<Response> {
//     const headers = new Headers(request.headers);
//     headers.set('Authorization', `Bearer ${token}`);

//     // 格式化 Docker Hub 镜像路径（如果是 Docker Hub 请求）
//     if (request.url.includes('docker.io')) {
//         const newPath = formatDockerHubPath(new URL(request.url).pathname);
//         const newUrl = new URL(request.url);
//         newUrl.pathname = newPath;
//         request = new Request(newUrl, {
//             method: request.method,
//             headers,
//             redirect: 'follow'
//         });
//     }

//     const newRequest = new Request(request);
//     return await fetchWithRetry(newRequest.url, {
//         method: request.method,
//         headers
//     });
// }

// export { handleProxyRequest };

import { cacheResponse, cacheTypes, getCacheResponse } from '../utils/cache';
import { fetchWithRetry } from '../utils/fetch';
import { formatScope, getRegistryConfig, parseAuthenticate } from '../utils/registry';
import { fetchToken } from './auth';

async function handleProxyRequestWithAuth(request: Request, token: string): Promise<Response> {
    const headers = new Headers(request.headers);
    headers.set('Authorization', `Bearer ${token}`);

    const url = new URL(request.url);
    const upstreamUrl = new URL(`${url.protocol}//${url.hostname}${url.pathname}`);
    const proxyRequest = new Request(upstreamUrl.toString(), {
        method: request.method,
        headers
    });

    return await fetchWithRetry(proxyRequest.url, {
        method: request.method,
        headers: proxyRequest.headers
    });
}

export async function handleProxyRequest(request: Request): Promise<Response> {
    const cacheKey = `${request.method}:${request.url}`;
    const cachedResponse = await getCacheResponse(cacheKey, cacheTypes.MANIFEST);

    if (cachedResponse) {
        return cachedResponse;
    }

    const url = new URL(request.url);
    const config = getRegistryConfig(url.hostname);

    if (!config) {
        return new Response('Unknown registry', { status: 404 });
    }

    if (config.requiresAuth) {
        const authenticateUrl = `${config.authUrl}`;
        const authResponse = await fetch(authenticateUrl, { method: 'GET' });

        if (authResponse.status === 401) {
            const authenticateHeader = authResponse.headers.get('WWW-Authenticate');
            if (!authenticateHeader) {
                throw new Error('Missing WWW-Authenticate header');
            }

            const wwwAuthenticate = parseAuthenticate(authenticateHeader); // 使用 parseAuthenticate 解析
            const scope = formatScope(url.searchParams.get('scope') || '', config.baseUrl === 'https://registry-1.docker.io');

            // 使用 wwwAuthenticate 中的 realm 和 service 构建认证请求
            const token = await fetchToken(config.authUrl, scope, `Bearer ${wwwAuthenticate.service}`);

            const proxiedResponse = await handleProxyRequestWithAuth(request, token);

            cacheResponse(cacheKey, cacheTypes.MANIFEST, proxiedResponse.clone());
            return proxiedResponse;
        }
    }

    // If no authentication required, proceed with direct proxy
    const upstreamUrl = new URL(`${url.protocol}//${url.hostname}${url.pathname}`);
    const proxyRequest = new Request(upstreamUrl.toString(), {
        method: request.method,
        headers: request.headers
    });

    const response = await fetchWithRetry(proxyRequest.url, {
        method: request.method,
        headers: proxyRequest.headers
    });

    cacheResponse(cacheKey, cacheTypes.MANIFEST, response.clone());
    return response;
}
