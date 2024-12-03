// utils/fetch.ts - 发起请求的工具函数
export const fetchWithRetry = async (url: string, options: RequestInit, retries: number = 3): Promise<Response> => {
    let lastError: any;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response;
            }
            lastError = new Error(`Attempt ${attempt} failed with status: ${response.status}`);
        } catch (error) {
            lastError = error;
        }
        if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // exponential backoff
        }
    }
    throw lastError;
};
