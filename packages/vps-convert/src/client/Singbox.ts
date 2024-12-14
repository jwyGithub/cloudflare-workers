import type { SingboxOutboundType, SingboxType } from '../types';
import { PsUtil } from '../shared';

export class Singbox {
    #singboxConfig: SingboxType = {};

    constructor(configs: SingboxType[] = []) {
        this.#singboxConfig = configs.at(-1)!;
        const mergeConfig = this.#mergeConfig(configs);
        this.#singboxConfig.outbounds = mergeConfig.outbounds;
    }

    #mergeConfig(configs: SingboxType[]): SingboxType {
        const nameMapping = Object.create(null);
        const prefixCount = Object.create(null);
        const prefixTagCount = Object.create(null);
        const uuidMap = Object.create(null);
        const mergedOutbounds: SingboxOutboundType[] = [];
        const processedBasicConfigs = new Set(); // 用于跟踪基础配置的唯一性

        // 存储所有带outbounds的配置
        const outboundConfigs = new Map<string, { base: SingboxOutboundType; baseOutbounds: Set<string>; linkOutbounds: Set<string> }>(); // key: type+tag, value: {base, allOutbounds}

        // 第一次遍历：统计前缀和收集UUID映射
        for (const config of configs) {
            if (!config.outbounds?.length) continue;

            for (const outbound of config.outbounds) {
                // 收集所有符合LINK_TO规则的tag
                if (PsUtil.isConfigType(outbound.tag)) {
                    const [prefix, uuid] = PsUtil.getPs(outbound.tag);
                    if (prefix) {
                        prefixTagCount[prefix.trim()] = (prefixTagCount[prefix.trim()] || 0) + 1;
                        uuidMap[uuid] = outbound.tag;
                    }
                }

                // 收集带outbounds的配置
                if (outbound.outbounds) {
                    const key = `${outbound.type}:${outbound.tag}`;
                    if (!outboundConfigs.has(key)) {
                        // 收集基础outbounds（不符合LINK_TO规则的）
                        const baseOutbounds = new Set(outbound.outbounds.filter(name => !PsUtil.isConfigType(name)));
                        outboundConfigs.set(key, {
                            base: outbound,
                            baseOutbounds,
                            linkOutbounds: new Set() // 存储符合LINK_TO规则的outbounds
                        });
                    }
                    // 收集所有符合LINK_TO规则的outbounds
                    outbound.outbounds.forEach(name => {
                        if (PsUtil.isConfigType(name)) {
                            outboundConfigs.get(key)?.linkOutbounds.add(name);
                        }
                    });
                }
            }
        }

        // 处理重命名
        function getNewNameByUUID(oldName: string): string {
            if (!PsUtil.isConfigType(oldName)) return oldName;
            const [prefix, uuid] = PsUtil.getPs(oldName);
            if (!prefix || !prefixTagCount[prefix.trim()] || prefixTagCount[prefix.trim()] <= 1) {
                return oldName;
            }
            if (nameMapping[oldName]) return nameMapping[oldName];

            const count = (prefixCount[prefix.trim()] || 0) + 1;
            prefixCount[prefix.trim()] = count;
            const newName = PsUtil.setPs(`${prefix.trim()} ${count}`, uuid);
            nameMapping[oldName] = newName;
            return newName;
        }

        // 处理基础配置和对象二
        for (const config of configs) {
            if (!config.outbounds?.length) continue;

            for (const outbound of config.outbounds) {
                // 跳过带outbounds的配置
                if (outbound.outbounds) continue;

                if (PsUtil.isConfigType(outbound.tag)) {
                    // 处理符合LINK_TO规则的配置
                    const newOutbound = { ...outbound };
                    newOutbound.tag = getNewNameByUUID(outbound.tag);
                    mergedOutbounds.push(newOutbound);
                } else {
                    // 处理基础配置，确保唯一性
                    const key = `${outbound.type}:${outbound.tag}`;
                    if (!processedBasicConfigs.has(key)) {
                        processedBasicConfigs.add(key);
                        mergedOutbounds.push(outbound);
                    }
                }
            }
        }

        // 处理对象一：带outbounds的配置
        for (const [_, data] of outboundConfigs) {
            const newOutbound = { ...data.base };

            // 合并outbounds
            const allOutbounds = new Set([
                // 基础outbounds
                ...data.baseOutbounds,
                // 更新后的LINK_TO outbounds
                ...Array.from(data.linkOutbounds).map(name => {
                    const [, uuid] = PsUtil.getPs(name);
                    const originalName = uuidMap[uuid];
                    return nameMapping[originalName] || originalName;
                })
            ]);

            newOutbound.outbounds = Array.from(allOutbounds);
            mergedOutbounds.push(newOutbound);
        }

        return { outbounds: mergedOutbounds };
    }

    get singboxConfig(): SingboxType {
        return this.#singboxConfig;
    }
}
