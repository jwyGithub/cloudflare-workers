import type { ParserType } from './types';
import { fetchWithRetry } from 'cloudflare-tools';
import { Convert } from '../../convert';
import { getSubType, processVps } from '../../shared';
import { SsParser } from './protocol/ss';
import { TrojanParser } from './protocol/trojan';
import { VlessParser } from './protocol/vless';
import { VmessParser } from './protocol/vmess';

export * from './protocol/ss';
export * from './protocol/trojan';
export * from './protocol/vless';
export * from './protocol/vmess';

export class Parser {
    #urls: Set<string> = new Set<string>();
    #vpsMap: Map<string, ParserType> = new Map();
    #originUrls: Set<string> = new Set<string>();

    #vps: string[] = [];

    constructor(vps: string[]) {
        this.#vps = vps;
    }

    public async parse(vps: string[] = this.#vps): Promise<void> {
        for await (const v of vps) {
            if (v.startsWith('vless:')) {
                const vless = new VlessParser(v);
                this.setStore(v, vless);
            }
            if (v.startsWith('vmess:')) {
                const vmess = new VmessParser(v);
                this.setStore(v, vmess);
            }
            if (v.startsWith('trojan://')) {
                const trojan = new TrojanParser(v);
                this.setStore(v, trojan);
            }
            if (v.startsWith('ss://')) {
                const ss = new SsParser(v);
                this.setStore(v, ss);
            }

            if (v.startsWith('https://') || v.startsWith('http://')) {
                const subContent = await fetchWithRetry(v, { retries: 3 }).then(r => r.data.text());
                const subType = getSubType(subContent);
                if (subType === 'base64') {
                    await this.parse(processVps(Convert.base64(subContent), Array.from(this.#originUrls)));
                }
            }
        }
    }

    private setStore(v: string, parser: ParserType): void {
        this.#urls.add(parser.confuseLink);
        this.#originUrls.add(v);
        this.#vpsMap.set(parser.confusePs, parser);
    }

    public get urls(): Set<string> {
        return this.#urls;
    }

    public get vpsMap(): Map<string, ParserType> {
        return this.#vpsMap;
    }
}
