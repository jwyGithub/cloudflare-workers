import type { RetryOptions } from '../types';

export async function fetchWithRetry(input: RequestInfo, init?: RequestInit, options: RetryOptions = {}): Promise<Response> {
    const { retries = 3, backoff = 300, timeout = 30000 } = options;

    let lastError: Error = new Error('Failed to fetch');

    for (let i = 0; i < retries; i++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(input, {
                ...init,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok && response.status !== 401) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return response;
        } catch (error) {
            lastError = error as Error;

            if (i === retries - 1) {
                break;
            }

            await new Promise(resolve => setTimeout(resolve, backoff * 2 ** i));
        }
    }

    throw lastError;
}
