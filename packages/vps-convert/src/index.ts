import { base64Decode } from 'cloudflare-tools';
import { dump } from 'js-yaml';
import { Confuse } from './core/confuse';
import { Restore } from './core/restore';
import { DEFAULT_CONFIG, showPage } from './page';
import { getShortUrl, setShortUrl } from './short';

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            const { pathname, origin } = new URL(request.url);
            if (pathname === '/sub') {
                const confuse = new Confuse(env);
                await confuse.setSubUrls(request);
                const convertType = new URL(request.url).searchParams.get('target');

                if (!convertType) {
                    return new Response('Unsupported client type', { status: 400 });
                }

                const restore = new Restore(confuse);

                if (['clash', 'clashr'].includes(convertType)) {
                    const originConfig = await restore.getClashConfig();
                    return new Response(dump(originConfig, { indent: 2, lineWidth: 200 }), {
                        headers: new Headers({
                            'Content-Type': 'text/yaml; charset=UTF-8',
                            'Cache-Control': 'no-store'
                        })
                    });
                }

                if (convertType === 'singbox') {
                    const originConfig = await restore.getSingboxConfig();
                    return new Response(JSON.stringify(originConfig), {
                        headers: new Headers({
                            'Content-Type': 'text/plain; charset=UTF-8',
                            'Cache-Control': 'no-store'
                        })
                    });
                }

                return new Response('Unsupported client type, support list: clash, clashr', { status: 400 });
            }

            if (pathname === '/') {
                return showPage({
                    url: env.PAGE_URL ?? DEFAULT_CONFIG.PAGE_URL,
                    lockBackend: env.LOCK_BACKEND ?? DEFAULT_CONFIG.LOCK_BACKEND,
                    remoteConfig: env.REMOTE_CONFIG ?? DEFAULT_CONFIG.REMOTE_CONFIG,
                    origin
                });
            }

            if (pathname === '/set_short_url') {
                const subUrl = new URL(request.url).searchParams.get('sub_url');
                if (!subUrl) {
                    return new Response('Sub URL not found', { status: 400 });
                }
                return await setShortUrl(env, subUrl, request);
            }

            if (!env.KV) {
                return new Response('KV not found', { status: 500 });
            }

            const shortUrl = await getShortUrl(env, pathname);
            if (shortUrl) {
                return Response.redirect(base64Decode(shortUrl));
            }

            return new Response('Short URL not found', { status: 404 });
        } catch (error: any) {
            return new Response(error.message || error);
        }
    }
} satisfies ExportedHandler<Env>;
