import { PsUtil, Store } from '../shared';

export class Vless extends Store<URL> {
    /** * @description 原始链接 */
    #originLink: string = '';

    /** * @description 混淆链接 */
    #confuseLink: string = '';

    constructor(v: string) {
        super();
        this.#parse(v);
    }

    #parse(v: string): void {
        this.#originLink = v;
        const urlConfig = new URL(v);
        // 设置原始配置
        this.setOriginConfig(urlConfig, urlConfig.hash);
        // 设置混淆信息
        this.setConfuseConfig({
            password: this.getPassword(),
            hostname: this.getHostName(),
            port: this.getPort(),
            search: this.originConfig.search,
            hash: PsUtil.setPs(this.originPs, this.confusePs)
        });
        this.#setConfuseLink();
    }

    #setConfuseLink(): void {
        const { password, hostname, port, search, hash } = this.confuseConfig;
        this.#confuseLink = `vless://${password}@${hostname}:${port}${search}${hash}`;
    }

    restoreClash(proxy: Record<string, string | number>, ps: string): Record<string, string | number> {
        proxy.name = ps;
        proxy.server = this.originConfig.hostname ?? '';
        proxy.port = Number(this.originConfig?.port ?? 0);
        proxy.uuid = this.originConfig.username ?? '';
        return proxy;
    }

    restoreSingbox(outbound: Record<string, any>, ps: string): Record<string, any> {
        outbound.tag = ps;
        outbound.server = this.originConfig.hostname ?? '';
        outbound.server_port = Number(this.originConfig.port ?? 0);
        outbound.uuid = this.originConfig.username ?? '';
        if (outbound.tls?.server_name) {
            outbound.tls.server_name = this.originConfig.hostname ?? '';
        }
        return outbound;
    }

    get confuseLink(): string {
        return this.#confuseLink;
    }

    get originLink(): string {
        return this.#originLink;
    }
}
