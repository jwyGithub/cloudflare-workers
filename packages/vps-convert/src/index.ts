import { toClientError, toServerError, toStream } from '@jiangweiye/worker-service';
import { dump } from 'js-yaml';
import { Confuse, Convert } from './convert';
import { originClash } from './convert/Origin';
import { DEFAULT_CONFIG, showPage } from './page';

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            const { pathname, origin } = new URL(request.url);
            if (pathname === '/sub') {
                const { vpsMap } = await Confuse.getConfuseUrl(
                    request.url,
                    env.BACKEND ?? DEFAULT_CONFIG.BACKEND,
                    env.CHUNK_COUNT ?? DEFAULT_CONFIG.CHUNK_COUNT
                );

                const convertType = Convert.getConvertType(request.url);

                // 如果客户端类型不支持
                if (!convertType) {
                    return toClientError('Unsupported client type');
                }

                // 如果客户端类型是Clash
                if (['clash', 'clashr'].includes(convertType)) {
                    const confuseConfig = await Confuse.getClashConfuseConfig();
                    const originConfig = originClash.getOriginConfig(confuseConfig, vpsMap);
                    return toStream(
                        dump(originConfig, { indent: 2, lineWidth: 200 }),
                        new Headers({
                            'Content-Type': 'text/yaml; charset=UTF-8',
                            'Cache-Control': 'no-store'
                        })
                    );
                }

                return toClientError('Unsupported client type, support list: clash, clashr');
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
