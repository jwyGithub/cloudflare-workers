import type { ClashType } from '../types';
import { load } from 'js-yaml';

export class ClashClient {
    #clashConfig: ClashType;

    constructor(configs: string[] = []) {
        const clashConfigs = configs.map(config => load(config) as ClashType);
        const mergeConfig = this.#mergeClashConfig(clashConfigs);
        this.#clashConfig = mergeConfig;
    }

    /**
     * @description 合并配置
     * @param {ClashType[]} configs
     * @returns {ClashType} mergedConfig
     */
    #mergeClashConfig(configs: ClashType[] = []): ClashType {
        if (!configs.length) {
            return {} as ClashType;
        }

        // 使用第一个配置作为基准
        const baseConfig = structuredClone(configs[0]);

        // 如果只有一个配置，直接返回
        if (configs.length === 1) {
            return baseConfig;
        }

        const mergedConfig: ClashType = {
            ...baseConfig,
            proxies: baseConfig.proxies || [],
            'proxy-groups': baseConfig['proxy-groups'] || []
        };

        // 预计算总代理数量
        const totalProxies = configs.reduce((total, config) => total + (config.proxies?.length || 0), 0);

        // 使用 TypedArray 和 Set 提高性能
        const proxyIndices = new Int32Array(totalProxies);
        const existingProxies = new Set(baseConfig.proxies?.map(p => p.name));
        let proxyIndex = baseConfig.proxies?.length || 0;

        // 使用 Map 存储代理组
        const groupMap = new Map(mergedConfig['proxy-groups'].map(group => [group.name, group]));

        // 批量处理配置
        for (let i = 1; i < configs.length; i++) {
            const config = configs[i];

            // 批量处理代理
            if (config.proxies?.length) {
                for (const proxy of config.proxies) {
                    if (!existingProxies.has(proxy.name)) {
                        mergedConfig.proxies[proxyIndex] = proxy;
                        proxyIndices[proxyIndex] = proxyIndex;
                        existingProxies.add(proxy.name);
                        proxyIndex++;
                    }
                }
            }

            // 批量处理代理组
            if (config['proxy-groups']?.length) {
                for (const group of config['proxy-groups']) {
                    const existingGroup = groupMap.get(group.name);

                    if (existingGroup) {
                        // 使用 Set 优化代理列表去重
                        const proxySet = new Set(existingGroup.proxies);
                        for (const proxy of group.proxies || []) {
                            proxySet.add(proxy);
                        }
                        existingGroup.proxies = Array.from(proxySet);

                        // 合并其他属性
                        Object.assign(existingGroup, {
                            ...group,
                            proxies: existingGroup.proxies
                        });
                    } else {
                        mergedConfig['proxy-groups'].push(group);
                        groupMap.set(group.name, group);
                    }
                }
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
