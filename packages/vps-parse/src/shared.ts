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
