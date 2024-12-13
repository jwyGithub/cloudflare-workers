import type { Clash } from '../types/Clash';
import type { SubType } from '../types/Sub';
import { base64Decode } from '@jiangweiye/worker-shared';
import { load } from 'js-yaml';

export class Confuse {
    readonly #hostnames = ['localhost', '127.0.0.1', 'abc.cba.com'];
    readonly #encryptionProtocol = ['AES_256_GCM', 'CHACHA20_POLY1305', 'AES_128_GCM', 'CHACHA20_IETF'];
    readonly #minPort = 1024;
    readonly #maxPort = 65535;

    /**
     * @description 获取随机hostname
     * @returns {string} hostname
     */
    protected getHostName(): string {
        return this.#hostnames[Math.floor(Math.random() * this.#hostnames.length)];
    }

    /**
     * @description 获取随机端口
     * @returns {string} port
     */
    protected getPort(): string {
        return Math.floor(Math.random() * (this.#maxPort - this.#minPort + 1) + this.#minPort).toString();
    }

    /**
     * @description 获取随机password
     * @returns {string} crypto.UUID
     */
    protected getPassword(): string {
        return crypto.randomUUID();
    }

    /**
     * @description 获取随机uuid
     * @returns {crypto.UUID} crypto.UUID
     */
    protected getUUID(): string {
        return crypto.randomUUID();
    }

    /**
     * @description 获取随机 SS协议的加密类型
     */
    protected getEncrtptionProtocol(): string {
        return this.#encryptionProtocol[Math.floor(Math.random() * this.#encryptionProtocol.length)];
    }
}

export class Store<T> extends Confuse {
    /** * @description vps原始配置 */
    #originConfig: Partial<T> = {};

    /** * @description 混淆配置 */
    #confuseConfig: Partial<T> = {};

    /** * @description 原始备注 */
    #originPs: string = '';

    /** * @description 混淆备注 */
    #confusePs: string = '';

    constructor() {
        super();
        this.#confusePs = this.getUUID();
    }

    /**
     * @description 设置原始配置
     * @param {Partial<T>} config
     */
    protected setConfuseConfig(config: Partial<T>): void {
        this.#confuseConfig = config;
    }

    /**
     * @description 设置混淆配置
     * @param {Partial<T>} config
     * @param {string} ps
     */
    protected setOriginConfig(config: Partial<T>, ps: string): void {
        this.#originConfig = config;
        this.#originPs = decodeURIComponent(ps);
    }

    /**
     * @description 原始备注
     * @example '#originPs'
     */
    get originPs(): string {
        return this.#originPs;
    }

    /**
     * @description 原始配置
     */
    get originConfig(): Partial<T> {
        return this.#originConfig;
    }

    /**
     * @description 混淆备注
     * @example 'confusePs'
     */
    get confusePs(): string {
        return this.#confusePs;
    }

    /**
     * @description 混淆配置
     */
    get confuseConfig(): Partial<T> {
        return this.#confuseConfig;
    }
}

export class PsUtil {
    static #LINK_KEY = '^LINK_TO^';

    /**
     * @description 获取备注
     * @param {string} name
     * @returns {[string, string]} [origin, confuse]
     */
    public static getPs(name: string): [string, string] {
        const names = name.split(PsUtil.#LINK_KEY);
        return [names[0], names[1]];
    }

    /**
     * @description 设置备注
     * @param {string} name 原始备注
     * @param {string} ps 混淆备注
     * @returns {string} origin^LINK_TO^confuse
     */
    public static setPs(name: string, ps: string): string {
        return [name, ps].join(PsUtil.#LINK_KEY);
    }
}

/**
 * @description 获取订阅链接内容类型
 * @param {string} content
 * @returns {SubType} base64 | yaml | json | unknown
 */
export function getSubType(content: string): SubType {
    try {
        base64Decode(content);
        return 'base64';
    } catch {
        try {
            load(content);
            return 'yaml';
        } catch {
            try {
                JSON.parse(content);
                return 'json';
            } catch {
                return 'unknown';
            }
        }
    }
}

/**
 * @description 转换base64订阅内容
 * @param {string} subs
 * @returns {string[]} 订阅
 */
export function processBase64(subs: string): string[] {
    const content = base64Decode(subs);
    return content
        .split('\n')
        .filter(Boolean)
        .map(item => decodeURIComponent(item));
}

/**
 * @description 分组URL
 * @param {string[]} urls
 * @param {number} chunkCount
 * @returns {string[]} urlGroup
 */
export function getUrlGroup(urls: string[], chunkCount: number = 10): string[] {
    const urlGroup: string[] = [];
    let urlChunk: string[] = [];
    urls.forEach((url, index) => {
        urlChunk.push(url);
        if ((index + 1) % chunkCount === 0) {
            urlGroup.push(urlChunk.join('|'));
            urlChunk = [];
        }
    });
    if (urlChunk.length > 0) {
        urlGroup.push(urlChunk.join('|'));
    }
    return urlGroup;
}

export function groupByName(proxyGroups: Clash['proxy-groups'] = []): Clash['proxy-groups'] {
    const _proxyGroups: Clash['proxy-groups'] = [];

    function hasName(name: string): boolean {
        return _proxyGroups.findIndex(item => item.name === name) !== -1;
    }

    for (const item of proxyGroups) {
        const { name, proxies } = item;
        // 如果已经存在name
        if (hasName(name)) {
            const item = _proxyGroups.find(item => item.name === name);
            if (item) {
                item.proxies = [...new Set([...(item.proxies ?? []), ...(proxies ?? [])])];
            }
        } else {
            _proxyGroups.push(item);
        }
    }

    return _proxyGroups;
}

export function processClashVPSName(
    proxies: Clash['proxies'] = [],
    proxiesGroups: Clash['proxy-groups'] = []
): [Clash['proxies'], Clash['proxy-groups']] {
    const nameCount = {};
    const uuidToNewName = {};

    // 1. 统计每个开头名称的出现次数
    proxies.forEach(proxy => {
        const [origin, uuid] = PsUtil.getPs(proxy.name);
        if (origin) {
            nameCount[origin] = (nameCount[origin] || 0) + 1;
            uuidToNewName[uuid] = proxy.name; // 记录原始完整名称
        }
    });

    // 2. 为有重复名称的节点重命名
    const renamedProxies = proxies.map(proxy => {
        const [origin, uuid] = PsUtil.getPs(proxy.name);
        if (nameCount[origin] > 1) {
            const newIndex = nameCount[origin];
            nameCount[origin] -= 1; // 减少计数
            const newName = PsUtil.setPs(`${origin} ${newIndex}`, uuid);
            uuidToNewName[uuid] = newName; // 更新为新名称
            proxy.name = newName;
            return proxy; // 重命名
        }
        return proxy; // 保持原样
    });

    // 3. 更新 proxiesGroups 中的 proxies，保持不重复的名称
    const renamedProxiesGroups = proxiesGroups.map(group => {
        return {
            ...group,
            proxies: group.proxies?.map(proxyName => {
                const [_, uuid] = PsUtil.getPs(proxyName);
                // 如果在 uuidToNewName 中存在，返回新名称，否则返回原名称
                if (uuid && uuidToNewName[uuid]) {
                    return uuidToNewName[uuid]; // 使用新名称
                }
                return proxyName; // 保持原样
            })
        };
    });

    return [renamedProxies, renamedProxiesGroups];
}




// export function mergeClashConfig(configs: Clash[] = []) {
//     const mergedConfig = {
//         proxies: [],
//         'proxy-groups': []
//     };

//     const nameCountMap = Object.create(null);
//     const nameMapping = Object.create(null);

//     // 预计算总代理数量
//     const totalProxies = configs.reduce((total, config) => total + config.proxies.length, 0);

//     // 使用TypedArray提高性能
//     const proxyIndices = new Int32Array(totalProxies);
//     let proxyIndex = 0;

//     // 批量处理配置
//     for (const config of configs) {
//         const proxies = config.proxies;
//         const proxyGroups = config['proxy-groups'];

//         // 批量处理代理
//         for (let i = 0; i < proxies.length; i++) {
//             const proxy = proxies[i];
//             const [prefix, uuid] = PsUtil.getPs(proxy.name);

//             if (nameMapping[proxy.name]) {
//                 proxyIndices[proxyIndex++] = -1;
//                 continue;
//             }

//             const count = nameCountMap[prefix] || 0;
//             nameCountMap[prefix] = count + 1;

//             const newName = count === 0 ? proxy.name : PsUtil.setPs(`${prefix} ${count + 1}`, uuid);

//             nameMapping[proxy.name] = newName;

//             const newProxy = {
//                 ...proxy,
//                 name: newName
//             };

//             mergedConfig.proxies[proxyIndex] = newProxy;
//             proxyIndices[proxyIndex] = proxyIndex;
//             proxyIndex++;
//         }

//         if (!proxyGroups) continue;

//         // 使用 Set 优化代理组去重
//         const processedGroups = new Set();

//         for (const group of proxyGroups) {
//             if (processedGroups.has(group.name)) continue;

//             const existingGroup = mergedConfig['proxy-groups'].find(g => g.name === group.name);

//             if (existingGroup) {
//                 const proxySet = new Set(existingGroup.proxies);
//                 for (const p of group.proxies) {
//                     proxySet.add(nameMapping[p] || p);
//                 }
//                 existingGroup.proxies = Array.from(proxySet);
//             } else {
//                 const newGroup = {
//                     ...group,
//                     proxies: group.proxies.map(p => nameMapping[p] || p)
//                 };
//                 mergedConfig['proxy-groups'].push(newGroup);
//             }

//             processedGroups.add(group.name);
//         }
//     }

//     // 清理无效代理
//     mergedConfig.proxies = mergedConfig.proxies.filter((_, i) => proxyIndices[i] !== -1);

//     return mergedConfig;
// }
