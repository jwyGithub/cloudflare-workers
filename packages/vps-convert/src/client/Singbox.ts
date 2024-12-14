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
        const nameMapping = new Map();
        const prefixCount = new Map();
        const prefixTagCount = new Map();
        const mergedOutbounds: SingboxOutboundType[] = [];

        // 第一次遍历：统计前缀
        for (const config of configs) {
            if (!config.outbounds?.length) continue;

            for (const outbound of config.outbounds) {
                const prefix = PsUtil.getPrefix(outbound.tag ?? '');
                if (prefix) {
                    prefixTagCount.set(prefix, (prefixTagCount.get(prefix) || 0) + 1);
                }
            }
        }

        // 处理单个outbound
        const processOutbound = (outbound: SingboxOutboundType): SingboxOutboundType => {
            if (outbound.type === 'selector') {
                const prefix = PsUtil.getPrefix(outbound.tag);
                if (prefix && prefixTagCount.get(prefix) > 1) {
                    outbound.tag = this.#getNewName(outbound.tag, prefixCount, nameMapping);
                }

                if (outbound.outbounds?.length) {
                    outbound.outbounds = outbound.outbounds.map(name => {
                        const prefix = PsUtil.getPrefix(name);
                        return prefix && prefixTagCount.get(prefix) > 1 ? nameMapping.get(name) || name : name;
                    });
                }
            } else {
                const prefix = PsUtil.getPrefix(outbound.tag);
                if (prefix && prefixTagCount.get(prefix) > 1) {
                    outbound.tag = this.#getNewName(outbound.tag, prefixCount, nameMapping);
                }
            }
            return outbound;
        };

        // 第二次遍历：处理outbounds
        for (const config of configs) {
            if (!config.outbounds?.length) continue;

            const processedOutbounds = config.outbounds.map(processOutbound);
            mergedOutbounds.push(...processedOutbounds);
        }

        return { outbounds: mergedOutbounds };
    }

    #getNewName(name: string, prefixCount: Map<string, any>, nameMapping: Map<string, any>): string {
        if (nameMapping.has(name)) {
            return nameMapping.get(name);
        }

        try {
            const [prefix, confuse] = PsUtil.getPs(name);
            if (prefix && confuse) {
                const count = (prefixCount.get(prefix.trim()) || 0) + 1;
                prefixCount.set(prefix.trim(), count);

                const newName = PsUtil.setPs(`${prefix.trim()} ${count}`, confuse);
                nameMapping.set(name, newName);
                return newName;
            }
        } catch (e) {
            console.warn(`Failed to parse name: ${name}`, e);
        }

        nameMapping.set(name, name);
        return name;
    }

    get singboxConfig(): SingboxType {
        return this.#singboxConfig;
    }
}
