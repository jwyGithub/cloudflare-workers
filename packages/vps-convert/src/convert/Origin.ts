import type { SS, Trojan, Vless, Vmess } from '../parser';
import type { ClashType, SingboxOutboundType, SingboxType, VpsMap } from '../types';
import { PsUtil } from '../shared';

export class OriginClash {
    /**
     * @description 获取原始配置
     * @param {ClashType} confuseConfig
     * @param {VpsMap} vpsMap
     * @returns {ClashType} originConfig
     */
    getOriginConfig(confuseConfig: ClashType, vpsMap: VpsMap): ClashType {
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
                    vps?.restoreClash(proxy, originPs);
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

class OriginSingbox {
    /**
     * @description 获取原始配置
     * @param {SingboxType} confuseConfig
     * @param {VpsMap} vpsMap
     * @returns {SingboxType} originConfig
     */
    getOriginConfig(confuseConfig: SingboxType, vpsMap: VpsMap): SingboxType {
        try {
            confuseConfig.outbounds = this.#restoreOutbounds(confuseConfig.outbounds, vpsMap);
            return confuseConfig;
        } catch (error: any) {
            throw new Error(`Get origin config failed: ${error.message || error}, function trace: ${error.stack}`);
        }
    }

    #restoreOutbounds(outbounds: SingboxType['outbounds'] = [], vpsMap: VpsMap): SingboxType['outbounds'] {
        try {
            const result: SingboxType['outbounds'] = [];
            for (const outbound of outbounds) {
                if (this.#isConfuseVps(outbound.tag)) {
                    const [originPs, confusePs] = PsUtil.getPs(outbound.tag);
                    const vps = vpsMap.get(confusePs);
                    vps?.restoreSingbox(outbound, originPs);
                }

                if (Reflect.has(outbound, 'outbounds')) {
                    outbound.outbounds = this.#updateOutbouns(outbound.outbounds);
                }
                result.push(outbound);
            }

            return result;
        } catch (error: any) {
            throw new Error(`Restore outbounds failed: ${error.message || error}, function trace: ${error.stack}`);
        }
    }

    #updateOutbouns(outbounds: string[] | undefined = []): string[] {
        try {
            return outbounds.map(outbound => {
                if (this.#isConfuseVps(outbound)) {
                    const [originPs] = PsUtil.getPs(outbound);
                    return originPs;
                }
                return outbound;
            });
        } catch (error: any) {
            throw new Error(`Update outbounds failed: ${error.message || error}, function trace: ${error.stack}`);
        }
    }

    #isConfuseVps(tag: SingboxOutboundType['tag']): boolean {
        return PsUtil.isConfigType(tag);
    }
}

export const originClash = new OriginClash();
export const originSingbox = new OriginSingbox();
