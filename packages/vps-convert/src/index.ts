import { toServerError, toStream } from '@jiangweiye/cloudflare-service';
import { dump } from 'js-yaml';
import { getConfuseUrl } from './confuse';
import { getOriginConfig } from './confuse/restore';
import { DEFAULT_CONFIG, showPage } from './page';

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            const { pathname, origin } = new URL(request.url);
            if (pathname === '/sub') {
                const { confuseUrl, vpsMap } = getConfuseUrl(request.url, env.BACKEND ?? DEFAULT_CONFIG.BACKEND);
                const response = await fetch(confuseUrl);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const confuseConfig = await response.text();
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
