import type { AuthResponse, RegistryConfig } from '../types';
import { fetchWithRetry } from '../utils/fetch';

export async function getAuthToken(config: RegistryConfig, repository: string): Promise<string> {
    if (!config.authUrl) {
        throw new Error('Auth URL not configured');
    }

    const service = config.auth?.service || new URL(config.baseUrl).hostname;
    const scope = config.auth?.formatScope?.(repository) || `repository:${repository}:pull`;

    // 构建认证URL
    const authUrl = new URL(config.authUrl);
    authUrl.searchParams.set('service', service);
    authUrl.searchParams.set('scope', scope);

    // 发送认证请求
    const response = await fetchWithRetry(authUrl.toString(), {
        headers: {
            Accept: 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to get auth token: ${response.statusText}`);
    }

    const auth: AuthResponse = await response.json();
    return auth.token;
}
