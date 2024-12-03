// types/cache.ts - 缓存响应类型定义
export interface CacheResponse extends Response {
    cached: boolean; // 标示此响应是否来自缓存
}
