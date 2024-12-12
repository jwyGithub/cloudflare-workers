import type { VpsMap } from '../types';
import { fetchWithRetry } from '@jiangweiye/worker-fetch';
import { base64Encode, tryUrlDecode } from '@jiangweiye/worker-shared';
import { getSubType, processBase64 } from '../shared';
import { SS } from './ss';
import { Trojan } from './trojan';
import { Vless } from './vless';
import { Vmess } from './vmess';

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

            if (v.startsWith('https://')) {
                const subContent = await fetchWithRetry(tryUrlDecode(v), { retries: 3 }).then(r => r.data.text());
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

/**
 * @description 解析订阅并返回一个base64编码的字符串
 * @param {Request['url']} url 请求的url
 * @returns {Promise<string>} base64编码的字符串
 */
export async function parseContent(url: Request['url']): Promise<{
    base64: string;
    vpsMap: VpsMap;
}> {
    // http://localhost:8787/getSub?links=https://trojan.nicoo.us.kg/vps-trojan?base64
    const { searchParams } = new URL(url);
    const vpsUrl = searchParams.get('links');

    const vps = vpsUrl!.split(/\||\n/).filter(Boolean);

    const { urls, vpsMap } = await getConfig(vps);

    return {
        base64: base64Encode(Array.from(urls).join('\n')),
        vpsMap
    };
}
