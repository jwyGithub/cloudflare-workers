export interface CacheConfig {
    enabled: boolean;
    ttl: number; // 缓存时间（秒）
}

export interface CacheOptions {
    key: string;
    ttl?: number;
    cacheControl?: string;
}
