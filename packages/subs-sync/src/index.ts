import init, { dump, load } from '@jiangweiye/cloudflare-wasm-yaml';
import { TextCode } from '@jiangweiye/cloudflare-shared';

async function getRemoteSubs(subUrl: string) {
    const res = await fetch(subUrl)
        .then(res => res.body!)
        .then(TextCode.streamToText)
        .then(TextCode.base64Decode);
    return res.split('\n').filter(Boolean);
}

async function getSubs(subs: string[]) {
    const result = [];
    for await (const sub of subs) {
        if (sub.startsWith('https')) {
            const r = await getRemoteSubs(sub);
            result.push(...r);
        } else {
            result.push(sub);
        }
    }
    return result;
}

async function convert(source_config: string) {
    const config = await fetch(source_config)
        .then(res => res.body!)
        .then(TextCode.streamToText)
        .then(load);

    const remote_config = config.get('remote_config');

    const backend = config.get('backend');

    const subs = await getSubs(config.get('subs'));

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
    query.append('url', url);
    query.append('insert', 'false');
    query.append('config', remote_config);

    return `${backend}/sub?${query.toString()}`;
}

async function sync(content: string, syncUrl: string) {
    await fetch(syncUrl, {
        method: 'POST',
        body: TextCode.base64Encode(content),
        headers: {
            'Content-Type': 'application/x-yaml; charset=utf-8'
        }
    });
}

async function parse(env: Env) {
    const { url, rules } = await convert(env.CONFIG_URL);
    const getClashConfig = await fetch(url)
        .then(res => res.body!)
        .then(TextCode.streamToText);
    const localConfig = load(getClashConfig);
    const source_rules = localConfig.get('rules');
    const all_rules = [...rules, ...source_rules];
    localConfig.set('rules', all_rules);
    return localConfig;
}

export default {
    async scheduled(event, env, ctx): Promise<void> {
        await init();
        const localConfig = await parse(env);
        ctx.waitUntil(sync(dump(localConfig), env.SYNC_URL));
    },
    async fetch(event, env): Promise<Response> {
        try {
            await init();
            const localConfig = await parse(env);
            await sync(dump(localConfig), env.SYNC_URL);
            return new Response(`sync success`);
        } catch (error: any) {
            return new Response(error.message, {
                status: 500
            });
        }
    }
} satisfies ExportedHandler<Env>;
