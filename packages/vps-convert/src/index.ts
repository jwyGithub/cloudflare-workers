import { fetchWithRetry } from '@jiangweiye/worker-fetch';
import { toServerError, toStream } from '@jiangweiye/worker-service';
import { dump, load } from 'js-yaml';
import { getConfuseUrl } from './confuse';
import { getOriginConfig } from './confuse/restore';
import { SERVICE_GET_SUB } from './constants';
import { DEFAULT_CONFIG, showPage } from './page';
import type { Clash } from './types/Clash';

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            const { pathname, origin } = new URL(request.url);
            if (pathname === '/sub') {
                const { confuseUrl, vpsMap } = await getConfuseUrl(request.url, env.BACKEND ?? DEFAULT_CONFIG.BACKEND);
                console.log(`confuseUrl: ${confuseUrl}`);
                const response = await fetchWithRetry(confuseUrl, { retries: 3 });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                console.log(`confuseConfig: ${response.status} ${response.statusText}`);
                const confuseConfig = await response.data.text();
                console.log(`confuseConfig: ${(load(confuseConfig) as Clash).proxies}`);
                const originConfig = getOriginConfig(confuseConfig, vpsMap);
                return toStream(
                    dump(originConfig, { indent: 2, lineWidth: 200 }),
                    new Headers({
                        'Content-Type': 'text/yaml; charset=UTF-8',
                        'Cache-Control': 'no-store'
                    })
                );
            }

            if (pathname === `/${SERVICE_GET_SUB}`) {
                const cacheResponse = await caches.default.match(`${origin}/${SERVICE_GET_SUB}`);
                return cacheResponse || toServerError('Cache not found');
            }

            return showPage({
                url: env.PAGE_URL ?? DEFAULT_CONFIG.PAGE_URL,
                lockBackend: env.LOCK_BACKEND ?? DEFAULT_CONFIG.LOCK_BACKEND,
                remoteConfig: env.REMOTE_CONFIG ?? DEFAULT_CONFIG.REMOTE_CONFIG,
                origin
            });
        } catch (error: any) {
            return toServerError(error.message || error);
        }
    }
} satisfies ExportedHandler<Env>;
