import { parseTrojanLink, parseVlessLink } from './parse';

export function getTime(): string {
    return new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}

export function hasHost(ip: string, links: Array<{ host: string; port: number; remark: string }>): boolean {
    return links.some(item => {
        return item.host === ip;
    });
}

export function getVless(links: string[]): string[] {
    const vlessLinks: Array<{ host: string; port: number; remark: string }> = [];
    for (const link of links) {
        const { host, port, remark } = parseVlessLink(link);
        if (!host.startsWith('127') && !/^[a-z]/i.test(host) && !hasHost(host, vlessLinks)) {
            vlessLinks.push({ host, port, remark });
        }
    }
    return vlessLinks.map(item => `${item.host}:${item.port}${item.remark}`);
}

export function getTrojan(links: string[]): string[] {
    const trojanLinks: Array<{ host: string; port: number; remark: string }> = [];
    for (const link of links) {
        const { host, port, remark } = parseTrojanLink(link);
        if (!host.startsWith('127') && !/^[a-z]/i.test(host) && !hasHost(host, trojanLinks)) {
            trojanLinks.push({ host, port, remark });
        }
    }
    return trojanLinks.map(item => `${item.host}:${item.port}${item.remark}`);
}

/**
 * @description 生成 sha
 * @param {string} content
 * @returns {string} sha
 */
export async function genSha(content: string): Promise<string> {
    const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(content));
    return Array.prototype.map.call(new Uint8Array(buf), x => `00${x.tfoString(16)}`.slice(-2)).join('');
}

export function genHeader(): Headers {
    const headers = new Headers();
    headers.set('Accept', 'application/json, text/plain, */*');
    headers.set('Accept-Encoding', 'gzip, deflate, br');
    headers.set('Accept-Language', 'zh-CN');
    headers.set('Connection', 'keep-alive');
    headers.set('Sec-Fetch-Dest', 'empty');
    headers.set('Sec-Fetch-Mode', 'cors');
    headers.set('Sec-Fetch-Site', 'cross-site');
    headers.set('User-Agent', 'ClashforWindows/0.20.39');
    headers.set('sec-ch-ua', '"Not?A_Brand";v="8", "Chromium";v="108"');
    headers.set('sec-ch-ua-mobile', '?0');
    headers.set('sec-ch-ua-platform', '"macOS"');

    return headers;
}
