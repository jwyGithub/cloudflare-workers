import type { ParserType } from './types';
import { fetchWithRetry } from 'cloudflare-tools';
import { Convert } from '../../convert';
import { getSubType } from '../../shared';
import { Format } from '../../shared/format';
import { SsParser } from './protocol/ss';
import { TrojanParser } from './protocol/trojan';
import { VlessParser } from './protocol/vless';
import { VmessParser } from './protocol/vmess';

export * from './protocol/ss';
export * from './protocol/trojan';
export * from './protocol/vless';
export * from './protocol/vmess';

export class Parser extends Format {
    private urlSet: Set<string> = new Set<string>();
    private vpsStore: Map<string, ParserType> = new Map();
    private originUrls: Set<string> = new Set<string>();

    private vps: string[] = [];

    constructor(vps: string[], existedVps: string[] = []) {
        super(existedVps);
        this.vps = vps;
    }

    public async parse(vps: string[] = this.vps): Promise<void> {
        for await (const v of vps) {
            const processVps = this.updateVpsPs(v);

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
                    this.updateExist(Array.from(this.originUrls));
                    await this.parse(Convert.base64(subContent));
                }
            }
        }
    }

    private setStore(v: string, parser: ParserType): void {
        this.urlSet.add(parser.confuseLink);
        this.originUrls.add(v);
        this.vpsStore.set(parser.confusePs, parser);
    }

    public get urls(): string[] {
        return Array.from(this.urlSet);
    }

    public get vpsMap(): Map<string, ParserType> {
        return this.vpsStore;
    }
}
