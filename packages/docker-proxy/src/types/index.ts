export interface RegistryConfig {
    baseUrl: string;
    authUrl?: string;
    needAuth: boolean;
    scope?: string;
    // 格式化目标URL的函数
    formatTargetUrl: (baseUrl: string, repository: string) => string;
    // 特殊的请求头
    headers?: Record<string, string>;
    // 认证相关的配置
    auth?: {
        service?: string;
        realm?: string;
        // 格式化认证scope的函数
        formatScope?: (repository: string) => string;
    };
}

export interface RegistryInfo {
    isV2Check: boolean;
    registry: string;
    repository: string;
    config: RegistryConfig | null;
}

export interface AuthResponse {
    token: string;
    expires_in: number;
    issued_at: string;
}

export interface ProxyConfig {
    maxRetries: number;
    timeout: number;
}
