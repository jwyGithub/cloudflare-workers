import type { VpsMap } from '../types';
import { fetchWithRetry } from '@jiangweiye/worker-fetch';
import { Convert } from '../convert';
import { getSubType, processVps } from '../shared';
import { SS } from './ss';
import { Trojan } from './trojan';
import { Vless } from './vless';
import { Vmess } from './vmess';

export * from './ss';
export * from './trojan';
export * from './vless';
export * from './vmess';

/**
 * @description 解析vps
 * @param {string[]} vps
 * @returns {Promise<{ urls: Set<string>; vpsMap: VpsMap }>} { urls, vpsMap }
 */
export async function parseVps(vps: string[]): Promise<{ urls: Set<string>; vpsMap: VpsMap }> {
    const urls = new Set<string>();
    const vpsMap = new Map<string, Vless | Vmess | Trojan | SS>();
    const originUrls = new Set<string>();

    async function _parse(vps: string[]): Promise<void> {
        for await (const v of vps) {
            if (v.startsWith('vless:')) {
                const vless = new Vless(v);
                urls.add(vless.confuseLink);
                originUrls.add(v);
                vpsMap.set(vless.confusePs, vless);
            }
            if (v.startsWith('vmess:')) {
                const vmess = new Vmess(v);
                urls.add(vmess.confuseLink);
                originUrls.add(v);
                vpsMap.set(vmess.confusePs, vmess);
            }
            if (v.startsWith('trojan://')) {
                const trojan = new Trojan(v);
                urls.add(trojan.confuseLink);
                originUrls.add(v);
                vpsMap.set(trojan.confusePs, trojan);
            }
            if (v.startsWith('ss://')) {
                const ss = new SS(v);
                urls.add(ss.confuseLink);
                originUrls.add(v);
                vpsMap.set(ss.confusePs, ss);
            }

            if (v.startsWith('https://') || v.startsWith('http://')) {
                const subContent = await fetchWithRetry(v, { retries: 3 }).then(r => r.data.text());
                const subType = getSubType(subContent);
                if (subType === 'base64') {
                    await _parse(processVps([...Array.from(originUrls), ...Convert.base64(subContent)]));
                }
            }
        }
    }
    await _parse(vps);

    return { urls, vpsMap };
}
