import type { AuthResponse } from '../types';
import type { CachedResponse } from '../types/cache';
import { toClientError, toServerError, toUnauthorized } from '@jiangweiye/worker-service';
import { CACHE_CONFIGS } from '../constants/cache';
import { REGISTRY_CONFIGS } from '../constants/registry';
import { CacheManager } from '../utils/cache';
import { fetchWithRetry } from '../utils/fetch';
import { normalizeImagePath, parseRegistryInfo } from '../utils/registry';
import { AuthService } from './auth';

export class RegistryProxy {
    private cacheManager: CacheManager;
    private authService: AuthService;

    constructor() {
        this.cacheManager = new CacheManager();
        this.authService = new AuthService();
    }

    async handleRequest(request: Request): Promise<Response> {
        const url = new URL(request.url);
        const { registryType, imagePath } = parseRegistryInfo(url.pathname);
        const config = REGISTRY_CONFIGS[registryType];

        if (!config) {
            return toClientError('Unsupported registry type');
        }

        try {
            const normalizedPath = normalizeImagePath(registryType, imagePath);

            // 检查是否可以使用缓存
            const canUseCache = this.canUseCache(request, normalizedPath);
            if (canUseCache) {
                const cachedResponse = await this.getCachedResponse(registryType, normalizedPath, request.method);
                if (cachedResponse) {
                    return cachedResponse;
                }
            }

            // 构建请求头
            const headers = new Headers(request.headers);
            if (config.headers) {
                Object.entries(config.headers).forEach(([key, value]) => {
                    headers.set(key, value);
                });
            }

            // 如果需要认证，先获取 token
            if (config.authRequired) {
                const scope = config.scopeFormat ? config.scopeFormat(normalizedPath) : `repository:${normalizedPath}:pull`;
                const authInfo: AuthResponse = {
                    realm: config.authUrl || 'https://auth.docker.io/token',
                    service: 'registry.docker.io',
                    scope
                };

                const token = await this.authService.getToken(registryType, authInfo, request.headers.get('Authorization'));

                if (!token) {
                    return toUnauthorized('Failed to obtain authentication token');
                }

                headers.set('Authorization', `Bearer ${token}`);
            }

            // 构建目标 URL
            const targetUrl = new URL(`${config.baseUrl}/v2/${normalizedPath}`, config.baseUrl);

            // 发送请求
            const response = await fetchWithRetry(targetUrl.toString(), {
                method: request.method,
                headers,
                redirect: 'follow',
                body: request.method === 'GET' ? null : request.body
            });

            // 缓存成功的响应
            if (canUseCache && response.ok) {
                await this.cacheResponse(registryType, normalizedPath, response.clone(), request.method);
            }

            return response;
        } catch (error: any) {
            console.error(`Registry proxy error:`, error);
            return toServerError(`Registry error: ${error.message || error}`);
        }
    }

    private canUseCache(request: Request, path: string): boolean {
        if (request.method !== 'GET') {
            return false;
        }

        const isManifest = path.includes('/manifests/');
        const isLayer = path.includes('/blobs/');

        return isManifest ? CACHE_CONFIGS.manifest.enabled : isLayer ? CACHE_CONFIGS.layer.enabled : false;
    }

    private async getCachedResponse(registryType: string, path: string, method: string): Promise<Response | null> {
        const cacheKey = this.generateCacheKey(registryType, path, method);
        const cachedData = await this.cacheManager.get<CachedResponse>(cacheKey);

        if (cachedData) {
            // 检查缓存是否过期
            const isManifest = path.includes('/manifests/');
            const isLayer = path.includes('/blobs/');
            const ttl = isManifest ? CACHE_CONFIGS.manifest.ttl : isLayer ? CACHE_CONFIGS.layer.ttl : 3600;

            if (Date.now() - cachedData.timestamp < ttl * 1000) {
                return new Response(JSON.stringify(cachedData.body), {
                    headers: new Headers(cachedData.headers)
                });
            }
        }

        return null;
    }

    private async cacheResponse(registryType: string, path: string, response: Response, method: string): Promise<void> {
        const isManifest = path.includes('/manifests/');
        const isLayer = path.includes('/blobs/');
        const ttl = isManifest ? CACHE_CONFIGS.manifest.ttl : isLayer ? CACHE_CONFIGS.layer.ttl : 3600;

        const cacheKey = this.generateCacheKey(registryType, path, method);
        const responseData = await response.clone().json();
        const headers = Object.fromEntries(response.headers.entries());

        await this.cacheManager.set(
            {
                key: cacheKey,
                ttl
            },
            {
                body: responseData,
                headers,
                timestamp: Date.now()
            }
        );
    }

    private generateCacheKey(registryType: string, path: string, method: string): string {
        return `${registryType}:${path}:${method}`;
    }
}
