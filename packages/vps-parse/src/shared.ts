import { parseTrojanLink, parseVlessLink, parseVmessLink } from './parse';

export function getTime(): string {
    return new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}

export function hasHost(ip: string, links: Array<{ host: string; port: number; remark: string }>): boolean {
    return links.some(item => {
        return item.host === ip;
    });
}

export function tryParseUrl(url: string): URL | null {
    try {
        return new URL(url);
    } catch {
        return null;
    }
}

export function getVless(links: string[]): string[] {
    try {
        const vlessLinks: Array<{ host: string; port: number; remark: string }> = [];
        for (const link of links) {
            const parsedUrl = tryParseUrl(link);
            if (parsedUrl === null) continue;
            const { host, port, remark } = parseVlessLink(parsedUrl, link);
            if (!host.startsWith('127') && !/^[a-z]/i.test(host) && !hasHost(host, vlessLinks)) {
                vlessLinks.push({ host, port, remark });
            }
        }
        return vlessLinks.map(item => `${item.host}:${item.port}${item.remark}`);
    } catch (error: any) {
        throw new Error(`catch on getVless : ${error.message || error}`);
    }
}

export function getTrojan(links: string[]): string[] {
    try {
        const trojanLinks: Array<{ host: string; port: number; remark: string }> = [];
        for (const link of links) {
            const parsedUrl = tryParseUrl(link);
            if (parsedUrl === null) continue;
            const { host, port, remark } = parseTrojanLink(parsedUrl, link);
            if (!host.startsWith('127') && !/^[a-z]/i.test(host) && !hasHost(host, trojanLinks)) {
                trojanLinks.push({ host, port, remark });
            }
        }
        return trojanLinks.map(item => `${item.host}:${item.port}${item.remark}`);
    } catch (error: any) {
        throw new Error(`catch on getTrojan : ${error.message || error}`);
    }
}

export function getVmess(links: string[]): string[] {
    try {
        const vmessLinks: Array<{ host: string; port: number; remark: string }> = [];
        for (const link of links) {
            const { host, port, remark } = parseVmessLink(link.replace('vmess://', ''));
            if (!host.startsWith('127') && !/^[a-z]/i.test(host) && !hasHost(host, vmessLinks)) {
                vmessLinks.push({ host, port, remark });
            }
        }
        return vmessLinks.map(item => `${item.host}:${item.port}${item.remark}`);
    } catch (error: any) {
        throw new Error(`catch on getVmess : ${error.message || error}`);
    }
}

export function sleep(ms: number = 1000): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

interface FetchWithRetryOptions {
    retries?: number;
    onError?: (error: Error, attempt: number) => void | Promise<void>;
}

export async function fetchWithRetry(request: Request | string, options: FetchWithRetryOptions = {}): Promise<Response> {
    const { retries = 3, onError } = options;
    let lastError: Error;

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetch(request);

            // 检查响应状态是否成功
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response;
        } catch (error) {
            lastError = error as Error;

            // 处理错误回调
            if (onError) {
                const errorResult = onError(lastError, attempt + 1);
                // 如果 onError 返回 Promise，等待它完成
                if (errorResult instanceof Promise) {
                    await errorResult;
                }
            }

            // 如果是最后一次尝试，抛出错误
            if (attempt === retries - 1) {
                throw new Error(`Failed after ${retries} attempts: ${lastError.message}`);
            }

            // 可以在这里添加延迟重试的逻辑
            await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 1000));
        }
    }

    // 这行代码实际上永远不会执行，但为了 TypeScript 类型检查需要
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    throw lastError;
}
