export interface CacheOptions {
    key: string;
    ttl?: number;
    cacheControl?: string;
}

export interface AuthResponse {
    realm: string;
    service: string;
    scope?: string;
}

export interface CachedResponse {
    body: any;
    headers: Record<string, string>;
    timestamp: number;
}
