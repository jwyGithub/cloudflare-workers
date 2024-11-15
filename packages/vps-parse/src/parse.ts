export interface VlessLink {
    type: 'vless';
    host: string;
    port: number;
    id: string;
    remark: string;
}

export function parseVlessLink(link: string): VlessLink {
    const url = new URL(link);
    const vlessLink: VlessLink = {
        type: 'vless',
        host: url.hostname,
        port: Number.parseInt(url.port),
        id: url.username,
        remark: url.hash
    };
    return vlessLink;
}
