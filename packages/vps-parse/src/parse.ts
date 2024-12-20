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
