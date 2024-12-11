import { fetchWithRetry } from '@jiangweiye/worker-fetch';
import { toClientError, toServerError, toStream } from '@jiangweiye/worker-service';
import { dump } from 'js-yaml';
import { getConfuseUrl } from './confuse';
import { getOriginConfig } from './confuse/restore';
import { DEFAULT_CONFIG, showPage } from './page';

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            const { pathname, origin, href } = new URL(request.url);

            const cacheResponse = await caches.default.match(href);
            if (cacheResponse) {
                return cacheResponse;
            }

            if (pathname === '/sub') {
                const { confuseUrl, vpsMap } = await getConfuseUrl(request.url, env.BACKEND ?? DEFAULT_CONFIG.BACKEND);
                const response = await fetchWithRetry(confuseUrl, { retries: 3 });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const confuseConfig = await response.data.text();

                if (!confuseConfig) {
                    return toClientError('confuseConfig is empty');
                }
                const originConfig = getOriginConfig(confuseConfig, vpsMap);
                return toStream(
                    dump(originConfig, { indent: 2, lineWidth: 200 }),
                    new Headers({
                        'Content-Type': 'text/yaml; charset=UTF-8',
                        'Cache-Control': 'no-store'
                    })
                );
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
