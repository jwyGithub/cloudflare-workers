import { parseVlessLink } from './parse';

export function getVless(links: string): string[] {
    const _links = links.split('\n');
    const vlessLinks: string[] = [];
    for (const link of _links) {
        if (link.startsWith('vless:')) {
            const { host, port, remark } = parseVlessLink(link);
            if (!host.startsWith('127') && !/^[a-z]/i.test(host)) {
                vlessLinks.push(`${host}:${port}${remark}`);
            }
        }
    }
    return vlessLinks;
}
