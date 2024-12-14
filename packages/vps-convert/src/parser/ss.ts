import { base64Decode, base64Encode } from '@jiangweiye/worker-shared';
import { PsUtil, Store } from '../shared';

interface IParseConfig {
    originEncryptionProtocol: string;
    originPassword: string;
}

export class SS extends Store<URL> {
    /** @description 原始链接 */
    #originLink: string = '';

    /** @description 混淆链接 */
    #confuseLink: string = '';

    /** @description 解析的私有配置 */
    #parseConfig: Partial<IParseConfig> = {};

    constructor(v: string) {
        super();
        this.#parse(v);
    }

    #parse(v: string): void {
        this.#originLink = v;
        const urlConfig = new URL(v);

        // 设置原始配置
        this.setOriginConfig(urlConfig, urlConfig.hash);

        const encryptionProtocol = this.getEncrtptionProtocol();
        const password = this.getPassword();
        this.#setParseConfig(urlConfig.username);

        // 设置混淆信息
        this.setConfuseConfig({
            username: encodeURIComponent(base64Encode(`${encryptionProtocol}:${password}`)),
            hostname: this.getHostName(),
            port: this.getPort(),
            hash: PsUtil.setPs(this.originPs, this.confusePs)
        });
        this.#setConfuseLink();
    }

    #setParseConfig(originUsername: string): void {
        const [originEncryptionProtocol, originPassword] = base64Decode(decodeURIComponent(originUsername)).split(':');
        this.#parseConfig.originEncryptionProtocol = originEncryptionProtocol;
        this.#parseConfig.originPassword = originPassword;
    }

    #setConfuseLink(): void {
        const { username, hostname, port, search, hash } = this.confuseConfig;
        this.#confuseLink = `ss://${username}@${hostname}:${port}${search ?? ''}${hash}`;
    }

    restoreClash(proxy: Record<string, string | number>, ps: string): Record<string, string | number> {
        proxy.name = ps;
        proxy.server = this.originConfig.hostname ?? '';
        proxy.port = Number(this.originConfig?.port ?? 0);
        proxy.cipher = this.#parseConfig.originEncryptionProtocol!;
        proxy.password = this.#parseConfig.originPassword!;
        return proxy;
    }

    restoreSingbox(outbound: Record<string, string | number>, ps: string): Record<string, string | number> {
        outbound.password = this.#parseConfig.originPassword!;
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
