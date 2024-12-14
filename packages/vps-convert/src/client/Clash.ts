import type { ClashType } from '../types';
import { load } from 'js-yaml';
import { PsUtil } from '../shared';

export class ClashClient {
    #clashConfig: ClashType;

    constructor(configs: string[] = []) {
        const clashConfigs = configs.map(config => load(config) as ClashType);
        this.#clashConfig = clashConfigs.at(-1)!;
        const mergeConfig = this.#mergeClashConfig(clashConfigs);
        this.#clashConfig.proxies = mergeConfig.proxies;
        this.#clashConfig['proxy-groups'] = mergeConfig['proxy-groups'];
    }

    /**
     * @description 合并配置
     * @param {ClashType[]} configs
     * @returns {ClashType} mergedConfig
     */
    #mergeClashConfig(configs: ClashType[] = []): ClashType {
        const mergedConfig: ClashType = {
            proxies: [],
            'proxy-groups': []
        };

        const nameCountMap = Object.create(null);
        const nameMapping = Object.create(null);

        // 预计算总代理数量
        const totalProxies = configs.reduce((total, config) => total + config.proxies.length, 0);

        // 使用TypedArray提高性能
        const proxyIndices = new Int32Array(totalProxies);
        let proxyIndex = 0;

        // 批量处理配置
        for (const config of configs) {
            const proxies = config.proxies;
            const proxyGroups = config['proxy-groups'];

            // 批量处理代理
            for (let i = 0; i < proxies.length; i++) {
                const proxy = proxies[i];
                const [prefix, uuid] = PsUtil.getPs(proxy.name);

                if (nameMapping[proxy.name]) {
                    proxyIndices[proxyIndex++] = -1;
                    continue;
                }

                const count = nameCountMap[prefix] || 0;
                nameCountMap[prefix] = count + 1;

                const newName = count === 0 ? proxy.name : PsUtil.setPs(`${prefix} ${count + 1}`, uuid);

                nameMapping[proxy.name] = newName;

                const newProxy = {
                    ...proxy,
                    name: newName
                };

                mergedConfig.proxies[proxyIndex] = newProxy;
                proxyIndices[proxyIndex] = proxyIndex;
                proxyIndex++;
            }

            if (!proxyGroups) continue;

            // 使用 Set 优化代理组去重
            const processedGroups = new Set();

            for (const group of proxyGroups) {
                if (processedGroups.has(group.name)) continue;

                const existingGroup = mergedConfig['proxy-groups'].find(g => g.name === group.name);

                group.proxies = group.proxies || [];
                if (existingGroup) {
                    const proxySet = new Set(existingGroup.proxies);
                    for (const p of group.proxies) {
                        proxySet.add(nameMapping[p] || p);
                    }
                    existingGroup.proxies = Array.from(proxySet);
                } else {
                    const newGroup = {
                        ...group,
                        proxies: group.proxies.map(p => nameMapping[p] || p)
                    };
                    mergedConfig['proxy-groups'].push(newGroup);
                }

                processedGroups.add(group.name);
            }
        }

        // 清理无效代理
        mergedConfig.proxies = mergedConfig.proxies.filter((_, i) => proxyIndices[i] !== -1);

        return mergedConfig;
    }

    get clashConfig(): ClashType {
        return this.#clashConfig;
    }
}
