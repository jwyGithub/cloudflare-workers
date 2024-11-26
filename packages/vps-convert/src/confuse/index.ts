import { SS } from '../parse/ss';
import { Trojan } from '../parse/trojan';
import { Vless } from '../parse/vless';
import { Vmess } from '../parse/vmess';

export function getConfuseUrl(
    url: Request['url'],
    backend: string
): {
    confuseUrl: string;
    vpsMap: Map<string, Vless | Vmess | Trojan | SS>;
} {
    const { searchParams } = new URL(url);
    const vpsUrl = searchParams.get('url');

    const vps = vpsUrl!.split(/\||\n/).filter(Boolean);

    const urls = new Set();

    const vpsMap = new Map<string, Vless | Vmess | Trojan | SS>();

    for (const v of vps) {
        if (v.startsWith('vless:')) {
            const vless = new Vless(v);
            urls.add(vless.confuseLink);
            vpsMap.set(vless.confusePs, vless);
        }

        if (v.startsWith('vmess:')) {
            const vmess = new Vmess(v);
            urls.add(vmess.confuseLink);
            vpsMap.set(vmess.confusePs, vmess);
        }

        if (v.startsWith('trojan://')) {
            const trojan = new Trojan(v);
            urls.add(trojan.confuseLink);
            vpsMap.set(trojan.confusePs, trojan);
        }

        if (v.startsWith('ss://')) {
            const ss = new SS(v);
            urls.add(ss.confuseLink);
            vpsMap.set(ss.confusePs, ss);
        }
    }

    searchParams.set('url', Array.from(urls).join('|'));

    const confuseUrl = new URL(`${backend}/sub`);
    confuseUrl.search = searchParams.toString();

    return {
        confuseUrl: confuseUrl.toString(),
        vpsMap
    };
}
