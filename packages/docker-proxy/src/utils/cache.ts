import type { CacheOptions } from '../types/cache';

export class CacheManager {
    private namespace: string;

    constructor(namespace: string = 'docker-proxy') {
        this.namespace = namespace;
    }

    private generateCacheKey(key: string): string {
        return `${this.namespace}:${key}`;
    }

    async get<T>(key: string): Promise<T | null> {
        try {
            const cacheKey = this.generateCacheKey(key);
            const cache = caches.default;
            const response = await cache.match(cacheKey);

            if (!response) {
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    }

    async set(options: CacheOptions, value: any): Promise<void> {
        try {
            const cacheKey = this.generateCacheKey(options.key);
            const cache = caches.default;

            const response = new Response(JSON.stringify(value), {
                headers: {
                    'Cache-Control': options.cacheControl || `public, max-age=${options.ttl || 3600}`,
                    'Content-Type': 'application/json'
                }
            });

            await cache.put(cacheKey, response);
        } catch (error) {
            console.error('Cache set error:', error);
        }
    }

    async delete(key: string): Promise<void> {
        try {
            const cacheKey = this.generateCacheKey(key);
            const cache = caches.default;
            await cache.delete(cacheKey);
        } catch (error) {
            console.error('Cache delete error:', error);
        }
    }
}
