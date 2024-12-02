export async function fetchWithRetry(url: string, options: RequestInit, maxRetries: number = 3): Promise<Response> {
    let lastError: Error = new Error('Unknown error');

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok || response.status === 401) {
                return response;
            }
            throw new Error(`HTTP Error: ${response.status}`);
        } catch (error) {
            lastError = error as Error;
            if (i === maxRetries - 1) break;
            await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000));
        }
    }

    throw lastError;
}
