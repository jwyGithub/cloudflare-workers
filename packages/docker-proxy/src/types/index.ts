// types/registry.ts - 镜像仓库配置的类型定义
export interface RegistryConfig {
    baseUrl: string;
    requiresAuth: boolean;
    authUrl: string;
}
