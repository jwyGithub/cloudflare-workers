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
