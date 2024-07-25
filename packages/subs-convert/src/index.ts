import init, { dump, load } from '@jiangweiye/cloudflare-wasm-yaml';

async function convert(config_url: string) {
    const config = load(await fetch(config_url).then(res => res.text()));

    const remote_config = config.get('remote_config');

    const backend = config.get('backend');

    const subs = config.get('subs');

    const rules = config.get('rules');
    return {
        url: makeClashSub(subs, backend, remote_config),
        rules
    };
}

function makeClashSub(subs: string[], backend?: string, remote_config?: string) {
    remote_config = remote_config || 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini';
    const url = subs.join('||');
    const query = new URLSearchParams();
    query.append('target', 'clash');
    query.append('new_name', 'true');
    query.append('url', encodeURIComponent(url));
    query.append('insert', 'false');
    query.append('config', encodeURIComponent(remote_config));

    return `${backend}/sub?${query.toString()}`;
}

export default {
    async fetch(request, env, _ctx): Promise<Response> {
        await init();

        const { pathname } = new URL(request.url);

        if (pathname === `/${env.token}`) {
            const { url, rules } = await convert(env.config_url);
            const getClashConfig = await fetch(decodeURIComponent(url)).then(res => res.text());
            const localConfig = load(getClashConfig);
            const source_rules = localConfig.get('rules');
            const all_rules = [...rules, ...source_rules];
            localConfig.set('rules', all_rules);
            return new Response(dump(localConfig), {
                headers: {
                    'content-type': 'text/plain;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        return new Response('Not Found', {
            status: 404,
            headers: {
                'content-type': 'text/plain'
            }
        });
    }
} satisfies ExportedHandler<Env>;
