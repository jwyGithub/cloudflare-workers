import { PsUtil, Store } from '../shared';

export class Trojan extends Store<URL> {
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
        this.#confuseLink = `trojan://${password}@${hostname}:${port}${search}${hash}`;
    }

    restoreClash(proxy: Record<string, string | number>, ps: string): Record<string, string | number> {
        proxy.name = ps;
        proxy.server = this.originConfig.hostname ?? '';
        proxy.port = Number(this.originConfig.port ?? 0);
        proxy.password = this.originConfig?.username ?? '';
        return proxy;
    }

    restoreSingbox(outbound: Record<string, string | number>, ps: string): Record<string, string | number> {
        outbound.password = this.originConfig?.username ?? '';
        outbound.server = this.originConfig.hostname ?? '';
        outbound.server_port = Number(this.originConfig.port ?? 0);
        outbound.tag = ps;
        return outbound;
    }

    get confuseLink(): string {
        return this.#confuseLink;
    }

    get originLink(): string {
        return this.#originLink;
    }
}
