import type { Cloudflare } from 'cloudflare';
import { fetchWithRetry } from 'cloudflare-tools';

function getClashConfig(env: Env): string {
    const url = new URL(`https://${env.SUB}/sub`);
    const urlParams = new URLSearchParams();
    urlParams.set('target', 'clash');
    urlParams.set('new_name', 'true');
    urlParams.set('insert', 'false');
    urlParams.set('config', env.SUB_CONFIG);
    urlParams.set('url', env.SUB_URLS);
    urlParams.set('filename', 'sub');
    urlParams.set('emoji', 'true');
    urlParams.set('list', 'false');
    urlParams.set('tfo', 'false');
    urlParams.set('scv', 'false');
    urlParams.set('fdn', 'false');
    urlParams.set('sort', 'false');
    return `${url.toString()}?${urlParams.toString()}`;
}

export async function sync(env: Env, cloudflare: Cloudflare): Promise<void> {
    const url = getClashConfig(env);
    const response = await fetchWithRetry(url);
    if (response.ok) {
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

export async function getSubConfig(env: Env, cloudflare: Cloudflare): Promise<string> {
    const result = await cloudflare.kv.namespaces.values.get(env.KV_NAMESPACE_ID, 'sub.yml', {
        account_id: env.ACCOUNT_ID
    });
    if (result.ok) {
        return result.text();
    }
    return '';
}
