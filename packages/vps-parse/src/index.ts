import { toServerError, toStream, toSuccess } from '@jiangweiye/cloudflare-service';
import { tryBase64Decode, tryBase64Encode } from '@jiangweiye/cloudflare-shared';
import { HTML_PAGE } from './page';
import { getClashConfig, getConvertUrl, getTime, getTrojan, getVless, getVmess, sleep } from './shared';

let ws: WebSocket | null = null;

async function sendMessage(data: string): Promise<void> {
    await sleep(100);
    ws?.send(data);
}

const getPath = (filePath: string): string => {
    return `packages/vps-parse/address/${filePath}`;
};

async function getVps(links: string[]): Promise<{ trojan: string[]; vless: string[]; vmess: string[] }> {
    try {
        const result: string[] = [];
        const trojanVps: string[] = [];
        const vlessVps: string[] = [];
        const vmessVps: string[] = [];

        await sendMessage(
            JSON.stringify({
                type: 'info',
                content: ['开始获取 VPS 数据...', ...links].join('\n')
            })
        );

        for await (const link of links) {
            await sendMessage(
                JSON.stringify({
                    type: 'info',
                    content: `正在获取链接: ${link}`
                })
            );

            const linkRes = await fetch(link, {
                headers: new Headers({
                    'User-Agent': 'PostmanRuntime/7.43.0',
                    Accept: '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    Connection: 'keep-alive'
                }),
                redirect: 'manual'
            });
            const linkStr = await linkRes.text();
            if (linkRes.ok) {
                await sendMessage(
                    JSON.stringify({
                        type: 'success',
                        content: `成功获取链接数据: ${link}`
                    })
                );
                result.push(tryBase64Decode(linkStr));
            } else {
                await sendMessage(
                    JSON.stringify({
                        type: 'error',
                        content: `获取链接数据失败: ${linkRes.status} - ${linkRes.statusText}`
                    })
                );
            }
        }

        const vps = result.map(item => item.split('\n')).flat();

        for await (const item of vps) {
            await sendMessage(
                JSON.stringify({
                    type: 'info',
                    content: `${decodeURIComponent(item)}`
                })
            );

            if (item.startsWith('trojan://')) {
                trojanVps.push(item);
            } else if (item.startsWith('vless://')) {
                vlessVps.push(item);
            } else if (item.startsWith('vmess://')) {
                vmessVps.push(item);
            }
        }

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: `数据分类完成：\ntrojan: ${trojanVps.length}条\nvless: ${vlessVps.length}条\nvmess: ${vmessVps.length}条`
            })
        );

        return {
            trojan: trojanVps,
            vless: vlessVps,
            vmess: vmessVps
        };
    } catch (error: any) {
        await sendMessage(
            JSON.stringify({
                type: 'error',
                content: `获取VPS数据失败: ${error.message || error}`
            })
        );
        throw new Error(`catch on getVps => reason: ${error.message || error}`);
    }
}

async function pushGithub(content: string[], path: string, env: Env): Promise<string> {
    try {
        await sendMessage(
            JSON.stringify({
                type: 'info',
                content: `开始推送到 GitHub: ${path}`
            })
        );

        const contentBase64 = tryBase64Encode(content.join('\n'));
        const url = `https://api.github.com/repos/${env.GITHUB_USERNAME}/${env.REPO_NAME}/contents/${path}`;

        // 定义通用的请求头
        const headers = {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Cloudflare-Worker'
        };

        // 获取最新的文件信息
        const getLatestSha = async (): Promise<string | undefined> => {
            const response = await fetch(url, { headers });
            if (response.ok) {
                const fileInfo: any = await response.json();
                return fileInfo.sha;
            }
            return undefined;
        };

        // 执行推送操作
        const pushContent = async (sha?: string): Promise<any> => {
            const requestBody: any = {
                message: `scheduled: update ${path} by ${getTime()}`,
                content: contentBase64,
                branch: env.REPO_BRANCH
            };

            if (sha) {
                requestBody.sha = sha;
            }

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`GitHub API responded with ${response.status}: ${errorData}`);
            }

            return response.json();
        };

        // 尝试推送，如果失败则重新获取 SHA 再试一次
        try {
            const sha = await getLatestSha();
            await sendMessage(
                JSON.stringify({
                    type: 'info',
                    content: `获取到最新 SHA: ${sha || 'null'}`
                })
            );

            const result = await pushContent(sha);
            await sendMessage(
                JSON.stringify({
                    type: 'success',
                    content: `成功推送到GitHub: ${path}`
                })
            );
            return result;
        } catch (error: any) {
            if (error.message.includes('409')) {
                // 如果遇到 409 冲突，重新获取最新的 SHA 再试一次
                await sendMessage(
                    JSON.stringify({
                        type: 'warning',
                        content: '检测到文件冲突，正在重试...'
                    })
                );
                const latestSha = await getLatestSha();
                const result = await pushContent(latestSha);
                await sendMessage(
                    JSON.stringify({
                        type: 'success',
                        content: `重试成功，已推送到GitHub: ${path}`
                    })
                );
                return result;
            }
            throw error;
        }
    } catch (error: any) {
        await sendMessage(
            JSON.stringify({
                type: 'error',
                content: `GitHub推送失败: ${error.message || error}`
            })
        );
        throw new Error(`catch on pushGithub => reason: ${error.message || error}`);
    }
}

async function syncClashConfig(env: Env): Promise<{ convertUrl: string; result: string }> {
    try {
        await sendMessage(
            JSON.stringify({
                type: 'info',
                content: '开始同步Clash配置...'
            })
        );

        const clashConfigUrl = getClashConfig(env.SUBS, env.REMOTE_CONFIG);
        const convertUrl = getConvertUrl(clashConfigUrl, env);

        await sendMessage(
            JSON.stringify({
                type: 'info',
                content: '获取Clash配置...'
            })
        );

        const clashConfigRes = await fetch(convertUrl);
        const clashConfig = await clashConfigRes.blob();

        await sendMessage(JSON.stringify({ type: 'info', content: '获取Clash配置成功...' }));

        const formData = new FormData();
        formData.append('file', clashConfig, 'sub.yml');

        await sendMessage(
            JSON.stringify({
                type: 'info',
                content: `上传配置文件... 上传地址：${env.UPLOAD_URL}`
            })
        );

        const response = await fetch(env.UPLOAD_URL, {
            method: 'POST',
            body: formData,
            headers: new Headers({
                ...clashConfigRes.headers
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to upload config: ${response.status} ${response.statusText}`);
        }

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: 'Clash配置同步完成'
            })
        );

        return { convertUrl, result: JSON.stringify(response.json()) };
    } catch (error: any) {
        await sendMessage(
            JSON.stringify({
                type: 'error',
                content: `Clash配置同步失败: ${error.message || error}`
            })
        );
        throw new Error(`cache on sync => reason: ${error.message || error}`);
    }
}

async function init(env: Env): Promise<Response> {
    try {
        await sendMessage(
            JSON.stringify({
                type: 'info',
                content: '开始初始化同步流程...'
            })
        );

        const { trojan, vless, vmess } = await getVps(env.LINKS.split(','));

        await sendMessage(
            JSON.stringify({
                type: 'info',
                content: '处理VPS数据...'
            })
        );

        const vlessVps = getVless(vless);
        const trojanVps = getTrojan(trojan);
        const vmessVps = getVmess(vmess);

        await sendMessage(
            JSON.stringify({
                type: 'info',
                content: '开始推送到GitHub...'
            })
        );

        // 替换并发请求为顺序请求
        const results = {
            vless: '',
            trojan: '',
            vmess: ''
        };

        try {
            // 按顺序执行每个推送操作，并在之间添加延时
            results.vless = await pushGithub(vlessVps, getPath('vless_api.txt'), env);
            await sleep(2000); // 等待2秒

            results.trojan = await pushGithub(trojanVps, getPath('trojan_api.txt'), env);
            await sleep(2000); // 等待2秒

            results.vmess = await pushGithub(vmessVps, getPath('vmess_api.txt'), env);
            await sleep(2000); // 等待2秒
        } catch (error: any) {
            await sendMessage(
                JSON.stringify({
                    type: 'error',
                    content: `GitHub推送过程中出错: ${error.message || error}`
                })
            );
        }

        const { convertUrl, result } = await syncClashConfig(env);

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: '所有操作已完成！'
            })
        );

        return toSuccess({
            vless: { status: 'fulfilled', value: results.vless },
            trojan: { status: 'fulfilled', value: results.trojan },
            vmess: { status: 'fulfilled', value: results.vmess },
            sync: { result, convertUrl }
        });
    } catch (error: any) {
        await sendMessage(
            JSON.stringify({
                type: 'error',
                content: `初始化过程失败: ${error.message || error}`
            })
        );
        throw new Error(`cache on init => reason: ${error.message || error}`);
    }
}

export default {
    async fetch(request, env, _ctx) {
        try {
            // 处理 WebSocket 连接请求
            if (request.headers.get('Upgrade') === 'websocket') {
                const pair = new WebSocketPair();
                const [client, server] = Object.values(pair);

                server.accept();
                ws = server;

                await sendMessage(
                    JSON.stringify({
                        type: 'success',
                        content: 'WebSocket连接已建立'
                    })
                );

                // 处理接收到的消息
                server.addEventListener('message', async event => {
                    try {
                        const data = JSON.parse(event.data as string);

                        if (data.type === 'command' && data.content === 'sync') {
                            await sendMessage(
                                JSON.stringify({
                                    type: 'info',
                                    content: '收到同步命令，开始执行...'
                                })
                            );

                            try {
                                await init(env);
                                await sendMessage(
                                    JSON.stringify({
                                        type: 'success',
                                        content: '同步操作完成'
                                    })
                                );
                            } catch (error: any) {
                                await sendMessage(
                                    JSON.stringify({
                                        type: 'error',
                                        content: `同步操作失败: ${error.message || error}`
                                    })
                                );
                            }
                        }
                    } catch (error: any) {
                        await sendMessage(
                            JSON.stringify({
                                type: 'error',
                                content: `处理消息失败: ${error.message || error}`
                            })
                        );
                    }
                });

                return new Response(null, {
                    status: 101,
                    webSocket: client
                });
            }

            return toStream(
                HTML_PAGE,
                new Headers({
                    'Content-Type': 'text/html'
                })
            );
        } catch (error: any) {
            await sendMessage(
                JSON.stringify({
                    type: 'error',
                    content: `服务器错误: ${error.message || error}`
                })
            );
            return toServerError(error.message || error);
        }
    },

    async scheduled(_event, env, _ctx): Promise<void> {
        _ctx.waitUntil(init(env));
    }
} satisfies ExportedHandler<Env>;
