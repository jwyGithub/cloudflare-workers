// cache.ts - 处理不同类型的缓存
export const cacheTypes = {
    MANIFEST: 'manifest',
    LAYER: 'layer',
    TOKEN: 'token'
};

// 获取缓存键，直接使用完整的 URL 作为缓存键
export const getCacheKey = (url: string): string => {
    try {
        const validUrl = new URL(url); // 验证 URL 是否有效
        return validUrl.href; // 使用完整的 URL 作为缓存键
    } catch {
        console.error('Invalid URL for cache key:', url);
        return ''; // 如果 URL 无效，返回空字符串
    }
};

// 从缓存中获取响应
export const getCacheResponse = async (url: string): Promise<Response | null> => {
    const cache = caches.default;
    const cacheKey = getCacheKey(url);
    if (!cacheKey) {
        return null;
    }
    const cachedResponse = await cache.match(cacheKey);
    return cachedResponse || null;
};

// 将响应保存到缓存中
export const cacheResponse = async (url: string, response: Response): Promise<void> => {
    const cache = caches.default;
    const cacheKey = getCacheKey(url);
    if (!cacheKey) {
        return;
    }
    await cache.put(cacheKey, response);
};
