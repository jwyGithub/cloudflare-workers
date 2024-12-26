import type { VmessConfig } from '../types';
import { base64Decode, base64Encode } from 'cloudflare-tools';
import { Faker } from '../../../shared/faker';
import { PsUtil } from '../../../shared/ps';

export class VmessParser extends Faker {
    /** * @description 原始链接 */
    #originLink: string = '';

    /** * @description 混淆链接 */
    #confuseLink: string = '';

    /** * @description vps原始配置 */
    #originConfig: Partial<VmessConfig> = {};

    /** * @description 混淆配置 */
    #confuseConfig: Partial<VmessConfig> = {};

    /** * @description 原始备注 */
    #originPs: string = '';

    /** * @description 混淆备注 */
    #confusePs: string = '';

    public constructor(v: string) {
        super();
        this.#confusePs = crypto.randomUUID();
        // 设置原始配置
        this.setOriginConfig(v);
        // 设置混淆配置
        this.setConfuseConfig();
    }

    /**
     * @description 设置原始配置
     * @param {string} v
     */
    private setOriginConfig(v: string): void {
        const [_, config] = v.match(/vmess:\/\/(.*)/) || [];
        this.#originLink = v;
        this.#originConfig = JSON.parse(base64Decode(config));
        this.#originPs = this.#originConfig.ps ?? '';
    }

    /**
     * @description 更新原始配置
     * @param {string} ps
     */
    public updateOriginConfig(ps: string): void {
        this.#originConfig.ps = ps;
        this.#originPs = ps;
        this.#originLink = `vmess://${base64Encode(JSON.stringify(this.#originConfig))}`;
        this.setConfuseConfig();
    }

    /**
     * @description 设置混淆配置
     */
    private setConfuseConfig(): void {
        this.#confuseConfig = structuredClone(this.#originConfig);
        this.#confuseConfig.add = this.getHostName();
        this.#confuseConfig.port = this.getPort();
        this.#confuseConfig.id = this.getPassword();
        this.#confuseConfig.ps = PsUtil.setPs(this.#originPs, this.#confusePs);
        this.#confuseLink = `vmess://${base64Encode(JSON.stringify(this.#confuseConfig))}`;
    }

    #restoreWs(proxy: Record<string, string | number | any>): void {
        if (proxy.network === 'ws') {
            proxy['ws-opts'] = {
                ...proxy['ws-opts'],
                path: this.originConfig.path,
                headers: {
                    ...proxy['ws-opts'].headers,
                    Host: this.originConfig.host
                }
            };
        }
    }

    public restoreClash(proxy: Record<string, string | number>, ps: string): Record<string, string | number> {
        this.#restoreWs(proxy);
        proxy.name = ps;
        proxy.server = this.originConfig.add ?? '';
        proxy.port = Number(this.originConfig?.port ?? 0);
        proxy.uuid = this.originConfig?.id ?? '';
        return proxy;
    }

    public restoreSingbox(outbound: Record<string, any>, ps: string): Record<string, string | number> {
        outbound.server = this.originConfig.add ?? '';
        outbound.server_port = Number(this.originConfig.port ?? 0);
        outbound.tag = ps;
        if (outbound.tls?.server_name) {
            outbound.tls.server_name = this.originConfig.add ?? '';
        }
        outbound.uuid = this.originConfig?.id ?? '';
        return outbound;
    }

    /**
     * @description 原始备注
     * @example '#originPs'
     */
    get originPs(): string {
        return this.#originPs;
    }

    /**
     * @description 原始链接
     * @example 'vmess://...'
     */
    get originLink(): string {
        return this.#originLink;
    }

    /**
     * @description 原始配置
     */
    get originConfig(): Partial<VmessConfig> {
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
     * @description 混淆链接
     * @example 'vmess://...'
     */
    get confuseLink(): string {
        return this.#confuseLink;
    }

    /**
     * @description 混淆配置
     */
    get confuseConfig(): Partial<VmessConfig> {
        return this.#confuseConfig;
    }
}
