import type { SubType } from '../../types';
import type { ParserType } from './types';
import { base64Decode, fetchWithRetry } from 'cloudflare-tools';
import { load } from 'js-yaml';
import { Convert } from '../convert';
import { Hysteria2Parser } from './protocol/hysteria2';
import { SsParser } from './protocol/ss';
import { TrojanParser } from './protocol/trojan';
import { VlessParser } from './protocol/vless';
import { VmessParser } from './protocol/vmess';

export * from './protocol/hysteria2';
export * from './protocol/ss';
export * from './protocol/trojan';
export * from './protocol/vless';
export * from './protocol/vmess';

export class Parser extends Convert {
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
                } else if (this.isHysteria2(processVps)) {
                    parser = new Hysteria2Parser(processVps);
                }

                if (parser) {
                    this.setStore(processVps, parser);
                }
            }

            if (v.startsWith('https://') || v.startsWith('http://')) {
                const subContent = await fetchWithRetry(v, { retries: 3 }).then(r => r.data.text());
                const subType = this.getSubType(subContent);
                if (subType === 'base64') {
                    this.updateExist(Array.from(this.originUrls));
                    const content = base64Decode(subContent);
                    await this.parse(content.split('\n').filter(Boolean));
                }
            }
        }
    }

    private setStore(v: string, parser: ParserType): void {
        this.urlSet.add(parser.confuseLink);
        this.originUrls.add(v);
        this.vpsStore.set(parser.confusePs, parser);
    }

    private getSubType(content: string): SubType {
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

    private isHysteria2(vps: string): boolean {
        return vps.startsWith('hysteria2://') || vps.startsWith('hysteria://') || vps.startsWith('hy2://');
    }

    public get urls(): string[] {
        return Array.from(this.urlSet);
    }

    public get vpsMap(): Map<string, ParserType> {
        return this.vpsStore;
    }
}
