import type { ParserType } from './types';
import { fetchWithRetry } from 'cloudflare-tools';
import { Convert } from '../../convert';
import { getSubType } from '../../shared';
import { SsParser } from './protocol/ss';
import { TrojanParser } from './protocol/trojan';
import { VlessParser } from './protocol/vless';
import { VmessParser } from './protocol/vmess';

export * from './protocol/ss';
export * from './protocol/trojan';
export * from './protocol/vless';
export * from './protocol/vmess';

class VpsParser {
    #existVps: string[] = [];

    #existVpsMap: Map<string, number> = new Map();

    constructor(existVps: string[]) {
        this.#existVps = existVps;
        this.setExistVpsMap();
    }

    public setExistVpsMap(existVps: string[] = this.#existVps): void {
        for (const vps of existVps) {
            const parser = this.getParser(vps);
            if (parser) {
                this.updateExistVpsMap(parser);
            }
        }
    }

    private updateExistVpsMap(parser: ParserType): void {
        const ps = parser.originPs;
        const [, suffix] = ps.split('#');
        if (!suffix) return;

        const [suffixName, countStr] = suffix.split(' ');
        const count = countStr ? Number.parseInt(countStr) >>> 0 : 0;
        const currentMax = this.#existVpsMap.get(suffixName) || 0;
        this.#existVpsMap.set(suffixName, Math.max(currentMax, count + 1));
    }

    private getParser(vps: string): ParserType | null {
        if (vps.startsWith('vless://')) {
            return new VlessParser(vps);
        }
        if (vps.startsWith('vmess://')) {
            return new VmessParser(vps);
        }
        if (vps.startsWith('trojan://')) {
            return new TrojanParser(vps);
        }
        if (vps.startsWith('ss://')) {
            return new SsParser(vps);
        }

        return null;
    }

    public updateVpsPs(vps: string): string | null {
        const parser = this.getParser(vps);
        if (!parser) return null;

        const ps = parser.originPs;
        const [name, suffix] = ps.split('#');

        if (!suffix) return vps;

        const count = this.#existVpsMap.get(suffix) || 0;
        const newPs = count === 0 ? ps : `${name}#${suffix} ${count}`;

        parser.updateOriginConfig(newPs);
        this.#existVpsMap.set(suffix, count + 1);

        return parser.originLink;
    }
}

export class Parser {
    #urls: Set<string> = new Set<string>();
    #vpsMap: Map<string, ParserType> = new Map();
    #originUrls: Set<string> = new Set<string>();

    #vps: string[] = [];

    #vpsParser: VpsParser;

    constructor(vps: string[], existedVps: string[] = Array.from(this.#originUrls)) {
        this.#vps = vps;
        this.#vpsParser = new VpsParser(existedVps);
    }

    public async parse(vps: string[] = this.#vps): Promise<void> {
        for await (const v of vps) {
            const processVps = this.#vpsParser.updateVpsPs(v);

            if (processVps) {
                let parser: ParserType | null = null;

                if (processVps.startsWith('vless://')) {
                    parser = new VlessParser(processVps);
                } else if (processVps.startsWith('vmess://')) {
                    parser = new VmessParser(processVps);
                } else if (processVps.startsWith('trojan://')) {
                    parser = new TrojanParser(processVps);
                } else if (processVps.startsWith('ss://')) {
                    parser = new SsParser(processVps);
                }

                if (parser) {
                    this.setStore(processVps, parser);
                }
            }

            if (v.startsWith('https://') || v.startsWith('http://')) {
                const subContent = await fetchWithRetry(v, { retries: 3 }).then(r => r.data.text());
                const subType = getSubType(subContent);
                if (subType === 'base64') {
                    this.#vpsParser.setExistVpsMap(Array.from(this.#originUrls));
                    await this.parse(Convert.base64(subContent));
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
