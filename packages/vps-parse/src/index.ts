import { Cloudflare } from 'cloudflare';
import { fetchWithRetry, notifyTelegram, tryBase64Decode, tryBase64Encode, tryUrlDecode } from 'cloudflare-tools';
import { HTML_PAGE } from './page';
import { getSS, getSSR, getTime, getTrojan, getVless, getVmess, sleep } from './shared';
import { getSubConfig, sync } from './sync';

let ws: WebSocket | null = null;

async function sendMessage(data: string): Promise<void> {
    await sleep(100);
    ws?.send(data);
}

const getPath = (filePath: string): string => {
    return `packages/vps-parse/address/${filePath}`;
};

const telegramMessageConfig = {
    trojanCount: 0,
    vlessCount: 0,
    vmessCount: 0,
    ssCount: 0,
    ssrCount: 0,
    vlessPushStatus: 'error',
    trojanPushStatus: 'error',
    vmessPushStatus: 'error',
    ssPushStatus: 'error',
    ssrPushStatus: 'error'
};

async function getVps(
    links: string[],
    retry: number
): Promise<{ trojan: string[]; vless: string[]; vmess: string[]; ss: string[]; ssr: string[] }> {
    try {
        const result: string[] = [];
        const trojanVps: string[] = [];
        const vlessVps: string[] = [];
        const vmessVps: string[] = [];
        const ssVps: string[] = [];
        const ssrVps: string[] = [];

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
                    content: `正在获取订阅信息: ${link}`
                })
            );

            const proxyRequest = new Request(link, {
                headers: new Headers({
                    'User-Agent': 'PostmanRuntime/7.43.0',
                    Accept: '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    Connection: 'keep-alive'
                })
            });

            const response = await fetchWithRetry(proxyRequest, {
                retries: retry,
                headers: proxyRequest.headers,
                onError: async (reason, attempt) => {
                    await sendMessage(
                        JSON.stringify({
                            type: 'error',
                            content: `正在尝试第 ${attempt} 次请求... ${reason.message || reason}`
                        })
                    );
                }
            });

            if (response.ok) {
                const linkStr = await response.data.text();
                await sendMessage(
                    JSON.stringify({
                        type: 'success',
                        content: `成功获取链接数据: ${response.config.url}`
                    })
                );
                result.push(tryBase64Decode(linkStr));
            } else {
                await sendMessage(
                    JSON.stringify({
                        type: 'error',
                        content: `获取链接数据失败: ${response.config.url}`
                    })
                );
            }
        }

        const vps = result.map(item => item.split('\n')).flat();

        for await (const item of vps) {
            await sendMessage(
                JSON.stringify({
                    type: 'info',
                    content: `${tryUrlDecode(item, item => item)}`
                })
            );

            if (item.trim().startsWith('trojan://')) {
                trojanVps.push(item);
            } else if (item.trim().startsWith('vless://')) {
                vlessVps.push(item);
            } else if (item.trim().startsWith('vmess://')) {
                vmessVps.push(item);
            } else if (item.trim().startsWith('ss://')) {
                ssVps.push(item);
            } else if (item.trim().startsWith('ssr://')) {
                ssrVps.push(item);
            }
        }

        telegramMessageConfig.trojanCount = trojanVps.length;
        telegramMessageConfig.vlessCount = vlessVps.length;
        telegramMessageConfig.vmessCount = vmessVps.length;
        telegramMessageConfig.ssCount = ssVps.length;
        telegramMessageConfig.ssrCount = ssrVps.length;

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: `数据分类完成：\ntrojan: ${trojanVps.length}条\nvless: ${vlessVps.length}条\nvmess: ${vmessVps.length}条\nss: ${ssVps.length}条\nssr: ${ssrVps.length}条`
            })
        );

        return {
            trojan: trojanVps,
            vless: vlessVps,
            vmess: vmessVps,
            ss: ssVps,
            ssr: ssrVps
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
            const response = await fetchWithRetry(url, { headers });
            if (response.ok) {
                const fileInfo: any = await response.data.json();
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

            const response = await fetchWithRetry(url, {
                method: 'PUT',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.data.text();
                throw new Error(`GitHub API responded with ${response.status}: ${errorData}`);
            }

            return response.data.json();
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

async function init(env: Env): Promise<Response> {
    const cloudflare = new Cloudflare({
        apiToken: env.KV_API_TOKEN,
        apiEmail: env.ACCOUNT_EMAIL
    });

    try {
        await sendMessage(
            JSON.stringify({
                type: 'info',
                content: '开始初始化同步流程...'
            })
        );

        const links = env.LINKS?.split(',') ?? [];

        const { trojan, vless, vmess, ss, ssr } = await getVps(links, Number(env.RETRY ?? '3'));

        await sendMessage(
            JSON.stringify({
                type: 'info',
                content: '处理VPS数据...'
            })
        );

        const vlessVps = getVless(vless.filter(Boolean));
        const trojanVps = getTrojan(trojan.filter(Boolean));
        const vmessVps = getVmess(vmess.filter(Boolean));
        const ssVps = getSS(ss.filter(Boolean));
        const ssrVps = getSSR(ssr.filter(Boolean));

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: `vless count: ${vlessVps.length}`
            })
        );

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: `trojan count: ${trojanVps.length}`
            })
        );

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: `vmess count: ${vmessVps.length}`
            })
        );

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: `ss count: ${ssVps.length}`
            })
        );

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: `ssr count: ${ssrVps.length}`
            })
        );

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
            vmess: '',
            ss: '',
            ssr: ''
        };

        try {
            // 按顺序执行每个推送操作，并在之间添加延时
            results.vless = await pushGithub(vlessVps, getPath('vless_api.txt'), env);
            telegramMessageConfig.vlessPushStatus = 'success';
            await sleep(2000); // 等待2秒

            results.trojan = await pushGithub(trojanVps, getPath('trojan_api.txt'), env);
            telegramMessageConfig.trojanPushStatus = 'success';
            await sleep(2000); // 等待2秒

            results.vmess = await pushGithub(vmessVps, getPath('vmess_api.txt'), env);
            telegramMessageConfig.vmessPushStatus = 'success';
            await sleep(2000); // 等待2秒

            results.ss = await pushGithub(ssVps, getPath('ss_api.txt'), env);
            telegramMessageConfig.ssPushStatus = 'success';
            await sleep(2000); // 等待2秒

            results.ssr = await pushGithub(ssrVps, getPath('ssr_api.txt'), env);
            telegramMessageConfig.ssrPushStatus = 'success';
            await sleep(2000);
        } catch (error: any) {
            await sendMessage(
                JSON.stringify({
                    type: 'error',
                    content: `GitHub推送过程中出错: ${error.message || error}`
                })
            );
        }

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: '所有操作已完成！, 通知telegram'
            })
        );

        await notifyTelegram({
            token: env.TG_TOKEN,
            chatId: env.TG_ID,
            message: [
                `vless: ${telegramMessageConfig.vlessPushStatus} (${telegramMessageConfig.vlessCount})`,
                `trojan: ${telegramMessageConfig.trojanPushStatus} (${telegramMessageConfig.trojanCount})`,
                `vmess: ${telegramMessageConfig.vmessPushStatus} (${telegramMessageConfig.vmessCount})`,
                `ss: ${telegramMessageConfig.ssPushStatus} (${telegramMessageConfig.ssCount})`,
                `ssr: ${telegramMessageConfig.ssrPushStatus} (${telegramMessageConfig.ssrCount})`
            ]
        });

        await sync(env, cloudflare);

        await sendMessage(
            JSON.stringify({
                type: 'success',
                content: '同步完成！'
            })
        );

        return Response.json({
            vless: { status: 'fulfilled', value: results.vless },
            trojan: { status: 'fulfilled', value: results.trojan },
            vmess: { status: 'fulfilled', value: results.vmess },
            ss: { status: 'fulfilled', value: results.ss },
            ssr: { status: 'fulfilled', value: results.ssr }
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
    async fetch(request, env): Promise<Response> {
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

            if (request.method === 'GET' && request.url.includes('/sub.yml')) {
                const config = await getSubConfig(
                    env,
                    new Cloudflare({
                        apiToken: env.KV_API_TOKEN,
                        apiEmail: env.ACCOUNT_EMAIL
                    })
                );
                return new Response(config, {
                    headers: new Headers({
                        'content-type': 'text/yaml;charset=UTF-8'
                    })
                });
            }

            return new Response(HTML_PAGE, {
                headers: new Headers({
                    'content-type': 'text/html;charset=UTF-8'
                })
            });
        } catch (error: any) {
            await sendMessage(
                JSON.stringify({
                    type: 'error',
                    content: `服务器错误: ${error.message || error}`
                })
            );
            return new Response(error.message || error, {
                status: 500,
                headers: new Headers({
                    'content-type': 'text/plain;charset=UTF-8'
                })
            });
        }
    },

    async scheduled(_event, env, ctx): Promise<void> {
        ctx.waitUntil(init(env));
    }
} satisfies ExportedHandler<Env>;
