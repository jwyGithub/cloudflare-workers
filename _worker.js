const N = "success", E = "internal server error", S = new Headers({
  "Content-type": "application/json"
});
new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const j = new Headers({
  "Content-type": "text/html"
}), O = (e, t = N, n = S) => Response.json(
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
), T = (e, t = j) => new Response(e, {
  headers: t
}), J = (e = E, t = 500, n = S) => Response.json(
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
function L(e) {
  if (!e) return e;
  const t = atob(e), n = new Uint8Array(t.length);
  for (let r = 0; r < t.length; r++)
    n[r] = t.charCodeAt(r);
  return new TextDecoder().decode(n);
}
function x(e, t) {
  const n = (r) => r;
  try {
    return e ? L(e.toString()) : n(e);
  } catch {
    return n(e);
  }
}
function H(e) {
  if (!e) return e;
  const t = new TextEncoder().encode(e.trim());
  let n = "";
  for (let r = 0; r < t.length; r += 1)
    n += String.fromCharCode(t[r]);
  return btoa(n);
}
function V(e, t) {
  const n = (r) => r;
  try {
    return e ? H(e.toString()) : n(e);
  } catch {
    return n(e);
  }
}
function m(e, t) {
  const n = t || ((r) => r);
  try {
    return e ? decodeURIComponent(e) : n(e);
  } catch {
    return n(e);
  }
}
const P = `<!doctype html>
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
function A(e, t) {
  try {
    return {
      type: "vless",
      host: e.hostname,
      port: Number.parseInt(e.port),
      id: e.username,
      remark: m(e.hash)
    };
  } catch (n) {
    throw new Error(`error on parseVlessLink: ${n.message || n} -> ${t}`);
  }
}
function I(e, t) {
  try {
    return {
      type: "trojan",
      host: e.hostname,
      port: Number.parseInt(e.port),
      id: e.username,
      remark: m(e.hash)
    };
  } catch (n) {
    throw new Error(`error on parseTrojanLink: ${n.message || n} -> ${t}`);
  }
}
function R(e) {
  try {
    const t = JSON.parse(x(e));
    return {
      type: "vmess",
      host: t.add,
      port: Number.parseInt(t.port),
      id: t.id,
      remark: m(t.ps)
    };
  } catch (t) {
    throw new Error(`error on parseVmessLink: ${t.message || t} -> ${e}`);
  }
}
function B() {
  return (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
}
function w(e, t) {
  return t.some((n) => n.host === e);
}
function $(e) {
  try {
    return new URL(e);
  } catch {
    return null;
  }
}
function U(e) {
  try {
    const t = [];
    for (const n of e) {
      const r = $(n);
      if (r === null) continue;
      const { host: a, port: c, remark: l } = A(r, n);
      !a.startsWith("127") && !/^[a-z]/i.test(a) && !w(a, t) && t.push({ host: a, port: c, remark: l });
    }
    return t.map((n) => `${n.host}:${n.port}${n.remark}`);
  } catch (t) {
    throw new Error(`catch on getVless : ${t.message || t}`);
  }
}
function D(e) {
  try {
    const t = [];
    for (const n of e) {
      const r = $(n);
      if (r === null) continue;
      const { host: a, port: c, remark: l } = I(r, n);
      !a.startsWith("127") && !/^[a-z]/i.test(a) && !w(a, t) && t.push({ host: a, port: c, remark: l });
    }
    return t.map((n) => `${n.host}:${n.port}${n.remark}`);
  } catch (t) {
    throw new Error(`catch on getTrojan : ${t.message || t}`);
  }
}
function W(e) {
  try {
    const t = [];
    for (const n of e) {
      const { host: r, port: a, remark: c } = R(n.replace("vmess://", ""));
      !r.startsWith("127") && !/^[a-z]/i.test(r) && !w(r, t) && t.push({ host: r, port: a, remark: c });
    }
    return t.map((n) => `${n.host}:${n.port}${n.remark}`);
  } catch (t) {
    throw new Error(`catch on getVmess : ${t.message || t}`);
  }
}
function g(e = 1e3) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
async function M(e, t = {}) {
  const { retries: n = 3, onError: r } = t;
  let a = new Error("Unknown error");
  for (let c = 0; c < n; c++)
    try {
      const l = await fetch(e);
      if (!l.ok)
        throw new Error(`HTTP error! status: ${l.status}`);
      return {
        success: !0,
        response: l
      };
    } catch (l) {
      if (a = l, r) {
        const o = r(a, c + 1);
        o instanceof Promise && await o;
      }
      if (c < n - 1) {
        await new Promise((o) => setTimeout(o, 2 ** c * 1e3));
        continue;
      }
    }
  return {
    success: !1,
    error: a
  };
}
let p = null;
async function s(e) {
  await g(100), p == null || p.send(e);
}
const f = (e) => `packages/vps-parse/address/${e}`;
async function z(e, t) {
  try {
    const n = [], r = [], a = [], c = [];
    await s(
      JSON.stringify({
        type: "info",
        content: ["开始获取 VPS 数据...", ...e].join(`
`)
      })
    );
    for await (const o of e) {
      await s(
        JSON.stringify({
          type: "info",
          content: `正在获取订阅信息: ${o}`
        })
      );
      const i = new Request(o, {
        headers: new Headers({
          "User-Agent": "PostmanRuntime/7.43.0",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        })
      }), { response: d, success: u, error: h } = await M(i, {
        retries: t,
        onError: async (k, C) => {
          await s(
            JSON.stringify({
              type: "error",
              content: `正在尝试第 ${C} 次请求... ${k.message || k}`
            })
          );
        }
      }), b = await (d == null ? void 0 : d.text());
      u && b ? (await s(
        JSON.stringify({
          type: "success",
          content: `成功获取链接数据: ${o}`
        })
      ), n.push(x(b))) : await s(
        JSON.stringify({
          type: "error",
          content: `获取链接数据失败: ${(h == null ? void 0 : h.message) || h}`
        })
      );
    }
    const l = n.map((o) => o.split(`
`)).flat();
    for await (const o of l)
      await s(
        JSON.stringify({
          type: "info",
          content: `${m(o, (i) => i)}`
        })
      ), o.trim().startsWith("trojan://") ? r.push(o) : o.trim().startsWith("vless://") ? a.push(o) : o.trim().startsWith("vmess://") && c.push(o);
    return await s(
      JSON.stringify({
        type: "success",
        content: `数据分类完成：
trojan: ${r.length}条
vless: ${a.length}条
vmess: ${c.length}条`
      })
    ), {
      trojan: r,
      vless: a,
      vmess: c
    };
  } catch (n) {
    throw await s(
      JSON.stringify({
        type: "error",
        content: `获取VPS数据失败: ${n.message || n}`
      })
    ), new Error(`catch on getVps => reason: ${n.message || n}`);
  }
}
async function y(e, t, n) {
  try {
    await s(
      JSON.stringify({
        type: "info",
        content: `开始推送到 GitHub: ${t}`
      })
    );
    const r = V(e.join(`
`)), a = `https://api.github.com/repos/${n.GITHUB_USERNAME}/${n.REPO_NAME}/contents/${t}`, c = {
      Authorization: `Bearer ${n.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Cloudflare-Worker"
    }, l = async () => {
      const i = await fetch(a, { headers: c });
      if (i.ok)
        return (await i.json()).sha;
    }, o = async (i) => {
      const d = {
        message: `scheduled: update ${t} by ${B()}`,
        content: r,
        branch: n.REPO_BRANCH
      };
      i && (d.sha = i);
      const u = await fetch(a, {
        method: "PUT",
        headers: {
          ...c,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(d)
      });
      if (!u.ok) {
        const h = await u.text();
        throw new Error(`GitHub API responded with ${u.status}: ${h}`);
      }
      return u.json();
    };
    try {
      const i = await l();
      await s(
        JSON.stringify({
          type: "info",
          content: `获取到最新 SHA: ${i || "null"}`
        })
      );
      const d = await o(i);
      return await s(
        JSON.stringify({
          type: "success",
          content: `成功推送到GitHub: ${t}`
        })
      ), d;
    } catch (i) {
      if (i.message.includes("409")) {
        await s(
          JSON.stringify({
            type: "warning",
            content: "检测到文件冲突，正在重试..."
          })
        );
        const d = await l(), u = await o(d);
        return await s(
          JSON.stringify({
            type: "success",
            content: `重试成功，已推送到GitHub: ${t}`
          })
        ), u;
      }
      throw i;
    }
  } catch (r) {
    throw await s(
      JSON.stringify({
        type: "error",
        content: `GitHub推送失败: ${r.message || r}`
      })
    ), new Error(`catch on pushGithub => reason: ${r.message || r}`);
  }
}
async function v(e) {
  try {
    await s(
      JSON.stringify({
        type: "info",
        content: "开始初始化同步流程..."
      })
    );
    const { trojan: t, vless: n, vmess: r } = await z(e.LINKS.split(","), Number(e.RETRY ?? "3"));
    await s(
      JSON.stringify({
        type: "info",
        content: "处理VPS数据..."
      })
    );
    const a = U(n.filter(Boolean)), c = D(t.filter(Boolean)), l = W(r.filter(Boolean));
    await s(
      JSON.stringify({
        type: "success",
        content: `vless count: ${a.length}`
      })
    ), await s(
      JSON.stringify({
        type: "success",
        content: `trojan count: ${c.length}`
      })
    ), await s(
      JSON.stringify({
        type: "success",
        content: `vmess count: ${l.length}`
      })
    ), await s(
      JSON.stringify({
        type: "info",
        content: "开始推送到GitHub..."
      })
    );
    const o = {
      vless: "",
      trojan: "",
      vmess: ""
    };
    try {
      o.vless = await y(a, f("vless_api.txt"), e), await g(2e3), o.trojan = await y(c, f("trojan_api.txt"), e), await g(2e3), o.vmess = await y(l, f("vmess_api.txt"), e), await g(2e3);
    } catch (i) {
      await s(
        JSON.stringify({
          type: "error",
          content: `GitHub推送过程中出错: ${i.message || i}`
        })
      );
    }
    return await s(
      JSON.stringify({
        type: "success",
        content: "所有操作已完成！"
      })
    ), O({
      vless: { status: "fulfilled", value: o.vless },
      trojan: { status: "fulfilled", value: o.trojan },
      vmess: { status: "fulfilled", value: o.vmess }
    });
  } catch (t) {
    throw await s(
      JSON.stringify({
        type: "error",
        content: `初始化过程失败: ${t.message || t}`
      })
    ), new Error(`cache on init => reason: ${t.message || t}`);
  }
}
const G = {
  async fetch(e, t, n) {
    try {
      if (e.headers.get("Upgrade") === "websocket") {
        const r = new WebSocketPair(), [a, c] = Object.values(r);
        return c.accept(), p = c, await s(
          JSON.stringify({
            type: "success",
            content: "WebSocket连接已建立"
          })
        ), c.addEventListener("message", async (l) => {
          try {
            const o = JSON.parse(l.data);
            if (o.type === "command" && o.content === "sync") {
              await s(
                JSON.stringify({
                  type: "info",
                  content: "收到同步命令，开始执行..."
                })
              );
              try {
                await v(t), await s(
                  JSON.stringify({
                    type: "success",
                    content: "同步操作完成"
                  })
                );
              } catch (i) {
                await s(
                  JSON.stringify({
                    type: "error",
                    content: `同步操作失败: ${i.message || i}`
                  })
                );
              }
            }
          } catch (o) {
            await s(
              JSON.stringify({
                type: "error",
                content: `处理消息失败: ${o.message || o}`
              })
            );
          }
        }), new Response(null, {
          status: 101,
          webSocket: a
        });
      }
      return T(P);
    } catch (r) {
      return await s(
        JSON.stringify({
          type: "error",
          content: `服务器错误: ${r.message || r}`
        })
      ), J(r.message || r);
    }
  },
  async scheduled(e, t, n) {
    n.waitUntil(v(t));
  }
};
export {
  G as default
};
