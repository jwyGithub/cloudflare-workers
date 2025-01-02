import type { ClashType, SingboxType, VpsMap } from '../../types';
import { DEFAULT_CONFIG } from '../../config';
import { getUrlGroup } from '../../shared';
import { Parser } from '../parser';
import { ClashClient } from './client/clash';
import { SingboxClient } from './client/singbox';

export class Confuse {
    private urls: string[] = [];

    private chunkCount: number = Number(DEFAULT_CONFIG.CHUNK_COUNT);
    private backend: string = DEFAULT_CONFIG.BACKEND;
    private parser: Parser | null = null;

    private clashClient: ClashClient = new ClashClient();
    private singboxClient: SingboxClient = new SingboxClient();

    constructor(env: Env) {
        this.chunkCount = Number(env.CHUNK_COUNT ?? DEFAULT_CONFIG.CHUNK_COUNT);
        this.backend = env.BACKEND ?? DEFAULT_CONFIG.BACKEND;
        this.parser = null;
    }

    public async setSubUrls(request: Request): Promise<void> {
        const { searchParams } = new URL(request.url);
        const vpsUrl = searchParams.get('url');

        const vps = vpsUrl!.split(/\||\n/).filter(Boolean);

        this.parser = new Parser(vps);

        await this.parser.parse(vps);

        const urlGroups = getUrlGroup(Array.from(this.parser.urls), Number(this.chunkCount));

        this.urls = urlGroups.map(urlGroup => {
            const confuseUrl = new URL(`${this.backend}/sub`);
            const { searchParams } = new URL(request.url);
            searchParams.set('url', urlGroup);
            confuseUrl.search = searchParams.toString();
            return confuseUrl.toString();
        });
    }

    public async getClashConfig(): Promise<ClashType> {
        return await this.clashClient.getConfig(this.urls);
    }

    public async getSingboxConfig(): Promise<SingboxType> {
        return await this.singboxClient.getConfig(this.urls);
    }

    get vpsStore(): VpsMap | undefined {
        return this.parser?.vpsMap;
    }
}
