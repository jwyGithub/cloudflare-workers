import type { Clash } from '../types/Clash';
import { load } from 'js-yaml';
import { groupByName } from '../shared';

export function mergeClashConfig(clashConfigs: ClashClient[]): Clash {
    let baseConfig: Clash = { proxies: [], 'proxy-groups': [] };
    const result = clashConfigs.reduce<{ proxies: any[]; 'proxy-groups': any[] }>(
        (acc, cur) => {
            const { proxies, proxyGroups, config } = cur;
            acc.proxies.push(...proxies);
            acc['proxy-groups'].push(...proxyGroups);
            baseConfig = config;
            return acc;
        },
        { proxies: [], 'proxy-groups': [] }
    );

    baseConfig.proxies = result.proxies;
    baseConfig['proxy-groups'] = groupByName(result['proxy-groups']);

    return baseConfig;
}

export class ClashClient {
    #config: Clash;
    #proxies: Clash['proxies'] = [];
    #proxyGroups: Clash['proxy-groups'] = [];

    constructor(config: string) {
        this.#config = load(config) as Clash;
        this.#proxies = this.#config.proxies;
        this.#proxyGroups = this.#config['proxy-groups'];
    }

    get config(): Clash {
        return this.#config;
    }

    get proxies(): Clash['proxies'] {
        return this.#proxies;
    }

    get proxyGroups(): Clash['proxy-groups'] {
        return this.#proxyGroups;
    }
}
