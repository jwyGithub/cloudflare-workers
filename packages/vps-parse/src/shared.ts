import { parseTrojanLink, parseVlessLink, parseVmessLink } from './parse';

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

export function getClashConfig(subs: string, config?: string): Record<string, string> {
    return {
        target: 'clash',
        new_name: 'true',
        url: subs.split(',').join('|'),
        insert: 'false',
        config: config ?? 'https://main.08050611.xyz/appStatic/clashConfig/ACL4SSR_Online_Full.ini',
        emoji: 'true',
        list: 'false',
        tfo: 'false',
        scv: 'false',
        fdn: 'false',
        sort: 'false'
    };
}

export function getConvertUrl(config: ReturnType<typeof getClashConfig>, env: Env): string {
    const _url = env.SUB_CONVERT ?? 'https://sub.looby.us.kg/sub';
    const url = new URL(_url);
    for (const [key, value] of Object.entries(config)) {
        url.searchParams.set(key, value);
    }
    return url.toString();
}

export function sleep(ms: number = 1000): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
