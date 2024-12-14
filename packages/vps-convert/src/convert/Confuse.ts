import type { Clash, Singbox, VpsMap } from '../types';
import { fetchWithRetry } from '@jiangweiye/worker-fetch';
import { ClashClient } from '../client/Clash';
import { parseVps } from '../parser';
import { getUrlGroup } from '../shared';

export class Confuse {
    static #confuseUrls: string[];

    /**
     * @description 获取混淆链接组
     * @param {string | URL} url
     * @param {string} backend
     * @param {string} chunkCount
     * @returns {Promise<{ vpsMap: VpsMap }>} vpsMap
     */
    static async getConfuseUrl(
        url: string | URL,
        backend: string,
        chunkCount: string
    ): Promise<{
        vpsMap: VpsMap;
    }> {
        const { searchParams } = new URL(url);
        const vpsUrl = searchParams.get('url');

        const vps = vpsUrl!.split(/\||\n/).filter(Boolean);

        const { urls, vpsMap } = await parseVps(vps);

        const urlGroups = getUrlGroup(Array.from(urls), Number(chunkCount));

        Confuse.#confuseUrls = urlGroups.map(urlGroup => {
            const confuseUrl = new URL(`${backend}/sub`);
            const { searchParams } = new URL(url);
            searchParams.set('url', urlGroup);
            confuseUrl.search = searchParams.toString();
            return confuseUrl.toString();
        });

        return { vpsMap };
    }

    /**
     * @description 获取Clash混淆配置
     * @returns {Promise<Clash>} clashConfig
     */
    static async getClashConfuseConfig(): Promise<Clash> {
        try {
            const result = await Promise.all(Confuse.#confuseUrls.map(url => fetchWithRetry(url, { retries: 3 }).then(r => r.data.text())));
            const clashClient = new ClashClient(result);
            return clashClient.clashConfig;
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }

    /**
     * @description 获取Singbox混淆配置
     * @returns {Promise<Singbox>} Singbox
     */
    static async getSingboxConfuseConfig(): Promise<Singbox> {
        try {
            const result = await Promise.all(Confuse.#confuseUrls.map(url => fetchWithRetry(url, { retries: 3 }).then(r => r.data.text())));
            const clashClient = new ClashClient(result);
            return clashClient.clashConfig;
        } catch (error: any) {
            throw new Error(error.message || error);
        }
    }
}
