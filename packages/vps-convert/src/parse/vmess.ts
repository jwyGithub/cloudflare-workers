import { base64Decode, base64Encode } from '@jiangweiye/cloudflare-shared';
import { PsUtil, Store } from '../shared';

interface VMessConfig {
    v: string;
    ps: string;
    add: string;
    port: string;
    id: string;
    scy: string;
    net: string;
    type: string;
    tls: string | boolean;
    path?: string;
    host?: string;
    [key: string]: any;
}

export class Vmess extends Store<VMessConfig> {
    /** * @description 原始链接 */
    #originLink: string = '';

    /** * @description 混淆链接 */
    #confuseLink: string = '';

    constructor(v: string) {
        super();
        this.#parse(v);
    }

    #parse(v: string): void {
        const [_, config] = v.match(/vmess:\/\/(.*)/) || [];
        const urlConfig: VMessConfig = JSON.parse(base64Decode(config));
        this.#originLink = v;
        // 设置原始配置
        this.setOriginConfig(urlConfig, urlConfig.ps);
        // 设置混淆信息
        this.setConfuseConfig({
            ...this.originConfig,
            add: this.getHostName(),
            port: this.getPort(),
            id: this.getPassword(),
            ps: PsUtil.setPs(this.originPs, this.confusePs),
            tls: this.originConfig.tls
        });
        this.#setConfuseLink();
    }

    #setConfuseLink(): void {
        const { add, port, id, ps, scy, net, type, tls, v } = this.confuseConfig;
        this.#confuseLink = `vmess://${base64Encode(JSON.stringify({ v, ps, add, port, id, scy, net, type, tls }))}`;
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

    restore(proxy: Record<string, string | number>, ps: string): Record<string, string | number> {
        this.#restoreWs(proxy);
        proxy.name = ps;
        proxy.server = this.originConfig.add ?? '';
        proxy.port = Number(this.originConfig?.port ?? 0);
        proxy.uuid = this.originConfig?.id ?? '';
        return proxy;
    }

    get confuseLink(): string {
        return this.#confuseLink;
    }

    get originLink(): string {
        return this.#originLink;
    }
}
