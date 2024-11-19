import { toServerError, toSuccess } from '@jiangweiye/cloudflare-service';
import { base64Decode } from '@jiangweiye/cloudflare-shared';
import { genHeader, genSha, getTime, getTrojan, getVless } from './shared';

async function getVps(links: string[]): Promise<{ trojan: string[]; vless: string[] }> {
    const result: string[] = [];

    const trojanVps: string[] = [];
    const vlessVps: string[] = [];
    for await (const link of links) {
        const r = await fetch(link, { headers: genHeader(), redirect: 'manual' }).then(r => r.text());
        result.push(base64Decode(r));
    }
    const vps = result.map(item => item.split('\n')).flat();

    for (const item of vps) {
        if (item.startsWith('trojan://')) {
            trojanVps.push(item);
        } else if (item.startsWith('vless://')) {
            vlessVps.push(item);
        }
    }

    return {
        trojan: trojanVps,
        vless: vlessVps
    };
}

async function pushGithub(content: string[], path: string, env: Env): Promise<Response> {
    try {
        const contentBase64 = btoa(content.join('\n'));
        const sha = await genSha(content.join('\n'));
        // 准备更新或创建文件的请求体
        const requestBody = {
            message: `auto: update ${path} by ${getTime()}`,
            content: contentBase64,
            branch: env.REPO_BRANCH,
            sha
        };

        // 发送请求到 GitHub API
        const response = await fetch(`https://api.github.com/repos/${env.GITHUB_USERNAME}/${env.REPO_NAME}/contents/${path}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${env.GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'User-Agent': 'Cloudflare-Worker'
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            throw new Error(`GitHub API responded with ${response.status}`);
        }
        const result = await response.json();
        return toSuccess(result);
    } catch (error: any) {
        return toServerError(error);
    }
}

async function init(env: Env): Promise<Response> {
    try {
        const { trojan, vless } = await getVps(env.LINKS.split(','));

        const vlessVps = getVless(vless);

        const trojanVps = getTrojan(trojan);

        const vlessRes = await pushGithub(vlessVps, 'packages/vps-parse/vless_api.txt', env);

        const troRes = await pushGithub(trojanVps, 'packages/vps-parse/trojan_api.txt', env);

        return toSuccess({
            vless: vlessRes,
            trojan: troRes
        });
    } catch (error: any) {
        return toServerError(error);
    }
}

export default {
    async fetch(_, env, _ctx) {
        return init(env);
    },

    async scheduled(_event, env, _ctx): Promise<void> {
        _ctx.waitUntil(init(env));
    }
} satisfies ExportedHandler<Env>;
