const p = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function S(e, n = p) {
  const {
    retries: t = p.retries,
    retryDelay: r = p.retryDelay,
    retryOnStatusCodes: s = p.retryOnStatusCodes,
    onError: a,
    ...d
  } = n;
  let c = 0;
  const u = async () => {
    c++;
    try {
      let i, l;
      e instanceof Request ? (l = e.url, i = new Request(e, d)) : (l = e.toString(), i = new Request(l, d));
      const g = await fetch(i), b = {
        status: g.status,
        statusText: g.statusText,
        headers: Object.fromEntries(g.headers.entries()),
        data: g,
        config: { url: l, ...d },
        ok: g.ok
      };
      if (s.includes(b.status) && c <= t) {
        if (a) {
          const m = a(new Error(`请求失败，状态码 ${b.status}`), c);
          m instanceof Promise && await m;
        }
        return await new Promise((m) => setTimeout(m, r)), u();
      }
      return b;
    } catch (i) {
      if (a) {
        const l = a(i, c);
        l instanceof Promise && await l;
      }
      if (c <= t)
        return await new Promise((l) => setTimeout(l, r)), u();
      throw i;
    }
  };
  return u();
}
function E(e) {
  if (!e) return e;
  const n = atob(e), t = new Uint8Array(n.length);
  for (let r = 0; r < n.length; r++)
    t[r] = n.charCodeAt(r);
  return new TextDecoder().decode(t);
}
function C(e, n) {
  const t = (r) => r;
  try {
    return e ? E(e.toString()) : t(e);
  } catch {
    return t(e);
  }
}
function j(e) {
  if (!e) return e;
  const n = new TextEncoder().encode(e.trim());
  let t = "";
  for (let r = 0; r < n.length; r += 1)
    t += String.fromCharCode(n[r]);
  return btoa(t);
}
function T(e, n) {
  const t = (r) => r;
  try {
    return e ? j(e.toString()) : t(e);
  } catch {
    return t(e);
  }
}
function w(e, n) {
  const t = n || ((r) => r);
  try {
    return e ? decodeURIComponent(e) : t(e);
  } catch {
    return t(e);
  }
}
async function O(e) {
  const { token: n, chatId: t, message: r } = e;
  if (!n || !t) return new Response("Missing token or chatId", { status: 400 });
  const s = Array.isArray(r) ? r : [r], a = new URLSearchParams();
  a.set("chat_id", t), a.set("parse_mode", "HTML"), a.set("text", s.join(`
`));
  try {
    const d = `https://api.telegram.org/bot${n}/sendMessage?${a.toString()}`;
    return await fetch(d, {
      method: "GET",
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": "Mozilla/5.0 Chrome/90.0.4430.72"
      }
    });
  } catch {
    return Response.error();
  }
}
const J = `<!doctype html>
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
function P(e, n) {
  try {
    return {
      type: "vless",
      host: e.hostname,
      port: Number.parseInt(e.port),
      id: e.username,
      remark: w(e.hash)
    };
  } catch (t) {
    throw new Error(`error on parseVlessLink: ${t.message || t} -> ${n}`);
  }
}
function L(e, n) {
  try {
    return {
      type: "trojan",
      host: e.hostname,
      port: Number.parseInt(e.port),
      id: e.username,
      remark: w(e.hash)
    };
  } catch (t) {
    throw new Error(`error on parseTrojanLink: ${t.message || t} -> ${n}`);
  }
}
function A(e) {
  try {
    const n = JSON.parse(C(e));
    return {
      type: "vmess",
      host: n.add,
      port: Number.parseInt(n.port),
      id: n.id,
      remark: w(n.ps)
    };
  } catch (n) {
    throw new Error(`error on parseVmessLink: ${n.message || n} -> ${e}`);
  }
}
function I() {
  return (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
}
function x(e, n) {
  return n.some((t) => t.host === e);
}
function N(e) {
  try {
    return new URL(e);
  } catch {
    return null;
  }
}
function R(e) {
  try {
    const n = [];
    for (const t of e) {
      const r = N(t);
      if (r === null) continue;
      const { host: s, port: a, remark: d } = P(r, t);
      !s.startsWith("127") && !/^[a-z]/i.test(s) && !x(s, n) && n.push({ host: s, port: a, remark: d });
    }
    return n.map((t) => `${t.host}:${t.port}${t.remark}`);
  } catch (n) {
    throw new Error(`catch on getVless : ${n.message || n}`);
  }
}
function H(e) {
  try {
    const n = [];
    for (const t of e) {
      const r = N(t);
      if (r === null) continue;
      const { host: s, port: a, remark: d } = L(r, t);
      !s.startsWith("127") && !/^[a-z]/i.test(s) && !x(s, n) && n.push({ host: s, port: a, remark: d });
    }
    return n.map((t) => `${t.host}:${t.port}${t.remark}`);
  } catch (n) {
    throw new Error(`catch on getTrojan : ${n.message || n}`);
  }
}
function V(e) {
  try {
    const n = [];
    for (const t of e) {
      const { host: r, port: s, remark: a } = A(t.replace("vmess://", ""));
      !r.startsWith("127") && !/^[a-z]/i.test(r) && !x(r, n) && n.push({ host: r, port: s, remark: a });
    }
    return n.map((t) => `${t.host}:${t.port}${t.remark}`);
  } catch (n) {
    throw new Error(`catch on getVmess : ${n.message || n}`);
  }
}
function f(e = 1e3) {
  return new Promise((n) => {
    setTimeout(n, e);
  });
}
let y = null;
async function o(e) {
  await f(100), y == null || y.send(e);
}
const v = (e) => `packages/vps-parse/address/${e}`, h = {
  trojanCount: 0,
  vlessCount: 0,
  vmessCount: 0,
  vlessPushStatus: "error",
  trojanPushStatus: "error",
  vmessPushStatus: "error"
};
async function D(e, n) {
  try {
    const t = [], r = [], s = [], a = [];
    await o(
      JSON.stringify({
        type: "info",
        content: ["开始获取 VPS 数据...", ...e].join(`
`)
      })
    );
    for await (const c of e) {
      await o(
        JSON.stringify({
          type: "info",
          content: `正在获取订阅信息: ${c}`
        })
      );
      const u = new Request(c, {
        headers: new Headers({
          "User-Agent": "PostmanRuntime/7.43.0",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        })
      }), i = await S(u, {
        retries: n,
        headers: u.headers,
        onError: async (l, g) => {
          await o(
            JSON.stringify({
              type: "error",
              content: `正在尝试第 ${g} 次请求... ${l.message || l}`
            })
          );
        }
      });
      if (i.ok) {
        const l = await i.data.text();
        await o(
          JSON.stringify({
            type: "success",
            content: `成功获取链接数据: ${i.config.url}`
          })
        ), t.push(C(l));
      } else
        await o(
          JSON.stringify({
            type: "error",
            content: `获取链接数据失败: ${i.config.url}`
          })
        );
    }
    const d = t.map((c) => c.split(`
`)).flat();
    for await (const c of d)
      await o(
        JSON.stringify({
          type: "info",
          content: `${w(c, (u) => u)}`
        })
      ), c.trim().startsWith("trojan://") ? r.push(c) : c.trim().startsWith("vless://") ? s.push(c) : c.trim().startsWith("vmess://") && a.push(c);
    return h.trojanCount = r.length, h.vlessCount = s.length, h.vmessCount = a.length, await o(
      JSON.stringify({
        type: "success",
        content: `数据分类完成：
trojan: ${r.length}条
vless: ${s.length}条
vmess: ${a.length}条`
      })
    ), {
      trojan: r,
      vless: s,
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
async function k(e, n, t) {
  try {
    await o(
      JSON.stringify({
        type: "info",
        content: `开始推送到 GitHub: ${n}`
      })
    );
    const r = T(e.join(`
`)), s = `https://api.github.com/repos/${t.GITHUB_USERNAME}/${t.REPO_NAME}/contents/${n}`, a = {
      Authorization: `Bearer ${t.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Cloudflare-Worker"
    }, d = async () => {
      const u = await S(s, { headers: a });
      if (u.ok)
        return (await u.data.json()).sha;
    }, c = async (u) => {
      const i = {
        message: `scheduled: update ${n} by ${I()}`,
        content: r,
        branch: t.REPO_BRANCH
      };
      u && (i.sha = u);
      const l = await S(s, {
        method: "PUT",
        headers: {
          ...a,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(i)
      });
      if (!l.ok) {
        const g = await l.data.text();
        throw new Error(`GitHub API responded with ${l.status}: ${g}`);
      }
      return l.data.json();
    };
    try {
      const u = await d();
      await o(
        JSON.stringify({
          type: "info",
          content: `获取到最新 SHA: ${u || "null"}`
        })
      );
      const i = await c(u);
      return await o(
        JSON.stringify({
          type: "success",
          content: `成功推送到GitHub: ${n}`
        })
      ), i;
    } catch (u) {
      if (u.message.includes("409")) {
        await o(
          JSON.stringify({
            type: "warning",
            content: "检测到文件冲突，正在重试..."
          })
        );
        const i = await d(), l = await c(i);
        return await o(
          JSON.stringify({
            type: "success",
            content: `重试成功，已推送到GitHub: ${n}`
          })
        ), l;
      }
      throw u;
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
async function $(e) {
  var n;
  try {
    await o(
      JSON.stringify({
        type: "info",
        content: "开始初始化同步流程..."
      })
    );
    const t = ((n = e.LINKS) == null ? void 0 : n.split(",")) ?? [], { trojan: r, vless: s, vmess: a } = await D(t, Number(e.RETRY ?? "3"));
    await o(
      JSON.stringify({
        type: "info",
        content: "处理VPS数据..."
      })
    );
    const d = R(s.filter(Boolean)), c = H(r.filter(Boolean)), u = V(a.filter(Boolean));
    await o(
      JSON.stringify({
        type: "success",
        content: `vless count: ${d.length}`
      })
    ), await o(
      JSON.stringify({
        type: "success",
        content: `trojan count: ${c.length}`
      })
    ), await o(
      JSON.stringify({
        type: "success",
        content: `vmess count: ${u.length}`
      })
    ), await o(
      JSON.stringify({
        type: "info",
        content: "开始推送到GitHub..."
      })
    );
    const i = {
      vless: "",
      trojan: "",
      vmess: ""
    };
    try {
      i.vless = await k(d, v("vless_api.txt"), e), h.vlessPushStatus = "success", await f(2e3), i.trojan = await k(c, v("trojan_api.txt"), e), h.trojanPushStatus = "success", await f(2e3), i.vmess = await k(u, v("vmess_api.txt"), e), h.vmessPushStatus = "success", await f(2e3);
    } catch (l) {
      await o(
        JSON.stringify({
          type: "error",
          content: `GitHub推送过程中出错: ${l.message || l}`
        })
      );
    }
    return await o(
      JSON.stringify({
        type: "success",
        content: "所有操作已完成！, 通知telegram"
      })
    ), await O({
      token: e.TG_TOKEN,
      chatId: e.TG_ID,
      message: [
        `vless: ${h.vlessPushStatus} (${h.vlessCount})`,
        `trojan: ${h.trojanPushStatus} (${h.trojanCount})`,
        `vmess: ${h.vmessPushStatus} (${h.vmessCount})`
      ]
    }), Response.json({
      vless: { status: "fulfilled", value: i.vless },
      trojan: { status: "fulfilled", value: i.trojan },
      vmess: { status: "fulfilled", value: i.vmess }
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
  async fetch(e, n) {
    try {
      if (e.headers.get("Upgrade") === "websocket") {
        const t = new WebSocketPair(), [r, s] = Object.values(t);
        return s.accept(), y = s, await o(
          JSON.stringify({
            type: "success",
            content: "WebSocket连接已建立"
          })
        ), s.addEventListener("message", async (a) => {
          try {
            const d = JSON.parse(a.data);
            if (d.type === "command" && d.content === "sync") {
              await o(
                JSON.stringify({
                  type: "info",
                  content: "收到同步命令，开始执行..."
                })
              );
              try {
                await $(n), await o(
                  JSON.stringify({
                    type: "success",
                    content: "同步操作完成"
                  })
                );
              } catch (c) {
                await o(
                  JSON.stringify({
                    type: "error",
                    content: `同步操作失败: ${c.message || c}`
                  })
                );
              }
            }
          } catch (d) {
            await o(
              JSON.stringify({
                type: "error",
                content: `处理消息失败: ${d.message || d}`
              })
            );
          }
        }), new Response(null, {
          status: 101,
          webSocket: r
        });
      }
      return new Response(J, {
        headers: new Headers({
          "content-type": "text/html;charset=UTF-8"
        })
      });
    } catch (t) {
      return await o(
        JSON.stringify({
          type: "error",
          content: `服务器错误: ${t.message || t}`
        })
      ), new Response(t.message || t, {
        status: 500,
        headers: new Headers({
          "content-type": "text/plain;charset=UTF-8"
        })
      });
    }
  },
  async scheduled(e, n, t) {
    t.waitUntil($(n));
  }
};
export {
  M as default
};
