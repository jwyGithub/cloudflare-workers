import type { SingboxOutboundType, SingboxType } from '../types';
import { PsUtil } from '../shared/ps';

export class Singbox {
    #singboxConfig: SingboxType = {};

    constructor(configs: SingboxType[] = []) {
        const mergeConfig = this.#mergeConfig(configs);
        this.#singboxConfig = mergeConfig;
    }

    #mergeConfig(configs: SingboxType[]): SingboxType {
        if (configs.length === 0) {
            return {};
        }

        const baseConfig = structuredClone(configs[0]);
        const mergedOutbounds: SingboxOutboundType[] = [];
        const processedBasicConfigs = new Set();
        const outboundConfigs = new Map<
            string,
            {
                base: any;
                baseOutbounds: Set<string>;
                linkOutbounds: Set<string>;
            }
        >();

        // 第一次遍历：收集所有配置
        for (const config of configs) {
            if (!config.outbounds?.length) continue;

            for (const outbound of config.outbounds) {
                if (outbound.outbounds) {
                    const key = `${outbound.type}:${outbound.tag}`;
                    if (!outboundConfigs.has(key)) {
                        const baseOutbounds = new Set(outbound.outbounds.filter(name => !PsUtil.isConfigType(name)));
                        outboundConfigs.set(key, {
                            base: outbound,
                            baseOutbounds,
                            linkOutbounds: new Set()
                        });
                    }
                    outbound.outbounds.forEach(name => {
                        if (PsUtil.isConfigType(name)) {
                            outboundConfigs.get(key)?.linkOutbounds.add(name);
                        }
                    });
                }
            }
        }

        // 处理基础配置和普通节点
        for (const config of configs) {
            if (!config.outbounds?.length) continue;

            for (const outbound of config.outbounds) {
                if (outbound.outbounds) continue;

                if (PsUtil.isConfigType(outbound.tag)) {
                    mergedOutbounds.push(outbound);
                } else {
                    const key = `${outbound.type}:${outbound.tag}`;
                    if (!processedBasicConfigs.has(key)) {
                        processedBasicConfigs.add(key);
                        mergedOutbounds.push(outbound);
                    }
                }
            }
        }

        // 处理带outbounds的配置
        for (const [_, data] of outboundConfigs) {
            const newOutbound = { ...data.base };
            const allOutbounds = new Set([...data.baseOutbounds, ...data.linkOutbounds]);
            newOutbound.outbounds = Array.from(allOutbounds);
            mergedOutbounds.push(newOutbound);
        }

        baseConfig.outbounds = mergedOutbounds;
        return baseConfig;
    }

    get singboxConfig(): SingboxType {
        return this.#singboxConfig;
    }
}
