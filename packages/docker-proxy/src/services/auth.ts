import type { AuthResponse, RegistryConfig } from '../types';
import { fetchWithRetry } from '../utils/fetch';

export async function getAuthToken(config: RegistryConfig, repository: string): Promise<string> {
    if (!config.needAuth || !config.authUrl) {
        return '';
    }

    const params = new URLSearchParams();

    if (config.auth?.service) {
        params.set('service', config.auth.service);
    }

    if (config.auth?.formatScope) {
        params.set('scope', config.auth.formatScope(repository));
    } else {
        params.set('scope', `repository:${repository}:pull`);
    }

    const response = await fetchWithRetry(`${config.authUrl}?${params.toString()}`, {
        headers: {
            Accept: 'application/json',
            ...(config.headers || {})
        }
    });

    if (!response.ok) {
        throw new Error(`Auth failed: ${response.status}`);
    }

    const auth: AuthResponse = await response.json();
    return auth.token;
}
