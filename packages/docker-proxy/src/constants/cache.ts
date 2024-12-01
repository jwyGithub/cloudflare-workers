export const CACHE_CONFIGS = {
    token: {
        enabled: true,
        ttl: 300 // 令牌缓存 5 分钟
    },
    manifest: {
        enabled: true,
        ttl: 3600 // 清单缓存 1 小时
    },
    layer: {
        enabled: true,
        ttl: 86400 // 层缓存 24 小时
    }
} as const;
