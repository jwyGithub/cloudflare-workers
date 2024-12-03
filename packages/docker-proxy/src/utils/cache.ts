// cache.ts - 处理不同类型的缓存
export const cacheTypes = {
    MANIFEST: 'manifest',
    LAYER: 'layer',
    TOKEN: 'token'
};

export const getCacheKey = (url: string, type: string): string => {
    return `${type}:${url}`;
};

// 从缓存中获取响应
export const getCacheResponse = async (url: string, type: string): Promise<Response | null> => {
    const cache = caches.default;
    const cacheKey = getCacheKey(url, type);
    const cachedResponse = await cache.match(cacheKey);
    return cachedResponse || null;
};

// 将响应保存到缓存中
export const cacheResponse = async (url: string, type: string, response: Response): Promise<void> => {
    const cache = caches.default;
    const cacheKey = getCacheKey(url, type);
    await cache.put(cacheKey, response);
};
