export interface RegistryConfig {
    baseUrl: string;
    authRequired: boolean;
    needLibrary?: boolean;
    authUrl?: string; // 添加认证 URL
    headers?: Record<string, string>;
    scopeFormat?: (imagePath: string) => string;
    useExample: (host: string) => {
        title: string;
        bash: string[];
    };
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
