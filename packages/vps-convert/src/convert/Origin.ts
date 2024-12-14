import type { SS, Trojan, Vless, Vmess } from '../parser';
import type { Clash, VpsMap } from '../types';
import { PsUtil } from '../shared';

export class OriginClash {
    /**
     * @description 获取原始配置
     * @param {Clash} confuseConfig
     * @param {VpsMap} vpsMap
     * @returns {Clash} originConfig
     */
    getOriginConfig(confuseConfig: Clash, vpsMap: VpsMap): Clash {
        try {
            confuseConfig.proxies = this.#restoreProxies(confuseConfig.proxies, vpsMap);
            confuseConfig['proxy-groups'] = confuseConfig['proxy-groups'].map(group => {
                if (group.proxies) {
                    group.proxies = this.#updateProxiesGroups(group.proxies);
                }
                return group;
            });

            return confuseConfig;
        } catch (error: any) {
            throw new Error(`Get origin config failed: ${error.message || error}, function trace: ${error.stack}`);
        }
    }

    #restoreProxies(
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

    #updateProxiesGroups(proxies: string[]): string[] {
        try {
            return proxies.map(proxy => {
                const [originPs] = PsUtil.getPs(proxy);
                return originPs;
            });
        } catch (error: any) {
            throw new Error(`Update proxies groups failed: ${error.message || error}, function trace: ${error.stack}`);
        }
    }
}

class OriginSingbox {}

export const originClash = new OriginClash();
export const originSingbox = new OriginSingbox();
