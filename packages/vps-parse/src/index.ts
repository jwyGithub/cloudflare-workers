import { base64Decode } from '@jiangweiye/cloudflare-shared';
import { getVless } from './shared';

function getTime(): string {
    return new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}

async function init(env: Env): Promise<Response> {
    const vlessLinks = await fetch('https://vless.fxxk.dedyn.io/auto').then(async res => base64Decode(await res.text()));

    const content = getVless(vlessLinks);
    const contentBase64 = btoa(content.join('\n'));

    // 首先获取文件的当前 SHA（如果存在）
    const filePath = 'packages/vps-parse/addressesapi.txt'; // 要更新的文件路径
    let sha = '';

    try {
        const url = `https://api.github.com/repos/${env.GITHUB_USERNAME}/${env.REPO_NAME}/contents/${filePath}?ref=${env.REPO_BRANCH}`;
        const fileResponse = await fetch(url, {
            headers: {
                Authorization: `Bearer ${env.GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'User-Agent': 'Cloudflare-Worker'
            }
        });

        if (fileResponse.ok) {
            const fileData: { sha: string } = await fileResponse.json();
            sha = fileData.sha;
        }

        // 准备更新或创建文件的请求体
        const requestBody = {
            message: `auto: update ${filePath} by ${getTime()}`,
            content: contentBase64,
            branch: env.REPO_BRANCH,
            sha
        };

        // 如果文件已存在，添加 sha
        if (sha) {
            requestBody.sha = sha;
        }

        // 发送请求到 GitHub API
        const response = await fetch(`https://api.github.com/repos/${env.GITHUB_USERNAME}/${env.REPO_NAME}/contents/${filePath}`, {
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
        return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return Response.json({
            error
        });
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
