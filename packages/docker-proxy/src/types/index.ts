export interface RegistryConfig {
    baseUrl: string;
    authRequired: boolean;
    needLibrary?: boolean;
    headers?: Record<string, string>;
    // 添加 scopeFormat 用于自定义 scope 格式
    scopeFormat?: (imagePath: string) => string;
}
export interface RetryOptions {
    retries?: number;
    backoff?: number;
    timeout?: number;
}

export interface AuthResponse {
    realm: string;
    service: string;
    scope?: string;
}
