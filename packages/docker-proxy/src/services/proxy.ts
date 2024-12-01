import type { RegistryConfig } from '../types';
import { toClientError, toServerError } from '@jiangweiye/worker-service';
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

            // 检查请求类型，确定是否可以使用缓存
            const canUseCache = this.canUseCache(request, normalizedPath);
            if (canUseCache) {
                const cachedResponse = await this.getCachedResponse(request, registryType, normalizedPath);
                if (cachedResponse) {
                    return cachedResponse;
                }
            }

            // 处理认证
            if (config.authRequired) {
                const token = await this.handleAuthentication(request, registryType, normalizedPath);
                if (!token) {
                    return new Response('Authentication failed', { status: 401 });
                }
                request.headers.set('Authorization', `Bearer ${token}`);
            }

            // 发送请求
            const response = await this.fetchFromRegistry(request, config, normalizedPath);

            // 缓存响应
            if (canUseCache && response.ok) {
                await this.cacheResponse(request, response.clone(), registryType, normalizedPath);
            }

            return response;
        } catch (error: any) {
            console.error(`Registry proxy error:`, error);
            return toServerError(`Registry error: ${error.message || error}`);
        }
    }

    private canUseCache(request: Request, path: string): boolean {
        // 只缓存 GET 请求
        if (request.method !== 'GET') {
            return false;
        }

        // 确定请求类型（manifest 或 layer）
        const isManifest = path.includes('/manifests/');
        const isLayer = path.includes('/blobs/');

        return isManifest ? CACHE_CONFIGS.manifest.enabled : isLayer ? CACHE_CONFIGS.layer.enabled : false;
    }

    private async getCachedResponse(request: Request, registryType: string, path: string): Promise<Response | null> {
        const cacheKey = `${registryType}:${path}:${request.method}`;
        const cachedData = await this.cacheManager.get<{
            body: any;
            headers: Record<string, string>;
        }>(cacheKey);

        if (cachedData) {
            return new Response(JSON.stringify(cachedData.body), {
                headers: new Headers(cachedData.headers)
            });
        }

        return null;
    }

    private async cacheResponse(request: Request, response: Response, registryType: string, path: string): Promise<void> {
        const isManifest = path.includes('/manifests/');
        const isLayer = path.includes('/blobs/');
        const ttl = isManifest ? CACHE_CONFIGS.manifest.ttl : isLayer ? CACHE_CONFIGS.layer.ttl : 3600;

        const cacheKey = `${registryType}:${path}:${request.method}`;
        const responseData = await response.clone().json();
        const headers = Object.fromEntries(response.headers.entries());

        await this.cacheManager.set(
            {
                key: cacheKey,
                ttl
            },
            {
                body: responseData,
                headers
            }
        );
    }

    private async handleAuthentication(request: Request, registryType: string, path: string): Promise<string | null> {
        const { hostname } = new URL(request.url);
        const authHeader = request.headers.get('Authorization');
        const scope = registryType === 'docker' && !path.includes('/') ? `repository:library/${path}:pull` : `repository:${path}:pull`;

        const authInfo = {
            realm: `https://${hostname}/v2/auth`,
            service: 'registry.docker.io',
            scope
        };

        return await this.authService.getToken(registryType, authInfo, authHeader);
    }

    private async fetchFromRegistry(request: Request, config: RegistryConfig, path: string): Promise<Response> {
        const targetUrl = new URL(path.startsWith('/') ? path : `/${path}`, config.baseUrl);

        return await fetchWithRetry(targetUrl.toString(), {
            method: request.method,
            headers: request.headers,
            body: request.method === 'GET' ? null : request.body,
            redirect: 'follow'
        });
    }
}
