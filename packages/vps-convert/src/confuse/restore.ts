import type { SS } from '../parse/ss';
import type { Trojan } from '../parse/trojan';
import type { Vless } from '../parse/vless';
import type { Vmess } from '../parse/vmess';
import type { Clash } from '../types/Clash';
import { load } from 'js-yaml';
import { PsUtil } from '../shared';

function restoreProxies(
    proxies: Array<Record<string, string>>,
    vpsMap: Map<string, Vless | Vmess | Trojan | SS>
): Array<Record<string, string>> {
    try {
        const result: Array<Record<string, string>> = [];
        for (const proxy of proxies) {
            const [originPs, confusePs] = PsUtil.getPs(proxy.name);
            if (vpsMap.has(confusePs)) {
                const vps = vpsMap.get(confusePs);
                vps?.restore(proxy, originPs);
                result.push(proxy);
            }
        }

        return result;
    } catch (error: any) {
        throw new Error(`Restore proxies failed: ${error.message || error}, function trace: ${error.stack}`);
    }
}

function updateProxiesGroups(proxies: string[]): string[] {
    try {
        return proxies.map(proxy => {
            const [originPs] = PsUtil.getPs(proxy);
            return originPs;
        });
    } catch (error: any) {
        throw new Error(`Update proxies groups failed: ${error.message || error}, function trace: ${error.stack}`);
    }
}

export function getOriginConfig(config: string, vpsMap: Map<string, Vless | Vmess | Trojan | SS>): Clash {
    try {
        const confuseConfig = load(config) as Clash;

        confuseConfig.proxies = restoreProxies(confuseConfig.proxies, vpsMap);
        confuseConfig['proxy-groups'] = confuseConfig['proxy-groups'].map(group => {
            if (group.proxies) {
                group.proxies = updateProxiesGroups(group.proxies);
            }
            return group;
        });

        return confuseConfig;
    } catch (error: any) {
        throw new Error(`Get origin config failed: ${error.message || error}, function trace: ${error.stack}`);
    }
}
