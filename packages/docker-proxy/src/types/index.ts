// types/registry.ts - 镜像仓库配置的类型定义
export interface RegistryConfig {
    baseUrl: string; // 镜像仓库的基础 URL
    requiresAuth: boolean; // 是否需要认证
    authUrl: string; // 认证 URL
}
