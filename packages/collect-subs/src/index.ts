import { Cloudflare } from 'cloudflare';
import { fetchWithRetry } from 'cloudflare-tools';
import { getClashConfig } from './config';
import { DEFAULT_CONFIG } from './const';

async function sync(env: Env, cloudflare: Cloudflare): Promise<void> {
    const mergeConfig = {
        ...DEFAULT_CONFIG,
        ...env
    };

    const url = getClashConfig(mergeConfig);
    const response = await fetchWithRetry(url, { retries: 3 });
    if (response.ok && env.KV_NAMESPACE_ID && env.ACCOUNT_ID) {
        const config = await response.data.text();
        await cloudflare.kv.namespaces.values.update(env.KV_NAMESPACE_ID, 'sub.yml', {
            account_id: env.ACCOUNT_ID,
            metadata: JSON.stringify({
                name: 'sub.yml',
                type: 'text'
            }),
            value: config
        });
    }
}

async function createCloudflare(env: Env): Promise<Cloudflare> {
    return new Cloudflare({
        apiToken: env.KV_API_TOKEN,
        apiEmail: env.ACCOUNT_EMAIL
    });
}

export default {
    async fetch(request, env): Promise<Response> {
        try {
            const { SUB_LIST_URL, KV_NAMESPACE_ID, ACCOUNT_ID } = env;
            const { pathname } = new URL(request.url);

            if (!SUB_LIST_URL || !KV_NAMESPACE_ID || !ACCOUNT_ID) {
                throw new Error('SUB_LIST_URL and KV_NAMESPACE_ID and ACCOUNT_ID are required');
            }

            const cloudflare = await createCloudflare(env);

            if (pathname === '/') {
                await sync(env, cloudflare);
                return new Response('Synced');
            } else {
                return new Response('Not Found', { status: 404 });
            }
        } catch (error: any) {
            return new Response(error.message, { status: 500 });
        }
    },
    async scheduled(event, env, ctx): Promise<void> {
        const cloudflare = await createCloudflare(env);
        ctx.waitUntil(sync(env, cloudflare));
    }
} satisfies ExportedHandler<Env>;
