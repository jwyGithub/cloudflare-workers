import { tryBase64Decode, tryUrlDecode } from 'cloudflare-tools';

export interface VlessLink {
    type: 'vless';
    host: string;
    port: number;
    id: string;
    remark: string;
}

export interface TrojanLink {
    type: 'trojan';
    host: string;
    port: number;
    id: string;
    remark: string;
}

export interface VmessLink {
    type: 'vmess';
    host: string;
    port: number;
    id: string;
    remark: string;
}

export interface SSLink {
    type: 'ss';
    host: string;
    port: number;
    id: string;
    remark: string;
}

export interface SSRLink {
    type: 'ssr';
    host: string;
    port: number;
    id: string;
    remark: string;
}

export interface Vmess {
    v: string;
    ps: string;
    add: string;
    port: string;
    id: string;
    aid: string;
    scy: string;
    net: string;
    type: string;
    host: string;
    path: string;
    tls: string;
    sni: string;
    alpn: string;
    fp: string;
}

export function parseVlessLink(url: URL, link: string): VlessLink {
    try {
        const vlessLink: VlessLink = {
            type: 'vless',
            host: url.hostname,
            port: Number.parseInt(url.port),
            id: url.username,
            remark: tryUrlDecode(url.hash)
        };
        return vlessLink;
    } catch (error: any) {
        throw new Error(`error on parseVlessLink: ${error.message || error} -> ${link}`);
    }
}

export function parseTrojanLink(url: URL, link: string): TrojanLink {
    try {
        const trojanLink: TrojanLink = {
            type: 'trojan',
            host: url.hostname,
            port: Number.parseInt(url.port),
            id: url.username,
            remark: tryUrlDecode(url.hash)
        };
        return trojanLink;
    } catch (error: any) {
        throw new Error(`error on parseTrojanLink: ${error.message || error} -> ${link}`);
    }
}

export function parseVmessLink(link: string): VmessLink {
    try {
        const content: Vmess = JSON.parse(tryBase64Decode(link));
        return {
            type: 'vmess',
            host: content.add,
            port: Number.parseInt(content.port),
            id: content.id,
            remark: tryUrlDecode(content.ps)
        };
    } catch (error: any) {
        throw new Error(`error on parseVmessLink: ${error.message || error} -> ${link}`);
    }
}

export function parseSSLink(url: URL, link: string): SSLink {
    try {
        const ssLink: SSLink = {
            type: 'ss',
            host: url.hostname,
            port: Number.parseInt(url.port),
            id: url.username,
            remark: tryUrlDecode(url.hash)
        };
        return ssLink;
    } catch (error: any) {
        throw new Error(`error on parseSSLink: ${error.message || error} -> ${link}`);
    }
}

const ip_port_reg = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{1,5})/;
const remarks = /remarks=([^&]+)/;

export function parseSSRLink(link: string): SSRLink {
    const content = tryBase64Decode(link);
    const match = content.match(ip_port_reg);
    if (!match) {
        throw new Error(`error on parseSSRLink: ${link}`);
    }
    const [_, host, port] = match;
    const [__, base64] = content.match(remarks) || [];
    try {
        const ssrLink: SSRLink = {
            type: 'ssr',
            host,
            port: Number.parseInt(port),
            id: crypto.randomUUID(),
            remark: tryBase64Decode(base64).replace('|', '-')
        };
        return ssrLink;
    } catch (error: any) {
        throw new Error(`error on parseSSLink: ${error.message || error} -> ${link}`);
    }
}
