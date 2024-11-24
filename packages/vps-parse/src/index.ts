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
}

async function pushGithub(content: string[], path: string, env: Env): Promise<string> {
    try {
        const contentBase64 = tryBase64Encode(content.join('\n'));

        // 首先获取文件的当前信息
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

        // 准备更新或创建文件的请求体
        const requestBody: any = {
            message: `auto: update ${path} by ${getTime()}`,
            content: contentBase64,
            branch: env.REPO_BRANCH
        };

        // 只有在文件已存在时才添加 sha
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
        throw new Error(error.message || 'Failed to push to GitHub');
    }
}

async function syncClashConfig(env: Env): Promise<void> {
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
    } catch (error: any) {
        throw new Error(error);
    }
}

async function init(env: Env): Promise<Response> {
    try {
        const { trojan, vless, vmess } = await getVps(env.LINKS.split(','));
        const vlessVps = getVless(vless);

        const trojanVps = getTrojan(trojan);

        const vmessVps = getVmess(vmess);

        const vlessRes = await pushGithub(vlessVps, getPath('vless_api.txt'), env);

        const troRes = await pushGithub(trojanVps, getPath('trojan_api.txt'), env);

        const vmessRes = await pushGithub(vmessVps, getPath('vmess_api.txt'), env);

        syncClashConfig(env);

        return toSuccess({
            vless: vlessRes,
            trojan: troRes,
            vmess: vmessRes
        });
    } catch (error: any) {
        throw new Error(error);
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
