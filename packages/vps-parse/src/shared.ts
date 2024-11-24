import { base64Decode, base64Encode } from '@jiangweiye/cloudflare-shared';
import { parseTrojanLink, parseVlessLink, parseVmessLink } from './parse';

export function getTime(): string {
    return new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}

export function tryBase64Decode(s: string): string {
    try {
        return base64Decode(s);
    } catch {
        return s;
    }
}

export function tryBase64Encode(s: string): string {
    try {
        return base64Encode(s);
    } catch {
        return s;
    }
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

export function getVmess(links: string[]): string[] {
    const vmessLinks: Array<{ host: string; port: number; remark: string }> = [];
    for (const link of links) {
        const { host, port, remark } = parseVmessLink(link.replace('vmess://', ''));
        if (!host.startsWith('127') && !/^[a-z]/i.test(host) && !hasHost(host, vmessLinks)) {
            vmessLinks.push({ host, port, remark });
        }
    }
    return vmessLinks.map(item => `${item.host}:${item.port}${item.remark}`);
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
    headers.set('sec-ch-ua', '"Not?A_Brand";v="8", "Chromium";v="108"');
    headers.set('sec-ch-ua-mobile', '?0');
    headers.set('sec-ch-ua-platform', '"macOS"');
    headers.set('host', 'raw.githubusercontent.com');

    return headers;
}

export function getClashConfig(subs: string, config: string): Record<string, string> {
    return {
        target: 'clash',
        new_name: 'true',
        url: subs.split(',').join('|'),
        insert: 'false',
        config: encodeURIComponent(config),
        emoji: 'true',
        list: 'false',
        tfo: 'false',
        scv: 'false',
        fdn: 'false',
        sort: 'false'
    };
}

export function getConvertUrl(config: ReturnType<typeof getClashConfig>): string {
    const url = new URL('https://sub.looby.us.kg/sub');
    for (const [key, value] of Object.entries(config)) {
        url.searchParams.set(key, value);
    }
    return url.toString();
}
