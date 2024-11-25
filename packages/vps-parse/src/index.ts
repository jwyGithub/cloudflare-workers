import { toServerError, toSuccess } from '@jiangweiye/cloudflare-service';
import {
    genHeader,
    getClashConfig,
    getConvertUrl,
    getTime,
    getTrojan,
    getVless,
    getVmess,
    tryBase64Decode,
    tryBase64Encode
} from './shared';

const getPath = (filePath: string): string => {
    return `packages/vps-parse/address/${filePath}`;
};

async function getVps(links: string[]): Promise<{ trojan: string[]; vless: string[]; vmess: string[] }> {
    try {
        const result: string[] = [];

        const trojanVps: string[] = [];
        const vlessVps: string[] = [];
        const vmessVps: string[] = [];
        for await (const link of links) {
            const r = await fetch(link, { headers: genHeader(), redirect: 'manual' }).then(r => r.text());
            result.push(tryBase64Decode(r));
        }
        const vps = result.map(item => item.split('\n')).flat();

        for (const item of vps) {
            if (item.startsWith('trojan://')) {
                trojanVps.push(item);
            } else if (item.startsWith('vless://')) {
                vlessVps.push(item);
            } else if (item.startsWith('vmess://')) {
                vmessVps.push(item);
            }
        }

        return {
            trojan: trojanVps,
            vless: vlessVps,
            vmess: vmessVps
        };
    } catch (error: any) {
        throw new Error(`catch on getVps => reason: ${error.message || error}`);
    }
}

async function pushGithub(content: string[], path: string, env: Env): Promise<string> {
    try {
        const contentBase64 = tryBase64Encode(content.join('\n'));

        const url = `https://api.github.com/repos/${env.GITHUB_USERNAME}/${env.REPO_NAME}/contents/${path}`;
        const getCurrentFile = await fetch(url, {
            headers: {
                Authorization: `Bearer ${env.GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'User-Agent': 'Cloudflare-Worker'
            }
        });

        let sha: string | undefined;
        if (getCurrentFile.ok) {
            const fileInfo: { sha: string } = await getCurrentFile.json();
            sha = fileInfo.sha;
        }

        const requestBody: any = {
            message: `auto: update ${path} by ${getTime()}`,
            content: contentBase64,
            branch: env.REPO_BRANCH
        };

        if (sha) {
            requestBody.sha = sha;
        }

        // 发送请求到 GitHub API
        const response = await fetch(url, {
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
            const errorData = await response.text();
            throw new Error(`GitHub API responded with ${response.status}: ${errorData}`);
        }

        return response.json();
    } catch (error: any) {
        throw new Error(`catch on pushGithub => reason: ${error.message || error}`);
    }
}

async function syncClashConfig(env: Env): Promise<{ convertUrl: string; result: string }> {
    try {
        const clashConfigUrl = getClashConfig(env.SUBS, env.REMOTE_CONFIG);
        const convertUrl = getConvertUrl(clashConfigUrl);

        const clashConfg = await fetch(convertUrl).then(res => res.blob());

        const formData = new FormData();
        formData.append('file', clashConfg, 'sub.yml');

        const response = await fetch(env.UPLOAD_URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Failed to upload config: ${response.status} ${response.statusText}`);
        }
        return { convertUrl, result: JSON.stringify(response.json()) };
    } catch (error: any) {
        throw new Error(`cache on sync => reason: ${error.message || error}`);
    }
}

async function init(env: Env): Promise<Response> {
    try {
        const { trojan, vless, vmess } = await getVps(env.LINKS.split(','));
        const vlessVps = getVless(vless);

        const trojanVps = getTrojan(trojan);

        const vmessVps = getVmess(vmess);

        const [vlessRes, troRes, vmessRes] = await Promise.allSettled([
            pushGithub(vlessVps, getPath('vless_api.txt'), env),
            pushGithub(trojanVps, getPath('trojan_api.txt'), env),
            pushGithub(vmessVps, getPath('vmess_api.txt'), env)
        ]);

        const { convertUrl, result } = await syncClashConfig(env);

        return toSuccess({
            vless: vlessRes,
            trojan: troRes,
            vmess: vmessRes,
            sync: { result, convertUrl }
        });
    } catch (error: any) {
        throw new Error(`cache on init => reason: ${error.message || error}`);
    }
}

export default {
    async fetch(_, env, _ctx) {
        try {
            return await init(env);
        } catch (error: any) {
            return toServerError(error.message || error);
        }
    },

    async scheduled(_event, env, _ctx): Promise<void> {
        _ctx.waitUntil(init(env));
    }
} satisfies ExportedHandler<Env>;
