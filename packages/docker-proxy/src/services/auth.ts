import type { AuthResponse } from '../types';
import { toUnauthorized } from '@jiangweiye/worker-service';
import { CACHE_CONFIGS } from '../constants/cache';

import { CacheManager } from '../utils/cache';
import { fetchWithRetry } from '../utils/fetch';
import { configureRegistryHeaders } from '../utils/registry';

export async function authenticateRegistry(registryType: string, authInfo: AuthResponse, authorization: string | null): Promise<Response> {
    const url = new URL(authInfo.realm);
    url.searchParams.set('service', authInfo.service);

    if (authInfo.scope) {
        url.searchParams.set('scope', authInfo.scope);
    }

    const headers = configureRegistryHeaders(registryType, authorization);

    try {
        return await fetchWithRetry(url.toString(), {
            method: 'GET',
            headers
        });
    } catch (error) {
        console.error(`Authentication failed for ${registryType}:`, error);
        return toUnauthorized('Authentication failed');
    }
}

export class AuthService {
    private cacheManager: CacheManager;

    constructor() {
        this.cacheManager = new CacheManager();
    }

    async getToken(registryType: string, authInfo: AuthResponse, authorization: string | null): Promise<string | null> {
        // 生成缓存键
        const cacheKey = `token:${registryType}:${authInfo.service}:${authInfo.scope}`;

        // 尝试从缓存获取令牌
        const cachedToken = await this.cacheManager.get<{ token: string }>(cacheKey);
        if (cachedToken) {
            return cachedToken.token;
        }

        // 构建认证 URL
        const url = new URL(authInfo.realm);
        url.searchParams.set('service', authInfo.service);
        if (authInfo.scope) {
            url.searchParams.set('scope', authInfo.scope);
        }

        try {
            const response = await fetchWithRetry(url.toString(), {
                method: 'GET',
                headers: authorization ? { Authorization: authorization } : undefined
            });

            if (!response.ok) {
                console.error('Auth failed:', await response.text());
                return null;
            }

            const tokenData = (await response.json()) as { token: string };

            // 缓存令牌
            if (CACHE_CONFIGS.token.enabled && tokenData.token) {
                await this.cacheManager.set(
                    {
                        key: cacheKey,
                        ttl: CACHE_CONFIGS.token.ttl
                    },
                    tokenData
                );
            }

            return tokenData.token;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }
}
