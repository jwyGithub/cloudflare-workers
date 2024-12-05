var E = Object.defineProperty;
var T = (r, e, t) => e in r ? E(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var w = (r, e, t) => T(r, typeof e != "symbol" ? e + "" : e, t);
async function N(r) {
  const { token: e, chatId: t, message: s } = r;
  if (!e || !t) return new Response("Missing token or chatId", { status: 400 });
  const o = Array.isArray(s) ? s : [s], i = encodeURIComponent(o.join(`
`));
  try {
    const u = `https://api.telegram.org/bot${e}/sendMessage?chat_id=${t}&parse_mode=HTML&text=${i}`;
    return fetch(u, {
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
const g = {
  retries: 3,
  // 默认最大重试次数
  retryDelay: 1e3,
  // 默认每次重试的间隔时间（毫秒）
  retryOnStatusCodes: [500, 502, 503, 504]
  // 默认重试的状态码
};
class j {
  constructor() {
    w(this, "requestInterceptors", []);
    w(this, "responseInterceptors", []);
  }
  // 添加请求拦截器
  useRequestInterceptor(e) {
    this.requestInterceptors.push(e);
  }
  // 添加响应拦截器
  useResponseInterceptor(e) {
    this.responseInterceptors.push(e);
  }
  // 核心请求方法
  async request(e) {
    let t = { ...e };
    t.retries = t.retries ?? g.retries, t.retryDelay = t.retryDelay ?? g.retryDelay;
    for (const a of this.requestInterceptors)
      t = await a(t);
    if (t.params) {
      const a = new URLSearchParams(t.params).toString();
      t.url += (t.url.includes("?") ? "&" : "?") + a;
    }
    t.method = t.method || "GET";
    const { timeout: s = 1e4 } = t;
    let o = 0;
    const i = new AbortController(), u = e.signal || i.signal, n = async () => {
      o++;
      const a = setTimeout(() => {
        i.abort();
      }, s);
      try {
        const c = await fetch(t.url, {
          method: t.method,
          headers: t.headers,
          body: t.body ? JSON.stringify(t.body) : void 0,
          signal: u
        });
        clearTimeout(a);
        let d = {
          data: c,
          status: c.status,
          statusText: c.statusText,
          headers: c.headers,
          config: t,
          ok: c.ok
        };
        for (const m of this.responseInterceptors)
          d = await m(d);
        return !c.ok && t.retries && o < t.retries ? (await new Promise((m) => setTimeout(m, t.retryDelay)), n()) : d;
      } catch (c) {
        if (c.name === "AbortError")
          throw new Error("Request timed out");
        if (t.retries && o < t.retries)
          return await new Promise((d) => setTimeout(d, t.retryDelay)), n();
        throw c;
      }
    };
    return n();
  }
  /**
   * 使用示例：
   * ```typescript
   * // 基本使用
   * const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
   * console.log(response.data);
   *
   * // 带参数的请求
   * const responseWithParams = await axios.get('https://jsonplaceholder.typicode.com/posts', {
   *   params: { userId: 1 },
   * });
   * console.log(responseWithParams.data);
   * ```
   */
  get(e, t) {
    return this.request({ ...t, url: e, method: "GET" });
  }
  /**
   * 使用示例：
   * ```typescript
   * // 基本使用
   * const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
   *   title: 'foo',
   *   body: 'bar',
   *   userId: 1,
   * });
   * console.log(response.data);
   *
   * // 带参数的请求
   * const responseWithParams = await axios.post('https://jsonplaceholder.typicode.com/posts', {
   *   title: 'foo',
   *   body: 'bar',
   * }, {
   *   params: { userId: 1 },
   * });
   * console.log(responseWithParams.data);
   * ```
   */
  post(e, t, s) {
    return this.request({ ...s, url: e, method: "POST", body: t });
  }
  /**
   * 使用示例：
   * ```typescript
   * // 基本使用
   * const response = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
   *   title: 'foo',
   *   body: 'bar',
   *   userId: 1,
   * });
   * console.log(response.data);
   *
   * // 带参数的请求
   * const responseWithParams = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
   *   title: 'foo',
   *   body: 'bar',
   * }, {
   *   params: { admin: true },
   * });
   * console.log(responseWithParams.data);
   * ```
   */
  put(e, t, s) {
    return this.request({ ...s, url: e, method: "PUT", body: t });
  }
  /**
   * 使用示例：
   * ```typescript
   * // 基本使用
   * const response = await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
   * console.log(response.data);
   *
   * // 带参数的请求
   * const responseWithParams = await axios.delete('https://jsonplaceholder.typicode.com/posts', {
   *   params: { userId: 1 },
   * });
   * console.log(responseWithParams.data);
   * ```
   */
  delete(e, t) {
    return this.request({ ...t, url: e, method: "DELETE" });
  }
}
async function O(r, e) {
  const {
    retries: t = g.retries,
    retryDelay: s = g.retryDelay,
    retryOnStatusCodes: o = g.retryOnStatusCodes,
    onError: i,
    ...u
  } = e;
  let n = 0;
  const a = async () => {
    n++;
    try {
      const c = await P.request({ url: r, ...u });
      if (o.includes(c.status) && n <= t) {
        if (i) {
          const d = i(new Error(`Request failed with status ${c.status}`), n);
          d instanceof Promise && await d;
        }
        return await new Promise((d) => setTimeout(d, s)), a();
      }
      return c;
    } catch (c) {
      if (i) {
        const d = i(c, n);
        d instanceof Promise && await d;
      }
      if (n <= t)
        return await new Promise((d) => setTimeout(d, s)), a();
      throw c;
    }
  };
  return a();
}
const P = new j(), J = "success", L = "internal server error", x = new Headers({
  "Content-type": "application/json"
});
new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const I = new Headers({
  "Content-type": "text/html"
}), A = (r, e = J, t = x) => Response.json(
  {
    status: 200,
    message: e,
    data: r
  },
  {
    status: 200,
    statusText: e,
    headers: t
  }
), R = (r, e = I) => new Response(r, {
  headers: e
}), D = (r = L, e = 500, t = x) => Response.json(
  {
    status: e,
    message: r
  },
  {
    status: e,
    statusText: r,
    headers: t
  }
);
function H(r) {
  if (!r) return r;
  const e = atob(r), t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s++)
    t[s] = e.charCodeAt(s);
  return new TextDecoder().decode(t);
}
function $(r, e) {
  const t = (s) => s;
  try {
    return r ? H(r.toString()) : t(r);
  } catch {
    return t(r);
  }
}
function M(r) {
  if (!r) return r;
  const e = new TextEncoder().encode(r.trim());
  let t = "";
  for (let s = 0; s < e.length; s += 1)
    t += String.fromCharCode(e[s]);
  return btoa(t);
}
function V(r, e) {
  const t = (s) => s;
  try {
    return r ? M(r.toString()) : t(r);
  } catch {
    return t(r);
  }
}
function y(r, e) {
  const t = e || ((s) => s);
  try {
    return r ? decodeURIComponent(r) : t(r);
  } catch {
    return t(r);
  }
}
const B = `<!doctype html>
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
function U(r, e) {
  try {
    return {
      type: "vless",
      host: r.hostname,
      port: Number.parseInt(r.port),
      id: r.username,
      remark: y(r.hash)
    };
  } catch (t) {
    throw new Error(`error on parseVlessLink: ${t.message || t} -> ${e}`);
  }
}
function G(r, e) {
  try {
    return {
      type: "trojan",
      host: r.hostname,
      port: Number.parseInt(r.port),
      id: r.username,
      remark: y(r.hash)
    };
  } catch (t) {
    throw new Error(`error on parseTrojanLink: ${t.message || t} -> ${e}`);
  }
}
function q(r) {
  try {
    const e = JSON.parse($(r));
    return {
      type: "vmess",
      host: e.add,
      port: Number.parseInt(e.port),
      id: e.id,
      remark: y(e.ps)
    };
  } catch (e) {
    throw new Error(`error on parseVmessLink: ${e.message || e} -> ${r}`);
  }
}
function _() {
  return (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
}
function k(r, e) {
  return e.some((t) => t.host === r);
}
function C(r) {
  try {
    return new URL(r);
  } catch {
    return null;
  }
}
function W(r) {
  try {
    const e = [];
    for (const t of r) {
      const s = C(t);
      if (s === null) continue;
      const { host: o, port: i, remark: u } = U(s, t);
      !o.startsWith("127") && !/^[a-z]/i.test(o) && !k(o, e) && e.push({ host: o, port: i, remark: u });
    }
    return e.map((t) => `${t.host}:${t.port}${t.remark}`);
  } catch (e) {
    throw new Error(`catch on getVless : ${e.message || e}`);
  }
}
function z(r) {
  try {
    const e = [];
    for (const t of r) {
      const s = C(t);
      if (s === null) continue;
      const { host: o, port: i, remark: u } = G(s, t);
      !o.startsWith("127") && !/^[a-z]/i.test(o) && !k(o, e) && e.push({ host: o, port: i, remark: u });
    }
    return e.map((t) => `${t.host}:${t.port}${t.remark}`);
  } catch (e) {
    throw new Error(`catch on getTrojan : ${e.message || e}`);
  }
}
function F(r) {
  try {
    const e = [];
    for (const t of r) {
      const { host: s, port: o, remark: i } = q(t.replace("vmess://", ""));
      !s.startsWith("127") && !/^[a-z]/i.test(s) && !k(s, e) && e.push({ host: s, port: o, remark: i });
    }
    return e.map((t) => `${t.host}:${t.port}${t.remark}`);
  } catch (e) {
    throw new Error(`catch on getVmess : ${e.message || e}`);
  }
}
function p(r = 1e3) {
  return new Promise((e) => {
    setTimeout(e, r);
  });
}
let f = null;
async function l(r) {
  await p(100), f == null || f.send(r);
}
const b = (r) => `packages/vps-parse/address/${r}`, h = {
  trojanCount: 0,
  vlessCount: 0,
  vmessCount: 0,
  vlessPushStatus: "error",
  trojanPushStatus: "error",
  vmessPushStatus: "error"
};
async function Y(r, e) {
  try {
    const t = [], s = [], o = [], i = [];
    await l(
      JSON.stringify({
        type: "info",
        content: ["开始获取 VPS 数据...", ...r].join(`
`)
      })
    );
    for await (const n of r) {
      await l(
        JSON.stringify({
          type: "info",
          content: `正在获取订阅信息: ${n}`
        })
      );
      const a = new Request(n, {
        headers: new Headers({
          "User-Agent": "PostmanRuntime/7.43.0",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        })
      }), c = await O(a.url, {
        retries: e,
        headers: a.headers,
        onError: async (d, m) => {
          await l(
            JSON.stringify({
              type: "error",
              content: `正在尝试第 ${m} 次请求... ${d.message || d}`
            })
          );
        }
      });
      if (c.ok) {
        const d = await c.data.text();
        await l(
          JSON.stringify({
            type: "success",
            content: `成功获取链接数据: ${c.config.url}`
          })
        ), t.push($(d));
      } else
        await l(
          JSON.stringify({
            type: "error",
            content: `获取链接数据失败: ${c.config.url}`
          })
        );
    }
    const u = t.map((n) => n.split(`
`)).flat();
    for await (const n of u)
      await l(
        JSON.stringify({
          type: "info",
          content: `${y(n, (a) => a)}`
        })
      ), n.trim().startsWith("trojan://") ? s.push(n) : n.trim().startsWith("vless://") ? o.push(n) : n.trim().startsWith("vmess://") && i.push(n);
    return h.trojanCount = s.length, h.vlessCount = o.length, h.vmessCount = i.length, await l(
      JSON.stringify({
        type: "success",
        content: `数据分类完成：
trojan: ${s.length}条
vless: ${o.length}条
vmess: ${i.length}条`
      })
    ), {
      trojan: s,
      vless: o,
      vmess: i
    };
  } catch (t) {
    throw await l(
      JSON.stringify({
        type: "error",
        content: `获取VPS数据失败: ${t.message || t}`
      })
    ), new Error(`catch on getVps => reason: ${t.message || t}`);
  }
}
async function v(r, e, t) {
  try {
    await l(
      JSON.stringify({
        type: "info",
        content: `开始推送到 GitHub: ${e}`
      })
    );
    const s = V(r.join(`
`)), o = `https://api.github.com/repos/${t.GITHUB_USERNAME}/${t.REPO_NAME}/contents/${e}`, i = {
      Authorization: `Bearer ${t.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Cloudflare-Worker"
    }, u = async () => {
      const a = await fetch(o, { headers: i });
      if (a.ok)
        return (await a.json()).sha;
    }, n = async (a) => {
      const c = {
        message: `scheduled: update ${e} by ${_()}`,
        content: s,
        branch: t.REPO_BRANCH
      };
      a && (c.sha = a);
      const d = await fetch(o, {
        method: "PUT",
        headers: {
          ...i,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(c)
      });
      if (!d.ok) {
        const m = await d.text();
        throw new Error(`GitHub API responded with ${d.status}: ${m}`);
      }
      return d.json();
    };
    try {
      const a = await u();
      await l(
        JSON.stringify({
          type: "info",
          content: `获取到最新 SHA: ${a || "null"}`
        })
      );
      const c = await n(a);
      return await l(
        JSON.stringify({
          type: "success",
          content: `成功推送到GitHub: ${e}`
        })
      ), c;
    } catch (a) {
      if (a.message.includes("409")) {
        await l(
          JSON.stringify({
            type: "warning",
            content: "检测到文件冲突，正在重试..."
          })
        );
        const c = await u(), d = await n(c);
        return await l(
          JSON.stringify({
            type: "success",
            content: `重试成功，已推送到GitHub: ${e}`
          })
        ), d;
      }
      throw a;
    }
  } catch (s) {
    throw await l(
      JSON.stringify({
        type: "error",
        content: `GitHub推送失败: ${s.message || s}`
      })
    ), new Error(`catch on pushGithub => reason: ${s.message || s}`);
  }
}
async function S(r) {
  try {
    await l(
      JSON.stringify({
        type: "info",
        content: "开始初始化同步流程..."
      })
    );
    const { trojan: e, vless: t, vmess: s } = await Y(r.LINKS.split(","), Number(r.RETRY ?? "3"));
    await l(
      JSON.stringify({
        type: "info",
        content: "处理VPS数据..."
      })
    );
    const o = W(t.filter(Boolean)), i = z(e.filter(Boolean)), u = F(s.filter(Boolean));
    await l(
      JSON.stringify({
        type: "success",
        content: `vless count: ${o.length}`
      })
    ), await l(
      JSON.stringify({
        type: "success",
        content: `trojan count: ${i.length}`
      })
    ), await l(
      JSON.stringify({
        type: "success",
        content: `vmess count: ${u.length}`
      })
    ), await l(
      JSON.stringify({
        type: "info",
        content: "开始推送到GitHub..."
      })
    );
    const n = {
      vless: "",
      trojan: "",
      vmess: ""
    };
    try {
      n.vless = await v(o, b("vless_api.txt"), r), h.vlessPushStatus = "success", await p(2e3), n.trojan = await v(i, b("trojan_api.txt"), r), h.trojanPushStatus = "success", await p(2e3), n.vmess = await v(u, b("vmess_api.txt"), r), h.vmessPushStatus = "success", await p(2e3);
    } catch (a) {
      await l(
        JSON.stringify({
          type: "error",
          content: `GitHub推送过程中出错: ${a.message || a}`
        })
      );
    }
    return await l(
      JSON.stringify({
        type: "success",
        content: "所有操作已完成！, 通知telegram"
      })
    ), await N({
      token: r.TELEGRAM_BOT_TOKEN,
      chatId: r.TELEGRAM_CHAT_ID,
      message: [
        `vless: ${h.vlessPushStatus} (${h.vlessCount})`,
        `trojan: ${h.trojanPushStatus} (${h.trojanCount})`,
        `vmess: ${h.vmessPushStatus} (${h.vmessCount})`
      ]
    }), A({
      vless: { status: "fulfilled", value: n.vless },
      trojan: { status: "fulfilled", value: n.trojan },
      vmess: { status: "fulfilled", value: n.vmess }
    });
  } catch (e) {
    throw await l(
      JSON.stringify({
        type: "error",
        content: `初始化过程失败: ${e.message || e}`
      })
    ), new Error(`cache on init => reason: ${e.message || e}`);
  }
}
const Z = {
  async fetch(r, e, t) {
    try {
      if (r.headers.get("Upgrade") === "websocket") {
        const s = new WebSocketPair(), [o, i] = Object.values(s);
        return i.accept(), f = i, await l(
          JSON.stringify({
            type: "success",
            content: "WebSocket连接已建立"
          })
        ), i.addEventListener("message", async (u) => {
          try {
            const n = JSON.parse(u.data);
            if (n.type === "command" && n.content === "sync") {
              await l(
                JSON.stringify({
                  type: "info",
                  content: "收到同步命令，开始执行..."
                })
              );
              try {
                await S(e), await l(
                  JSON.stringify({
                    type: "success",
                    content: "同步操作完成"
                  })
                );
              } catch (a) {
                await l(
                  JSON.stringify({
                    type: "error",
                    content: `同步操作失败: ${a.message || a}`
                  })
                );
              }
            }
          } catch (n) {
            await l(
              JSON.stringify({
                type: "error",
                content: `处理消息失败: ${n.message || n}`
              })
            );
          }
        }), new Response(null, {
          status: 101,
          webSocket: o
        });
      }
      return R(B);
    } catch (s) {
      return await l(
        JSON.stringify({
          type: "error",
          content: `服务器错误: ${s.message || s}`
        })
      ), D(s.message || s);
    }
  },
  async scheduled(r, e, t) {
    t.waitUntil(S(e));
  }
};
export {
  Z as default
};
