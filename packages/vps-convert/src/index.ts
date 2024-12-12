import type { VpsMap } from './types';
import { fetchWithRetry } from '@jiangweiye/worker-fetch';
import { toClientError, toServerError, toStream } from '@jiangweiye/worker-service';
import { dump } from 'js-yaml';
import { getConvertUrl } from './confuse';
import { getOriginConfig } from './confuse/restore';
import { DEFAULT_CONFIG, showPage } from './page';
import { parseContent } from './parser/parser';

let _vpsMap: VpsMap = new Map();

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            const { pathname, origin } = new URL(request.url);
            if (pathname === '/getSub') {
                console.info('request.url', request.url);
                const { base64, vpsMap } = await parseContent(request.url);
                _vpsMap = vpsMap;
                return new Response(base64, {
                    headers: new Headers({
                        'Content-Type': 'text/plain; charset=UTF-8',
                        'Cache-Control': 'no-store'
                    })
                });
            }
            if (pathname === '/sub') {
                // 转换base64格式订阅链接
                const convertUrl = getConvertUrl(request.url, env.BACKEND ?? DEFAULT_CONFIG.BACKEND);
                const response = await fetchWithRetry(convertUrl, { retries: 3 });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const confuseConfig = await response.data.text();

                if (!confuseConfig) {
                    return toClientError('confuseConfig is empty');
                }

                console.info(`confuseConfig: ${confuseConfig.length}`);
                console.info(`vpsMap: ${_vpsMap.size}`);
                const originConfig = getOriginConfig(confuseConfig, _vpsMap);

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
