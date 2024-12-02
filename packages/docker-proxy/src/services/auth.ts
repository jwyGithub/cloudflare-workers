import type { AuthResponse, RegistryConfig } from '../types';
import { fetchWithRetry } from '../utils/fetch';

export async function getAuthToken(config: RegistryConfig, repository: string): Promise<string> {
    if (!config.needAuth || !config.authUrl) {
        return '';
    }

    const service = config.auth?.service || new URL(config.baseUrl).hostname;
    const scope = config.auth?.formatScope?.(repository) || `repository:${repository}:pull`;

    const params = new URLSearchParams({
        service,
        scope
    });

    const authUrl = `${config.authUrl}?${params.toString()}`;

    const response = await fetchWithRetry(authUrl, {
        headers: {
            Accept: 'application/json',
            ...(config.headers || {})
        }
    });

    if (!response.ok) {
        console.error('Auth failed:', response.status, await response.text()); // 添加错误日志
        throw new Error(`Auth failed: ${response.status}`);
    }

    const auth: AuthResponse = await response.json();
    return auth.token;
}
