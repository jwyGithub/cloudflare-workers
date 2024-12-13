import type { VpsMap } from '../types';
import type { Clash } from '../types/Clash';
import { fetchWithRetry } from '@jiangweiye/worker-fetch';
import { ClashClient, mergeClashConfig } from '../client/Clash';
import { SS } from '../parser/ss';
import { Trojan } from '../parser/trojan';
import { Vless } from '../parser/vless';
import { Vmess } from '../parser/vmess';
import { getSubType, getUrlGroup, processBase64, processClashVPSName } from '../shared';

async function getConfig(vps: string[]): Promise<{ urls: Set<string>; vpsMap: VpsMap }> {
    const urls = new Set<string>();
    const vpsMap = new Map<string, Vless | Vmess | Trojan | SS>();

    async function _parse(vps: string[]): Promise<void> {
        for await (const v of vps) {
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

            if (v.startsWith('https://') || v.startsWith('http://')) {
                const subContent = await fetchWithRetry(v, { retries: 3 }).then(r => r.data.text());
                const subType = getSubType(subContent);
                if (subType === 'base64') {
                    await _parse(processBase64(subContent));
                }
            }
        }
    }
    await _parse(vps);

    return { urls, vpsMap };
}

export async function getConfuseUrl(
    url: Request['url'],
    backend: string,
    chunkCount: string
): Promise<{
    confuseUrls: string[];
    vpsMap: VpsMap;
}> {
    const { searchParams } = new URL(url);
    const vpsUrl = searchParams.get('url');

    const vps = vpsUrl!.split(/\||\n/).filter(Boolean);
    const { urls, vpsMap } = await getConfig(vps);

    const urlGroups = getUrlGroup(Array.from(urls), Number(chunkCount));

    const confuseUrls = urlGroups.map(urlGroup => {
        const confuseUrl = new URL(`${backend}/sub`);
        const { searchParams } = new URL(url);
        searchParams.set('url', urlGroup);
        confuseUrl.search = searchParams.toString();
        return confuseUrl.toString();
    });

    return {
        confuseUrls,
        vpsMap
    };
}

export async function getConfuseConfig(urls: string[]): Promise<Clash> {
    try {
        const result = await Promise.all(urls.map(url => fetchWithRetry(url, { retries: 1 }).then(r => r.data.text())));

        const clashConfig = mergeClashConfig(result.map(config => new ClashClient(config)));

        const [proxies, proxyGroups] = processClashVPSName(clashConfig.proxies, clashConfig['proxy-groups']);
        clashConfig.proxies = proxies;
        clashConfig['proxy-groups'] = proxyGroups;

        return clashConfig;
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
