const x = "success", $ = "internal server error", b = new Headers({
  "Content-type": "application/json"
});
new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const C = new Headers({
  "Content-type": "text/html"
}), N = (e, t = x, n = b) => Response.json(
  {
    status: 200,
    message: t,
    data: e
  },
  {
    status: 200,
    statusText: t,
    headers: n
  }
), j = (e, t = C) => new Response(e, {
  headers: t
}), E = (e = $, t = 500, n = b) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: n
  }
);
function O(e) {
  if (!e) return e;
  const t = atob(e), n = new Uint8Array(t.length);
  for (let r = 0; r < t.length; r++)
    n[r] = t.charCodeAt(r);
  return new TextDecoder().decode(n);
}
function k(e, t) {
  const n = (r) => r;
  try {
    return e ? O(e.toString()) : n(e);
  } catch {
    return n(e);
  }
}
function T(e) {
  if (!e) return e;
  const t = new TextEncoder().encode(e.trim());
  let n = "";
  for (let r = 0; r < t.length; r += 1)
    n += String.fromCharCode(t[r]);
  return btoa(n);
}
function J(e, t) {
  const n = (r) => r;
  try {
    return e ? T(e.toString()) : n(e);
  } catch {
    return n(e);
  }
}
function p(e, t) {
  const n = t || ((r) => r);
  try {
    return e ? decodeURIComponent(e) : n(e);
  } catch {
    return n(e);
  }
}
const L = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VPS Sync Dashboard</title>
        <!-- 使用 atom-one-dark 主题，这个主题非常适合终端风格 -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"><\/script>
        <style>
            :root {
                --bg-color: #ffffff;
                --secondary-bg: #f5f5f7;
                --text-color: #1d1d1f;
                --secondary-text: #86868b;
                --accent-color: #0071e3;
                --accent-hover: #0077ed;
                --border-color: #d2d2d7;
                --console-bg: #282c34;
                --shadow-color: rgba(0, 0, 0, 0.1);
            }

            [data-theme='dark'] {
                --bg-color: #000000;
                --secondary-bg: #1d1d1f;
                --text-color: #f5f5f7;
                --secondary-text: #86868b;
                --accent-color: #2997ff;
                --accent-hover: #0077ed;
                --border-color: #424245;
                --console-bg: #1d1d1f;
                --shadow-color: rgba(255, 255, 255, 0.1);
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial,
                    sans-serif;
                margin: 0;
                padding: 0;
                background-color: var(--bg-color);
                color: var(--text-color);
                transition:
                    background-color 0.3s ease,
                    color 0.3s ease;
                min-height: 100vh;
            }

            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }

            .header h1 {
                font-size: 2rem;
                font-weight: 600;
                background: linear-gradient(45deg, var(--accent-color), #5856d6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: -0.5px;
            }

            .controls {
                display: flex;
                gap: 1rem;
                align-items: center;
            }

            .theme-toggle {
                background: var(--secondary-bg);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                transition: all 0.3s ease;
                color: var(--text-color);
            }

            .theme-toggle:hover {
                transform: scale(1.1);
                background: var(--border-color);
            }

            .sync-button {
                background: var(--accent-color);
                color: white;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .sync-button:hover {
                background: var(--accent-hover);
                transform: translateY(-2px);
            }

            .sync-button:disabled {
                background: var(--secondary-text);
                cursor: not-allowed;
                transform: none;
            }

            .connection-status {
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.9rem;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: var(--secondary-bg);
                border: 1px solid var(--border-color);
            }

            .status-indicator {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                display: inline-block;
            }

            .connected .status-indicator {
                background-color: #00c853;
            }
            .disconnected .status-indicator {
                background-color: #ff3b30;
            }
            .connecting .status-indicator {
                background-color: #ff9500;
            }

            .log-container {
                background: var(--console-bg);
                border-radius: 12px;
                padding: 1.5rem;
                height: calc(100vh - 200px);
                overflow-y: auto;
                font-family: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                box-shadow: 0 4px 20px var(--shadow-color);
            }

            /* 在原有的 CSS 中添加以下样式 */
            .log-entry {
                margin-bottom: 0.8rem;
                opacity: 0;
                transform: translateY(10px);
                animation: fadeIn 0.3s ease forwards;
            }

            .log-entry pre {
                margin: 0;
                padding: 0.5rem 0;
            }

            .log-entry code {
                font-family: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                font-size: 0.9rem;
                line-height: 1.5;
            }

            /* 不同类型的日志样式 */
            .log-error code {
                color: #ff3b30;
            }

            .log-success code {
                color: #34c759;
            }

            .log-info code {
                color: #007aff;
            }

            .log-warning code {
                color: #ff9500;
            }

            /* 暗色模式下的颜色调整 */
            [data-theme='dark'] .log-error code {
                color: #ff453a;
            }

            [data-theme='dark'] .log-success code {
                color: #30d158;
            }

            [data-theme='dark'] .log-info code {
                color: #0a84ff;
            }

            [data-theme='dark'] .log-warning code {
                color: #ff9f0a;
            }

            /* 自定义滚动条 */
            .log-container::-webkit-scrollbar {
                width: 8px;
            }

            .log-container::-webkit-scrollbar-track {
                background: transparent;
            }

            .log-container::-webkit-scrollbar-thumb {
                background: var(--border-color);
                border-radius: 4px;
            }

            .log-container::-webkit-scrollbar-thumb:hover {
                background: var(--secondary-text);
            }

            @keyframes fadeIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* 添加响应式设计 */
            @media (max-width: 768px) {
                .container {
                    padding: 1rem;
                }

                .header {
                    flex-direction: column;
                    gap: 1rem;
                    align-items: flex-start;
                }

                .controls {
                    width: 100%;
                    justify-content: space-between;
                }

                .log-container {
                    height: calc(100vh - 250px);
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>VPS Sync Dashboard</h1>
                <div class="controls">
                    <div id="connectionStatus" class="connection-status disconnected">
                        <span class="status-indicator"></span>
                        <span class="status-text">Disconnected</span>
                    </div>
                    <button id="syncButton" class="sync-button">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.65 2.35C12.2 0.9 10.21 0 8 0C3.58 0 0.01 3.58 0.01 8C0.01 12.42 3.58 16 8 16C11.73 16 14.84 13.45 15.73 10H13.65C12.83 12.33 10.61 14 8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C9.66 2 11.14 2.69 12.22 3.78L9 7H16V0L13.65 2.35Z"
                                fill="currentColor"
                            />
                        </svg>
                        Sync Now
                    </button>
                    <button class="theme-toggle" id="themeToggle">🌓</button>
                </div>
            </div>
            <div id="logContainer" class="log-container"></div>
        </div>

        <script>
            class WebSocketClient {
                constructor() {
                    this.maxRetries = 5;
                    this.retryCount = 0;
                    this.retryDelay = 1000;
                    this.connect();
                }

                connect() {
                    this.ws = new WebSocket(\`\${location.protocol === 'https:' ? 'wss:' : 'ws:'}//\${location.host}\`);
                    this.setStatus('connecting');

                    this.ws.onopen = () => {
                        this.retryCount = 0;
                        this.setStatus('connected');
                    };

                    this.ws.onclose = () => {
                        this.setStatus('disconnected');
                        this.retry();
                    };

                    this.ws.onmessage = event => {
                        try {
                            const data = JSON.parse(event.data);
                            this.addLogEntry(data);
                        } catch (error) {
                            console.error('Failed to parse message:', error);
                        }
                    };

                    this.ws.onerror = error => {
                        console.error('WebSocket error:', error);
                        this.setStatus('disconnected');
                    };
                }

                retry() {
                    if (this.retryCount < this.maxRetries) {
                        this.retryCount++;
                        console.log(\`Retrying connection... Attempt \${this.retryCount}\`);
                        setTimeout(() => this.connect(), this.retryDelay * this.retryCount);
                    }
                }

                setStatus(status) {
                    const statusElement = document.getElementById('connectionStatus');
                    const statusTextElement = statusElement.querySelector('.status-text');
                    statusElement.className = \`connection-status \${status}\`;
                    statusTextElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
                }

                addLogEntry(data) {
                    const logContainer = document.getElementById('logContainer');
                    const entry = document.createElement('div');
                    entry.className = \`log-entry log-\${data.type}\`; // 添加类型相关的类名

                    const pre = document.createElement('pre');
                    const code = document.createElement('code');

                    // 根据不同类型设置不同的前缀和样式
                    let prefix = '';
                    switch (data.type) {
                        case 'error':
                            prefix = '❌ ';
                            break;
                        case 'success':
                            prefix = '✅ ';
                            break;
                        case 'info':
                            prefix = 'ℹ️ ';
                            break;
                        case 'warning':
                            prefix = '⚠️ ';
                            break;
                        default:
                            prefix = '• ';
                    }

                    // 添加时间戳
                    const timestamp = new Date().toLocaleTimeString();
                    code.textContent = \`[\${timestamp}] \${prefix}\${data.content}\`;

                    pre.appendChild(code);
                    entry.appendChild(pre);
                    logContainer.appendChild(entry);

                    // 自动滚动到底部
                    logContainer.scrollTop = logContainer.scrollHeight;
                }

                sendMessage(type, content) {
                    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                        this.ws.send(JSON.stringify({ type, content }));
                    } else {
                        this.addLogEntry({
                            type: 'error',
                            content: 'WebSocket 未连接'
                        });
                    }
                }
            }

            const themeToggle = document.getElementById('themeToggle');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

            function setTheme(isDark) {
                document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }

            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme === 'dark');
            } else {
                setTheme(prefersDark.matches);
            }

            themeToggle.addEventListener('click', () => {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                setTheme(!isDark);
            });

            const wsClient = new WebSocketClient();

            document.getElementById('syncButton').addEventListener('click', () => {
                const button = document.getElementById('syncButton');
                button.disabled = true;
                button.textContent = 'Syncing...';

                wsClient.sendMessage('command', 'sync');

                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = 'Sync Now';
                }, 3000);
            });
        <\/script>
    </body>
</html>
`;
function H(e, t) {
  try {
    return {
      type: "vless",
      host: e.hostname,
      port: Number.parseInt(e.port),
      id: e.username,
      remark: p(e.hash)
    };
  } catch (n) {
    throw new Error(`error on parseVlessLink: ${n.message || n} -> ${t}`);
  }
}
function V(e, t) {
  try {
    return {
      type: "trojan",
      host: e.hostname,
      port: Number.parseInt(e.port),
      id: e.username,
      remark: p(e.hash)
    };
  } catch (n) {
    throw new Error(`error on parseTrojanLink: ${n.message || n} -> ${t}`);
  }
}
function A(e) {
  try {
    const t = JSON.parse(k(e));
    return {
      type: "vmess",
      host: t.add,
      port: Number.parseInt(t.port),
      id: t.id,
      remark: p(t.ps)
    };
  } catch (t) {
    throw new Error(`error on parseVmessLink: ${t.message || t} -> ${e}`);
  }
}
function I() {
  return (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
}
function y(e, t) {
  return t.some((n) => n.host === e);
}
function v(e) {
  try {
    return new URL(e);
  } catch {
    return null;
  }
}
function B(e) {
  try {
    const t = [];
    for (const n of e) {
      const r = v(n);
      if (r === null) continue;
      const { host: a, port: l, remark: s } = H(r, n);
      !a.startsWith("127") && !/^[a-z]/i.test(a) && !y(a, t) && t.push({ host: a, port: l, remark: s });
    }
    return t.map((n) => `${n.host}:${n.port}${n.remark}`);
  } catch (t) {
    throw new Error(`catch on getVless : ${t.message || t}`);
  }
}
function P(e) {
  try {
    const t = [];
    for (const n of e) {
      const r = v(n);
      if (r === null) continue;
      const { host: a, port: l, remark: s } = V(r, n);
      !a.startsWith("127") && !/^[a-z]/i.test(a) && !y(a, t) && t.push({ host: a, port: l, remark: s });
    }
    return t.map((n) => `${n.host}:${n.port}${n.remark}`);
  } catch (t) {
    throw new Error(`catch on getTrojan : ${t.message || t}`);
  }
}
function D(e) {
  try {
    const t = [];
    for (const n of e) {
      const { host: r, port: a, remark: l } = A(n.replace("vmess://", ""));
      !r.startsWith("127") && !/^[a-z]/i.test(r) && !y(r, t) && t.push({ host: r, port: a, remark: l });
    }
    return t.map((n) => `${n.host}:${n.port}${n.remark}`);
  } catch (t) {
    throw new Error(`catch on getVmess : ${t.message || t}`);
  }
}
function u(e = 1e3) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
let g = null;
async function o(e) {
  await u(100), g == null || g.send(e);
}
const m = (e) => `packages/vps-parse/address/${e}`;
async function U(e) {
  try {
    const t = [], n = [], r = [], a = [];
    await o(
      JSON.stringify({
        type: "info",
        content: ["开始获取 VPS 数据...", ...e].join(`
`)
      })
    );
    for await (const s of e) {
      await o(
        JSON.stringify({
          type: "info",
          content: `正在获取订阅信息: ${s}`
        })
      );
      const c = await fetch(s, {
        headers: new Headers({
          "User-Agent": "PostmanRuntime/7.43.0",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        }),
        redirect: "manual"
      }), i = await c.text();
      c.ok ? (await o(
        JSON.stringify({
          type: "success",
          content: `成功获取链接数据: ${s}`
        })
      ), t.push(k(i))) : await o(
        JSON.stringify({
          type: "error",
          content: `获取链接数据失败: ${c.status} - ${c.statusText}`
        })
      );
    }
    const l = t.map((s) => s.split(`
`)).flat();
    for await (const s of l)
      await o(
        JSON.stringify({
          type: "info",
          content: `${p(s, (c) => c)}`
        })
      ), s.trim().startsWith("trojan://") ? n.push(s) : s.trim().startsWith("vless://") ? r.push(s) : s.trim().startsWith("vmess://") && a.push(s);
    return await o(
      JSON.stringify({
        type: "success",
        content: `数据分类完成：
trojan: ${n.length}条
vless: ${r.length}条
vmess: ${a.length}条`
      })
    ), {
      trojan: n,
      vless: r,
      vmess: a
    };
  } catch (t) {
    throw await o(
      JSON.stringify({
        type: "error",
        content: `获取VPS数据失败: ${t.message || t}`
      })
    ), new Error(`catch on getVps => reason: ${t.message || t}`);
  }
}
async function f(e, t, n) {
  try {
    await o(
      JSON.stringify({
        type: "info",
        content: `开始推送到 GitHub: ${t}`
      })
    );
    const r = J(e.join(`
`)), a = `https://api.github.com/repos/${n.GITHUB_USERNAME}/${n.REPO_NAME}/contents/${t}`, l = {
      Authorization: `Bearer ${n.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Cloudflare-Worker"
    }, s = async () => {
      const i = await fetch(a, { headers: l });
      if (i.ok)
        return (await i.json()).sha;
    }, c = async (i) => {
      const d = {
        message: `scheduled: update ${t} by ${I()}`,
        content: r,
        branch: n.REPO_BRANCH
      };
      i && (d.sha = i);
      const h = await fetch(a, {
        method: "PUT",
        headers: {
          ...l,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(d)
      });
      if (!h.ok) {
        const S = await h.text();
        throw new Error(`GitHub API responded with ${h.status}: ${S}`);
      }
      return h.json();
    };
    try {
      const i = await s();
      await o(
        JSON.stringify({
          type: "info",
          content: `获取到最新 SHA: ${i || "null"}`
        })
      );
      const d = await c(i);
      return await o(
        JSON.stringify({
          type: "success",
          content: `成功推送到GitHub: ${t}`
        })
      ), d;
    } catch (i) {
      if (i.message.includes("409")) {
        await o(
          JSON.stringify({
            type: "warning",
            content: "检测到文件冲突，正在重试..."
          })
        );
        const d = await s(), h = await c(d);
        return await o(
          JSON.stringify({
            type: "success",
            content: `重试成功，已推送到GitHub: ${t}`
          })
        ), h;
      }
      throw i;
    }
  } catch (r) {
    throw await o(
      JSON.stringify({
        type: "error",
        content: `GitHub推送失败: ${r.message || r}`
      })
    ), new Error(`catch on pushGithub => reason: ${r.message || r}`);
  }
}
async function w(e) {
  try {
    await o(
      JSON.stringify({
        type: "info",
        content: "开始初始化同步流程..."
      })
    );
    const { trojan: t, vless: n, vmess: r } = await U(e.LINKS.split(","));
    await o(
      JSON.stringify({
        type: "info",
        content: "处理VPS数据..."
      })
    );
    const a = B(n.filter(Boolean)), l = P(t.filter(Boolean)), s = D(r.filter(Boolean));
    await o(
      JSON.stringify({
        type: "info",
        content: `vless count: ${a.length}`
      })
    ), await o(
      JSON.stringify({
        type: "info",
        content: `trojan count: ${l.length}`
      })
    ), await o(
      JSON.stringify({
        type: "info",
        content: `vmess count: ${s.length}`
      })
    ), await o(
      JSON.stringify({
        type: "info",
        content: "开始推送到GitHub..."
      })
    );
    const c = {
      vless: "",
      trojan: "",
      vmess: ""
    };
    try {
      c.vless = await f(a, m("vless_api.txt"), e), await u(2e3), c.trojan = await f(l, m("trojan_api.txt"), e), await u(2e3), c.vmess = await f(s, m("vmess_api.txt"), e), await u(2e3);
    } catch (i) {
      await o(
        JSON.stringify({
          type: "error",
          content: `GitHub推送过程中出错: ${i.message || i}`
        })
      );
    }
    return await o(
      JSON.stringify({
        type: "success",
        content: "所有操作已完成！"
      })
    ), N({
      vless: { status: "fulfilled", value: c.vless },
      trojan: { status: "fulfilled", value: c.trojan },
      vmess: { status: "fulfilled", value: c.vmess }
    });
  } catch (t) {
    throw await o(
      JSON.stringify({
        type: "error",
        content: `初始化过程失败: ${t.message || t}`
      })
    ), new Error(`cache on init => reason: ${t.message || t}`);
  }
}
const M = {
  async fetch(e, t, n) {
    try {
      if (e.headers.get("Upgrade") === "websocket") {
        const r = new WebSocketPair(), [a, l] = Object.values(r);
        return l.accept(), g = l, await o(
          JSON.stringify({
            type: "success",
            content: "WebSocket连接已建立"
          })
        ), l.addEventListener("message", async (s) => {
          try {
            const c = JSON.parse(s.data);
            if (c.type === "command" && c.content === "sync") {
              await o(
                JSON.stringify({
                  type: "info",
                  content: "收到同步命令，开始执行..."
                })
              );
              try {
                await w(t), await o(
                  JSON.stringify({
                    type: "success",
                    content: "同步操作完成"
                  })
                );
              } catch (i) {
                await o(
                  JSON.stringify({
                    type: "error",
                    content: `同步操作失败: ${i.message || i}`
                  })
                );
              }
            }
          } catch (c) {
            await o(
              JSON.stringify({
                type: "error",
                content: `处理消息失败: ${c.message || c}`
              })
            );
          }
        }), new Response(null, {
          status: 101,
          webSocket: a
        });
      }
      return j(L);
    } catch (r) {
      return await o(
        JSON.stringify({
          type: "error",
          content: `服务器错误: ${r.message || r}`
        })
      ), E(r.message || r);
    }
  },
  async scheduled(e, t, n) {
    n.waitUntil(w(t));
  }
};
export {
  M as default
};
