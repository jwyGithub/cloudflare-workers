const Kt = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function qt(s, t = Kt) {
  const {
    retries: e = Kt.retries,
    retryDelay: n = Kt.retryDelay,
    retryOnStatusCodes: r = Kt.retryOnStatusCodes,
    onError: i,
    ...c
  } = t;
  let a = 0;
  const l = async () => {
    a++;
    try {
      let p, $;
      s instanceof Request ? ($ = s.url, p = new Request(s, c)) : ($ = s.toString(), p = new Request($, c));
      const P = await fetch(p), S = {
        status: P.status,
        statusText: P.statusText,
        headers: Object.fromEntries(P.headers.entries()),
        data: P,
        config: { url: $, ...c },
        ok: P.ok
      };
      if (r.includes(S.status) && a <= e) {
        if (i) {
          const y = i(new Error(`请求失败，状态码 ${S.status}`), a);
          y instanceof Promise && await y;
        }
        return await new Promise((y) => setTimeout(y, n)), l();
      }
      return S;
    } catch (p) {
      if (i) {
        const $ = i(p, a);
        $ instanceof Promise && await $;
      }
      if (a <= e)
        return await new Promise(($) => setTimeout($, n)), l();
      throw p;
    }
  };
  return l();
}
function ff(s) {
  if (!s) return s;
  const t = atob(s), e = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++)
    e[n] = t.charCodeAt(n);
  return new TextDecoder().decode(e);
}
function og(s, t) {
  const e = (n) => n;
  try {
    return s ? ff(s.toString()) : e(s);
  } catch {
    return e(s);
  }
}
function wf(s) {
  if (!s) return s;
  const t = new TextEncoder().encode(s.trim());
  let e = "";
  for (let n = 0; n < t.length; n += 1)
    e += String.fromCharCode(t[n]);
  return btoa(e);
}
function mf(s, t) {
  const e = (n) => n;
  try {
    return s ? wf(s.toString()) : e(s);
  } catch {
    return e(s);
  }
}
function ml(s, t) {
  const e = t || ((n) => n);
  try {
    return s ? decodeURIComponent(s) : e(s);
  } catch {
    return e(s);
  }
}
async function $f(s) {
  const { token: t, chatId: e, message: n } = s;
  if (!t || !e) return new Response("Missing token or chatId", { status: 400 });
  const r = Array.isArray(n) ? n : [n], i = new URLSearchParams();
  i.set("chat_id", e), i.set("parse_mode", "HTML"), i.set("text", r.join(`
`));
  try {
    const c = `https://api.telegram.org/bot${t}/sendMessage?${i.toString()}`;
    return await fetch(c, {
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
const yf = `<!doctype html>
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
function bf(s, t) {
  try {
    return {
      type: "vless",
      host: s.hostname,
      port: Number.parseInt(s.port),
      id: s.username,
      remark: ml(s.hash)
    };
  } catch (e) {
    throw new Error(`error on parseVlessLink: ${e.message || e} -> ${t}`);
  }
}
function Pf(s, t) {
  try {
    return {
      type: "trojan",
      host: s.hostname,
      port: Number.parseInt(s.port),
      id: s.username,
      remark: ml(s.hash)
    };
  } catch (e) {
    throw new Error(`error on parseTrojanLink: ${e.message || e} -> ${t}`);
  }
}
function vf(s) {
  try {
    const t = JSON.parse(og(s));
    return {
      type: "vmess",
      host: t.add,
      port: Number.parseInt(t.port),
      id: t.id,
      remark: ml(t.ps)
    };
  } catch (t) {
    throw new Error(`error on parseVmessLink: ${t.message || t} -> ${s}`);
  }
}
function Uf() {
  return (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
}
function zd(s, t) {
  return t.some((e) => e.host === s);
}
function ag(s) {
  try {
    return new URL(s);
  } catch {
    return null;
  }
}
function xf(s) {
  try {
    const t = [];
    for (const e of s) {
      const n = ag(e);
      if (n === null) continue;
      const { host: r, port: i, remark: c } = bf(n, e);
      !r.startsWith("127") && !/^[a-z]/i.test(r) && !zd(r, t) && t.push({ host: r, port: i, remark: c });
    }
    return t.map((e) => `${e.host}:${e.port}${e.remark}`);
  } catch (t) {
    throw new Error(`catch on getVless : ${t.message || t}`);
  }
}
function Sf(s) {
  try {
    const t = [];
    for (const e of s) {
      const n = ag(e);
      if (n === null) continue;
      const { host: r, port: i, remark: c } = Pf(n, e);
      !r.startsWith("127") && !/^[a-z]/i.test(r) && !zd(r, t) && t.push({ host: r, port: i, remark: c });
    }
    return t.map((e) => `${e.host}:${e.port}${e.remark}`);
  } catch (t) {
    throw new Error(`catch on getTrojan : ${t.message || t}`);
  }
}
function zf(s) {
  try {
    const t = [];
    for (const e of s) {
      const { host: n, port: r, remark: i } = vf(e.replace("vmess://", ""));
      !n.startsWith("127") && !/^[a-z]/i.test(n) && !zd(n, t) && t.push({ host: n, port: r, remark: i });
    }
    return t.map((e) => `${e.host}:${e.port}${e.remark}`);
  } catch (t) {
    throw new Error(`catch on getVmess : ${t.message || t}`);
  }
}
function Qt(s = 1e3) {
  return new Promise((t) => {
    setTimeout(t, s);
  });
}
const zt = "3.5.0";
let pp = !1, Zt, ug, lg, Pd, Od, dg, hg, _g;
function Of(s, t = { auto: !1 }) {
  if (pp)
    throw new Error(`you must \`import 'cloudflare/shims/${s.kind}'\` before importing anything else from cloudflare`);
  if (Zt)
    throw new Error(`can't \`import 'cloudflare/shims/${s.kind}'\` after \`import 'cloudflare/shims/${Zt}'\``);
  pp = t.auto, Zt = s.kind, ug = s.fetch, lg = s.FormData, Pd = s.File, Od = s.getMultipartRequestOptions, dg = s.getDefaultAgent, hg = s.fileFromPath, _g = s.isFsReadStream;
}
class Af {
  constructor(t) {
    this.body = t;
  }
  get [Symbol.toStringTag]() {
    return "MultipartBody";
  }
}
function Rf({ manuallyImported: s } = {}) {
  const t = s ? "You may need to use polyfills" : "Add one of these imports before your first `import … from 'cloudflare'`:\n- `import 'cloudflare/shims/node'` (if you're running on Node)\n- `import 'cloudflare/shims/web'` (otherwise)\n";
  let e, n, r, i;
  try {
    e = fetch, n = Request, r = Response, i = Headers;
  } catch (c) {
    throw new Error(`this environment is missing the following Web Fetch API type: ${c.message}. ${t}`);
  }
  return {
    kind: "web",
    fetch: e,
    Request: n,
    Response: r,
    Headers: i,
    FormData: (
      // @ts-ignore
      typeof FormData < "u" ? FormData : class {
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'FormData' is undefined. ${t}`);
        }
      }
    ),
    Blob: typeof Blob < "u" ? Blob : class {
      constructor() {
        throw new Error(`file uploads aren't supported in this environment yet as 'Blob' is undefined. ${t}`);
      }
    },
    File: (
      // @ts-ignore
      typeof File < "u" ? File : class {
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'File' is undefined. ${t}`);
        }
      }
    ),
    ReadableStream: (
      // @ts-ignore
      typeof ReadableStream < "u" ? ReadableStream : class {
        // @ts-ignore
        constructor() {
          throw new Error(`streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${t}`);
        }
      }
    ),
    getMultipartRequestOptions: async (c, a) => ({
      ...a,
      body: new Af(c)
    }),
    getDefaultAgent: (c) => {
    },
    fileFromPath: () => {
      throw new Error("The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/cloudflare/cloudflare-typescript#file-uploads");
    },
    isFsReadStream: (c) => !1
  };
}
Zt || Of(Rf(), { auto: !0 });
const pg = (s) => s != null && typeof s == "object" && typeof s.url == "string" && typeof s.blob == "function", gg = (s) => s != null && typeof s == "object" && typeof s.name == "string" && typeof s.lastModified == "number" && Ad(s), Ad = (s) => s != null && typeof s == "object" && typeof s.size == "number" && typeof s.type == "string" && typeof s.text == "function" && typeof s.slice == "function" && typeof s.arrayBuffer == "function", fg = (s) => gg(s) || pg(s) || _g(s);
async function wg(s, t, e) {
  var r;
  if (s = await s, e ?? (e = gg(s) ? { lastModified: s.lastModified, type: s.type } : {}), pg(s)) {
    const i = await s.blob();
    return t || (t = new URL(s.url).pathname.split(/[\\/]/).pop() ?? "unknown_file"), new Pd([i], t, e);
  }
  const n = await If(s);
  if (t || (t = Lf(s) ?? "unknown_file"), !e.type) {
    const i = (r = n[0]) == null ? void 0 : r.type;
    typeof i == "string" && (e = { ...e, type: i });
  }
  return new Pd(n, t, e);
}
async function If(s) {
  var e;
  let t = [];
  if (typeof s == "string" || ArrayBuffer.isView(s) || // includes Uint8Array, Buffer, etc.
  s instanceof ArrayBuffer)
    t.push(s);
  else if (Ad(s))
    t.push(await s.arrayBuffer());
  else if (Zf(s))
    for await (const n of s)
      t.push(n);
  else
    throw new Error(`Unexpected data type: ${typeof s}; constructor: ${(e = s == null ? void 0 : s.constructor) == null ? void 0 : e.name}; props: ${kf(s)}`);
  return t;
}
function kf(s) {
  return `[${Object.getOwnPropertyNames(s).map((e) => `"${e}"`).join(", ")}]`;
}
function Lf(s) {
  var t;
  return Ll(s.name) || Ll(s.filename) || // For fs.ReadStream
  ((t = Ll(s.path)) == null ? void 0 : t.split(/[\\/]/).pop());
}
const Ll = (s) => {
  if (typeof s == "string")
    return s;
  if (typeof Buffer < "u" && s instanceof Buffer)
    return String(s);
}, Zf = (s) => s != null && typeof s == "object" && typeof s[Symbol.asyncIterator] == "function", gp = (s) => s && typeof s == "object" && s.body && s[Symbol.toStringTag] === "MultipartBody", mg = async (s) => {
  if (!vd(s.body))
    return s;
  const t = await $g(s.body);
  return Od(t, s);
}, tt = async (s) => {
  const t = await $g(s.body);
  return Od(t, s);
}, $g = async (s) => {
  const t = new lg();
  return await Promise.all(Object.entries(s || {}).map(([e, n]) => Ud(t, e, n))), t;
}, vd = (s) => {
  if (fg(s))
    return !0;
  if (Array.isArray(s))
    return s.some(vd);
  if (s && typeof s == "object") {
    for (const t in s)
      if (vd(s[t]))
        return !0;
  }
  return !1;
}, Ud = async (s, t, e) => {
  if (e !== void 0) {
    if (e == null)
      throw new TypeError(`Received null for "${t}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
      s.append(t, String(e));
    else if (fg(e)) {
      const n = await wg(e);
      s.append(t, n);
    } else if (Array.isArray(e))
      await Promise.all(e.map((n) => Ud(s, t + "[]", n)));
    else if (typeof e == "object")
      await Promise.all(Object.entries(e).map(([n, r]) => Ud(s, `${t}[${n}]`, r)));
    else
      throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${e} instead`);
  }
};
var Tf = function(s, t, e, n, r) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !r) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? s !== t || !r : !t.has(s)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? r.call(s, e) : r ? r.value = e : t.set(s, e), e;
}, Cf = function(s, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? s !== t || !n : !t.has(s)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(s) : n ? n.value : t.get(s);
}, Jt;
async function yg(s) {
  const { response: t } = s;
  if (t.status === 204)
    return null;
  if (s.options.__binaryResponse)
    return t;
  const e = t.headers.get("content-type");
  if ((e == null ? void 0 : e.includes("application/json")) || (e == null ? void 0 : e.includes("application/vnd.api+json"))) {
    const i = await t.json();
    return Tt("response", t.status, t.url, t.headers, i), i;
  }
  const r = await t.text();
  return Tt("response", t.status, t.url, t.headers, r), r;
}
class $l extends Promise {
  constructor(t, e = yg) {
    super((n) => {
      n(null);
    }), this.responsePromise = t, this.parseResponse = e;
  }
  _thenUnwrap(t) {
    return new $l(this.responsePromise, async (e) => t(await this.parseResponse(e)));
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'cloudflare'`:
   * - `import 'cloudflare/shims/node'` (if you're running on Node)
   * - `import 'cloudflare/shims/web'` (otherwise)
   */
  asResponse() {
    return this.responsePromise.then((t) => t.response);
  }
  /**
   * Gets the parsed response data and the raw `Response` instance.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'cloudflare'`:
   * - `import 'cloudflare/shims/node'` (if you're running on Node)
   * - `import 'cloudflare/shims/web'` (otherwise)
   */
  async withResponse() {
    const [t, e] = await Promise.all([this.parse(), this.asResponse()]);
    return { data: t, response: e };
  }
  parse() {
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then(this.parseResponse)), this.parsedPromise;
  }
  then(t, e) {
    return this.parse().then(t, e);
  }
  catch(t) {
    return this.parse().catch(t);
  }
  finally(t) {
    return this.parse().finally(t);
  }
}
class Ef {
  constructor({
    baseURL: t,
    maxRetries: e = 2,
    timeout: n = 6e4,
    // 1 minute
    httpAgent: r,
    fetch: i
  }) {
    this.baseURL = t, this.maxRetries = Zl("maxRetries", e), this.timeout = Zl("timeout", n), this.httpAgent = r, this.fetch = i ?? ug;
  }
  authHeaders(t) {
    return {};
  }
  /**
   * Override this to add your own default headers, for example:
   *
   *  {
   *    ...super.defaultHeaders(),
   *    Authorization: 'Bearer 123',
   *  }
   */
  defaultHeaders(t) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": this.getUserAgent(),
      ...Bf(),
      ...this.authHeaders(t)
    };
  }
  /**
   * Override this to add your own headers validation:
   */
  validateHeaders(t, e) {
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${Wf()}`;
  }
  get(t, e) {
    return this.methodRequest("get", t, e);
  }
  post(t, e) {
    return this.methodRequest("post", t, e);
  }
  patch(t, e) {
    return this.methodRequest("patch", t, e);
  }
  put(t, e) {
    return this.methodRequest("put", t, e);
  }
  delete(t, e) {
    return this.methodRequest("delete", t, e);
  }
  methodRequest(t, e, n) {
    return this.request(Promise.resolve(n).then(async (r) => {
      const i = r && Ad(r == null ? void 0 : r.body) ? new DataView(await r.body.arrayBuffer()) : (r == null ? void 0 : r.body) instanceof DataView ? r.body : (r == null ? void 0 : r.body) instanceof ArrayBuffer ? new DataView(r.body) : r && ArrayBuffer.isView(r == null ? void 0 : r.body) ? new DataView(r.body.buffer) : r == null ? void 0 : r.body;
      return { method: t, path: e, ...r, body: i };
    }));
  }
  getAPIList(t, e, n) {
    return this.requestAPIList(e, { method: "get", path: t, ...n });
  }
  calculateContentLength(t) {
    if (typeof t == "string") {
      if (typeof Buffer < "u")
        return Buffer.byteLength(t, "utf8").toString();
      if (typeof TextEncoder < "u")
        return new TextEncoder().encode(t).length.toString();
    } else if (ArrayBuffer.isView(t))
      return t.byteLength.toString();
    return null;
  }
  buildRequest(t) {
    var b;
    const { method: e, path: n, query: r, headers: i = {} } = t, c = ArrayBuffer.isView(t.body) || t.__binaryRequest && typeof t.body == "string" ? t.body : gp(t.body) ? t.body.body : t.body ? JSON.stringify(t.body, null, 2) : null, a = this.calculateContentLength(c), l = this.buildURL(n, r);
    "timeout" in t && Zl("timeout", t.timeout);
    const p = t.timeout ?? this.timeout, $ = t.httpAgent ?? this.httpAgent ?? dg(l), P = p + 1e3;
    typeof ((b = $ == null ? void 0 : $.options) == null ? void 0 : b.timeout) == "number" && P > ($.options.timeout ?? 0) && ($.options.timeout = P), this.idempotencyHeader && e !== "get" && (t.idempotencyKey || (t.idempotencyKey = this.defaultIdempotencyKey()), i[this.idempotencyHeader] = t.idempotencyKey);
    const S = this.buildHeaders({ options: t, headers: i, contentLength: a });
    return { req: {
      method: e,
      ...c && { body: c },
      headers: S,
      ...$ && { agent: $ },
      // @ts-ignore node-fetch uses a custom AbortSignal type that is
      // not compatible with standard web types
      signal: t.signal ?? null
    }, url: l, timeout: p };
  }
  buildHeaders({ options: t, headers: e, contentLength: n }) {
    const r = {};
    n && (r["content-length"] = n);
    const i = this.defaultHeaders(t);
    return $p(r, i), $p(r, e), gp(t.body) && Zt !== "node" && delete r["content-type"], this.validateHeaders(r, e), r;
  }
  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  async prepareOptions(t) {
  }
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  async prepareRequest(t, { url: e, options: n }) {
  }
  parseHeaders(t) {
    return t ? Symbol.iterator in t ? Object.fromEntries(Array.from(t).map((e) => [...e])) : { ...t } : {};
  }
  makeStatusError(t, e, n, r) {
    return q.generate(t, e, n, r);
  }
  request(t, e = null) {
    return new $l(this.makeRequest(t, e));
  }
  async makeRequest(t, e) {
    var $, P;
    const n = await t;
    e == null && (e = n.maxRetries ?? this.maxRetries), await this.prepareOptions(n);
    const { req: r, url: i, timeout: c } = this.buildRequest(n);
    if (await this.prepareRequest(r, { url: i, options: n }), Tt("request", i, n, r.headers), ($ = n.signal) != null && $.aborted)
      throw new Sd();
    const a = new AbortController(), l = await this.fetchWithTimeout(i, r, c, a).catch(xd);
    if (l instanceof Error) {
      if ((P = n.signal) != null && P.aborted)
        throw new Sd();
      if (e)
        return this.retryRequest(n, e);
      throw l.name === "AbortError" ? new Pg() : new yl({ cause: l });
    }
    const p = Df(l.headers);
    if (!l.ok) {
      if (e && this.shouldRetry(l)) {
        const f = `retrying, ${e} attempts remaining`;
        return Tt(`response (error; ${f})`, l.status, i, p), this.retryRequest(n, e, p);
      }
      const S = await l.text().catch((f) => xd(f).message), y = Yf(S), b = y ? void 0 : S;
      throw Tt(`response (error; ${e ? "(error; no more retries left)" : "(error; not retryable)"})`, l.status, i, p, b), this.makeStatusError(l.status, y, b, p);
    }
    return { response: l, options: n, controller: a };
  }
  requestAPIList(t, e) {
    const n = this.makeRequest(e, null);
    return new Vf(this, n, t);
  }
  buildURL(t, e) {
    const n = jf(t) ? new URL(t) : new URL(this.baseURL + (this.baseURL.endsWith("/") && t.startsWith("/") ? t.slice(1) : t)), r = this.defaultQuery();
    return Ot(r) || (e = { ...r, ...e }), typeof e == "object" && e && !Array.isArray(e) && (n.search = this.stringifyQuery(e)), n.toString();
  }
  stringifyQuery(t) {
    return Object.entries(t).filter(([e, n]) => typeof n < "u").map(([e, n]) => {
      if (typeof n == "string" || typeof n == "number" || typeof n == "boolean")
        return `${encodeURIComponent(e)}=${encodeURIComponent(n)}`;
      if (n === null)
        return `${encodeURIComponent(e)}=`;
      throw new d(`Cannot stringify type ${typeof n}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
    }).join("&");
  }
  async fetchWithTimeout(t, e, n, r) {
    const { signal: i, ...c } = e || {};
    i && i.addEventListener("abort", () => r.abort());
    const a = setTimeout(() => r.abort(), n);
    return this.getRequestClient().fetch.call(void 0, t, { signal: r.signal, ...c }).finally(() => {
      clearTimeout(a);
    });
  }
  getRequestClient() {
    return { fetch: this.fetch };
  }
  shouldRetry(t) {
    const e = t.headers.get("x-should-retry");
    return e === "true" ? !0 : e === "false" ? !1 : t.status === 408 || t.status === 409 || t.status === 429 || t.status >= 500;
  }
  async retryRequest(t, e, n) {
    let r;
    const i = n == null ? void 0 : n["retry-after-ms"];
    if (i) {
      const a = parseFloat(i);
      Number.isNaN(a) || (r = a);
    }
    const c = n == null ? void 0 : n["retry-after"];
    if (c && !r) {
      const a = parseFloat(c);
      Number.isNaN(a) ? r = Date.parse(c) - Date.now() : r = a * 1e3;
    }
    if (!(r && 0 <= r && r < 60 * 1e3)) {
      const a = t.maxRetries ?? this.maxRetries;
      r = this.calculateDefaultRetryTimeoutMillis(e, a);
    }
    return await Gf(r), this.makeRequest(t, e - 1);
  }
  calculateDefaultRetryTimeoutMillis(t, e) {
    const i = e - t, c = Math.min(0.5 * Math.pow(2, i), 8), a = 1 - Math.random() * 0.25;
    return c * a * 1e3;
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${zt}`;
  }
}
class Ht {
  constructor(t, e, n, r) {
    Jt.set(this, void 0), Tf(this, Jt, t, "f"), this.options = r, this.response = e, this.body = n;
  }
  hasNextPage() {
    return this.getPaginatedItems().length ? this.nextPageInfo() != null : !1;
  }
  async getNextPage() {
    const t = this.nextPageInfo();
    if (!t)
      throw new d("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    const e = { ...this.options };
    if ("params" in t && typeof e.query == "object")
      e.query = { ...e.query, ...t.params };
    else if ("url" in t) {
      const n = [...Object.entries(e.query || {}), ...t.url.searchParams.entries()];
      for (const [r, i] of n)
        t.url.searchParams.set(r, i);
      e.query = void 0, e.path = t.url.toString();
    }
    return await Cf(this, Jt, "f").requestAPIList(this.constructor, e);
  }
  async *iterPages() {
    let t = this;
    for (yield t; t.hasNextPage(); )
      t = await t.getNextPage(), yield t;
  }
  async *[(Jt = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const t of this.iterPages())
      for (const e of t.getPaginatedItems())
        yield e;
  }
}
class Vf extends $l {
  constructor(t, e, n) {
    super(e, async (r) => new n(t, r.response, await yg(r), r.options));
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const t = await this;
    for await (const e of t)
      yield e;
  }
}
const Df = (s) => new Proxy(Object.fromEntries(
  // @ts-ignore
  s.entries()
), {
  get(t, e) {
    const n = e.toString();
    return t[n.toLowerCase()] || t[n];
  }
}), Nf = {
  method: !0,
  path: !0,
  query: !0,
  body: !0,
  headers: !0,
  maxRetries: !0,
  stream: !0,
  timeout: !0,
  httpAgent: !0,
  signal: !0,
  idempotencyKey: !0,
  __binaryRequest: !0,
  __binaryResponse: !0
}, u = (s) => typeof s == "object" && s !== null && !Ot(s) && Object.keys(s).every((t) => bg(Nf, t)), Ff = () => {
  var t;
  if (typeof Deno < "u" && Deno.build != null)
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": zt,
      "X-Stainless-OS": wp(Deno.build.os),
      "X-Stainless-Arch": fp(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : ((t = Deno.version) == null ? void 0 : t.deno) ?? "unknown"
    };
  if (typeof EdgeRuntime < "u")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": zt,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": process.version
    };
  if (Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": zt,
      "X-Stainless-OS": wp(process.platform),
      "X-Stainless-Arch": fp(process.arch),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": process.version
    };
  const s = Mf();
  return s ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": zt,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${s.browser}`,
    "X-Stainless-Runtime-Version": s.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": zt,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function Mf() {
  if (typeof navigator > "u" || !navigator)
    return null;
  const s = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key: t, pattern: e } of s) {
    const n = e.exec(navigator.userAgent);
    if (n) {
      const r = n[1] || 0, i = n[2] || 0, c = n[3] || 0;
      return { browser: t, version: `${r}.${i}.${c}` };
    }
  }
  return null;
}
const fp = (s) => s === "x32" ? "x32" : s === "x86_64" || s === "x64" ? "x64" : s === "arm" ? "arm" : s === "aarch64" || s === "arm64" ? "arm64" : s ? `other:${s}` : "unknown", wp = (s) => (s = s.toLowerCase(), s.includes("ios") ? "iOS" : s === "android" ? "Android" : s === "darwin" ? "MacOS" : s === "win32" ? "Windows" : s === "freebsd" ? "FreeBSD" : s === "openbsd" ? "OpenBSD" : s === "linux" ? "Linux" : s ? `Other:${s}` : "Unknown");
let mp;
const Bf = () => mp ?? (mp = Ff()), Yf = (s) => {
  try {
    return JSON.parse(s);
  } catch {
    return;
  }
}, Hf = new RegExp("^(?:[a-z]+:)?//", "i"), jf = (s) => Hf.test(s), Gf = (s) => new Promise((t) => setTimeout(t, s)), Zl = (s, t) => {
  if (typeof t != "number" || !Number.isInteger(t))
    throw new d(`${s} must be an integer`);
  if (t < 0)
    throw new d(`${s} must be a positive integer`);
  return t;
}, xd = (s) => s instanceof Error ? s : new Error(s), Lt = (s) => {
  var t, e, n, r, i;
  if (typeof process < "u")
    return ((e = (t = process.env) == null ? void 0 : t[s]) == null ? void 0 : e.trim()) ?? void 0;
  if (typeof Deno < "u")
    return (i = (r = (n = Deno.env) == null ? void 0 : n.get) == null ? void 0 : r.call(n, s)) == null ? void 0 : i.trim();
};
function Ot(s) {
  if (!s)
    return !0;
  for (const t in s)
    return !1;
  return !0;
}
function bg(s, t) {
  return Object.prototype.hasOwnProperty.call(s, t);
}
function $p(s, t) {
  for (const e in t) {
    if (!bg(t, e))
      continue;
    const n = e.toLowerCase();
    if (!n)
      continue;
    const r = t[e];
    r === null ? delete s[n] : r !== void 0 && (s[n] = r);
  }
}
function Tt(s, ...t) {
  var e;
  typeof process < "u" && ((e = process == null ? void 0 : process.env) == null ? void 0 : e.DEBUG) === "true" && console.log(`Cloudflare:DEBUG:${s}`, ...t);
}
const Wf = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (s) => {
  const t = Math.random() * 16 | 0;
  return (s === "x" ? t : t & 3 | 8).toString(16);
});
class d extends Error {
}
class q extends d {
  constructor(t, e, n, r) {
    super(`${q.makeMessage(t, e, n)}`), this.status = t, this.headers = r;
    const i = e;
    this.error = i, this.errors = (i == null ? void 0 : i.errors) ?? [];
  }
  static makeMessage(t, e, n) {
    const r = e != null && e.message ? typeof e.message == "string" ? e.message : JSON.stringify(e.message) : e ? JSON.stringify(e) : n;
    return t && r ? `${t} ${r}` : t ? `${t} status code (no body)` : r || "(no status code or body)";
  }
  static generate(t, e, n, r) {
    if (!t)
      return new yl({ cause: xd(e) });
    const i = e;
    return t === 400 ? new vg(t, i, n, r) : t === 401 ? new Ug(t, i, n, r) : t === 403 ? new xg(t, i, n, r) : t === 404 ? new Sg(t, i, n, r) : t === 409 ? new zg(t, i, n, r) : t === 422 ? new Og(t, i, n, r) : t === 429 ? new Ag(t, i, n, r) : t >= 500 ? new Rg(t, i, n, r) : new q(t, i, n, r);
  }
}
class Sd extends q {
  constructor({ message: t } = {}) {
    super(void 0, void 0, t || "Request was aborted.", void 0), this.status = void 0;
  }
}
class yl extends q {
  constructor({ message: t, cause: e }) {
    super(void 0, void 0, t || "Connection error.", void 0), this.status = void 0, e && (this.cause = e);
  }
}
class Pg extends yl {
  constructor({ message: t } = {}) {
    super({ message: t ?? "Request timed out." });
  }
}
class vg extends q {
  constructor() {
    super(...arguments), this.status = 400;
  }
}
class Ug extends q {
  constructor() {
    super(...arguments), this.status = 401;
  }
}
class xg extends q {
  constructor() {
    super(...arguments), this.status = 403;
  }
}
class Sg extends q {
  constructor() {
    super(...arguments), this.status = 404;
  }
}
class zg extends q {
  constructor() {
    super(...arguments), this.status = 409;
  }
}
class Og extends q {
  constructor() {
    super(...arguments), this.status = 422;
  }
}
class Ag extends q {
  constructor() {
    super(...arguments), this.status = 429;
  }
}
class Rg extends q {
}
var yp = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Kf(s) {
  if (s.__esModule) return s;
  var t = s.default;
  if (typeof t == "function") {
    var e = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(s).forEach(function(n) {
    var r = Object.getOwnPropertyDescriptor(s, n);
    Object.defineProperty(e, n, r.get ? r : {
      enumerable: !0,
      get: function() {
        return s[n];
      }
    });
  }), e;
}
var Tl, bp;
function At() {
  return bp || (bp = 1, Tl = TypeError), Tl;
}
const Jf = {}, Qf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jf
}, Symbol.toStringTag, { value: "Module" })), Xf = /* @__PURE__ */ Kf(Qf);
var Cl, Pp;
function bl() {
  if (Pp) return Cl;
  Pp = 1;
  var s = typeof Map == "function" && Map.prototype, t = Object.getOwnPropertyDescriptor && s ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, e = s && t && typeof t.get == "function" ? t.get : null, n = s && Map.prototype.forEach, r = typeof Set == "function" && Set.prototype, i = Object.getOwnPropertyDescriptor && r ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, c = r && i && typeof i.get == "function" ? i.get : null, a = r && Set.prototype.forEach, l = typeof WeakMap == "function" && WeakMap.prototype, p = l ? WeakMap.prototype.has : null, $ = typeof WeakSet == "function" && WeakSet.prototype, P = $ ? WeakSet.prototype.has : null, S = typeof WeakRef == "function" && WeakRef.prototype, y = S ? WeakRef.prototype.deref : null, b = Boolean.prototype.valueOf, z = Object.prototype.toString, g = Function.prototype.toString, f = String.prototype.match, m = String.prototype.slice, x = String.prototype.replace, v = String.prototype.toUpperCase, O = String.prototype.toLowerCase, U = RegExp.prototype.test, E = Array.prototype.concat, I = Array.prototype.join, Z = Array.prototype.slice, k = Math.floor, D = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, R = Object.getOwnPropertySymbols, J = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Q = typeof Symbol == "function" && typeof Symbol.iterator == "object", N = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Q || !0) ? Symbol.toStringTag : null, rt = Object.prototype.propertyIsEnumerable, pt = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(h) {
    return h.__proto__;
  } : null);
  function T(h, _) {
    if (h === 1 / 0 || h === -1 / 0 || h !== h || h && h > -1e3 && h < 1e3 || U.call(/e/, _))
      return _;
    var C = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof h == "number") {
      var B = h < 0 ? -k(-h) : k(h);
      if (B !== h) {
        var H = String(B), L = m.call(_, H.length + 1);
        return x.call(H, C, "$&_") + "." + x.call(x.call(L, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return x.call(_, C, "$&_");
  }
  var at = Xf, it = at.custom, $t = W(it) ? it : null, yt = {
    __proto__: null,
    double: '"',
    single: "'"
  }, Rt = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
  };
  Cl = function h(_, C, B, H) {
    var L = C || {};
    if (et(L, "quoteStyle") && !et(yt, L.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (et(L, "maxStringLength") && (typeof L.maxStringLength == "number" ? L.maxStringLength < 0 && L.maxStringLength !== 1 / 0 : L.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var ft = et(L, "customInspect") ? L.customInspect : !0;
    if (typeof ft != "boolean" && ft !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (et(L, "indent") && L.indent !== null && L.indent !== "	" && !(parseInt(L.indent, 10) === L.indent && L.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (et(L, "numericSeparator") && typeof L.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var Pt = L.numericSeparator;
    if (typeof _ > "u")
      return "undefined";
    if (_ === null)
      return "null";
    if (typeof _ == "boolean")
      return _ ? "true" : "false";
    if (typeof _ == "string")
      return rp(_, L);
    if (typeof _ == "number") {
      if (_ === 0)
        return 1 / 0 / _ > 0 ? "0" : "-0";
      var st = String(_);
      return Pt ? T(_, st) : st;
    }
    if (typeof _ == "bigint") {
      var wt = String(_) + "n";
      return Pt ? T(_, wt) : wt;
    }
    var Sl = typeof L.depth > "u" ? 5 : L.depth;
    if (typeof B > "u" && (B = 0), B >= Sl && Sl > 0 && typeof _ == "object")
      return K(_) ? "[Array]" : "[Object]";
    var xt = _f(L, B);
    if (typeof H > "u")
      H = [];
    else if (bt(H, _) >= 0)
      return "[Circular]";
    function lt(St, Wt, gf) {
      if (Wt && (H = Z.call(H), H.push(Wt)), gf) {
        var _p = {
          depth: L.depth
        };
        return et(L, "quoteStyle") && (_p.quoteStyle = L.quoteStyle), h(St, _p, B + 1, H);
      }
      return h(St, L, B + 1, H);
    }
    if (typeof _ == "function" && !j(_)) {
      var cp = ut(_), op = jt(_, lt);
      return "[Function" + (cp ? ": " + cp : " (anonymous)") + "]" + (op.length > 0 ? " { " + I.call(op, ", ") + " }" : "");
    }
    if (W(_)) {
      var ap = Q ? x.call(String(_), /^(Symbol\(.*\))_[^)]*$/, "$1") : J.call(_);
      return typeof _ == "object" && !Q ? It(ap) : ap;
    }
    if (lf(_)) {
      for (var kt = "<" + O.call(String(_.nodeName)), zl = _.attributes || [], Gt = 0; Gt < zl.length; Gt++)
        kt += " " + zl[Gt].name + "=" + gt(dt(zl[Gt].value), "double", L);
      return kt += ">", _.childNodes && _.childNodes.length && (kt += "..."), kt += "</" + O.call(String(_.nodeName)) + ">", kt;
    }
    if (K(_)) {
      if (_.length === 0)
        return "[]";
      var Ol = jt(_, lt);
      return xt && !hf(Ol) ? "[" + xl(Ol, xt) + "]" : "[ " + I.call(Ol, ", ") + " ]";
    }
    if (M(_)) {
      var Al = jt(_, lt);
      return !("cause" in Error.prototype) && "cause" in _ && !rt.call(_, "cause") ? "{ [" + String(_) + "] " + I.call(E.call("[cause]: " + lt(_.cause), Al), ", ") + " }" : Al.length === 0 ? "[" + String(_) + "]" : "{ [" + String(_) + "] " + I.call(Al, ", ") + " }";
    }
    if (typeof _ == "object" && ft) {
      if ($t && typeof _[$t] == "function" && at)
        return at(_, { depth: Sl - B });
      if (ft !== "symbol" && typeof _.inspect == "function")
        return _.inspect();
    }
    if (vt(_)) {
      var up = [];
      return n && n.call(_, function(St, Wt) {
        up.push(lt(Wt, _, !0) + " => " + lt(St, _));
      }), ip("Map", e.call(_), up, xt);
    }
    if (af(_)) {
      var lp = [];
      return a && a.call(_, function(St) {
        lp.push(lt(St, _));
      }), ip("Set", c.call(_), lp, xt);
    }
    if (Ut(_))
      return Ul("WeakMap");
    if (uf(_))
      return Ul("WeakSet");
    if (of(_))
      return Ul("WeakRef");
    if (X(_))
      return It(lt(Number(_)));
    if (ht(_))
      return It(lt(D.call(_)));
    if (ct(_))
      return It(b.call(_));
    if (Y(_))
      return It(lt(String(_)));
    if (typeof window < "u" && _ === window)
      return "{ [object Window] }";
    if (typeof globalThis < "u" && _ === globalThis || typeof yp < "u" && _ === yp)
      return "{ [object globalThis] }";
    if (!F(_) && !j(_)) {
      var Rl = jt(_, lt), dp = pt ? pt(_) === Object.prototype : _ instanceof Object || _.constructor === Object, Il = _ instanceof Object ? "" : "null prototype", hp = !dp && N && Object(_) === _ && N in _ ? m.call(nt(_), 8, -1) : Il ? "Object" : "", pf = dp || typeof _.constructor != "function" ? "" : _.constructor.name ? _.constructor.name + " " : "", kl = pf + (hp || Il ? "[" + I.call(E.call([], hp || [], Il || []), ": ") + "] " : "");
      return Rl.length === 0 ? kl + "{}" : xt ? kl + "{" + xl(Rl, xt) + "}" : kl + "{ " + I.call(Rl, ", ") + " }";
    }
    return String(_);
  };
  function gt(h, _, C) {
    var B = C.quoteStyle || _, H = yt[B];
    return H + h + H;
  }
  function dt(h) {
    return x.call(String(h), /"/g, "&quot;");
  }
  function K(h) {
    return nt(h) === "[object Array]" && (!N || !(typeof h == "object" && N in h));
  }
  function F(h) {
    return nt(h) === "[object Date]" && (!N || !(typeof h == "object" && N in h));
  }
  function j(h) {
    return nt(h) === "[object RegExp]" && (!N || !(typeof h == "object" && N in h));
  }
  function M(h) {
    return nt(h) === "[object Error]" && (!N || !(typeof h == "object" && N in h));
  }
  function Y(h) {
    return nt(h) === "[object String]" && (!N || !(typeof h == "object" && N in h));
  }
  function X(h) {
    return nt(h) === "[object Number]" && (!N || !(typeof h == "object" && N in h));
  }
  function ct(h) {
    return nt(h) === "[object Boolean]" && (!N || !(typeof h == "object" && N in h));
  }
  function W(h) {
    if (Q)
      return h && typeof h == "object" && h instanceof Symbol;
    if (typeof h == "symbol")
      return !0;
    if (!h || typeof h != "object" || !J)
      return !1;
    try {
      return J.call(h), !0;
    } catch {
    }
    return !1;
  }
  function ht(h) {
    if (!h || typeof h != "object" || !D)
      return !1;
    try {
      return D.call(h), !0;
    } catch {
    }
    return !1;
  }
  var _t = Object.prototype.hasOwnProperty || function(h) {
    return h in this;
  };
  function et(h, _) {
    return _t.call(h, _);
  }
  function nt(h) {
    return z.call(h);
  }
  function ut(h) {
    if (h.name)
      return h.name;
    var _ = f.call(g.call(h), /^function\s*([\w$]+)/);
    return _ ? _[1] : null;
  }
  function bt(h, _) {
    if (h.indexOf)
      return h.indexOf(_);
    for (var C = 0, B = h.length; C < B; C++)
      if (h[C] === _)
        return C;
    return -1;
  }
  function vt(h) {
    if (!e || !h || typeof h != "object")
      return !1;
    try {
      e.call(h);
      try {
        c.call(h);
      } catch {
        return !0;
      }
      return h instanceof Map;
    } catch {
    }
    return !1;
  }
  function Ut(h) {
    if (!p || !h || typeof h != "object")
      return !1;
    try {
      p.call(h, p);
      try {
        P.call(h, P);
      } catch {
        return !0;
      }
      return h instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  function of(h) {
    if (!y || !h || typeof h != "object")
      return !1;
    try {
      return y.call(h), !0;
    } catch {
    }
    return !1;
  }
  function af(h) {
    if (!c || !h || typeof h != "object")
      return !1;
    try {
      c.call(h);
      try {
        e.call(h);
      } catch {
        return !0;
      }
      return h instanceof Set;
    } catch {
    }
    return !1;
  }
  function uf(h) {
    if (!P || !h || typeof h != "object")
      return !1;
    try {
      P.call(h, P);
      try {
        p.call(h, p);
      } catch {
        return !0;
      }
      return h instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  function lf(h) {
    return !h || typeof h != "object" ? !1 : typeof HTMLElement < "u" && h instanceof HTMLElement ? !0 : typeof h.nodeName == "string" && typeof h.getAttribute == "function";
  }
  function rp(h, _) {
    if (h.length > _.maxStringLength) {
      var C = h.length - _.maxStringLength, B = "... " + C + " more character" + (C > 1 ? "s" : "");
      return rp(m.call(h, 0, _.maxStringLength), _) + B;
    }
    var H = Rt[_.quoteStyle || "single"];
    H.lastIndex = 0;
    var L = x.call(x.call(h, H, "\\$1"), /[\x00-\x1f]/g, df);
    return gt(L, "single", _);
  }
  function df(h) {
    var _ = h.charCodeAt(0), C = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[_];
    return C ? "\\" + C : "\\x" + (_ < 16 ? "0" : "") + v.call(_.toString(16));
  }
  function It(h) {
    return "Object(" + h + ")";
  }
  function Ul(h) {
    return h + " { ? }";
  }
  function ip(h, _, C, B) {
    var H = B ? xl(C, B) : I.call(C, ", ");
    return h + " (" + _ + ") {" + H + "}";
  }
  function hf(h) {
    for (var _ = 0; _ < h.length; _++)
      if (bt(h[_], `
`) >= 0)
        return !1;
    return !0;
  }
  function _f(h, _) {
    var C;
    if (h.indent === "	")
      C = "	";
    else if (typeof h.indent == "number" && h.indent > 0)
      C = I.call(Array(h.indent + 1), " ");
    else
      return null;
    return {
      base: C,
      prev: I.call(Array(_ + 1), C)
    };
  }
  function xl(h, _) {
    if (h.length === 0)
      return "";
    var C = `
` + _.prev + _.base;
    return C + I.call(h, "," + C) + `
` + _.prev;
  }
  function jt(h, _) {
    var C = K(h), B = [];
    if (C) {
      B.length = h.length;
      for (var H = 0; H < h.length; H++)
        B[H] = et(h, H) ? _(h[H], h) : "";
    }
    var L = typeof R == "function" ? R(h) : [], ft;
    if (Q) {
      ft = {};
      for (var Pt = 0; Pt < L.length; Pt++)
        ft["$" + L[Pt]] = L[Pt];
    }
    for (var st in h)
      et(h, st) && (C && String(Number(st)) === st && st < h.length || Q && ft["$" + st] instanceof Symbol || (U.call(/[^\w$]/, st) ? B.push(_(st, h) + ": " + _(h[st], h)) : B.push(st + ": " + _(h[st], h))));
    if (typeof R == "function")
      for (var wt = 0; wt < L.length; wt++)
        rt.call(h, L[wt]) && B.push("[" + _(L[wt]) + "]: " + _(h[L[wt]], h));
    return B;
  }
  return Cl;
}
var El, vp;
function qf() {
  if (vp) return El;
  vp = 1;
  var s = /* @__PURE__ */ bl(), t = /* @__PURE__ */ At(), e = function(a, l, p) {
    for (var $ = a, P; (P = $.next) != null; $ = P)
      if (P.key === l)
        return $.next = P.next, p || (P.next = /** @type {NonNullable<typeof list.next>} */
        a.next, a.next = P), P;
  }, n = function(a, l) {
    if (a) {
      var p = e(a, l);
      return p && p.value;
    }
  }, r = function(a, l, p) {
    var $ = e(a, l);
    $ ? $.value = p : a.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key: l,
      next: a.next,
      value: p
    };
  }, i = function(a, l) {
    return a ? !!e(a, l) : !1;
  }, c = function(a, l) {
    if (a)
      return e(a, l, !0);
  };
  return El = function() {
    var l, p = {
      assert: function($) {
        if (!p.has($))
          throw new t("Side channel does not contain " + s($));
      },
      delete: function($) {
        var P = l && l.next, S = c(l, $);
        return S && P && P === S && (l = void 0), !!S;
      },
      get: function($) {
        return n(l, $);
      },
      has: function($) {
        return i(l, $);
      },
      set: function($, P) {
        l || (l = {
          next: void 0
        }), r(
          /** @type {NonNullable<typeof $o>} */
          l,
          $,
          P
        );
      }
    };
    return p;
  }, El;
}
var Vl, Up;
function tw() {
  return Up || (Up = 1, Vl = Object), Vl;
}
var Dl, xp;
function ew() {
  return xp || (xp = 1, Dl = Error), Dl;
}
var Nl, Sp;
function nw() {
  return Sp || (Sp = 1, Nl = EvalError), Nl;
}
var Fl, zp;
function sw() {
  return zp || (zp = 1, Fl = RangeError), Fl;
}
var Ml, Op;
function rw() {
  return Op || (Op = 1, Ml = ReferenceError), Ml;
}
var Bl, Ap;
function iw() {
  return Ap || (Ap = 1, Bl = SyntaxError), Bl;
}
var Yl, Rp;
function cw() {
  return Rp || (Rp = 1, Yl = URIError), Yl;
}
var Hl, Ip;
function ow() {
  return Ip || (Ip = 1, Hl = Math.abs), Hl;
}
var jl, kp;
function aw() {
  return kp || (kp = 1, jl = Math.floor), jl;
}
var Gl, Lp;
function uw() {
  return Lp || (Lp = 1, Gl = Math.max), Gl;
}
var Wl, Zp;
function lw() {
  return Zp || (Zp = 1, Wl = Math.min), Wl;
}
var Kl, Tp;
function dw() {
  return Tp || (Tp = 1, Kl = Math.pow), Kl;
}
var Jl, Cp;
function hw() {
  return Cp || (Cp = 1, Jl = Object.getOwnPropertyDescriptor), Jl;
}
var Ql, Ep;
function Ig() {
  if (Ep) return Ql;
  Ep = 1;
  var s = /* @__PURE__ */ hw();
  if (s)
    try {
      s([], "length");
    } catch {
      s = null;
    }
  return Ql = s, Ql;
}
var Xl, Vp;
function _w() {
  if (Vp) return Xl;
  Vp = 1;
  var s = Object.defineProperty || !1;
  if (s)
    try {
      s({}, "a", { value: 1 });
    } catch {
      s = !1;
    }
  return Xl = s, Xl;
}
var ql, Dp;
function pw() {
  return Dp || (Dp = 1, ql = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var t = {}, e = Symbol("test"), n = Object(e);
    if (typeof e == "string" || Object.prototype.toString.call(e) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
      return !1;
    var r = 42;
    t[e] = r;
    for (var i in t)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
      return !1;
    var c = Object.getOwnPropertySymbols(t);
    if (c.length !== 1 || c[0] !== e || !Object.prototype.propertyIsEnumerable.call(t, e))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var a = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(t, e)
      );
      if (a.value !== r || a.enumerable !== !0)
        return !1;
    }
    return !0;
  }), ql;
}
var td, Np;
function gw() {
  if (Np) return td;
  Np = 1;
  var s = typeof Symbol < "u" && Symbol, t = pw();
  return td = function() {
    return typeof s != "function" || typeof Symbol != "function" || typeof s("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : t();
  }, td;
}
var ed, Fp;
function fw() {
  if (Fp) return ed;
  Fp = 1;
  var s = "Function.prototype.bind called on incompatible ", t = Object.prototype.toString, e = Math.max, n = "[object Function]", r = function(l, p) {
    for (var $ = [], P = 0; P < l.length; P += 1)
      $[P] = l[P];
    for (var S = 0; S < p.length; S += 1)
      $[S + l.length] = p[S];
    return $;
  }, i = function(l, p) {
    for (var $ = [], P = p, S = 0; P < l.length; P += 1, S += 1)
      $[S] = l[P];
    return $;
  }, c = function(a, l) {
    for (var p = "", $ = 0; $ < a.length; $ += 1)
      p += a[$], $ + 1 < a.length && (p += l);
    return p;
  };
  return ed = function(l) {
    var p = this;
    if (typeof p != "function" || t.apply(p) !== n)
      throw new TypeError(s + p);
    for (var $ = i(arguments, 1), P, S = function() {
      if (this instanceof P) {
        var f = p.apply(
          this,
          r($, arguments)
        );
        return Object(f) === f ? f : this;
      }
      return p.apply(
        l,
        r($, arguments)
      );
    }, y = e(0, p.length - $.length), b = [], z = 0; z < y; z++)
      b[z] = "$" + z;
    if (P = Function("binder", "return function (" + c(b, ",") + "){ return binder.apply(this,arguments); }")(S), p.prototype) {
      var g = function() {
      };
      g.prototype = p.prototype, P.prototype = new g(), g.prototype = null;
    }
    return P;
  }, ed;
}
var nd, Mp;
function Pl() {
  if (Mp) return nd;
  Mp = 1;
  var s = fw();
  return nd = Function.prototype.bind || s, nd;
}
var sd, Bp;
function Rd() {
  return Bp || (Bp = 1, sd = Function.prototype.call), sd;
}
var rd, Yp;
function kg() {
  return Yp || (Yp = 1, rd = Function.prototype.apply), rd;
}
var id, Hp;
function ww() {
  return Hp || (Hp = 1, id = typeof Reflect < "u" && Reflect && Reflect.apply), id;
}
var cd, jp;
function mw() {
  if (jp) return cd;
  jp = 1;
  var s = Pl(), t = kg(), e = Rd(), n = ww();
  return cd = n || s.call(e, t), cd;
}
var od, Gp;
function Lg() {
  if (Gp) return od;
  Gp = 1;
  var s = Pl(), t = /* @__PURE__ */ At(), e = Rd(), n = mw();
  return od = function(i) {
    if (i.length < 1 || typeof i[0] != "function")
      throw new t("a function is required");
    return n(s, e, i);
  }, od;
}
var ad, Wp;
function $w() {
  if (Wp) return ad;
  Wp = 1;
  var s = Lg(), t = /* @__PURE__ */ Ig(), e;
  try {
    e = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (c) {
    if (!c || typeof c != "object" || !("code" in c) || c.code !== "ERR_PROTO_ACCESS")
      throw c;
  }
  var n = !!e && t && t(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), r = Object, i = r.getPrototypeOf;
  return ad = n && typeof n.get == "function" ? s([n.get]) : typeof i == "function" ? (
    /** @type {import('./get')} */
    function(a) {
      return i(a == null ? a : r(a));
    }
  ) : !1, ad;
}
var ud, Kp;
function yw() {
  if (Kp) return ud;
  Kp = 1;
  var s = Function.prototype.call, t = Object.prototype.hasOwnProperty, e = Pl();
  return ud = e.call(s, t), ud;
}
var ld, Jp;
function Id() {
  if (Jp) return ld;
  Jp = 1;
  var s, t = /* @__PURE__ */ tw(), e = /* @__PURE__ */ ew(), n = /* @__PURE__ */ nw(), r = /* @__PURE__ */ sw(), i = /* @__PURE__ */ rw(), c = /* @__PURE__ */ iw(), a = /* @__PURE__ */ At(), l = /* @__PURE__ */ cw(), p = /* @__PURE__ */ ow(), $ = /* @__PURE__ */ aw(), P = /* @__PURE__ */ uw(), S = /* @__PURE__ */ lw(), y = /* @__PURE__ */ dw(), b = Function, z = function(K) {
    try {
      return b('"use strict"; return (' + K + ").constructor;")();
    } catch {
    }
  }, g = /* @__PURE__ */ Ig(), f = /* @__PURE__ */ _w(), m = function() {
    throw new a();
  }, x = g ? function() {
    try {
      return arguments.callee, m;
    } catch {
      try {
        return g(arguments, "callee").get;
      } catch {
        return m;
      }
    }
  }() : m, v = gw()(), O = /* @__PURE__ */ $w(), U = typeof Reflect == "function" && Reflect.getPrototypeOf || t.getPrototypeOf || O, E = kg(), I = Rd(), Z = {}, k = typeof Uint8Array > "u" || !U ? s : U(Uint8Array), D = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? s : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? s : ArrayBuffer,
    "%ArrayIteratorPrototype%": v && U ? U([][Symbol.iterator]()) : s,
    "%AsyncFromSyncIteratorPrototype%": s,
    "%AsyncFunction%": Z,
    "%AsyncGenerator%": Z,
    "%AsyncGeneratorFunction%": Z,
    "%AsyncIteratorPrototype%": Z,
    "%Atomics%": typeof Atomics > "u" ? s : Atomics,
    "%BigInt%": typeof BigInt > "u" ? s : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? s : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? s : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? s : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": n,
    "%Float32Array%": typeof Float32Array > "u" ? s : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? s : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? s : FinalizationRegistry,
    "%Function%": b,
    "%GeneratorFunction%": Z,
    "%Int8Array%": typeof Int8Array > "u" ? s : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? s : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? s : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": v && U ? U(U([][Symbol.iterator]())) : s,
    "%JSON%": typeof JSON == "object" ? JSON : s,
    "%Map%": typeof Map > "u" ? s : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !v || !U ? s : U((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": t,
    "%Object.getOwnPropertyDescriptor%": g,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? s : Promise,
    "%Proxy%": typeof Proxy > "u" ? s : Proxy,
    "%RangeError%": r,
    "%ReferenceError%": i,
    "%Reflect%": typeof Reflect > "u" ? s : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? s : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !v || !U ? s : U((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? s : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": v && U ? U(""[Symbol.iterator]()) : s,
    "%Symbol%": v ? Symbol : s,
    "%SyntaxError%": c,
    "%ThrowTypeError%": x,
    "%TypedArray%": k,
    "%TypeError%": a,
    "%Uint8Array%": typeof Uint8Array > "u" ? s : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? s : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? s : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? s : Uint32Array,
    "%URIError%": l,
    "%WeakMap%": typeof WeakMap > "u" ? s : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? s : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? s : WeakSet,
    "%Function.prototype.call%": I,
    "%Function.prototype.apply%": E,
    "%Object.defineProperty%": f,
    "%Math.abs%": p,
    "%Math.floor%": $,
    "%Math.max%": P,
    "%Math.min%": S,
    "%Math.pow%": y
  };
  if (U)
    try {
      null.error;
    } catch (K) {
      var R = U(U(K));
      D["%Error.prototype%"] = R;
    }
  var J = function K(F) {
    var j;
    if (F === "%AsyncFunction%")
      j = z("async function () {}");
    else if (F === "%GeneratorFunction%")
      j = z("function* () {}");
    else if (F === "%AsyncGeneratorFunction%")
      j = z("async function* () {}");
    else if (F === "%AsyncGenerator%") {
      var M = K("%AsyncGeneratorFunction%");
      M && (j = M.prototype);
    } else if (F === "%AsyncIteratorPrototype%") {
      var Y = K("%AsyncGenerator%");
      Y && U && (j = U(Y.prototype));
    }
    return D[F] = j, j;
  }, Q = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, N = Pl(), rt = /* @__PURE__ */ yw(), pt = N.call(I, Array.prototype.concat), T = N.call(E, Array.prototype.splice), at = N.call(I, String.prototype.replace), it = N.call(I, String.prototype.slice), $t = N.call(I, RegExp.prototype.exec), yt = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Rt = /\\(\\)?/g, gt = function(F) {
    var j = it(F, 0, 1), M = it(F, -1);
    if (j === "%" && M !== "%")
      throw new c("invalid intrinsic syntax, expected closing `%`");
    if (M === "%" && j !== "%")
      throw new c("invalid intrinsic syntax, expected opening `%`");
    var Y = [];
    return at(F, yt, function(X, ct, W, ht) {
      Y[Y.length] = W ? at(ht, Rt, "$1") : ct || X;
    }), Y;
  }, dt = function(F, j) {
    var M = F, Y;
    if (rt(Q, M) && (Y = Q[M], M = "%" + Y[0] + "%"), rt(D, M)) {
      var X = D[M];
      if (X === Z && (X = J(M)), typeof X > "u" && !j)
        throw new a("intrinsic " + F + " exists, but is not available. Please file an issue!");
      return {
        alias: Y,
        name: M,
        value: X
      };
    }
    throw new c("intrinsic " + F + " does not exist!");
  };
  return ld = function(F, j) {
    if (typeof F != "string" || F.length === 0)
      throw new a("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof j != "boolean")
      throw new a('"allowMissing" argument must be a boolean');
    if ($t(/^%?[^%]*%?$/, F) === null)
      throw new c("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var M = gt(F), Y = M.length > 0 ? M[0] : "", X = dt("%" + Y + "%", j), ct = X.name, W = X.value, ht = !1, _t = X.alias;
    _t && (Y = _t[0], T(M, pt([0, 1], _t)));
    for (var et = 1, nt = !0; et < M.length; et += 1) {
      var ut = M[et], bt = it(ut, 0, 1), vt = it(ut, -1);
      if ((bt === '"' || bt === "'" || bt === "`" || vt === '"' || vt === "'" || vt === "`") && bt !== vt)
        throw new c("property names with quotes must have matching quotes");
      if ((ut === "constructor" || !nt) && (ht = !0), Y += "." + ut, ct = "%" + Y + "%", rt(D, ct))
        W = D[ct];
      else if (W != null) {
        if (!(ut in W)) {
          if (!j)
            throw new a("base intrinsic for " + F + " exists, but the property is not available.");
          return;
        }
        if (g && et + 1 >= M.length) {
          var Ut = g(W, ut);
          nt = !!Ut, nt && "get" in Ut && !("originalValue" in Ut.get) ? W = Ut.get : W = W[ut];
        } else
          nt = rt(W, ut), W = W[ut];
        nt && !ht && (D[ct] = W);
      }
    }
    return W;
  }, ld;
}
var dd, Qp;
function Zg() {
  if (Qp) return dd;
  Qp = 1;
  var s = /* @__PURE__ */ Id(), t = Lg(), e = t([s("%String.prototype.indexOf%")]);
  return dd = function(r, i) {
    var c = (
      /** @type {Parameters<typeof callBindBasic>[0][0]} */
      s(r, !!i)
    );
    return typeof c == "function" && e(r, ".prototype.") > -1 ? t([c]) : c;
  }, dd;
}
var hd, Xp;
function Tg() {
  if (Xp) return hd;
  Xp = 1;
  var s = /* @__PURE__ */ Id(), t = /* @__PURE__ */ Zg(), e = /* @__PURE__ */ bl(), n = /* @__PURE__ */ At(), r = s("%Map%", !0), i = t("Map.prototype.get", !0), c = t("Map.prototype.set", !0), a = t("Map.prototype.has", !0), l = t("Map.prototype.delete", !0), p = t("Map.prototype.size", !0);
  return hd = !!r && /** @type {Exclude<import('.'), false>} */
  function() {
    var P, S = {
      assert: function(y) {
        if (!S.has(y))
          throw new n("Side channel does not contain " + e(y));
      },
      delete: function(y) {
        if (P) {
          var b = l(P, y);
          return p(P) === 0 && (P = void 0), b;
        }
        return !1;
      },
      get: function(y) {
        if (P)
          return i(P, y);
      },
      has: function(y) {
        return P ? a(P, y) : !1;
      },
      set: function(y, b) {
        P || (P = new r()), c(P, y, b);
      }
    };
    return S;
  }, hd;
}
var _d, qp;
function bw() {
  if (qp) return _d;
  qp = 1;
  var s = /* @__PURE__ */ Id(), t = /* @__PURE__ */ Zg(), e = /* @__PURE__ */ bl(), n = Tg(), r = /* @__PURE__ */ At(), i = s("%WeakMap%", !0), c = t("WeakMap.prototype.get", !0), a = t("WeakMap.prototype.set", !0), l = t("WeakMap.prototype.has", !0), p = t("WeakMap.prototype.delete", !0);
  return _d = i ? (
    /** @type {Exclude<import('.'), false>} */
    function() {
      var P, S, y = {
        assert: function(b) {
          if (!y.has(b))
            throw new r("Side channel does not contain " + e(b));
        },
        delete: function(b) {
          if (i && b && (typeof b == "object" || typeof b == "function")) {
            if (P)
              return p(P, b);
          } else if (n && S)
            return S.delete(b);
          return !1;
        },
        get: function(b) {
          return i && b && (typeof b == "object" || typeof b == "function") && P ? c(P, b) : S && S.get(b);
        },
        has: function(b) {
          return i && b && (typeof b == "object" || typeof b == "function") && P ? l(P, b) : !!S && S.has(b);
        },
        set: function(b, z) {
          i && b && (typeof b == "object" || typeof b == "function") ? (P || (P = new i()), a(P, b, z)) : n && (S || (S = n()), S.set(b, z));
        }
      };
      return y;
    }
  ) : n, _d;
}
var pd, tg;
function Pw() {
  if (tg) return pd;
  tg = 1;
  var s = /* @__PURE__ */ At(), t = /* @__PURE__ */ bl(), e = qf(), n = Tg(), r = bw(), i = r || n || e;
  return pd = function() {
    var a, l = {
      assert: function(p) {
        if (!l.has(p))
          throw new s("Side channel does not contain " + t(p));
      },
      delete: function(p) {
        return !!a && a.delete(p);
      },
      get: function(p) {
        return a && a.get(p);
      },
      has: function(p) {
        return !!a && a.has(p);
      },
      set: function(p, $) {
        a || (a = i()), a.set(p, $);
      }
    };
    return l;
  }, pd;
}
var gd, eg;
function kd() {
  if (eg) return gd;
  eg = 1;
  var s = String.prototype.replace, t = /%20/g, e = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  return gd = {
    default: e.RFC3986,
    formatters: {
      RFC1738: function(n) {
        return s.call(n, t, "+");
      },
      RFC3986: function(n) {
        return String(n);
      }
    },
    RFC1738: e.RFC1738,
    RFC3986: e.RFC3986
  }, gd;
}
var fd, ng;
function Cg() {
  if (ng) return fd;
  ng = 1;
  var s = /* @__PURE__ */ kd(), t = Object.prototype.hasOwnProperty, e = Array.isArray, n = function() {
    for (var g = [], f = 0; f < 256; ++f)
      g.push("%" + ((f < 16 ? "0" : "") + f.toString(16)).toUpperCase());
    return g;
  }(), r = function(f) {
    for (; f.length > 1; ) {
      var m = f.pop(), x = m.obj[m.prop];
      if (e(x)) {
        for (var v = [], O = 0; O < x.length; ++O)
          typeof x[O] < "u" && v.push(x[O]);
        m.obj[m.prop] = v;
      }
    }
  }, i = function(f, m) {
    for (var x = m && m.plainObjects ? { __proto__: null } : {}, v = 0; v < f.length; ++v)
      typeof f[v] < "u" && (x[v] = f[v]);
    return x;
  }, c = function g(f, m, x) {
    if (!m)
      return f;
    if (typeof m != "object" && typeof m != "function") {
      if (e(f))
        f.push(m);
      else if (f && typeof f == "object")
        (x && (x.plainObjects || x.allowPrototypes) || !t.call(Object.prototype, m)) && (f[m] = !0);
      else
        return [f, m];
      return f;
    }
    if (!f || typeof f != "object")
      return [f].concat(m);
    var v = f;
    return e(f) && !e(m) && (v = i(f, x)), e(f) && e(m) ? (m.forEach(function(O, U) {
      if (t.call(f, U)) {
        var E = f[U];
        E && typeof E == "object" && O && typeof O == "object" ? f[U] = g(E, O, x) : f.push(O);
      } else
        f[U] = O;
    }), f) : Object.keys(m).reduce(function(O, U) {
      var E = m[U];
      return t.call(O, U) ? O[U] = g(O[U], E, x) : O[U] = E, O;
    }, v);
  }, a = function(f, m) {
    return Object.keys(m).reduce(function(x, v) {
      return x[v] = m[v], x;
    }, f);
  }, l = function(g, f, m) {
    var x = g.replace(/\+/g, " ");
    if (m === "iso-8859-1")
      return x.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(x);
    } catch {
      return x;
    }
  }, p = 1024, $ = function(f, m, x, v, O) {
    if (f.length === 0)
      return f;
    var U = f;
    if (typeof f == "symbol" ? U = Symbol.prototype.toString.call(f) : typeof f != "string" && (U = String(f)), x === "iso-8859-1")
      return escape(U).replace(/%u[0-9a-f]{4}/gi, function(J) {
        return "%26%23" + parseInt(J.slice(2), 16) + "%3B";
      });
    for (var E = "", I = 0; I < U.length; I += p) {
      for (var Z = U.length >= p ? U.slice(I, I + p) : U, k = [], D = 0; D < Z.length; ++D) {
        var R = Z.charCodeAt(D);
        if (R === 45 || R === 46 || R === 95 || R === 126 || R >= 48 && R <= 57 || R >= 65 && R <= 90 || R >= 97 && R <= 122 || O === s.RFC1738 && (R === 40 || R === 41)) {
          k[k.length] = Z.charAt(D);
          continue;
        }
        if (R < 128) {
          k[k.length] = n[R];
          continue;
        }
        if (R < 2048) {
          k[k.length] = n[192 | R >> 6] + n[128 | R & 63];
          continue;
        }
        if (R < 55296 || R >= 57344) {
          k[k.length] = n[224 | R >> 12] + n[128 | R >> 6 & 63] + n[128 | R & 63];
          continue;
        }
        D += 1, R = 65536 + ((R & 1023) << 10 | Z.charCodeAt(D) & 1023), k[k.length] = n[240 | R >> 18] + n[128 | R >> 12 & 63] + n[128 | R >> 6 & 63] + n[128 | R & 63];
      }
      E += k.join("");
    }
    return E;
  }, P = function(f) {
    for (var m = [{ obj: { o: f }, prop: "o" }], x = [], v = 0; v < m.length; ++v)
      for (var O = m[v], U = O.obj[O.prop], E = Object.keys(U), I = 0; I < E.length; ++I) {
        var Z = E[I], k = U[Z];
        typeof k == "object" && k !== null && x.indexOf(k) === -1 && (m.push({ obj: U, prop: Z }), x.push(k));
      }
    return r(m), f;
  }, S = function(f) {
    return Object.prototype.toString.call(f) === "[object RegExp]";
  }, y = function(f) {
    return !f || typeof f != "object" ? !1 : !!(f.constructor && f.constructor.isBuffer && f.constructor.isBuffer(f));
  }, b = function(f, m) {
    return [].concat(f, m);
  }, z = function(f, m) {
    if (e(f)) {
      for (var x = [], v = 0; v < f.length; v += 1)
        x.push(m(f[v]));
      return x;
    }
    return m(f);
  };
  return fd = {
    arrayToObject: i,
    assign: a,
    combine: b,
    compact: P,
    decode: l,
    encode: $,
    isBuffer: y,
    isRegExp: S,
    maybeMap: z,
    merge: c
  }, fd;
}
var wd, sg;
function vw() {
  if (sg) return wd;
  sg = 1;
  var s = Pw(), t = /* @__PURE__ */ Cg(), e = /* @__PURE__ */ kd(), n = Object.prototype.hasOwnProperty, r = {
    brackets: function(g) {
      return g + "[]";
    },
    comma: "comma",
    indices: function(g, f) {
      return g + "[" + f + "]";
    },
    repeat: function(g) {
      return g;
    }
  }, i = Array.isArray, c = Array.prototype.push, a = function(z, g) {
    c.apply(z, i(g) ? g : [g]);
  }, l = Date.prototype.toISOString, p = e.default, $ = {
    addQueryPrefix: !1,
    allowDots: !1,
    allowEmptyArrays: !1,
    arrayFormat: "indices",
    charset: "utf-8",
    charsetSentinel: !1,
    commaRoundTrip: !1,
    delimiter: "&",
    encode: !0,
    encodeDotInKeys: !1,
    encoder: t.encode,
    encodeValuesOnly: !1,
    filter: void 0,
    format: p,
    formatter: e.formatters[p],
    // deprecated
    indices: !1,
    serializeDate: function(g) {
      return l.call(g);
    },
    skipNulls: !1,
    strictNullHandling: !1
  }, P = function(g) {
    return typeof g == "string" || typeof g == "number" || typeof g == "boolean" || typeof g == "symbol" || typeof g == "bigint";
  }, S = {}, y = function z(g, f, m, x, v, O, U, E, I, Z, k, D, R, J, Q, N, rt, pt) {
    for (var T = g, at = pt, it = 0, $t = !1; (at = at.get(S)) !== void 0 && !$t; ) {
      var yt = at.get(g);
      if (it += 1, typeof yt < "u") {
        if (yt === it)
          throw new RangeError("Cyclic object value");
        $t = !0;
      }
      typeof at.get(S) > "u" && (it = 0);
    }
    if (typeof Z == "function" ? T = Z(f, T) : T instanceof Date ? T = R(T) : m === "comma" && i(T) && (T = t.maybeMap(T, function(_t) {
      return _t instanceof Date ? R(_t) : _t;
    })), T === null) {
      if (O)
        return I && !N ? I(f, $.encoder, rt, "key", J) : f;
      T = "";
    }
    if (P(T) || t.isBuffer(T)) {
      if (I) {
        var Rt = N ? f : I(f, $.encoder, rt, "key", J);
        return [Q(Rt) + "=" + Q(I(T, $.encoder, rt, "value", J))];
      }
      return [Q(f) + "=" + Q(String(T))];
    }
    var gt = [];
    if (typeof T > "u")
      return gt;
    var dt;
    if (m === "comma" && i(T))
      N && I && (T = t.maybeMap(T, I)), dt = [{ value: T.length > 0 ? T.join(",") || null : void 0 }];
    else if (i(Z))
      dt = Z;
    else {
      var K = Object.keys(T);
      dt = k ? K.sort(k) : K;
    }
    var F = E ? String(f).replace(/\./g, "%2E") : String(f), j = x && i(T) && T.length === 1 ? F + "[]" : F;
    if (v && i(T) && T.length === 0)
      return j + "[]";
    for (var M = 0; M < dt.length; ++M) {
      var Y = dt[M], X = typeof Y == "object" && Y && typeof Y.value < "u" ? Y.value : T[Y];
      if (!(U && X === null)) {
        var ct = D && E ? String(Y).replace(/\./g, "%2E") : String(Y), W = i(T) ? typeof m == "function" ? m(j, ct) : j : j + (D ? "." + ct : "[" + ct + "]");
        pt.set(g, it);
        var ht = s();
        ht.set(S, pt), a(gt, z(
          X,
          W,
          m,
          x,
          v,
          O,
          U,
          E,
          m === "comma" && N && i(T) ? null : I,
          Z,
          k,
          D,
          R,
          J,
          Q,
          N,
          rt,
          ht
        ));
      }
    }
    return gt;
  }, b = function(g) {
    if (!g)
      return $;
    if (typeof g.allowEmptyArrays < "u" && typeof g.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof g.encodeDotInKeys < "u" && typeof g.encodeDotInKeys != "boolean")
      throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
    if (g.encoder !== null && typeof g.encoder < "u" && typeof g.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var f = g.charset || $.charset;
    if (typeof g.charset < "u" && g.charset !== "utf-8" && g.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var m = e.default;
    if (typeof g.format < "u") {
      if (!n.call(e.formatters, g.format))
        throw new TypeError("Unknown format option provided.");
      m = g.format;
    }
    var x = e.formatters[m], v = $.filter;
    (typeof g.filter == "function" || i(g.filter)) && (v = g.filter);
    var O;
    if (g.arrayFormat in r ? O = g.arrayFormat : "indices" in g ? O = g.indices ? "indices" : "repeat" : O = $.arrayFormat, "commaRoundTrip" in g && typeof g.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var U = typeof g.allowDots > "u" ? g.encodeDotInKeys === !0 ? !0 : $.allowDots : !!g.allowDots;
    return {
      addQueryPrefix: typeof g.addQueryPrefix == "boolean" ? g.addQueryPrefix : $.addQueryPrefix,
      allowDots: U,
      allowEmptyArrays: typeof g.allowEmptyArrays == "boolean" ? !!g.allowEmptyArrays : $.allowEmptyArrays,
      arrayFormat: O,
      charset: f,
      charsetSentinel: typeof g.charsetSentinel == "boolean" ? g.charsetSentinel : $.charsetSentinel,
      commaRoundTrip: !!g.commaRoundTrip,
      delimiter: typeof g.delimiter > "u" ? $.delimiter : g.delimiter,
      encode: typeof g.encode == "boolean" ? g.encode : $.encode,
      encodeDotInKeys: typeof g.encodeDotInKeys == "boolean" ? g.encodeDotInKeys : $.encodeDotInKeys,
      encoder: typeof g.encoder == "function" ? g.encoder : $.encoder,
      encodeValuesOnly: typeof g.encodeValuesOnly == "boolean" ? g.encodeValuesOnly : $.encodeValuesOnly,
      filter: v,
      format: m,
      formatter: x,
      serializeDate: typeof g.serializeDate == "function" ? g.serializeDate : $.serializeDate,
      skipNulls: typeof g.skipNulls == "boolean" ? g.skipNulls : $.skipNulls,
      sort: typeof g.sort == "function" ? g.sort : null,
      strictNullHandling: typeof g.strictNullHandling == "boolean" ? g.strictNullHandling : $.strictNullHandling
    };
  };
  return wd = function(z, g) {
    var f = z, m = b(g), x, v;
    typeof m.filter == "function" ? (v = m.filter, f = v("", f)) : i(m.filter) && (v = m.filter, x = v);
    var O = [];
    if (typeof f != "object" || f === null)
      return "";
    var U = r[m.arrayFormat], E = U === "comma" && m.commaRoundTrip;
    x || (x = Object.keys(f)), m.sort && x.sort(m.sort);
    for (var I = s(), Z = 0; Z < x.length; ++Z) {
      var k = x[Z], D = f[k];
      m.skipNulls && D === null || a(O, y(
        D,
        k,
        U,
        E,
        m.allowEmptyArrays,
        m.strictNullHandling,
        m.skipNulls,
        m.encodeDotInKeys,
        m.encode ? m.encoder : null,
        m.filter,
        m.sort,
        m.allowDots,
        m.serializeDate,
        m.format,
        m.formatter,
        m.encodeValuesOnly,
        m.charset,
        I
      ));
    }
    var R = O.join(m.delimiter), J = m.addQueryPrefix === !0 ? "?" : "";
    return m.charsetSentinel && (m.charset === "iso-8859-1" ? J += "utf8=%26%2310003%3B&" : J += "utf8=%E2%9C%93&"), R.length > 0 ? J + R : "";
  }, wd;
}
var md, rg;
function Uw() {
  if (rg) return md;
  rg = 1;
  var s = /* @__PURE__ */ Cg(), t = Object.prototype.hasOwnProperty, e = Array.isArray, n = {
    allowDots: !1,
    allowEmptyArrays: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decodeDotInKeys: !1,
    decoder: s.decode,
    delimiter: "&",
    depth: 5,
    duplicates: "combine",
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictDepth: !1,
    strictNullHandling: !1
  }, r = function(S) {
    return S.replace(/&#(\d+);/g, function(y, b) {
      return String.fromCharCode(parseInt(b, 10));
    });
  }, i = function(S, y) {
    return S && typeof S == "string" && y.comma && S.indexOf(",") > -1 ? S.split(",") : S;
  }, c = "utf8=%26%2310003%3B", a = "utf8=%E2%9C%93", l = function(y, b) {
    var z = { __proto__: null }, g = b.ignoreQueryPrefix ? y.replace(/^\?/, "") : y;
    g = g.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    var f = b.parameterLimit === 1 / 0 ? void 0 : b.parameterLimit, m = g.split(b.delimiter, f), x = -1, v, O = b.charset;
    if (b.charsetSentinel)
      for (v = 0; v < m.length; ++v)
        m[v].indexOf("utf8=") === 0 && (m[v] === a ? O = "utf-8" : m[v] === c && (O = "iso-8859-1"), x = v, v = m.length);
    for (v = 0; v < m.length; ++v)
      if (v !== x) {
        var U = m[v], E = U.indexOf("]="), I = E === -1 ? U.indexOf("=") : E + 1, Z, k;
        I === -1 ? (Z = b.decoder(U, n.decoder, O, "key"), k = b.strictNullHandling ? null : "") : (Z = b.decoder(U.slice(0, I), n.decoder, O, "key"), k = s.maybeMap(
          i(U.slice(I + 1), b),
          function(R) {
            return b.decoder(R, n.decoder, O, "value");
          }
        )), k && b.interpretNumericEntities && O === "iso-8859-1" && (k = r(String(k))), U.indexOf("[]=") > -1 && (k = e(k) ? [k] : k);
        var D = t.call(z, Z);
        D && b.duplicates === "combine" ? z[Z] = s.combine(z[Z], k) : (!D || b.duplicates === "last") && (z[Z] = k);
      }
    return z;
  }, p = function(S, y, b, z) {
    for (var g = z ? y : i(y, b), f = S.length - 1; f >= 0; --f) {
      var m, x = S[f];
      if (x === "[]" && b.parseArrays)
        m = b.allowEmptyArrays && (g === "" || b.strictNullHandling && g === null) ? [] : [].concat(g);
      else {
        m = b.plainObjects ? { __proto__: null } : {};
        var v = x.charAt(0) === "[" && x.charAt(x.length - 1) === "]" ? x.slice(1, -1) : x, O = b.decodeDotInKeys ? v.replace(/%2E/g, ".") : v, U = parseInt(O, 10);
        !b.parseArrays && O === "" ? m = { 0: g } : !isNaN(U) && x !== O && String(U) === O && U >= 0 && b.parseArrays && U <= b.arrayLimit ? (m = [], m[U] = g) : O !== "__proto__" && (m[O] = g);
      }
      g = m;
    }
    return g;
  }, $ = function(y, b, z, g) {
    if (y) {
      var f = z.allowDots ? y.replace(/\.([^.[]+)/g, "[$1]") : y, m = /(\[[^[\]]*])/, x = /(\[[^[\]]*])/g, v = z.depth > 0 && m.exec(f), O = v ? f.slice(0, v.index) : f, U = [];
      if (O) {
        if (!z.plainObjects && t.call(Object.prototype, O) && !z.allowPrototypes)
          return;
        U.push(O);
      }
      for (var E = 0; z.depth > 0 && (v = x.exec(f)) !== null && E < z.depth; ) {
        if (E += 1, !z.plainObjects && t.call(Object.prototype, v[1].slice(1, -1)) && !z.allowPrototypes)
          return;
        U.push(v[1]);
      }
      if (v) {
        if (z.strictDepth === !0)
          throw new RangeError("Input depth exceeded depth option of " + z.depth + " and strictDepth is true");
        U.push("[" + f.slice(v.index) + "]");
      }
      return p(U, b, z, g);
    }
  }, P = function(y) {
    if (!y)
      return n;
    if (typeof y.allowEmptyArrays < "u" && typeof y.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof y.decodeDotInKeys < "u" && typeof y.decodeDotInKeys != "boolean")
      throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
    if (y.decoder !== null && typeof y.decoder < "u" && typeof y.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof y.charset < "u" && y.charset !== "utf-8" && y.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var b = typeof y.charset > "u" ? n.charset : y.charset, z = typeof y.duplicates > "u" ? n.duplicates : y.duplicates;
    if (z !== "combine" && z !== "first" && z !== "last")
      throw new TypeError("The duplicates option must be either combine, first, or last");
    var g = typeof y.allowDots > "u" ? y.decodeDotInKeys === !0 ? !0 : n.allowDots : !!y.allowDots;
    return {
      allowDots: g,
      allowEmptyArrays: typeof y.allowEmptyArrays == "boolean" ? !!y.allowEmptyArrays : n.allowEmptyArrays,
      allowPrototypes: typeof y.allowPrototypes == "boolean" ? y.allowPrototypes : n.allowPrototypes,
      allowSparse: typeof y.allowSparse == "boolean" ? y.allowSparse : n.allowSparse,
      arrayLimit: typeof y.arrayLimit == "number" ? y.arrayLimit : n.arrayLimit,
      charset: b,
      charsetSentinel: typeof y.charsetSentinel == "boolean" ? y.charsetSentinel : n.charsetSentinel,
      comma: typeof y.comma == "boolean" ? y.comma : n.comma,
      decodeDotInKeys: typeof y.decodeDotInKeys == "boolean" ? y.decodeDotInKeys : n.decodeDotInKeys,
      decoder: typeof y.decoder == "function" ? y.decoder : n.decoder,
      delimiter: typeof y.delimiter == "string" || s.isRegExp(y.delimiter) ? y.delimiter : n.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof y.depth == "number" || y.depth === !1 ? +y.depth : n.depth,
      duplicates: z,
      ignoreQueryPrefix: y.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof y.interpretNumericEntities == "boolean" ? y.interpretNumericEntities : n.interpretNumericEntities,
      parameterLimit: typeof y.parameterLimit == "number" ? y.parameterLimit : n.parameterLimit,
      parseArrays: y.parseArrays !== !1,
      plainObjects: typeof y.plainObjects == "boolean" ? y.plainObjects : n.plainObjects,
      strictDepth: typeof y.strictDepth == "boolean" ? !!y.strictDepth : n.strictDepth,
      strictNullHandling: typeof y.strictNullHandling == "boolean" ? y.strictNullHandling : n.strictNullHandling
    };
  };
  return md = function(S, y) {
    var b = P(y);
    if (S === "" || S === null || typeof S > "u")
      return b.plainObjects ? { __proto__: null } : {};
    for (var z = typeof S == "string" ? l(S, b) : S, g = b.plainObjects ? { __proto__: null } : {}, f = Object.keys(z), m = 0; m < f.length; ++m) {
      var x = f[m], v = $(x, z[x], b, typeof S == "string");
      g = s.merge(g, v, b);
    }
    return b.allowSparse === !0 ? g : s.compact(g);
  }, md;
}
var $d, ig;
function xw() {
  if (ig) return $d;
  ig = 1;
  var s = /* @__PURE__ */ vw(), t = /* @__PURE__ */ Uw(), e = /* @__PURE__ */ kd();
  return $d = {
    formats: e,
    parse: t,
    stringify: s
  }, $d;
}
var Sw = /* @__PURE__ */ xw();
class mt extends Ht {
  constructor(t, e, n, r) {
    super(t, e, n, r), this.result = n.result || {}, this.result_info = n.result_info || {};
  }
  getPaginatedItems() {
    var t;
    return ((t = this.result) == null ? void 0 : t.items) ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const t = this.nextPageInfo();
    if (!t)
      return null;
    if ("params" in t)
      return t.params;
    const e = Object.fromEntries(t.url.searchParams);
    return Object.keys(e).length ? e : null;
  }
  nextPageInfo() {
    const t = this.options.query;
    return { params: { page: ((t == null ? void 0 : t.page) ?? 1) + 1 } };
  }
}
class A extends Ht {
  constructor(t, e, n, r) {
    super(t, e, n, r), this.result = n.result || [], this.result_info = n.result_info || {};
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const t = this.nextPageInfo();
    if (!t)
      return null;
    if ("params" in t)
      return t.params;
    const e = Object.fromEntries(t.url.searchParams);
    return Object.keys(e).length ? e : null;
  }
  nextPageInfo() {
    const t = this.options.query;
    return { params: { page: ((t == null ? void 0 : t.page) ?? 1) + 1 } };
  }
}
class Ld extends Ht {
  constructor(t, e, n, r) {
    super(t, e, n, r), this.result = n.result || [], this.result_info = n.result_info || {};
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const t = this.nextPageInfo();
    if (!t)
      return null;
    if ("params" in t)
      return t.params;
    const e = Object.fromEntries(t.url.searchParams);
    return Object.keys(e).length ? e : null;
  }
  nextPageInfo() {
    var e;
    const t = (e = this.result_info) == null ? void 0 : e.cursor;
    return t ? {
      params: {
        cursor: t
      }
    } : null;
  }
}
class Zd extends Ht {
  constructor(t, e, n, r) {
    super(t, e, n, r), this.result = n.result || [], this.result_info = n.result_info || {};
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const t = this.nextPageInfo();
    if (!t)
      return null;
    if ("params" in t)
      return t.params;
    const e = Object.fromEntries(t.url.searchParams);
    return Object.keys(e).length ? e : null;
  }
  nextPageInfo() {
    var e;
    const t = (e = this.result_info) == null ? void 0 : e.cursor;
    return t ? {
      params: {
        cursor: t
      }
    } : null;
  }
}
class w extends Ht {
  constructor(t, e, n, r) {
    super(t, e, n, r), this.result = n.result || [];
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  /**
   * This page represents a response that isn't actually paginated at the API level
   * so there will never be any next page params.
   */
  nextPageParams() {
    return null;
  }
  nextPageInfo() {
    return null;
  }
}
class zw extends w {
}
class Eg extends A {
}
class o {
  constructor(t) {
    this._client = t;
  }
}
class te extends o {
  /**
   * Set Total TLS Settings or disable the feature for a Zone.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/acm/total_tls`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Total TLS Settings for a Zone.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/acm/total_tls`, e)._thenUnwrap((r) => r.result);
  }
}
te || (te = {});
class ee extends o {
  constructor() {
    super(...arguments), this.totalTLS = new te(this._client);
  }
}
(function(s) {
  s.TotalTLS = te;
})(ee || (ee = {}));
let ne = class extends o {
  /**
   * List Gateway Logs
   */
  list(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.getAPIList(`/accounts/${r}/ai-gateway/gateways/${t}/logs`, Td, { query: i, ...n });
  }
};
class Td extends A {
}
(function(s) {
  s.LogListResponsesV4PagePaginationArray = Td;
})(ne || (ne = {}));
class se extends o {
  constructor() {
    super(...arguments), this.logs = new ne(this._client);
  }
  /**
   * Create a new Gateway
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/ai-gateway/gateways`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Gateway
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/ai-gateway/gateways/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Gateways
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/ai-gateway/gateways`, Ow, { query: r, ...e });
  }
  /**
   * Delete a Gateway
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/ai-gateway/gateways/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a Gateway
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/ai-gateway/gateways/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Ow extends A {
}
(function(s) {
  s.Logs = ne, s.LogListResponsesV4PagePaginationArray = Td;
})(se || (se = {}));
let re = class extends o {
  /**
   * Set configuration properties
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/api_gateway/configuration`, { body: r, ...e });
  }
  /**
   * Retrieve information about specific configuration properties
   */
  get(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.get(`/zones/${n}/api_gateway/configuration`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
};
re || (re = {});
class ie extends o {
  /**
   * Retrieve operations and features as OpenAPI schemas
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.get(`/zones/${n}/api_gateway/schemas`, { query: r, ...e })._thenUnwrap((i) => i.result);
  }
}
ie || (ie = {});
let ce = class extends o {
  /**
   * Retrieve the most up to date view of discovered operations
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/api_gateway/discovery/operations`, Aw, { query: r, ...e });
  }
  /**
   * Update the `state` on a discovered operation
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/api_gateway/discovery/operations/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
};
ce || (ce = {});
class oe extends o {
  constructor() {
    super(...arguments), this.operations = new ce(this._client);
  }
  /**
   * Retrieve the most up to date view of discovered operations, rendered as OpenAPI
   * schemas
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/api_gateway/discovery`, e)._thenUnwrap((r) => r.result);
  }
}
class Aw extends A {
}
(function(s) {
  s.Operations = ce;
})(oe || (oe = {}));
let ae = class extends o {
  /**
   * Updates operation-level schema validation settings on the zone
   */
  update(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.put(`/zones/${r}/api_gateway/operations/${t}/schema_validation`, {
      body: i,
      ...n
    });
  }
  /**
   * Updates multiple operation-level schema validation settings on the zone
   */
  edit(t, e) {
    const { zone_id: n, settings_multiple_request: r } = t;
    return this._client.patch(`/zones/${n}/api_gateway/operations/schema_validation`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves operation-level schema validation settings on the zone
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/api_gateway/operations/${t}/schema_validation`, n);
  }
};
ae || (ae = {});
let ue = class extends o {
  constructor() {
    super(...arguments), this.schemaValidation = new ae(this._client);
  }
  /**
   * Add one or more operations to a zone. Endpoints can contain path variables.
   * Host, method, endpoint will be normalized to a canoncial form when creating an
   * operation and must be unique on the zone. Inserting an operation that matches an
   * existing one will return the record of the already existing operation and update
   * its last_updated date.
   */
  create(t, e) {
    const { zone_id: n, body: r } = t;
    return this._client.post(`/zones/${n}/api_gateway/operations`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve information about all operations on a zone
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/api_gateway/operations`, Cd, { query: r, ...e });
  }
  /**
   * Delete an operation
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/api_gateway/operations/${t}`, n);
  }
  /**
   * Retrieve information about an operation
   */
  get(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.get(`/zones/${r}/api_gateway/operations/${t}`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}, Cd = class extends A {
};
(function(s) {
  s.OperationListResponsesV4PagePaginationArray = Cd, s.SchemaValidation = ae;
})(ue || (ue = {}));
class le extends o {
  /**
   * Updates zone level schema validation settings on the zone
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/api_gateway/settings/schema_validation`, { body: r, ...e });
  }
  /**
   * Updates zone level schema validation settings on the zone
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/api_gateway/settings/schema_validation`, {
      body: r,
      ...e
    });
  }
  /**
   * Retrieves zone level schema validation settings currently set on the zone
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/api_gateway/settings/schema_validation`, e);
  }
}
le || (le = {});
let Ct = class extends o {
  constructor() {
    super(...arguments), this.schemaValidation = new le(this._client);
  }
};
(function(s) {
  s.Settings = Ct, s.SchemaValidation = le;
})(Ct || (Ct = {}));
class de extends o {
  /**
   * Retrieves all operations from the schema. Operations that already exist in API
   * Shield Endpoint Management will be returned as full operations.
   */
  list(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.getAPIList(`/zones/${r}/api_gateway/user_schemas/${t}/operations`, Ed, { query: i, ...n });
  }
}
class Ed extends A {
}
(function(s) {
  s.OperationListResponsesV4PagePaginationArray = Ed;
})(de || (de = {}));
class he extends o {
  constructor() {
    super(...arguments), this.operations = new de(this._client);
  }
  /**
   * Upload a schema to a zone
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/api_gateway/user_schemas`, tt({ body: r, ...e }))._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve information about all schemas on a zone
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/api_gateway/user_schemas`, Vd, { query: r, ...e });
  }
  /**
   * Delete a schema
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/api_gateway/user_schemas/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Enable validation for a schema
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/api_gateway/user_schemas/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieve information about a specific schema on a zone
   */
  get(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.get(`/zones/${r}/api_gateway/user_schemas/${t}`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
class Vd extends A {
}
(function(s) {
  s.PublicSchemasV4PagePaginationArray = Vd, s.Operations = de, s.OperationListResponsesV4PagePaginationArray = Ed;
})(he || (he = {}));
class _e extends o {
  constructor() {
    super(...arguments), this.configurations = new re(this._client), this.discovery = new oe(this._client), this.operations = new ue(this._client), this.schemas = new ie(this._client), this.settings = new Ct(this._client), this.userSchemas = new he(this._client);
  }
}
(function(s) {
  s.Configurations = re, s.Discovery = oe, s.Operations = ue, s.OperationListResponsesV4PagePaginationArray = Cd, s.Schemas = ie, s.Settings = Ct, s.UserSchemas = he, s.PublicSchemasV4PagePaginationArray = Vd;
})(_e || (_e = {}));
class pe extends o {
  /**
   * Add a user to the list of members for this account.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/members`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify an account member.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/members/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all members of an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/members`, Dd, { query: r, ...e });
  }
  /**
   * Remove a member from an account.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/members/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about a specific member of an account.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/members/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Dd extends A {
}
(function(s) {
  s.MemberListResponsesV4PagePaginationArray = Dd;
})(pe || (pe = {}));
class ge extends o {
  /**
   * Get all available roles for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/roles`, zw, e);
  }
  /**
   * Get information about a specific role for an account.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/roles/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
ge || (ge = {});
let fe = class extends o {
  constructor() {
    super(...arguments), this.members = new pe(this._client), this.roles = new ge(this._client);
  }
  /**
   * Update an existing account.
   */
  update(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/accounts", Rw, {
      query: t,
      ...e
    });
  }
  /**
   * Get information about a specific account that you are a member of.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}`, e)._thenUnwrap((r) => r.result);
  }
};
class Rw extends A {
}
(function(s) {
  s.Members = pe, s.MemberListResponsesV4PagePaginationArray = Dd, s.Roles = ge;
})(fe || (fe = {}));
class we extends o {
  /**
   * Bring-Your-Own IP (BYOIP) prefixes onboarded to Cloudflare must be bound to a
   * service running on the Cloudflare network to enable a Cloudflare product on the
   * IP addresses. This endpoint can be used as a reference of available services on
   * the Cloudflare network, and their service IDs.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/addressing/services`, Nd, e);
  }
}
class Nd extends w {
}
(function(s) {
  s.ServiceListResponsesSinglePage = Nd;
})(we || (we = {}));
class me extends o {
  /**
   * Add an account as a member of a particular address map.
   */
  update(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.put(`/accounts/${r}/addressing/address_maps/${t}/accounts/${r}`, { body: i, ...n })._thenUnwrap((c) => c.result);
  }
  /**
   * Remove an account as a member of a particular address map.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/addressing/address_maps/${t}/accounts/${r}`, n)._thenUnwrap((i) => i.result);
  }
}
me || (me = {});
let $e = class extends o {
  /**
   * Add an IP from a prefix owned by the account to a particular address map.
   */
  update(t, e, n, r) {
    const { account_id: i, body: c } = n;
    return this._client.put(`/accounts/${i}/addressing/address_maps/${t}/ips/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Remove an IP from a particular address map.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/addressing/address_maps/${t}/ips/${e}`, r)._thenUnwrap((c) => c.result);
  }
};
$e || ($e = {});
let ye = class extends o {
  /**
   * Add a zone as a member of a particular address map.
   */
  update(t, e, n) {
    const { zone_id: r, account_id: i, body: c } = e;
    return this._client.put(`/accounts/${i}/addressing/address_maps/${t}/zones/${r}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Remove a zone as a member of a particular address map.
   */
  delete(t, e, n) {
    const { zone_id: r, account_id: i } = e;
    return this._client.delete(`/accounts/${i}/addressing/address_maps/${t}/zones/${r}`, n)._thenUnwrap((c) => c.result);
  }
};
ye || (ye = {});
class be extends o {
  constructor() {
    super(...arguments), this.accounts = new me(this._client), this.ips = new $e(this._client), this.zones = new ye(this._client);
  }
  /**
   * Create a new address map under the account.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/addressing/address_maps`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List all address maps owned by the account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/addressing/address_maps`, Fd, e);
  }
  /**
   * Delete a particular address map owned by the account. An Address Map must be
   * disabled before it can be deleted.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/addressing/address_maps/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Modify properties of an address map owned by the account.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/addressing/address_maps/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Show a particular address map owned by the account.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/addressing/address_maps/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Fd extends w {
}
(function(s) {
  s.AddressMapsSinglePage = Fd, s.Accounts = me, s.IPs = $e, s.Zones = ye;
})(be || (be = {}));
let Pe = class extends o {
  /**
   * Download specified LOA document under the account.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/addressing/loa_documents/${t}/download`, {
      ...n,
      __binaryResponse: !0
    });
  }
};
Pe || (Pe = {});
class ve extends o {
  constructor() {
    super(...arguments), this.downloads = new Pe(this._client);
  }
  /**
   * Submit LOA document (pdf format) under the account.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/addressing/loa_documents`, tt({ body: r, ...e }))._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.Downloads = Pe;
})(ve || (ve = {}));
class Et extends o {
  /**
   * Create a new account delegation for a given IP prefix.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/addressing/prefixes/${t}/delegations`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all delegations for a given account IP prefix.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/addressing/prefixes/${t}/delegations`, Md, n);
  }
  /**
   * Delete an account delegation for a given IP prefix.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/addressing/prefixes/${t}/delegations/${e}`, r)._thenUnwrap((c) => c.result);
  }
}
class Md extends w {
}
(function(s) {
  s.Delegations = Et, s.DelegationsSinglePage = Md;
})(Et || (Et = {}));
let Ue = class extends o {
  /**
   * Creates a new Service Binding, routing traffic to IPs within the given CIDR to a
   * service running on Cloudflare's network. **Note:** This API may only be used on
   * prefixes currently configured with a Magic Transit service binding, and only
   * allows creating service bindings for the Cloudflare CDN or Cloudflare Spectrum.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/addressing/prefixes/${t}/bindings`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List the Cloudflare services this prefix is currently bound to. Traffic sent to
   * an address within an IP prefix will be routed to the Cloudflare service of the
   * most-specific Service Binding matching the address. **Example:** binding
   * `192.0.2.0/24` to Cloudflare Magic Transit and `192.0.2.1/32` to the Cloudflare
   * CDN would route traffic for `192.0.2.1` to the CDN, and traffic for all other
   * IPs in the prefix to Cloudflare Magic Transit.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/addressing/prefixes/${t}/bindings`, Bd, n);
  }
  /**
   * Delete a Service Binding
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/addressing/prefixes/${t}/bindings/${e}`, r);
  }
  /**
   * Fetch a single Service Binding
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/addressing/prefixes/${t}/bindings/${e}`, r)._thenUnwrap((c) => c.result);
  }
};
class Bd extends w {
}
(function(s) {
  s.ServiceBindingsSinglePage = Bd;
})(Ue || (Ue = {}));
let xe = class extends o {
  /**
   * List all BGP Prefixes within the specified IP Prefix. BGP Prefixes are used to
   * control which specific subnets are advertised to the Internet. It is possible to
   * advertise subnets more specific than an IP Prefix by creating more specific BGP
   * Prefixes.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/addressing/prefixes/${t}/bgp/prefixes`, Yd, n);
  }
  /**
   * Update the properties of a BGP Prefix, such as the on demand advertisement
   * status (advertised or withdrawn).
   */
  edit(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.patch(`/accounts/${i}/addressing/prefixes/${t}/bgp/prefixes/${e}`, { body: c, ...r })._thenUnwrap((a) => a.result);
  }
  /**
   * Retrieve a single BGP Prefix according to its identifier
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/addressing/prefixes/${t}/bgp/prefixes/${e}`, r)._thenUnwrap((c) => c.result);
  }
};
class Yd extends w {
}
(function(s) {
  s.BGPPrefixesSinglePage = Yd;
})(xe || (xe = {}));
let Se = class extends o {
  /**
   * Advertise or withdraw BGP route for a prefix.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/addressing/prefixes/${t}/bgp/status`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List the current advertisement state for a prefix.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/addressing/prefixes/${t}/bgp/status`, n)._thenUnwrap((i) => i.result);
  }
};
Se || (Se = {});
let ze = class extends o {
  constructor() {
    super(...arguments), this.bindings = new Ue(this._client), this.prefixes = new xe(this._client), this.statuses = new Se(this._client);
  }
};
(function(s) {
  s.Bindings = Ue, s.ServiceBindingsSinglePage = Bd, s.Prefixes = xe, s.BGPPrefixesSinglePage = Yd, s.Statuses = Se;
})(ze || (ze = {}));
class Oe extends o {
  constructor() {
    super(...arguments), this.bgp = new ze(this._client), this.delegations = new Et(this._client);
  }
  /**
   * Add a new prefix under the account.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/addressing/prefixes`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List all prefixes owned by the account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/addressing/prefixes`, Hd, e);
  }
  /**
   * Delete an unapproved prefix owned by the account.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/addressing/prefixes/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Modify the description for a prefix owned by the account.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/addressing/prefixes/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List a particular prefix owned by the account.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/addressing/prefixes/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Hd extends w {
}
(function(s) {
  s.PrefixesSinglePage = Hd, s.BGP = ze, s.Delegations = Et, s.DelegationsSinglePage = Md;
})(Oe || (Oe = {}));
let Ae = class extends o {
  /**
   * List all Regional Services regions available for use by this account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/addressing/regional_hostnames/regions`, jd, e);
  }
};
class jd extends w {
}
(function(s) {
  s.RegionListResponsesSinglePage = jd;
})(Ae || (Ae = {}));
class Re extends o {
  constructor() {
    super(...arguments), this.regions = new Ae(this._client);
  }
  /**
   * Create a new Regional Hostname entry. Cloudflare will only use data centers that
   * are physically located within the chosen region to decrypt and service HTTPS
   * traffic. Learn more about
   * [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/get-started/).
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/addressing/regional_hostnames`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List all Regional Hostnames within a zone.
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/addressing/regional_hostnames`, Gd, e);
  }
  /**
   * Delete the region configuration for a specific Regional Hostname.
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/addressing/regional_hostnames/${t}`, n);
  }
  /**
   * Update the configuration for a specific Regional Hostname. Only the region_key
   * of a hostname is mutable.
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/addressing/regional_hostnames/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch the configuration for a specific Regional Hostname, within a zone.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/addressing/regional_hostnames/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Gd extends w {
}
(function(s) {
  s.RegionalHostnameListResponsesSinglePage = Gd, s.Regions = Ae, s.RegionListResponsesSinglePage = jd;
})(Re || (Re = {}));
class Ie extends o {
  constructor() {
    super(...arguments), this.regionalHostnames = new Re(this._client), this.services = new we(this._client), this.addressMaps = new be(this._client), this.loaDocuments = new ve(this._client), this.prefixes = new Oe(this._client);
  }
}
(function(s) {
  s.RegionalHostnames = Re, s.RegionalHostnameListResponsesSinglePage = Gd, s.Services = we, s.ServiceListResponsesSinglePage = Nd, s.AddressMaps = be, s.AddressMapsSinglePage = Fd, s.LOADocuments = ve, s.Prefixes = Oe, s.PrefixesSinglePage = Hd;
})(Ie || (Ie = {}));
class ke extends o {
  /**
   * Gets a list of all alert types for which an account is eligible.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/alerting/v3/available_alerts`, e)._thenUnwrap((r) => r.result);
  }
}
ke || (ke = {});
class Le extends o {
  /**
   * Gets a list of history records for notifications sent to an account. The records
   * are displayed for last `x` number of days based on the zone plan (free = 30, pro
   * = 30, biz = 30, ent = 90).
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/alerting/v3/history`, Wd, { query: r, ...e });
  }
}
class Wd extends A {
}
(function(s) {
  s.HistoriesV4PagePaginationArray = Wd;
})(Le || (Le = {}));
let Ze = class extends o {
  /**
   * Creates a new Notification policy.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/alerting/v3/policies`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Notification policy.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/alerting/v3/policies/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a list of all Notification policies.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/alerting/v3/policies`, Kd, e);
  }
  /**
   * Delete a Notification policy.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/alerting/v3/policies/${t}`, n);
  }
  /**
   * Get details for a single policy.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/alerting/v3/policies/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class Kd extends w {
}
(function(s) {
  s.PoliciesSinglePage = Kd;
})(Ze || (Ze = {}));
class Te extends o {
  /**
   * Get a list of all delivery mechanism types for which an account is eligible.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/alerting/v3/destinations/eligible`, e)._thenUnwrap((r) => r.result);
  }
}
Te || (Te = {});
class Ce extends o {
  /**
   * Creates a new token for integrating with PagerDuty.
   */
  create(t, e) {
    const { account_id: n } = t;
    return this._client.post(`/accounts/${n}/alerting/v3/destinations/pagerduty/connect`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Deletes all the PagerDuty Services connected to the account.
   */
  delete(t, e) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/alerting/v3/destinations/pagerduty`, e);
  }
  /**
   * Get a list of all configured PagerDuty services.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/alerting/v3/destinations/pagerduty`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Links PagerDuty with the account using the integration token.
   */
  link(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/alerting/v3/destinations/pagerduty/connect/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
Ce || (Ce = {});
let Vt = class extends o {
  /**
   * Creates a new webhook destination.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/alerting/v3/destinations/webhooks`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a webhook destination.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/alerting/v3/destinations/webhooks/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets a list of all configured webhook destinations.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/alerting/v3/destinations/webhooks`, Jd, e);
  }
  /**
   * Delete a configured webhook destination.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/alerting/v3/destinations/webhooks/${t}`, n);
  }
  /**
   * Get details for a single webhooks destination.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/alerting/v3/destinations/webhooks/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class Jd extends w {
}
(function(s) {
  s.Webhooks = Vt, s.WebhooksSinglePage = Jd;
})(Vt || (Vt = {}));
class Ee extends o {
  constructor() {
    super(...arguments), this.eligible = new Te(this._client), this.pagerduty = new Ce(this._client), this.webhooks = new Vt(this._client);
  }
}
(function(s) {
  s.Eligible = Te, s.PagerdutyResource = Ce, s.Webhooks = Vt, s.WebhooksSinglePage = Jd;
})(Ee || (Ee = {}));
class Ve extends o {
  constructor() {
    super(...arguments), this.availableAlerts = new ke(this._client), this.destinations = new Ee(this._client), this.history = new Le(this._client), this.policies = new Ze(this._client);
  }
}
(function(s) {
  s.AvailableAlerts = ke, s.Destinations = Ee, s.HistoryResource = Le, s.HistoriesV4PagePaginationArray = Wd, s.Policies = Ze, s.PoliciesSinglePage = Kd;
})(Ve || (Ve = {}));
class De extends o {
  /**
   * Updates enablement of Argo Smart Routing.
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/argo/smart_routing`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Argo Smart Routing setting
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/argo/smart_routing`, e)._thenUnwrap((r) => r.result);
  }
}
De || (De = {});
class Ne extends o {
  /**
   * Updates enablement of Tiered Caching
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/argo/tiered_caching`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Tiered Caching setting
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/argo/tiered_caching`, e)._thenUnwrap((r) => r.result);
  }
}
Ne || (Ne = {});
class Fe extends o {
  constructor() {
    super(...arguments), this.smartRouting = new De(this._client), this.tieredCaching = new Ne(this._client);
  }
}
(function(s) {
  s.SmartRouting = De, s.TieredCaching = Ne;
})(Fe || (Fe = {}));
let Vg = class extends o {
  /**
   * Gets a list of audit logs for an account. Can be filtered by who made the
   * change, on which zone, and the timeframe of the change.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/audit_logs`, Eg, {
      query: r,
      ...e
    });
  }
}, Me = class extends o {
  /**
   * Gets the current billing profile for the account.
   */
  get(t, e) {
    return this._client.get(`/accounts/${t}/billing/profile`, e)._thenUnwrap((n) => n.result);
  }
};
Me || (Me = {});
let Be = class extends o {
  constructor() {
    super(...arguments), this.profiles = new Me(this._client);
  }
};
(function(s) {
  s.Profiles = Me;
})(Be || (Be = {}));
class Dg extends o {
  /**
   * Updates the Bot Management configuration for a zone.
   *
   * This API is used to update:
   *
   * - **Bot Fight Mode**
   * - **Super Bot Fight Mode**
   * - **Bot Management for Enterprise**
   *
   * See [Bot Plans](https://developers.cloudflare.com/bots/plans/) for more
   * information on the different plans
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/bot_management`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve a zone's Bot Management Config
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/bot_management`, e)._thenUnwrap((r) => r.result);
  }
}
class Ng extends o {
  /**
   * Submit suspicious URL for scanning
   */
  submit(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/brand-protection/submit`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get results for a URL scan
   */
  urlInfo(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/brand-protection/url-info`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Ye extends o {
  /**
   * You can use Cache Reserve Clear to clear your Cache Reserve, but you must first
   * disable Cache Reserve. In most cases, this will be accomplished within 24 hours.
   * You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind
   * that you cannot undo or cancel this operation.
   */
  clear(t, e) {
    const { zone_id: n, body: r } = t;
    return this._client.post(`/zones/${n}/cache/cache_reserve_clear`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Increase cache lifetimes by automatically storing all cacheable files into
   * Cloudflare's persistent object storage buckets. Requires Cache Reserve
   * subscription. Note: using Tiered Cache with Cache Reserve is highly recommended
   * to reduce Reserve operations costs. See the
   * [developer docs](https://developers.cloudflare.com/cache/about/cache-reserve)
   * for more information.
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/cache/cache_reserve`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Increase cache lifetimes by automatically storing all cacheable files into
   * Cloudflare's persistent object storage buckets. Requires Cache Reserve
   * subscription. Note: using Tiered Cache with Cache Reserve is highly recommended
   * to reduce Reserve operations costs. See the
   * [developer docs](https://developers.cloudflare.com/cache/about/cache-reserve)
   * for more information.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/cache/cache_reserve`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * You can use Cache Reserve Clear to clear your Cache Reserve, but you must first
   * disable Cache Reserve. In most cases, this will be accomplished within 24 hours.
   * You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind
   * that you cannot undo or cancel this operation.
   */
  status(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/cache/cache_reserve_clear`, e)._thenUnwrap((r) => r.result);
  }
}
Ye || (Ye = {});
class He extends o {
  /**
   * Instructs Cloudflare to check a regional hub data center on the way to your
   * upper tier. This can help improve performance for smart and custom tiered cache
   * topologies.
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/cache/regional_tiered_cache`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Instructs Cloudflare to check a regional hub data center on the way to your
   * upper tier. This can help improve performance for smart and custom tiered cache
   * topologies.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/cache/regional_tiered_cache`, e)._thenUnwrap((r) => r.result);
  }
}
He || (He = {});
class je extends o {
  /**
   * Remvoves enablement of Smart Tiered Cache
   */
  delete(t, e) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/cache/tiered_cache_smart_topology_enable`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Updates enablement of Tiered Cache
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/cache/tiered_cache_smart_topology_enable`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Smart Tiered Cache setting
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/cache/tiered_cache_smart_topology_enable`, e)._thenUnwrap((r) => r.result);
  }
}
je || (je = {});
let Ge = class extends o {
  /**
   * Variant support enables caching variants of images with certain file extensions
   * in addition to the original. This only applies when the origin server sends the
   * 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but
   * does not serve the variant requested, the response will not be cached. This will
   * be indicated with BYPASS cache status in the response headers.
   */
  delete(t, e) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/cache/variants`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Variant support enables caching variants of images with certain file extensions
   * in addition to the original. This only applies when the origin server sends the
   * 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but
   * does not serve the variant requested, the response will not be cached. This will
   * be indicated with BYPASS cache status in the response headers.
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/cache/variants`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Variant support enables caching variants of images with certain file extensions
   * in addition to the original. This only applies when the origin server sends the
   * 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but
   * does not serve the variant requested, the response will not be cached. This will
   * be indicated with BYPASS cache status in the response headers.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/cache/variants`, e)._thenUnwrap((r) => r.result);
  }
};
Ge || (Ge = {});
class We extends o {
  constructor() {
    super(...arguments), this.cacheReserve = new Ye(this._client), this.smartTieredCache = new je(this._client), this.variants = new Ge(this._client), this.regionalTieredCache = new He(this._client);
  }
  /**
   * ### Purge All Cached Content
   *
   * Removes ALL files from Cloudflare's cache. All tiers can purge everything.
   *
   * ```
   * {"purge_everything": true}
   * ```
   *
   * ### Purge Cached Content by URL
   *
   * Granularly removes one or more files from Cloudflare's cache by specifying URLs.
   * All tiers can purge by URL.
   *
   * To purge files with custom cache keys, include the headers used to compute the
   * cache key as in the example. If you have a device type or geo in your cache key,
   * you will need to include the CF-Device-Type or CF-IPCountry headers. If you have
   * lang in your cache key, you will need to include the Accept-Language header.
   *
   * **NB:** When including the Origin header, be sure to include the **scheme** and
   * **hostname**. The port number can be omitted if it is the default port (80 for
   * http, 443 for https), but must be included otherwise.
   *
   * **NB:** For Zones on Free/Pro/Business plan, you may purge up to 30 URLs in one
   * API call. For Zones on Enterprise plan, you may purge up to 500 URLs in one API
   * call.
   *
   * Single file purge example with files:
   *
   * ```
   * {"files": ["http://www.example.com/css/styles.css", "http://www.example.com/js/index.js"]}
   * ```
   *
   * Single file purge example with url and header pairs:
   *
   * ```
   * {"files": [{url: "http://www.example.com/cat_picture.jpg", headers: { "CF-IPCountry": "US", "CF-Device-Type": "desktop", "Accept-Language": "zh-CN" }}, {url: "http://www.example.com/dog_picture.jpg", headers: { "CF-IPCountry": "EU", "CF-Device-Type": "mobile", "Accept-Language": "en-US" }}]}
   * ```
   *
   * ### Purge Cached Content by Tag, Host or Prefix
   *
   * Granularly removes one or more files from Cloudflare's cache either by
   * specifying the host, the associated Cache-Tag, or a Prefix. Only Enterprise
   * customers are permitted to purge by Tag, Host or Prefix.
   *
   * **NB:** Cache-Tag, host, and prefix purging each have a rate limit of 30,000
   * purge API calls in every 24 hour period. You may purge up to 30 tags, hosts, or
   * prefixes in one API call. This rate limit can be raised for customers who need
   * to purge at higher volume.
   *
   * Flex purge with tags:
   *
   * ```
   * {"tags": ["a-cache-tag", "another-cache-tag"]}
   * ```
   *
   * Flex purge with hosts:
   *
   * ```
   * {"hosts": ["www.example.com", "images.example.com"]}
   * ```
   *
   * Flex purge with prefixes:
   *
   * ```
   * {"prefixes": ["www.example.com/foo", "images.example.com/bar/baz"]}
   * ```
   */
  purge(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/purge_cache`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.CacheReserveResource = Ye, s.SmartTieredCache = je, s.Variants = Ge, s.RegionalTieredCacheResource = He;
})(We || (We = {}));
let Ke = class extends o {
  /**
   * Creates a new Cloudflare Calls TURN key.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/calls/turn_keys`, { body: r, ...e });
  }
  /**
   * Edit details for a single TURN key.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/calls/turn_keys/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all TURN keys in the Cloudflare account
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/calls/turn_keys`, Qd, e);
  }
  /**
   * Deletes a TURN key from Cloudflare Calls
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/calls/turn_keys/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches details for a single TURN key.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/calls/turn_keys/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class Qd extends w {
}
(function(s) {
  s.KeyListResponsesSinglePage = Qd;
})(Ke || (Ke = {}));
class Je extends o {
  constructor() {
    super(...arguments), this.keys = new Ke(this._client);
  }
}
(function(s) {
  s.Keys = Ke, s.KeyListResponsesSinglePage = Qd;
})(Je || (Je = {}));
class Qe extends o {
  constructor() {
    super(...arguments), this.turn = new Je(this._client);
  }
  /**
   * Creates a new Cloudflare calls app. An app is an unique enviroment where each
   * Session can access all Tracks within the app.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/calls/apps`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Edit details for a single app.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/calls/apps/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all apps in the Cloudflare account
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/calls/apps`, Iw, e);
  }
  /**
   * Deletes an app from Cloudflare Calls
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/calls/apps/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches details for a single Calls app.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/calls/apps/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Iw extends w {
}
(function(s) {
  s.TURN = Je;
})(Qe || (Qe = {}));
class Xe extends o {
  /**
   * Replace Hostname Associations
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/certificate_authorities/hostname_associations`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List Hostname Associations
   */
  get(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.get(`/zones/${n}/certificate_authorities/hostname_associations`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
Xe || (Xe = {});
class qe extends o {
  constructor() {
    super(...arguments), this.hostnameAssociations = new Xe(this._client);
  }
}
(function(s) {
  s.HostnameAssociations = Xe;
})(qe || (qe = {}));
class tn extends o {
  /**
   * Lists challenge widgets.
   */
  create(t, e) {
    const { account_id: n, direction: r, order: i, page: c, per_page: a, ...l } = t;
    return this._client.post(`/accounts/${n}/challenges/widgets`, {
      query: { direction: r, order: i, page: c, per_page: a },
      body: l,
      ...e
    })._thenUnwrap((p) => p.result);
  }
  /**
   * Update the configuration of a widget.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/challenges/widgets/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all turnstile widgets of an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/challenges/widgets`, Xd, { query: r, ...e });
  }
  /**
   * Destroy a Turnstile Widget.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/challenges/widgets/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Show a single challenge widget configuration.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/challenges/widgets/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Generate a new secret key for this widget. If `invalidate_immediately` is set to
   * `false`, the previous secret remains valid for 2 hours.
   *
   * Note that secrets cannot be rotated again during the grace period.
   */
  rotateSecret(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/challenges/widgets/${t}/rotate_secret`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
class Xd extends A {
}
(function(s) {
  s.WidgetListResponsesV4PagePaginationArray = Xd;
})(tn || (tn = {}));
class en extends o {
  constructor() {
    super(...arguments), this.widgets = new tn(this._client);
  }
}
(function(s) {
  s.Widgets = tn, s.WidgetListResponsesV4PagePaginationArray = Xd;
})(en || (en = {}));
class Fg extends o {
  /**
   * Create a new API Shield mTLS Client Certificate
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/client_certificates`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List all of your Zone's API Shield mTLS Client Certificates by Status and/or
   * using Pagination
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/client_certificates`, kw, { query: r, ...e });
  }
  /**
   * Set a API Shield mTLS Client Certificate to pending_revocation status for
   * processing to revoked status.
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/client_certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * If a API Shield mTLS Client Certificate is in a pending_revocation state, you
   * may reactivate it with this endpoint.
   */
  edit(t, e, n) {
    const { zone_id: r } = e;
    return this._client.patch(`/zones/${r}/client_certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Details for a single mTLS API Shield Client Certificate
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/client_certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class kw extends A {
}
let nn = class extends o {
  /**
   * Put Rules
   */
  update(t, e) {
    const { zone_id: n, body: r } = t;
    return this._client.put(`/zones/${n}/cloud_connector/rules`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Rules
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/cloud_connector/rules`, qd, e);
  }
}, qd = class extends w {
};
(function(s) {
  s.RuleListResponsesSinglePage = qd;
})(nn || (nn = {}));
class sn extends o {
  constructor() {
    super(...arguments), this.rules = new nn(this._client);
  }
}
(function(s) {
  s.Rules = nn, s.RuleListResponsesSinglePage = qd;
})(sn || (sn = {}));
class rn extends o {
  /**
   * Creating a request adds the request into the Cloudforce One queue for analysis.
   * In addition to the content, a short title, type, priority, and releasability
   * should be provided. If one is not provided a default will be assigned.
   */
  create(t, e, n, r) {
    return this._client.post(`/accounts/${t}/cloudforce-one/requests/${e}/message/new`, { body: n, ...r })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Request Message
   */
  update(t, e, n, r, i) {
    return this._client.put(`/accounts/${t}/cloudforce-one/requests/${e}/message/${n}`, { body: r, ...i })._thenUnwrap((c) => c.result);
  }
  /**
   * Delete a Request Message
   */
  delete(t, e, n, r) {
    return this._client.delete(`/accounts/${t}/cloudforce-one/requests/${e}/message/${n}`, r);
  }
  /**
   * List Request Messages
   */
  get(t, e, n, r) {
    return this._client.post(`/accounts/${t}/cloudforce-one/requests/${e}/message`, { body: n, ...r })._thenUnwrap((i) => i.result);
  }
}
rn || (rn = {});
class cn extends o {
  /**
   * Create a New Priority Requirement
   */
  create(t, e, n) {
    return this._client.post(`/accounts/${t}/cloudforce-one/requests/priority/new`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Update a Priority Intelligence Requirement
   */
  update(t, e, n, r) {
    return this._client.put(`/accounts/${t}/cloudforce-one/requests/priority/${e}`, { body: n, ...r })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete a Priority Intelligence Report
   */
  delete(t, e, n) {
    return this._client.delete(`/accounts/${t}/cloudforce-one/requests/priority/${e}`, n);
  }
  /**
   * Get a Priority Intelligence Requirement
   */
  get(t, e, n) {
    return this._client.get(`/accounts/${t}/cloudforce-one/requests/priority/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Get Priority Intelligence Requirement Quota
   */
  quota(t, e) {
    return this._client.get(`/accounts/${t}/cloudforce-one/requests/priority/quota`, e)._thenUnwrap((n) => n.result);
  }
}
cn || (cn = {});
class on extends o {
  constructor() {
    super(...arguments), this.message = new rn(this._client), this.priority = new cn(this._client);
  }
  /**
   * Creating a request adds the request into the Cloudforce One queue for analysis.
   * In addition to the content, a short title, type, priority, and releasability
   * should be provided. If one is not provided a default will be assigned.
   */
  create(t, e, n) {
    return this._client.post(`/accounts/${t}/cloudforce-one/requests/new`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Updating a request alters the request in the Cloudforce One queue. This API may
   * be used to update any attributes of the request after the initial submission.
   * Only fields that you choose to update need to be add to the request body
   */
  update(t, e, n, r) {
    return this._client.put(`/accounts/${t}/cloudforce-one/requests/${e}`, {
      body: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List Requests
   */
  list(t, e, n) {
    return this._client.getAPIList(`/accounts/${t}/cloudforce-one/requests`, th, { body: e, method: "post", ...n });
  }
  /**
   * Delete a Request
   */
  delete(t, e, n) {
    return this._client.delete(`/accounts/${t}/cloudforce-one/requests/${e}`, n);
  }
  /**
   * Get Request Priority, Status, and TLP constants
   */
  constants(t, e) {
    return this._client.get(`/accounts/${t}/cloudforce-one/requests/constants`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get a Request
   */
  get(t, e, n) {
    return this._client.get(`/accounts/${t}/cloudforce-one/requests/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Get Request Quota
   */
  quota(t, e) {
    return this._client.get(`/accounts/${t}/cloudforce-one/requests/quota`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get Request Types
   */
  types(t, e) {
    return this._client.get(`/accounts/${t}/cloudforce-one/requests/types`, e)._thenUnwrap((n) => n.result);
  }
}
class th extends A {
}
(function(s) {
  s.ListItemsV4PagePaginationArray = th, s.MessageResource = rn, s.PriorityResource = cn;
})(on || (on = {}));
class an extends o {
  constructor() {
    super(...arguments), this.requests = new on(this._client);
  }
}
(function(s) {
  s.Requests = on, s.ListItemsV4PagePaginationArray = th;
})(an || (an = {}));
class un extends o {
  /**
   * If a zone has multiple SSL certificates, you can set the order in which they
   * should be used during a request. The higher priority will break ties across
   * overlapping 'legacy_custom' certificates.
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/custom_certificates/prioritize`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
un || (un = {});
class ln extends o {
  constructor() {
    super(...arguments), this.prioritize = new un(this._client);
  }
  /**
   * Upload a new SSL certificate for a zone.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/custom_certificates`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List, search, and filter all of your custom SSL certificates. The higher
   * priority will break ties across overlapping 'legacy_custom' certificates, but
   * 'legacy_custom' certificates will always supercede 'sni_custom' certificates.
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/custom_certificates`, Lw, { query: r, ...e });
  }
  /**
   * Remove a SSL certificate from a zone.
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/custom_certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Upload a new private key and/or PEM/CRT for the SSL certificate. Note: PATCHing
   * a configuration for sni_custom certificates will result in a new resource id
   * being returned, and the previous one being deleted.
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/custom_certificates/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * SSL Configuration Details
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/custom_certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Lw extends A {
}
(function(s) {
  s.Prioritize = un;
})(ln || (ln = {}));
class dn extends o {
  /**
   * Update Fallback Origin for Custom Hostnames
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/custom_hostnames/fallback_origin`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete Fallback Origin for Custom Hostnames
   */
  delete(t, e) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/custom_hostnames/fallback_origin`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Get Fallback Origin for Custom Hostnames
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/custom_hostnames/fallback_origin`, e)._thenUnwrap((r) => r.result);
  }
}
dn || (dn = {});
class hn extends o {
  constructor() {
    super(...arguments), this.fallbackOrigin = new dn(this._client);
  }
  /**
   * Add a new custom hostname and request that an SSL certificate be issued for it.
   * One of three validation methods—http, txt, email—should be used, with 'http'
   * recommended if the CNAME is already in place (or will be soon). Specifying
   * 'email' will send an email to the WHOIS contacts on file for the base domain
   * plus hostmaster, postmaster, webmaster, admin, administrator. If http is used
   * and the domain is not already pointing to the Managed CNAME host, the PATCH
   * method must be used once it is (to complete validation).
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/custom_hostnames`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List, search, sort, and filter all of your custom hostnames.
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/custom_hostnames`, Zw, { query: r, ...e });
  }
  /**
   * Delete Custom Hostname (and any issued SSL certificates)
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/custom_hostnames/${t}`, n);
  }
  /**
   * Modify SSL configuration for a custom hostname. When sent with SSL config that
   * matches existing config, used to indicate that hostname should pass domain
   * control validation (DCV). Can also be used to change validation type, e.g., from
   * 'http' to 'email'.
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/custom_hostnames/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Custom Hostname Details
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/custom_hostnames/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Zw extends A {
}
(function(s) {
  s.FallbackOrigin = dn;
})(hn || (hn = {}));
let Mg = class extends o {
  /**
   * Add Account Custom Nameserver
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/custom_ns`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete Account Custom Nameserver
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/custom_ns/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Eligible Zones for Account Custom Nameservers
   */
  availabilty(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/custom_ns/availability`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * List an account's custom nameservers.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/custom_ns`, e)._thenUnwrap((r) => r.result);
  }
};
class _n extends o {
  /**
   * Returns the created D1 database.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/d1/database`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns a list of D1 databases.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/d1/database`, eh, { query: r, ...e });
  }
  /**
   * Deletes the specified D1 database.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/d1/database/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Returns the specified D1 database.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/d1/database/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Returns the query result as an object.
   */
  query(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/d1/database/${t}/query`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the query result rows as arrays rather than objects. This is a
   * performance-optimized version of the /query endpoint.
   */
  raw(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/d1/database/${t}/raw`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
class eh extends A {
}
(function(s) {
  s.DatabaseListResponsesV4PagePaginationArray = eh;
})(_n || (_n = {}));
class pn extends o {
  constructor() {
    super(...arguments), this.database = new _n(this._client);
  }
}
(function(s) {
  s.Database = _n, s.DatabaseListResponsesV4PagePaginationArray = eh;
})(pn || (pn = {}));
class Bg extends o {
  /**
   * Retrieve the account and zone specific unique identifier used as part of the
   * CNAME target for DCV Delegation.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/dcv_delegation/uuid`, e)._thenUnwrap((r) => r.result);
  }
}
class gn extends o {
  /**
   * Create a new DNS record for a zone.
   *
   * Notes:
   *
   * - A/AAAA records cannot exist on the same name as CNAME records.
   * - NS records cannot exist on the same name as any other record type.
   * - Domain names are always represented in Punycode, even if Unicode characters
   *   were used when creating the record.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/dns_records`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Overwrite an existing DNS record. Notes:
   *
   * - A/AAAA records cannot exist on the same name as CNAME records.
   * - NS records cannot exist on the same name as any other record type.
   * - Domain names are always represented in Punycode, even if Unicode characters
   *   were used when creating the record.
   */
  update(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.put(`/zones/${r}/dns_records/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List, search, sort, and filter a zones' DNS records.
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/dns_records`, nh, {
      query: r,
      ...e
    });
  }
  /**
   * Delete DNS Record
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/dns_records/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing DNS record. Notes:
   *
   * - A/AAAA records cannot exist on the same name as CNAME records.
   * - NS records cannot exist on the same name as any other record type.
   * - Domain names are always represented in Punycode, even if Unicode characters
   *   were used when creating the record.
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/dns_records/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * You can export your
   * [BIND config](https://en.wikipedia.org/wiki/Zone_file "Zone file") through this
   * endpoint.
   *
   * See
   * [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/ "Import and export records")
   * for more information.
   */
  export(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/dns_records/export`, {
      ...e,
      headers: { Accept: "text/plain", ...e == null ? void 0 : e.headers }
    });
  }
  /**
   * DNS Record Details
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/dns_records/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * You can upload your
   * [BIND config](https://en.wikipedia.org/wiki/Zone_file "Zone file") through this
   * endpoint. It assumes that cURL is called from a location with bind_config.txt
   * (valid BIND config) present.
   *
   * See
   * [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/ "Import and export records")
   * for more information.
   */
  import(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/dns_records/import`, tt({ body: r, ...e }))._thenUnwrap((i) => i.result);
  }
  /**
   * Scan for common DNS records on your domain and automatically add them to your
   * zone. Useful if you haven't updated your nameservers yet.
   */
  scan(t, e) {
    const { zone_id: n, body: r } = t;
    return this._client.post(`/zones/${n}/dns_records/scan`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
}
class nh extends A {
}
(function(s) {
  s.RecordsV4PagePaginationArray = nh;
})(gn || (gn = {}));
let fn = class extends o {
  /**
   * Update DNS settings for an account or zone
   */
  edit(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.patch(`/${c}/${a}/dns_settings`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  get(t = {}, e) {
    if (u(t))
      return this.get({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.get(`/${i}/${c}/dns_settings`, e)._thenUnwrap((a) => a.result);
  }
};
fn || (fn = {});
let wn = class extends o {
  /**
   * Retrieves a list of aggregate metrics grouped by time interval.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   */
  get(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.get(`/zones/${n}/dns_analytics/report/bytime`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
};
wn || (wn = {});
let mn = class extends o {
  constructor() {
    super(...arguments), this.bytimes = new wn(this._client);
  }
  /**
   * Retrieves a list of summarised aggregate metrics over a given time period.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   */
  get(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.get(`/zones/${n}/dns_analytics/report`, { query: r, ...e })._thenUnwrap((i) => i.result);
  }
};
(function(s) {
  s.Bytimes = wn;
})(mn || (mn = {}));
let $n = class extends o {
  constructor() {
    super(...arguments), this.reports = new mn(this._client);
  }
};
(function(s) {
  s.Reports = mn;
})($n || ($n = {}));
let yn = class extends o {
  /**
   * Retrieves a list of aggregate metrics grouped by time interval.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   */
  get(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.get(`/accounts/${r}/dns_firewall/${t}/dns_analytics/report/bytime`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
};
yn || (yn = {});
class bn extends o {
  constructor() {
    super(...arguments), this.bytimes = new yn(this._client);
  }
  /**
   * Retrieves a list of summarised aggregate metrics over a given time period.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   */
  get(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.get(`/accounts/${r}/dns_firewall/${t}/dns_analytics/report`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
(function(s) {
  s.Bytimes = yn;
})(bn || (bn = {}));
let Pn = class extends o {
  constructor() {
    super(...arguments), this.reports = new bn(this._client);
  }
};
(function(s) {
  s.Reports = bn;
})(Pn || (Pn = {}));
class vn extends o {
  constructor() {
    super(...arguments), this.analytics = new Pn(this._client);
  }
  /**
   * Create a configured DNS Firewall Cluster.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/dns_firewall`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List configured DNS Firewall clusters for an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/dns_firewall`, sh, {
      query: r,
      ...e
    });
  }
  /**
   * Delete a configured DNS Firewall Cluster.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/dns_firewall/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Modify a DNS Firewall Cluster configuration.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/dns_firewall/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Show a single configured DNS Firewall cluster for an account.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/dns_firewall/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class sh extends A {
}
(function(s) {
  s.FirewallsV4PagePaginationArray = sh, s.Analytics = Pn;
})(vn || (vn = {}));
let Un = class extends o {
  constructor() {
    super(...arguments), this.records = new gn(this._client), this.settings = new fn(this._client), this.analytics = new $n(this._client), this.firewall = new vn(this._client);
  }
};
(function(s) {
  s.Records = gn, s.RecordsV4PagePaginationArray = nh, s.Settings = fn, s.Analytics = $n, s.FirewallResource = vn, s.FirewallsV4PagePaginationArray = sh;
})(Un || (Un = {}));
class Yg extends o {
  /**
   * Delete DNSSEC.
   */
  delete(t, e) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/dnssec`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Enable or disable DNSSEC.
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/dnssec`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Details about DNSSEC status and configuration.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/dnssec`, e)._thenUnwrap((r) => r.result);
  }
}
class xn extends o {
  /**
   * Run traceroutes from Cloudflare colos.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/diagnostics/traceroute`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
xn || (xn = {});
class Sn extends o {
  constructor() {
    super(...arguments), this.traceroutes = new xn(this._client);
  }
}
(function(s) {
  s.Traceroutes = xn;
})(Sn || (Sn = {}));
class zn extends o {
  /**
   * Returns the Durable Objects in a given namespace.
   */
  list(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.getAPIList(`/accounts/${r}/workers/durable_objects/namespaces/${t}/objects`, rh, { query: i, ...n });
  }
}
class rh extends Zd {
}
(function(s) {
  s.DurableObjectsCursorLimitPagination = rh;
})(zn || (zn = {}));
let On = class extends o {
  constructor() {
    super(...arguments), this.objects = new zn(this._client);
  }
  /**
   * Returns the Durable Object namespaces owned by an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/workers/durable_objects/namespaces`, ih, e);
  }
};
class ih extends w {
}
(function(s) {
  s.NamespacesSinglePage = ih, s.Objects = zn, s.DurableObjectsCursorLimitPagination = rh;
})(On || (On = {}));
class An extends o {
  constructor() {
    super(...arguments), this.namespaces = new On(this._client);
  }
}
(function(s) {
  s.Namespaces = On, s.NamespacesSinglePage = ih;
})(An || (An = {}));
class Rn extends o {
  /**
   * Create a destination address to forward your emails to. Destination addresses
   * need to be verified before they can be used.
   */
  create(t, e, n) {
    return this._client.post(`/accounts/${t}/email/routing/addresses`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  list(t, e = {}, n) {
    return u(e) ? this.list(t, {}, e) : this._client.getAPIList(`/accounts/${t}/email/routing/addresses`, ch, { query: e, ...n });
  }
  /**
   * Deletes a specific destination address.
   */
  delete(t, e, n) {
    return this._client.delete(`/accounts/${t}/email/routing/addresses/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Gets information for a specific destination email already created.
   */
  get(t, e, n) {
    return this._client.get(`/accounts/${t}/email/routing/addresses/${e}`, n)._thenUnwrap((r) => r.result);
  }
}
class ch extends A {
}
(function(s) {
  s.AddressesV4PagePaginationArray = ch;
})(Rn || (Rn = {}));
let In = class extends o {
  /**
   * Show the DNS records needed to configure your Email Routing zone.
   */
  get(t, e) {
    return this._client.get(`/zones/${t}/email/routing/dns`, e)._thenUnwrap((n) => n.result);
  }
};
In || (In = {});
class kn extends o {
  /**
   * Enable or disable catch-all routing rule, or change action to forward to
   * specific destination address.
   */
  update(t, e, n) {
    return this._client.put(`/zones/${t}/email/routing/rules/catch_all`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Get information on the default catch-all routing rule.
   */
  get(t, e) {
    return this._client.get(`/zones/${t}/email/routing/rules/catch_all`, e)._thenUnwrap((n) => n.result);
  }
}
kn || (kn = {});
let Ln = class extends o {
  constructor() {
    super(...arguments), this.catchAlls = new kn(this._client);
  }
  /**
   * Rules consist of a set of criteria for matching emails (such as an email being
   * sent to a specific custom email address) plus a set of actions to take on the
   * email (like forwarding it to a specific destination address).
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/email/routing/rules`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Update actions and matches, or enable/disable specific routing rules.
   */
  update(t, e, n, r) {
    return this._client.put(`/zones/${t}/email/routing/rules/${e}`, {
      body: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  list(t, e = {}, n) {
    return u(e) ? this.list(t, {}, e) : this._client.getAPIList(`/zones/${t}/email/routing/rules`, oh, { query: e, ...n });
  }
  /**
   * Delete a specific routing rule.
   */
  delete(t, e, n) {
    return this._client.delete(`/zones/${t}/email/routing/rules/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Get information for a specific routing rule already created.
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/email/routing/rules/${e}`, n)._thenUnwrap((r) => r.result);
  }
};
class oh extends A {
}
(function(s) {
  s.EmailRoutingRulesV4PagePaginationArray = oh, s.CatchAlls = kn;
})(Ln || (Ln = {}));
class Zn extends o {
  constructor() {
    super(...arguments), this.dns = new In(this._client), this.rules = new Ln(this._client), this.addresses = new Rn(this._client);
  }
  /**
   * Disable your Email Routing zone. Also removes additional MX records previously
   * required for Email Routing to work.
   */
  disable(t, e, n) {
    return this._client.post(`/zones/${t}/email/routing/disable`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Enable you Email Routing zone. Add and lock the necessary MX and SPF records.
   */
  enable(t, e, n) {
    return this._client.post(`/zones/${t}/email/routing/enable`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Get information about the settings for your Email Routing zone.
   */
  get(t, e) {
    return this._client.get(`/zones/${t}/email/routing`, e)._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.DNS = In, s.Rules = Ln, s.EmailRoutingRulesV4PagePaginationArray = oh, s.Addresses = Rn, s.AddressesV4PagePaginationArray = ch;
})(Zn || (Zn = {}));
let Tn = class extends o {
  /**
   * Define the rules for a given queue which will determine event notification
   * production.
   */
  update(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.put(`/accounts/${i}/event_notifications/r2/${t}/configuration/queues/${e}`, { body: c, ...r })._thenUnwrap((a) => a.result);
  }
  /**
   * Turn off all event notifications configured for delivery to a given queue. No
   * further notifications will be produced for the queue once complete.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/event_notifications/r2/${t}/configuration/queues/${e}`, r)._thenUnwrap((c) => c.result);
  }
};
Tn || (Tn = {});
class Cn extends o {
  constructor() {
    super(...arguments), this.queues = new Tn(this._client);
  }
  /**
   * Returns all notification rules for each queue for which bucket notifications are
   * produced.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/event_notifications/r2/${t}/configuration`, n)._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.Queues = Tn;
})(Cn || (Cn = {}));
let En = class extends o {
  constructor() {
    super(...arguments), this.configuration = new Cn(this._client);
  }
};
(function(s) {
  s.Configuration = Cn;
})(En || (En = {}));
class Vn extends o {
  constructor() {
    super(...arguments), this.r2 = new En(this._client);
  }
}
(function(s) {
  s.R2 = En;
})(Vn || (Vn = {}));
class Hg extends o {
  /**
   * Creates one or more filters.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/filters`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  /**
   * Updates an existing filter.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  update(t, e, n, r) {
    return this._client.put(`/zones/${t}/filters/${e}`, { body: n, ...r })._thenUnwrap((i) => i.result);
  }
  list(t, e = {}, n) {
    return u(e) ? this.list(t, {}, e) : this._client.getAPIList(`/zones/${t}/filters`, Tw, {
      query: e,
      ...n
    });
  }
  /**
   * Deletes an existing filter.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  delete(t, e, n) {
    return this._client.delete(`/zones/${t}/filters/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Fetches the details of a filter.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/filters/${e}`, n)._thenUnwrap((r) => r.result);
  }
}
class Tw extends A {
}
class Dn extends o {
  /**
   * Creates a new IP Access rule for an account or zone. The rule will apply to all
   * zones in the account or zone.
   *
   * Note: To create an IP Access rule that applies to a single zone, refer to the
   * [IP Access rules for a zone](#ip-access-rules-for-a-zone) endpoints.
   */
  create(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/firewall/access_rules/rules`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.getAPIList(`/${c}/${a}/firewall/access_rules/rules`, ah, { query: i, ...e });
  }
  delete(t, e = {}, n) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/firewall/access_rules/rules/${t}`, n)._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an IP Access rule defined.
   *
   * Note: This operation will affect all zones in the account or zone.
   */
  edit(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.patch(`/${a}/${l}/firewall/access_rules/rules/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((p) => p.result);
  }
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/firewall/access_rules/rules/${t}`, n)._thenUnwrap((l) => l.result);
  }
}
class ah extends A {
}
(function(s) {
  s.AccessRuleListResponsesV4PagePaginationArray = ah;
})(Dn || (Dn = {}));
class Nn extends o {
  /**
   * Creates a new Zone Lockdown rule.
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/firewall/lockdowns`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Updates an existing Zone Lockdown rule.
   */
  update(t, e, n, r) {
    return this._client.put(`/zones/${t}/firewall/lockdowns/${e}`, {
      body: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  list(t, e = {}, n) {
    return u(e) ? this.list(t, {}, e) : this._client.getAPIList(`/zones/${t}/firewall/lockdowns`, uh, { query: e, ...n });
  }
  /**
   * Deletes an existing Zone Lockdown rule.
   */
  delete(t, e, n) {
    return this._client.delete(`/zones/${t}/firewall/lockdowns/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Fetches the details of a Zone Lockdown rule.
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/firewall/lockdowns/${e}`, n)._thenUnwrap((r) => r.result);
  }
}
class uh extends A {
}
(function(s) {
  s.LockdownsV4PagePaginationArray = uh;
})(Nn || (Nn = {}));
let Fn = class extends o {
  /**
   * Create one or more firewall rules.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/firewall/rules`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  /**
   * Updates an existing firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  update(t, e, n, r) {
    return this._client.put(`/zones/${t}/firewall/rules/${e}`, {
      body: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  list(t, e = {}, n) {
    return u(e) ? this.list(t, {}, e) : this._client.getAPIList(`/zones/${t}/firewall/rules`, lh, { query: e, ...n });
  }
  /**
   * Deletes an existing firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  delete(t, e, n) {
    return this._client.delete(`/zones/${t}/firewall/rules/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Updates the priority of an existing firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  edit(t, e, n, r) {
    return this._client.patch(`/zones/${t}/firewall/rules/${e}`, {
      body: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  get(t, e, n) {
    const { path_id: r, query_id: i, ...c } = e;
    return this._client.get(`/zones/${t}/firewall/rules/${r}`, {
      query: { id: i, ...c },
      ...n
    })._thenUnwrap((a) => a.result);
  }
};
class lh extends A {
}
(function(s) {
  s.FirewallRulesV4PagePaginationArray = lh;
})(Fn || (Fn = {}));
class Mn extends o {
  /**
   * Creates a new User Agent Blocking rule in a zone.
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/firewall/ua_rules`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Updates an existing User Agent Blocking rule.
   */
  update(t, e, n, r) {
    return this._client.put(`/zones/${t}/firewall/ua_rules/${e}`, {
      body: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  list(t, e = {}, n) {
    return u(e) ? this.list(t, {}, e) : this._client.getAPIList(`/zones/${t}/firewall/ua_rules`, dh, { query: e, ...n });
  }
  /**
   * Deletes an existing User Agent Blocking rule.
   */
  delete(t, e, n) {
    return this._client.delete(`/zones/${t}/firewall/ua_rules/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Fetches the details of a User Agent Blocking rule.
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/firewall/ua_rules/${e}`, n)._thenUnwrap((r) => r.result);
  }
}
class dh extends A {
}
(function(s) {
  s.UARuleListResponsesV4PagePaginationArray = dh;
})(Mn || (Mn = {}));
class Bn extends o {
  /**
   * Creates a URI-based WAF override for a zone.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/firewall/waf/overrides`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Updates an existing URI-based WAF override.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  update(t, e, n, r) {
    return this._client.put(`/zones/${t}/firewall/waf/overrides/${e}`, {
      body: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  list(t, e = {}, n) {
    return u(e) ? this.list(t, {}, e) : this._client.getAPIList(`/zones/${t}/firewall/waf/overrides`, hh, { query: e, ...n });
  }
  /**
   * Deletes an existing URI-based WAF override.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  delete(t, e, n) {
    return this._client.delete(`/zones/${t}/firewall/waf/overrides/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Fetches the details of a URI-based WAF override.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/firewall/waf/overrides/${e}`, n)._thenUnwrap((r) => r.result);
  }
}
class hh extends A {
}
(function(s) {
  s.OverridesV4PagePaginationArray = hh;
})(Bn || (Bn = {}));
let Yn = class extends o {
  /**
   * Fetches the WAF rule groups in a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  list(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.getAPIList(`/zones/${r}/firewall/waf/packages/${t}/groups`, _h, { query: i, ...n });
  }
  /**
   * Updates a WAF rule group. You can update the state (`mode` parameter) of a rule
   * group.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  edit(t, e, n, r) {
    const { zone_id: i, ...c } = n;
    return this._client.patch(`/zones/${i}/firewall/waf/packages/${t}/groups/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetches the details of a WAF rule group.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  get(t, e, n, r) {
    const { zone_id: i } = n;
    return this._client.get(`/zones/${i}/firewall/waf/packages/${t}/groups/${e}`, r)._thenUnwrap((c) => c.result);
  }
};
class _h extends A {
}
(function(s) {
  s.GroupsV4PagePaginationArray = _h;
})(Yn || (Yn = {}));
let Hn = class extends o {
  /**
   * Fetches WAF rules in a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  list(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.getAPIList(`/zones/${r}/firewall/waf/packages/${t}/rules`, ph, { query: i, ...n });
  }
  /**
   * Updates a WAF rule. You can only update the mode/action of the rule.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  edit(t, e, n, r) {
    const { zone_id: i, ...c } = n;
    return this._client.patch(`/zones/${i}/firewall/waf/packages/${t}/rules/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetches the details of a WAF rule in a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  get(t, e, n, r) {
    const { zone_id: i } = n;
    return this._client.get(`/zones/${i}/firewall/waf/packages/${t}/rules/${e}`, r)._thenUnwrap((c) => c.result);
  }
};
class ph extends A {
}
(function(s) {
  s.RuleListResponsesV4PagePaginationArray = ph;
})(Hn || (Hn = {}));
class jn extends o {
  constructor() {
    super(...arguments), this.groups = new Yn(this._client), this.rules = new Hn(this._client);
  }
  list(t, e = {}, n) {
    return u(e) ? this.list(t, {}, e) : this._client.getAPIList(`/zones/${t}/firewall/waf/packages`, gh, { query: e, ...n });
  }
  /**
   * Fetches the details of a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/firewall/waf/packages/${e}`, n);
  }
}
class gh extends A {
}
(function(s) {
  s.PackageListResponsesV4PagePaginationArray = gh, s.Groups = Yn, s.GroupsV4PagePaginationArray = _h, s.Rules = Hn, s.RuleListResponsesV4PagePaginationArray = ph;
})(jn || (jn = {}));
class Gn extends o {
  constructor() {
    super(...arguments), this.overrides = new Bn(this._client), this.packages = new jn(this._client);
  }
}
(function(s) {
  s.Overrides = Bn, s.OverridesV4PagePaginationArray = hh, s.Packages = jn, s.PackageListResponsesV4PagePaginationArray = gh;
})(Gn || (Gn = {}));
class Wn extends o {
  constructor() {
    super(...arguments), this.lockdowns = new Nn(this._client), this.rules = new Fn(this._client), this.accessRules = new Dn(this._client), this.uaRules = new Mn(this._client), this.waf = new Gn(this._client);
  }
}
(function(s) {
  s.Lockdowns = Nn, s.LockdownsV4PagePaginationArray = uh, s.Rules = Fn, s.FirewallRulesV4PagePaginationArray = lh, s.AccessRules = Dn, s.AccessRuleListResponsesV4PagePaginationArray = ah, s.UARules = Mn, s.UARuleListResponsesV4PagePaginationArray = dh, s.WAF = Gn;
})(Wn || (Wn = {}));
let Kn = class extends o {
  /**
   * Create a new preview health check.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/healthchecks/preview`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete a health check.
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/healthchecks/preview/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a single configured health check preview.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/healthchecks/preview/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
Kn || (Kn = {});
class Jn extends o {
  constructor() {
    super(...arguments), this.previews = new Kn(this._client);
  }
  /**
   * Create a new health check.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/healthchecks`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a configured health check.
   */
  update(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.put(`/zones/${r}/healthchecks/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured health checks.
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/healthchecks`, Cw, {
      query: r,
      ...e
    });
  }
  /**
   * Delete a health check.
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/healthchecks/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Patch a configured health check.
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/healthchecks/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single configured health check.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/healthchecks/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Cw extends w {
}
(function(s) {
  s.Previews = Kn;
})(Jn || (Jn = {}));
class Qn extends o {
  /**
   * Update the tls setting value for the hostname.
   */
  update(t, e, n, r) {
    const { zone_id: i, ...c } = n;
    return this._client.put(`/zones/${i}/hostnames/settings/${t}/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Delete the tls setting value for the hostname.
   */
  delete(t, e, n, r) {
    const { zone_id: i } = n;
    return this._client.delete(`/zones/${i}/hostnames/settings/${t}/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * List the requested TLS setting for the hostnames under this zone.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/hostnames/settings/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
Qn || (Qn = {});
let Xn = class extends o {
  constructor() {
    super(...arguments), this.tls = new Qn(this._client);
  }
};
(function(s) {
  s.TLS = Qn;
})(Xn || (Xn = {}));
let qn = class extends o {
  constructor() {
    super(...arguments), this.settings = new Xn(this._client);
  }
};
(function(s) {
  s.Settings = Xn;
})(qn || (qn = {}));
let ts = class extends o {
  /**
   * Creates and returns a new Hyperdrive configuration.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/hyperdrive/configs`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates and returns the specified Hyperdrive configuration.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/hyperdrive/configs/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns a list of Hyperdrives
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/hyperdrive/configs`, Ew, e);
  }
  /**
   * Deletes the specified Hyperdrive.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/hyperdrive/configs/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Patches and returns the specified Hyperdrive configuration. Updates to the
   * origin and caching settings are applied with an all-or-nothing approach.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/hyperdrive/configs/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the specified Hyperdrive configuration.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/hyperdrive/configs/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
ts || (ts = {});
class es extends o {
  constructor() {
    super(...arguments), this.configs = new ts(this._client);
  }
}
class Ew extends w {
}
(function(s) {
  s.Configs = ts;
})(es || (es = {}));
let ns = class extends o {
  /**
   * List all the permissions groups for an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/iam/permission_groups`, fh, { query: r, ...e });
  }
  /**
   * Get information about a specific permission group in an account.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/iam/permission_groups/${t}`, n);
  }
};
class fh extends A {
}
(function(s) {
  s.PermissionGroupListResponsesV4PagePaginationArray = fh;
})(ns || (ns = {}));
class ss extends o {
  /**
   * Create a new Resource Group under the specified account.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/iam/resource_groups`, { body: r, ...e });
  }
  /**
   * Modify an existing resource group.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/iam/resource_groups/${t}`, {
      body: i,
      ...n
    });
  }
  /**
   * List all the resource groups for an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/iam/resource_groups`, wh, { query: r, ...e });
  }
  /**
   * Remove a resource group from an account.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/iam/resource_groups/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about a specific resource group in an account.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/iam/resource_groups/${t}`, n);
  }
}
class wh extends A {
}
(function(s) {
  s.ResourceGroupListResponsesV4PagePaginationArray = wh;
})(ss || (ss = {}));
class rs extends o {
  constructor() {
    super(...arguments), this.permissionGroups = new ns(this._client), this.resourceGroups = new ss(this._client);
  }
}
(function(s) {
  s.PermissionGroups = ns, s.PermissionGroupListResponsesV4PagePaginationArray = fh, s.ResourceGroups = ss, s.ResourceGroupListResponsesV4PagePaginationArray = wh;
})(rs || (rs = {}));
let jg = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.get("/ips", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
class is extends o {
  /**
   * Fetch base image. For most images this will be the originally uploaded file. For
   * larger images it can be a near-lossless version of the original.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/images/v1/${t}/blob`, {
      ...n,
      __binaryResponse: !0
    });
  }
}
is || (is = {});
let cs = class extends o {
  /**
   * Create a new signing key with specified name. Returns all keys available.
   */
  update(t, e, n) {
    const { account_id: r } = e;
    return this._client.put(`/accounts/${r}/images/v1/keys/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists your signing keys. These can be found on your Cloudflare Images dashboard.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/images/v1/keys`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Delete signing key with specified name. Returns all keys available. When last
   * key is removed, a new default signing key will be generated.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/images/v1/keys/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
cs || (cs = {});
class os extends o {
  /**
   * Fetch usage statistics details for Cloudflare Images.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/images/v1/stats`, e)._thenUnwrap((r) => r.result);
  }
}
os || (os = {});
class as extends o {
  /**
   * Specify variants that allow you to resize images for different use cases.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/images/v1/variants`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists existing variants.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/images/v1/variants`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Deleting a variant purges the cache for all images associated with the variant.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/images/v1/variants/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Updating a variant purges the cache for all images associated with the variant.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/images/v1/variants/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch details for a single variant.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/images/v1/variants/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
as || (as = {});
class us extends o {
  constructor() {
    super(...arguments), this.keys = new cs(this._client), this.stats = new os(this._client), this.variants = new as(this._client), this.blobs = new is(this._client);
  }
  /**
   * Upload an image with up to 10 Megabytes using a single HTTP POST
   * (multipart/form-data) request. An image can be uploaded by sending an image file
   * or passing an accessible to an API url.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/images/v1`, tt({ body: r, ...e }))._thenUnwrap((i) => i.result);
  }
  /**
   * List up to 100 images with one request. Use the optional parameters below to get
   * a specific range of images.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/images/v1`, mh, {
      query: r,
      ...e
    });
  }
  /**
   * Delete an image on Cloudflare Images. On success, all copies of the image are
   * deleted and purged from cache.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/images/v1/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Update image access control. On access control change, all copies of the image
   * are purged from cache.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/images/v1/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch details for a single image.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/images/v1/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class mh extends mt {
}
(function(s) {
  s.V1ListResponsesV4PagePagination = mh, s.Keys = cs, s.Stats = os, s.Variants = as, s.Blobs = is;
})(us || (us = {}));
class ls extends o {
  /**
   * Direct uploads allow users to upload images without API keys. A common use case
   * are web apps, client-side applications, or mobile devices where users upload
   * content directly to Cloudflare Images. This method creates a draft record for a
   * future image. It returns an upload URL and an image identifier. To verify if the
   * image itself has been uploaded, send an image details request
   * (accounts/:account_identifier/images/v1/:identifier), and check that the
   * `draft: true` property is not present.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/images/v2/direct_upload`, tt({ body: r, ...e }))._thenUnwrap((i) => i.result);
  }
}
ls || (ls = {});
class ds extends o {
  constructor() {
    super(...arguments), this.directUploads = new ls(this._client);
  }
  /**
   * List up to 10000 images with one request. Use the optional parameters below to
   * get a specific range of images. Endpoint returns continuation_token if more
   * images are present.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/images/v2`, { query: r, ...e })._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.DirectUploads = ls;
})(ds || (ds = {}));
class hs extends o {
  constructor() {
    super(...arguments), this.v1 = new us(this._client), this.v2 = new ds(this._client);
  }
}
(function(s) {
  s.V1 = us, s.V1ListResponsesV4PagePagination = mh, s.V2 = ds;
})(hs || (hs = {}));
let Dt = class extends o {
  /**
   * Get Passive DNS by IP
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/intel/dns`, $h, {
      query: r,
      ...e
    });
  }
};
class $h extends mt {
}
(function(s) {
  s.DNS = Dt, s.DNSListResponsesV4PagePagination = $h;
})(Dt || (Dt = {}));
class _s extends o {
  /**
   * Get Domain History
   */
  get(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/intel/domain-history`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
_s || (_s = {});
class ps extends o {
  /**
   * Get IP Lists
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/intel/ip-list`, e)._thenUnwrap((r) => r.result);
  }
}
ps || (ps = {});
let gs = class extends o {
  /**
   * Get IP Overview
   */
  get(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/intel/ip`, { query: r, ...e })._thenUnwrap((i) => i.result);
  }
};
gs || (gs = {});
class fs extends o {
  /**
   * Create Miscategorization
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/intel/miscategorization`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
fs || (fs = {});
class ws extends o {
  /**
   * List sinkholes owned by this account
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/intel/sinkholes`, yh, e);
  }
}
class yh extends w {
}
(function(s) {
  s.SinkholesSinglePage = yh;
})(ws || (ws = {}));
class Nt extends o {
  /**
   * Get WHOIS Record
   */
  get(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/intel/whois`, { query: r, ...e })._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.Whois = Nt;
})(Nt || (Nt = {}));
class ms extends o {
  /**
   * Get ASN Subnets
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/intel/asn/${t}/subnets`, n);
  }
}
ms || (ms = {});
class $s extends o {
  constructor() {
    super(...arguments), this.subnets = new ms(this._client);
  }
  /**
   * Get ASN Overview
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/intel/asn/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.Subnets = ms;
})($s || ($s = {}));
class ys extends o {
  /**
   * Get Security Center Issues Types
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/intel/attack-surface-report/issue-types`, e)._thenUnwrap((r) => r.result);
  }
}
ys || (ys = {});
class bs extends o {
  /**
   * Get Security Center Issues
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/intel/attack-surface-report/issues`, bh, { query: r, ...e });
  }
  /**
   * Get Security Center Issue Counts by Class
   */
  class(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/intel/attack-surface-report/issues/class`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Archive Security Center Insight
   */
  dismiss(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/intel/attack-surface-report/${t}/dismiss`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get Security Center Issue Counts by Severity
   */
  severity(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/intel/attack-surface-report/issues/severity`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Security Center Issue Counts by Type
   */
  type(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/intel/attack-surface-report/issues/type`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class bh extends mt {
}
(function(s) {
  s.IssueListResponsesV4PagePagination = bh;
})(bs || (bs = {}));
class Ps extends o {
  constructor() {
    super(...arguments), this.issueTypes = new ys(this._client), this.issues = new bs(this._client);
  }
}
(function(s) {
  s.IssueTypes = ys, s.Issues = bs, s.IssueListResponsesV4PagePagination = bh;
})(Ps || (Ps = {}));
class vs extends o {
  /**
   * Get Multiple Domain Details
   */
  get(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/intel/domain/bulk`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
vs || (vs = {});
let Us = class extends o {
  constructor() {
    super(...arguments), this.bulks = new vs(this._client);
  }
  /**
   * Get Domain Details
   */
  get(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/intel/domain`, { query: r, ...e })._thenUnwrap((i) => i.result);
  }
};
(function(s) {
  s.Bulks = vs;
})(Us || (Us = {}));
class xs extends o {
  /**
   * Grant permission to indicator feed
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}/intel/indicator-feeds/permissions/add`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List indicator feed permissions
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/intel/indicator-feeds/permissions/view`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Revoke permission to indicator feed
   */
  delete(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}/intel/indicator-feeds/permissions/remove`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
xs || (xs = {});
class Ss extends o {
  /**
   * Update indicator feed data
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/intel/indicator-feeds/${t}/snapshot`, tt({ body: i, ...n }))._thenUnwrap((c) => c.result);
  }
}
Ss || (Ss = {});
class zs extends o {
  constructor() {
    super(...arguments), this.snapshots = new Ss(this._client), this.permissions = new xs(this._client);
  }
  /**
   * Create new indicator feed
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/intel/indicator-feeds`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update indicator feed metadata
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/intel/indicator-feeds/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get indicator feeds owned by this account
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/intel/indicator-feeds`, Ph, e);
  }
  /**
   * Get indicator feed data
   */
  data(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/intel/indicator-feeds/${t}/data`, {
      ...n,
      headers: { Accept: "text/csv", ...n == null ? void 0 : n.headers }
    });
  }
  /**
   * Get indicator feed metadata
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/intel/indicator-feeds/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Ph extends w {
}
(function(s) {
  s.IndicatorFeedListResponsesSinglePage = Ph, s.Snapshots = Ss, s.Permissions = xs;
})(zs || (zs = {}));
class Os extends o {
  constructor() {
    super(...arguments), this.asn = new $s(this._client), this.dns = new Dt(this._client), this.domains = new Us(this._client), this.domainHistory = new _s(this._client), this.ips = new gs(this._client), this.ipLists = new ps(this._client), this.miscategorizations = new fs(this._client), this.whois = new Nt(this._client), this.indicatorFeeds = new zs(this._client), this.sinkholes = new ws(this._client), this.attackSurfaceReport = new Ps(this._client);
  }
}
(function(s) {
  s.ASN = $s, s.DNS = Dt, s.DNSListResponsesV4PagePagination = $h, s.Domains = Us, s.DomainHistoryResource = _s, s.IPs = gs, s.IPLists = ps, s.Miscategorizations = fs, s.Whois = Nt, s.IndicatorFeeds = zs, s.IndicatorFeedListResponsesSinglePage = Ph, s.Sinkholes = ws, s.SinkholesSinglePage = yh, s.AttackSurfaceReport = Ps;
})(Os || (Os = {}));
class As extends o {
  /**
   * Write multiple keys and values at once. Body should be an array of up to 10,000
   * key-value pairs to be stored, along with optional expiration information.
   * Existing values and expirations will be overwritten. If neither `expiration` nor
   * `expiration_ttl` is specified, the key-value pair will never expire. If both are
   * set, `expiration_ttl` is used and `expiration` is ignored. The entire request
   * size must be 100 megabytes or less.
   */
  update(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.put(`/accounts/${r}/storage/kv/namespaces/${t}/bulk`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Remove multiple KV pairs from the namespace. Body should be an array of up to
   * 10,000 keys to be removed.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/storage/kv/namespaces/${t}/bulk`, n)._thenUnwrap((i) => i.result);
  }
}
As || (As = {});
let Rs = class extends o {
  /**
   * Lists a namespace's keys.
   */
  list(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.getAPIList(`/accounts/${r}/storage/kv/namespaces/${t}/keys`, vh, { query: i, ...n });
  }
};
class vh extends Zd {
}
(function(s) {
  s.KeysCursorLimitPagination = vh;
})(Rs || (Rs = {}));
class Is extends o {
  /**
   * Returns the metadata associated with the given key in the given namespace. Use
   * URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key
   * name.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/storage/kv/namespaces/${t}/metadata/${e}`, r)._thenUnwrap((c) => c.result);
  }
}
Is || (Is = {});
class ks extends o {
  /**
   * Write a value identified by a key. Use URL-encoding to use special characters
   * (for example, `:`, `!`, `%`) in the key name. Body should be the value to be
   * stored along with JSON metadata to be associated with the key/value pair.
   * Existing values, expirations, and metadata will be overwritten. If neither
   * `expiration` nor `expiration_ttl` is specified, the key-value pair will never
   * expire. If both are set, `expiration_ttl` is used and `expiration` is ignored.
   */
  update(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.put(`/accounts/${i}/storage/kv/namespaces/${t}/values/${e}`, tt({ body: c, ...r }))._thenUnwrap((a) => a.result);
  }
  /**
   * Remove a KV pair from the namespace. Use URL-encoding to use special characters
   * (for example, `:`, `!`, `%`) in the key name.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/storage/kv/namespaces/${t}/values/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the value associated with the given key in the given namespace. Use
   * URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key
   * name. If the KV-pair is set to expire at some point, the expiration time as
   * measured in seconds since the UNIX epoch will be returned in the `expiration`
   * response header.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/storage/kv/namespaces/${t}/values/${e}`, { ...r, __binaryResponse: !0 });
  }
}
ks || (ks = {});
let Ls = class extends o {
  constructor() {
    super(...arguments), this.bulk = new As(this._client), this.keys = new Rs(this._client), this.metadata = new Is(this._client), this.values = new ks(this._client);
  }
  /**
   * Creates a namespace under the given title. A `400` is returned if the account
   * already owns a namespace with this title. A namespace must be explicitly deleted
   * to be replaced.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/storage/kv/namespaces`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modifies a namespace's title.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/storage/kv/namespaces/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the namespaces owned by an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/storage/kv/namespaces`, Uh, { query: r, ...e });
  }
  /**
   * Deletes the namespace corresponding to the given ID.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/storage/kv/namespaces/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get the namespace corresponding to the given ID.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/storage/kv/namespaces/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class Uh extends A {
}
(function(s) {
  s.NamespacesV4PagePaginationArray = Uh, s.Bulk = As, s.Keys = Rs, s.KeysCursorLimitPagination = vh, s.Metadata = Is, s.Values = ks;
})(Ls || (Ls = {}));
class Zs extends o {
  constructor() {
    super(...arguments), this.namespaces = new Ls(this._client);
  }
}
(function(s) {
  s.Namespaces = Ls, s.NamespacesV4PagePaginationArray = Uh;
})(Zs || (Zs = {}));
class Gg extends o {
  /**
   * Create Keyless SSL Configuration
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/keyless_certificates`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List all Keyless SSL configurations for a given zone.
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/keyless_certificates`, Vw, e);
  }
  /**
   * Delete Keyless SSL Configuration
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/keyless_certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * This will update attributes of a Keyless SSL. Consists of one or more of the
   * following: host,name,port.
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/keyless_certificates/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get details for one Keyless SSL configuration.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/keyless_certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Vw extends w {
}
let Ts = class extends o {
  /**
   * Get the result of a previous preview operation using the provided preview_id.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/load_balancers/preview/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
Ts || (Ts = {});
class Cs extends o {
  /**
   * List all region mappings.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/load_balancers/regions`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get a single region mapping.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/load_balancers/regions/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
Cs || (Cs = {});
class Es extends o {
  /**
   * Search for Load Balancing resources.
   */
  get(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/load_balancers/search`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
Es || (Es = {});
class Vs extends o {
  /**
   * Preview pools using the specified monitor with provided monitor details. The
   * returned preview_id can be used in the preview endpoint to retrieve the results.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/load_balancers/monitors/${t}/preview`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
Vs || (Vs = {});
let Ds = class extends o {
  /**
   * Get the list of resources that reference the provided monitor.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/load_balancers/monitors/${t}/references`, n)._thenUnwrap((i) => i.result);
  }
};
Ds || (Ds = {});
class Ns extends o {
  constructor() {
    super(...arguments), this.previews = new Vs(this._client), this.references = new Ds(this._client);
  }
  /**
   * Create a configured monitor.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/load_balancers/monitors`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify a configured monitor.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/load_balancers/monitors/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured monitors for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/load_balancers/monitors`, xh, e);
  }
  /**
   * Delete a configured monitor.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/load_balancers/monitors/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Apply changes to an existing monitor, overwriting the supplied properties.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/load_balancers/monitors/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List a single configured monitor for an account.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/load_balancers/monitors/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class xh extends w {
}
(function(s) {
  s.MonitorsSinglePage = xh, s.Previews = Vs, s.References = Ds;
})(Ns || (Ns = {}));
class Fs extends o {
  /**
   * Preview pool health using provided monitor details. The returned preview_id can
   * be used in the preview endpoint to retrieve the results.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/load_balancers/pools/${t}/preview`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch the latest pool health status for a single pool.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/load_balancers/pools/${t}/health`, n)._thenUnwrap((i) => i.result);
  }
}
Fs || (Fs = {});
let Ms = class extends o {
  /**
   * Get the list of resources that reference the provided pool.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/load_balancers/pools/${t}/references`, n)._thenUnwrap((i) => i.result);
  }
};
Ms || (Ms = {});
class Bs extends o {
  constructor() {
    super(...arguments), this.health = new Fs(this._client), this.references = new Ms(this._client);
  }
  /**
   * Create a new pool.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/load_balancers/pools`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify a configured pool.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/load_balancers/pools/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured pools.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/load_balancers/pools`, Sh, {
      query: r,
      ...e
    });
  }
  /**
   * Delete a configured pool.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/load_balancers/pools/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Apply changes to an existing pool, overwriting the supplied properties.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/load_balancers/pools/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single configured pool.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/load_balancers/pools/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Sh extends w {
}
(function(s) {
  s.PoolsSinglePage = Sh, s.Health = Fs, s.References = Ms;
})(Bs || (Bs = {}));
class Ys extends o {
  constructor() {
    super(...arguments), this.monitors = new Ns(this._client), this.pools = new Bs(this._client), this.previews = new Ts(this._client), this.regions = new Cs(this._client), this.searches = new Es(this._client);
  }
  /**
   * Create a new load balancer.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/load_balancers`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a configured load balancer.
   */
  update(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.put(`/zones/${r}/load_balancers/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured load balancers.
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/load_balancers`, Dw, e);
  }
  /**
   * Delete a configured load balancer.
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/load_balancers/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Apply changes to an existing load balancer, overwriting the supplied properties.
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/load_balancers/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single configured load balancer.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/load_balancers/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Dw extends w {
}
(function(s) {
  s.Monitors = Ns, s.MonitorsSinglePage = xh, s.Pools = Bs, s.PoolsSinglePage = Sh, s.Previews = Ts, s.Regions = Cs, s.Searches = Es;
})(Ys || (Ys = {}));
class Hs extends o {
  /**
   * Creates a new Instant Logs job for a zone.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/logpush/edge`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists Instant Logs jobs for a zone.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/logpush/edge`, e)._thenUnwrap((r) => r.result);
  }
}
Hs || (Hs = {});
let js = class extends o {
  /**
   * Creates a new Logpush job for an account or zone.
   */
  create(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/logpush/jobs`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a Logpush job.
   */
  update(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/logpush/jobs/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((p) => p.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.getAPIList(`/${i}/${c}/logpush/jobs`, zh, e);
  }
  delete(t, e = {}, n) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/logpush/jobs/${t}`, n)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/logpush/jobs/${t}`, n)._thenUnwrap((l) => l.result);
  }
};
class zh extends w {
}
(function(s) {
  s.LogpushJobsSinglePage = zh;
})(js || (js = {}));
class Gs extends o {
  /**
   * Gets a new ownership challenge sent to your destination.
   */
  create(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/logpush/ownership`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Validates ownership challenge of the destination.
   */
  validate(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/logpush/ownership/validate`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
}
Gs || (Gs = {});
class Ws extends o {
  /**
   * Checks if there is an existing job with a destination.
   */
  destination(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/logpush/validate/destination/exists`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Validates logpull origin with logpull_options.
   */
  origin(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/logpush/validate/origin`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
}
Ws || (Ws = {});
let Ks = class extends o {
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/logpush/datasets/${t}/fields`, n)._thenUnwrap((l) => l.result);
  }
};
Ks || (Ks = {});
class Js extends o {
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/logpush/datasets/${t}/jobs`, n)._thenUnwrap((l) => l.result);
  }
}
Js || (Js = {});
let Qs = class extends o {
  constructor() {
    super(...arguments), this.fields = new Ks(this._client), this.jobs = new Js(this._client);
  }
};
(function(s) {
  s.Fields = Ks, s.Jobs = Js;
})(Qs || (Qs = {}));
class Xs extends o {
  constructor() {
    super(...arguments), this.datasets = new Qs(this._client), this.edge = new Hs(this._client), this.jobs = new js(this._client), this.ownership = new Gs(this._client), this.validate = new Ws(this._client);
  }
}
(function(s) {
  s.Datasets = Qs, s.Edge = Hs, s.Jobs = js, s.LogpushJobsSinglePage = zh, s.Ownership = Gs, s.Validate = Ws;
})(Xs || (Xs = {}));
class qs extends o {
  get(t, e, n = {}, r) {
    return u(n) ? this.get(t, e, {}, n) : this._client.get(`/zones/${t}/logs/rayids/${e}`, { query: n, ...r });
  }
}
qs || (qs = {});
class tr extends o {
  /**
   * Updates log retention flag for Logpull API.
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/logs/control/retention/flag`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Gets log retention flag for Logpull API.
   */
  get(t, e) {
    return this._client.get(`/zones/${t}/logs/control/retention/flag`, e)._thenUnwrap((n) => n.result);
  }
}
tr || (tr = {});
class er extends o {
  /**
   * Updates CMB config.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/logs/control/cmb/config`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes CMB config.
   */
  delete(t, e) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/logs/control/cmb/config`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Gets CMB config.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/logs/control/cmb/config`, e)._thenUnwrap((r) => r.result);
  }
}
er || (er = {});
class nr extends o {
  constructor() {
    super(...arguments), this.config = new er(this._client);
  }
}
(function(s) {
  s.Config = er;
})(nr || (nr = {}));
class sr extends o {
  constructor() {
    super(...arguments), this.retention = new tr(this._client), this.cmb = new nr(this._client);
  }
}
(function(s) {
  s.Retention = tr, s.Cmb = nr;
})(sr || (sr = {}));
class rr extends o {
  /**
   * Lists all fields available. The response is json object with key-value pairs,
   * where keys are field names, and values are descriptions.
   */
  get(t, e) {
    return this._client.get(`/zones/${t}/logs/received/fields`, e);
  }
}
rr || (rr = {});
class ir extends o {
  constructor() {
    super(...arguments), this.fields = new rr(this._client);
  }
  /**
   * The `/received` api route allows customers to retrieve their edge HTTP logs. The
   * basic access pattern is "give me all the logs for zone Z for minute M", where
   * the minute M refers to the time records were received at Cloudflare's central
   * data center. `start` is inclusive, and `end` is exclusive. Because of that, to
   * get all data, at minutely cadence, starting at 10AM, the proper values are:
   * `start=2018-05-20T10:00:00Z&end=2018-05-20T10:01:00Z`, then
   * `start=2018-05-20T10:01:00Z&end=2018-05-20T10:02:00Z` and so on; the overlap
   * will be handled properly.
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/logs/received`, { query: e, ...n });
  }
}
(function(s) {
  s.Fields = rr;
})(ir || (ir = {}));
let cr = class extends o {
  constructor() {
    super(...arguments), this.control = new sr(this._client), this.RayID = new qs(this._client), this.received = new ir(this._client);
  }
};
(function(s) {
  s.Control = sr, s.RayID = qs, s.Received = ir;
})(cr || (cr = {}));
class or extends o {
  /**
   * Lists all active associations between the certificate and Cloudflare services.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/mtls_certificates/${t}/associations`, n)._thenUnwrap((i) => i.result);
  }
}
or || (or = {});
class ar extends o {
  constructor() {
    super(...arguments), this.associations = new or(this._client);
  }
  /**
   * Upload a certificate that you want to use with mTLS-enabled Cloudflare services.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/mtls_certificates`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all mTLS certificates.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/mtls_certificates`, Nw, e);
  }
  /**
   * Deletes the mTLS certificate unless the certificate is in use by one or more
   * Cloudflare services.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/mtls_certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single mTLS certificate.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/mtls_certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Nw extends w {
}
(function(s) {
  s.Associations = or;
})(ar || (ar = {}));
class ur extends o {
  /**
   * Lists default sampling, router IPs, and rules for account.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/mnm/config/full`, e)._thenUnwrap((r) => r.result);
  }
}
ur || (ur = {});
class lr extends o {
  constructor() {
    super(...arguments), this.full = new ur(this._client);
  }
  /**
   * Create a new network monitoring configuration.
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/mnm/config`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing network monitoring configuration, requires the entire
   * configuration to be updated at once.
   */
  update(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.put(`/accounts/${n}/mnm/config`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete an existing network monitoring configuration.
   */
  delete(t, e) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/mnm/config`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Update fields in an existing network monitoring configuration.
   */
  edit(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.patch(`/accounts/${n}/mnm/config`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists default sampling and router IPs for account.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/mnm/config`, e)._thenUnwrap((r) => r.result);
  }
}
(function(s) {
  s.Full = ur;
})(lr || (lr = {}));
class dr extends o {
  /**
   * Update advertisement for rule.
   */
  edit(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.patch(`/accounts/${r}/mnm/rules/${t}/advertisement`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
dr || (dr = {});
let hr = class extends o {
  constructor() {
    super(...arguments), this.advertisements = new dr(this._client);
  }
  /**
   * Create network monitoring rules for account. Currently only supports creating a
   * single rule per API request.
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/mnm/rules`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update network monitoring rules for account.
   */
  update(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.put(`/accounts/${n}/mnm/rules`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists network monitoring rules for account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/mnm/rules`, Oh, e);
  }
  /**
   * Delete a network monitoring rule for account.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/mnm/rules/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Update a network monitoring rule for account.
   */
  edit(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.patch(`/accounts/${r}/mnm/rules/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List a single network monitoring rule for account.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/mnm/rules/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class Oh extends w {
}
(function(s) {
  s.MagicNetworkMonitoringRulesSinglePage = Oh, s.Advertisements = dr;
})(hr || (hr = {}));
class _r extends o {
  constructor() {
    super(...arguments), this.configs = new lr(this._client), this.rules = new hr(this._client);
  }
}
(function(s) {
  s.Configs = lr, s.Rules = hr, s.MagicNetworkMonitoringRulesSinglePage = Oh;
})(_r || (_r = {}));
let pr = class extends o {
  /**
   * Creates a new App for an account
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/magic/apps`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an Account App
   */
  update(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.put(`/accounts/${r}/magic/apps/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Apps associated with an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/magic/apps`, Ah, e);
  }
  /**
   * Deletes specific Account App.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/magic/apps/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class Ah extends w {
}
(function(s) {
  s.AppListResponsesSinglePage = Ah;
})(pr || (pr = {}));
class gr extends o {
  /**
   * Updates a specific interconnect associated with an account. Use
   * `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/magic/cf_interconnects/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists interconnects associated with an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/magic/cf_interconnects`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Lists details for a specific interconnect.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/magic/cf_interconnects/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
gr || (gr = {});
let fr = class extends o {
  /**
   * Replace Connector
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/magic/connectors/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Connectors
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/magic/connectors`, Rh, e);
  }
  /**
   * Update Connector
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/magic/connectors/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch Connector
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/magic/connectors/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class Rh extends w {
}
(function(s) {
  s.ConnectorListResponsesSinglePage = Rh;
})(fr || (fr = {}));
class wr extends o {
  /**
   * Creates new GRE tunnels. Use `?validate_only=true` as an optional query
   * parameter to only run validation without persisting changes.
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/magic/gre_tunnels`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a specific GRE tunnel. Use `?validate_only=true` as an optional query
   * parameter to only run validation without persisting changes.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/magic/gre_tunnels/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists GRE tunnels associated with an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/magic/gre_tunnels`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Disables and removes a specific static GRE tunnel. Use `?validate_only=true` as
   * an optional query parameter to only run validation without persisting changes.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/magic/gre_tunnels/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists informtion for a specific GRE tunnel.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/magic/gre_tunnels/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
wr || (wr = {});
class mr extends o {
  /**
   * Creates new IPsec tunnels associated with an account. Use `?validate_only=true`
   * as an optional query parameter to only run validation without persisting
   * changes.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/magic/ipsec_tunnels`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a specific IPsec tunnel associated with an account. Use
   * `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/magic/ipsec_tunnels/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists IPsec tunnels associated with an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/magic/ipsec_tunnels`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Disables and removes a specific static IPsec Tunnel associated with an account.
   * Use `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/magic/ipsec_tunnels/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists details for a specific IPsec tunnel.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/magic/ipsec_tunnels/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Generates a Pre Shared Key for a specific IPsec tunnel used in the IKE session.
   * Use `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes. After a PSK is generated, the PSK is immediately
   * persisted to Cloudflare's edge and cannot be retrieved later. Note the PSK in a
   * safe place.
   */
  pskGenerate(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.post(`/accounts/${r}/magic/ipsec_tunnels/${t}/psk_generate`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
mr || (mr = {});
let $r = class extends o {
  /**
   * Creates a new Magic static route. Use `?validate_only=true` as an optional query
   * parameter to run validation only without persisting changes.
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/magic/routes`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a specific Magic static route. Use `?validate_only=true` as an optional
   * query parameter to run validation only without persisting changes.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/magic/routes/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all Magic static routes.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/magic/routes`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Disable and remove a specific Magic static route.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/magic/routes/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Delete multiple Magic static routes.
   */
  empty(t, e) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/magic/routes`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Get a specific Magic static route.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/magic/routes/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
$r || ($r = {});
let yr = class extends o {
  /**
   * Creates a new Site ACL.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/magic/sites/${t}/acls`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a specific Site ACL.
   */
  update(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.put(`/accounts/${i}/magic/sites/${t}/acls/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists Site ACLs associated with an account.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/magic/sites/${t}/acls`, Ih, n);
  }
  /**
   * Remove a specific Site ACL.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/magic/sites/${t}/acls/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Patch a specific Site ACL.
   */
  edit(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.patch(`/accounts/${i}/magic/sites/${t}/acls/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get a specific Site ACL.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/magic/sites/${t}/acls/${e}`, r)._thenUnwrap((c) => c.result);
  }
}, Ih = class extends w {
};
(function(s) {
  s.ACLsSinglePage = Ih;
})(yr || (yr = {}));
class br extends o {
  /**
   * Creates a new Site LAN. If the site is in high availability mode,
   * static_addressing is required along with secondary and virtual address.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/magic/sites/${t}/lans`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a specific Site LAN.
   */
  update(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.put(`/accounts/${i}/magic/sites/${t}/lans/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists Site LANs associated with an account.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/magic/sites/${t}/lans`, kh, n);
  }
  /**
   * Remove a specific Site LAN.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/magic/sites/${t}/lans/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Patch a specific Site LAN.
   */
  edit(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.patch(`/accounts/${i}/magic/sites/${t}/lans/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get a specific Site LAN.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/magic/sites/${t}/lans/${e}`, r)._thenUnwrap((c) => c.result);
  }
}
class kh extends w {
}
(function(s) {
  s.LANsSinglePage = kh;
})(br || (br = {}));
class Pr extends o {
  /**
   * Creates a new Site WAN.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/magic/sites/${t}/wans`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a specific Site WAN.
   */
  update(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.put(`/accounts/${i}/magic/sites/${t}/wans/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists Site WANs associated with an account.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/magic/sites/${t}/wans`, Lh, n);
  }
  /**
   * Remove a specific Site WAN.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/magic/sites/${t}/wans/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Patch a specific Site WAN.
   */
  edit(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.patch(`/accounts/${i}/magic/sites/${t}/wans/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get a specific Site WAN.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/magic/sites/${t}/wans/${e}`, r)._thenUnwrap((c) => c.result);
  }
}
class Lh extends w {
}
(function(s) {
  s.WANsSinglePage = Lh;
})(Pr || (Pr = {}));
class vr extends o {
  constructor() {
    super(...arguments), this.acls = new yr(this._client), this.lans = new br(this._client), this.wans = new Pr(this._client);
  }
  /**
   * Creates a new Site
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/magic/sites`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a specific Site.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/magic/sites/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Sites associated with an account. Use connector_identifier query param to
   * return sites where connector_identifier matches either site.ConnectorID or
   * site.SecondaryConnectorID.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/magic/sites`, Zh, {
      query: r,
      ...e
    });
  }
  /**
   * Remove a specific Site.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/magic/sites/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Patch a specific Site.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/magic/sites/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a specific Site.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/magic/sites/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Zh extends w {
}
(function(s) {
  s.SitesSinglePage = Zh, s.ACLs = yr, s.ACLsSinglePage = Ih, s.LANs = br, s.LANsSinglePage = kh, s.WANs = Pr, s.WANsSinglePage = Lh;
})(vr || (vr = {}));
class Ur extends o {
  constructor() {
    super(...arguments), this.apps = new pr(this._client), this.cfInterconnects = new gr(this._client), this.greTunnels = new wr(this._client), this.ipsecTunnels = new mr(this._client), this.routes = new $r(this._client), this.sites = new vr(this._client), this.connectors = new fr(this._client);
  }
}
(function(s) {
  s.Apps = pr, s.AppListResponsesSinglePage = Ah, s.CfInterconnects = gr, s.GRETunnels = wr, s.IPSECTunnels = mr, s.Routes = $r, s.Sites = vr, s.SitesSinglePage = Zh, s.Connectors = fr, s.ConnectorListResponsesSinglePage = Rh;
})(Ur || (Ur = {}));
class Wg extends o {
  /**
   * Fetches a list of all Managed Transforms.
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/managed_headers`, e);
  }
  /**
   * Updates the status of one or more Managed Transforms.
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/managed_headers`, { body: r, ...e });
  }
}
class Kg extends o {
  /**
   * Accept or reject this account invitation.
   */
  update(t, e, n) {
    return this._client.put(`/memberships/${t}`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/memberships", Fw, { query: t, ...e });
  }
  /**
   * Remove the associated member from an account.
   */
  delete(t, e) {
    return this._client.delete(`/memberships/${t}`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get a specific membership.
   */
  get(t, e) {
    return this._client.get(`/memberships/${t}`, e)._thenUnwrap((n) => n.result);
  }
}
class Fw extends A {
}
class Jg extends o {
  /**
   * Create an Origin CA certificate. Use your Origin CA Key as your User Service Key
   * when calling this endpoint ([see above](#requests)).
   */
  create(t, e) {
    return this._client.post("/certificates", { body: t, ...e })._thenUnwrap((n) => n.result);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/certificates", Mw, { query: t, ...e });
  }
  /**
   * Revoke an existing Origin CA certificate by its serial number. Use your Origin
   * CA Key as your User Service Key when calling this endpoint
   * ([see above](#requests)).
   */
  delete(t, e) {
    return this._client.delete(`/certificates/${t}`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get an existing Origin CA certificate by its serial number. Use your Origin CA
   * Key as your User Service Key when calling this endpoint
   * ([see above](#requests)).
   */
  get(t, e) {
    return this._client.get(`/certificates/${t}`, e)._thenUnwrap((n) => n.result);
  }
}
class Mw extends w {
}
class Qg extends o {
  /**
   * Instructs Cloudflare to use Post-Quantum (PQ) key agreement algorithms when
   * connecting to your origin. Preferred instructs Cloudflare to opportunistically
   * send a Post-Quantum keyshare in the first message to the origin (for fastest
   * connections when the origin supports and prefers PQ), supported means that PQ
   * algorithms are advertised but only used when requested by the origin, and off
   * means that PQ algorithms are not advertised
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/cache/origin_post_quantum_encryption`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Instructs Cloudflare to use Post-Quantum (PQ) key agreement algorithms when
   * connecting to your origin. Preferred instructs Cloudflare to opportunistically
   * send a Post-Quantum keyshare in the first message to the origin (for fastest
   * connections when the origin supports and prefers PQ), supported means that PQ
   * algorithms are advertised but only used when requested by the origin, and off
   * means that PQ algorithms are not advertised
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/cache/origin_post_quantum_encryption`, e)._thenUnwrap((r) => r.result);
  }
}
let xr = class extends o {
  /**
   * Enable or disable zone-level authenticated origin pulls. 'enabled' should be set
   * true either before/after the certificate is uploaded to see the certificate in
   * use.
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/origin_tls_client_auth/settings`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get whether zone-level authenticated origin pulls is enabled or not. It is false
   * by default.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/origin_tls_client_auth/settings`, e)._thenUnwrap((r) => r.result);
  }
};
xr || (xr = {});
let Sr = class extends o {
  /**
   * Upload a certificate to be used for client authentication on a hostname. 10
   * hostname certificates per zone are allowed.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/origin_tls_client_auth/hostnames/certificates`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List Certificates
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/origin_tls_client_auth/hostnames/certificates`, Bw, e);
  }
  /**
   * Delete Hostname Client Certificate
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/origin_tls_client_auth/hostnames/certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get the certificate by ID to be used for client authentication on a hostname.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/origin_tls_client_auth/hostnames/certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
Sr || (Sr = {});
let zr = class extends o {
  constructor() {
    super(...arguments), this.certificates = new Sr(this._client);
  }
  /**
   * Associate a hostname to a certificate and enable, disable or invalidate the
   * association. If disabled, client certificate will not be sent to the hostname
   * even if activated at the zone level. 100 maximum associations on a single
   * certificate are allowed. Note: Use a null value for parameter _enabled_ to
   * invalidate the association.
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/origin_tls_client_auth/hostnames`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get the Hostname Status for Client Authentication
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/origin_tls_client_auth/hostnames/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class Bw extends w {
}
(function(s) {
  s.Certificates = Sr;
})(zr || (zr = {}));
class Or extends o {
  constructor() {
    super(...arguments), this.hostnames = new zr(this._client), this.settings = new xr(this._client);
  }
  /**
   * Upload your own certificate you want Cloudflare to use for edge-to-origin
   * communication to override the shared certificate. Please note that it is
   * important to keep only one certificate active. Also, make sure to enable
   * zone-level authenticated origin pulls by making a PUT call to settings endpoint
   * to see the uploaded certificate in use.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/origin_tls_client_auth`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List Certificates
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/origin_tls_client_auth`, Yw, e);
  }
  /**
   * Delete Certificate
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/origin_tls_client_auth/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Certificate Details
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/origin_tls_client_auth/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Yw extends w {
}
(function(s) {
  s.Hostnames = zr, s.Settings = xr;
})(Or || (Or = {}));
class Ar extends o {
  /**
   * Download PCAP information into a file. Response is a binary PCAP file.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/pcaps/${t}/download`, {
      ...n,
      __binaryResponse: !0
    });
  }
}
Ar || (Ar = {});
class Rr extends o {
  /**
   * Adds an AWS or GCP bucket to use with full packet captures.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/pcaps/ownership`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes buckets added to the packet captures API.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/pcaps/ownership/${t}`, {
      ...n,
      headers: { Accept: "*/*", ...n == null ? void 0 : n.headers }
    });
  }
  /**
   * List all buckets configured for use with PCAPs API.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/pcaps/ownership`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Validates buckets added to the packet captures API.
   */
  validate(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/pcaps/ownership/validate`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
Rr || (Rr = {});
class Ir extends o {
  constructor() {
    super(...arguments), this.ownership = new Rr(this._client), this.download = new Ar(this._client);
  }
  /**
   * Create new PCAP request for account.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/pcaps`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all packet capture requests for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/pcaps`, Hw, e);
  }
  /**
   * Get information for a PCAP request by id.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/pcaps/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Hw extends w {
}
(function(s) {
  s.OwnershipResource = Rr, s.Download = Ar;
})(Ir || (Ir = {}));
let kr = class extends o {
  /**
   * Lists all connections detected by Page Shield.
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/page_shield/connections`, Th, {
      query: r,
      ...e
    });
  }
  /**
   * Fetches a connection detected by Page Shield by connection ID.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/page_shield/connections/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class Th extends w {
}
(function(s) {
  s.ConnectionsSinglePage = Th;
})(kr || (kr = {}));
class Lr extends o {
  /**
   * Lists all cookies collected by Page Shield.
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/page_shield/cookies`, Ch, {
      query: r,
      ...e
    });
  }
  /**
   * Fetches a cookie collected by Page Shield by cookie ID.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/page_shield/cookies/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Ch extends w {
}
(function(s) {
  s.CookieListResponsesSinglePage = Ch;
})(Lr || (Lr = {}));
let Zr = class extends o {
  /**
   * Create a Page Shield policy.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/page_shield/policies`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Page Shield policy by ID.
   */
  update(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.put(`/zones/${r}/page_shield/policies/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all Page Shield policies.
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/page_shield/policies`, Eh, e);
  }
  /**
   * Delete a Page Shield policy by ID.
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/page_shield/policies/${t}`, {
      ...n,
      headers: { Accept: "*/*", ...n == null ? void 0 : n.headers }
    });
  }
  /**
   * Fetches a Page Shield policy by ID.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/page_shield/policies/${t}`, n)._thenUnwrap((i) => i.result);
  }
}, Eh = class extends w {
};
(function(s) {
  s.PolicyListResponsesSinglePage = Eh;
})(Zr || (Zr = {}));
let Tr = class extends o {
  /**
   * Lists all scripts detected by Page Shield.
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/page_shield/scripts`, Vh, {
      query: r,
      ...e
    });
  }
  /**
   * Fetches a script detected by Page Shield by script ID.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/page_shield/scripts/${t}`, n)._thenUnwrap((i) => i.result);
  }
}, Vh = class extends w {
};
(function(s) {
  s.ScriptsSinglePage = Vh;
})(Tr || (Tr = {}));
class Cr extends o {
  constructor() {
    super(...arguments), this.policies = new Zr(this._client), this.connections = new kr(this._client), this.scripts = new Tr(this._client), this.cookies = new Lr(this._client);
  }
  /**
   * Updates Page Shield settings.
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/page_shield`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the Page Shield settings.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/page_shield`, e)._thenUnwrap((r) => r.result);
  }
}
(function(s) {
  s.Policies = Zr, s.PolicyListResponsesSinglePage = Eh, s.Connections = kr, s.ConnectionsSinglePage = Th, s.Scripts = Tr, s.ScriptsSinglePage = Vh, s.Cookies = Lr, s.CookieListResponsesSinglePage = Ch;
})(Cr || (Cr = {}));
let Er = class extends o {
  /**
   * Returns a list of settings (and their details) that Page Rules can apply to
   * matching requests.
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/pagerules/settings`, e)._thenUnwrap((r) => r.result);
  }
};
Er || (Er = {});
class Vr extends o {
  constructor() {
    super(...arguments), this.settings = new Er(this._client);
  }
  /**
   * Creates a new Page Rule.
   *
   * @deprecated The Page Rules API is deprecated in favour of the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#page-rules for full details.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/pagerules`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Replaces the configuration of an existing Page Rule. The configuration of the
   * updated Page Rule will exactly match the data passed in the API request.
   *
   * @deprecated The Page Rules API is deprecated in favour of the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#page-rules for full details.
   */
  update(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.put(`/zones/${r}/pagerules/${t}`, { body: i, ...n })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Page Rules in a zone.
   *
   * @deprecated The Page Rules API is deprecated in favour of the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#page-rules for full details.
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.get(`/zones/${n}/pagerules`, { query: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes an existing Page Rule.
   *
   * @deprecated The Page Rules API is deprecated in favour of the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#page-rules for full details.
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/pagerules/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates one or more fields of an existing Page Rule.
   *
   * @deprecated The Page Rules API is deprecated in favour of the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#page-rules for full details.
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/pagerules/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches the details of a Page Rule.
   *
   * @deprecated The Page Rules API is deprecated in favour of the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#page-rules for full details.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/pagerules/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.Settings = Er;
})(Vr || (Vr = {}));
let Dr = class extends o {
  /**
   * Add a new domain for the Pages project.
   */
  create(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.post(`/accounts/${r}/pages/projects/${t}/domains`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a list of all domains associated with a Pages project.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/pages/projects/${t}/domains`, Dh, n);
  }
  /**
   * Delete a Pages project's domain.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/pages/projects/${t}/domains/${e}`, r);
  }
  /**
   * Retry the validation status of a single domain.
   */
  edit(t, e, n, r) {
    const { account_id: i, body: c } = n;
    return this._client.patch(`/accounts/${i}/pages/projects/${t}/domains/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetch a single domain.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/pages/projects/${t}/domains/${e}`, r)._thenUnwrap((c) => c.result);
  }
};
class Dh extends w {
}
(function(s) {
  s.DomainListResponsesSinglePage = Dh;
})(Dr || (Dr = {}));
let Nr = class extends o {
  /**
   * Fetch deployment logs for a project.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/pages/projects/${t}/deployments/${e}/history/logs`, r)._thenUnwrap((c) => c.result);
  }
};
Nr || (Nr = {});
let Fr = class extends o {
  constructor() {
    super(...arguments), this.logs = new Nr(this._client);
  }
};
(function(s) {
  s.Logs = Nr;
})(Fr || (Fr = {}));
let Mr = class extends o {
  constructor() {
    super(...arguments), this.history = new Fr(this._client);
  }
  /**
   * Start a new deployment from production. The repository and account must have
   * already been authorized on the Cloudflare Pages dashboard.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/pages/projects/${t}/deployments`, tt({ body: i, ...n }))._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a list of project deployments.
   */
  list(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.getAPIList(`/accounts/${r}/pages/projects/${t}/deployments`, vl, { query: i, ...n });
  }
  /**
   * Delete a deployment.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/pages/projects/${t}/deployments/${e}`, r);
  }
  /**
   * Fetch information about a deployment.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/pages/projects/${t}/deployments/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Retry a previous deployment.
   */
  retry(t, e, n, r) {
    const { account_id: i, body: c } = n;
    return this._client.post(`/accounts/${i}/pages/projects/${t}/deployments/${e}/retry`, { body: c, ...r })._thenUnwrap((a) => a.result);
  }
  /**
   * Rollback the production deployment to a previous deployment. You can only
   * rollback to succesful builds on production.
   */
  rollback(t, e, n, r) {
    const { account_id: i, body: c } = n;
    return this._client.post(`/accounts/${i}/pages/projects/${t}/deployments/${e}/rollback`, { body: c, ...r })._thenUnwrap((a) => a.result);
  }
};
(function(s) {
  s.History = Fr;
})(Mr || (Mr = {}));
class Br extends o {
  constructor() {
    super(...arguments), this.deployments = new Mr(this._client), this.domains = new Dr(this._client);
  }
  /**
   * Create a new project.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/pages/projects`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a list of all user projects.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/pages/projects`, vl, e);
  }
  /**
   * Delete a project by name.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/pages/projects/${t}`, n);
  }
  /**
   * Set new attributes for an existing project. Modify environment variables. To
   * delete an environment variable, set the key to null.
   */
  edit(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.patch(`/accounts/${r}/pages/projects/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a project by name.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/pages/projects/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Purge all cached build artifacts for a Pages project
   */
  purgeBuildCache(t, e, n) {
    const { account_id: r } = e;
    return this._client.post(`/accounts/${r}/pages/projects/${t}/purge_build_cache`, n);
  }
}
class vl extends w {
}
(function(s) {
  s.DeploymentsSinglePage = vl, s.Deployments = Mr, s.Domains = Dr, s.DomainListResponsesSinglePage = Dh;
})(Br || (Br = {}));
let Yr = class extends o {
  constructor() {
    super(...arguments), this.projects = new Br(this._client);
  }
};
(function(s) {
  s.Projects = Br, s.DeploymentsSinglePage = vl;
})(Yr || (Yr = {}));
class Xg extends o {
  /**
   * Lists available plans the zone can subscribe to.
   */
  list(t, e) {
    return this._client.getAPIList(`/zones/${t}/available_plans`, jw, e);
  }
  /**
   * Details of the available plan that the zone can subscribe to.
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/available_plans/${e}`, n)._thenUnwrap((r) => r.result);
  }
}
class jw extends w {
}
class Hr extends o {
  /**
   * Creates a new consumer for a queue.
   */
  create(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.post(`/accounts/${r}/queues/${t}/consumers`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates the consumer for a queue, or creates one if it does not exist.
   */
  update(t, e, n, r) {
    const { account_id: i, body: c } = n;
    return this._client.put(`/accounts/${i}/queues/${t}/consumers/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Deletes the consumer for a queue.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/queues/${t}/consumers/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the consumers for a queue.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/queues/${t}/consumers`, n)._thenUnwrap((i) => i.result);
  }
}
Hr || (Hr = {});
class jr extends o {
  /**
   * Acknowledge + Retry messages from a Queue.
   */
  ack(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/queues/${t}/messages/ack`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Pull a batch of messages from a Queue.
   */
  pull(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/queues/${t}/messages/pull`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
jr || (jr = {});
class Gr extends o {
  constructor() {
    super(...arguments), this.consumers = new Hr(this._client), this.messages = new jr(this._client);
  }
  /**
   * Creates a new queue.
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/queues`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a queue.
   */
  update(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.put(`/accounts/${r}/queues/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the queues owned by an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/queues`, Gw, e);
  }
  /**
   * Deletes a queue.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/queues/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about a specific queue.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/queues/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Gw extends w {
}
(function(s) {
  s.Consumers = Hr, s.Messages = jr;
})(Gr || (Gr = {}));
class Wr extends o {
  /**
   * Creates a new R2 bucket.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/r2/buckets`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all R2 buckets on your account
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/r2/buckets`, Nh, {
      query: r,
      ...e
    });
  }
  /**
   * Deletes an existing R2 bucket.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/r2/buckets/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Gets metadata for an existing R2 bucket.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/r2/buckets/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Nh extends Ld {
}
(function(s) {
  s.BucketsCursorPagination = Nh;
})(Wr || (Wr = {}));
class Kr extends o {
  /**
   * Sets configuration for Sippy for an existing R2 bucket.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/r2/buckets/${t}/sippy`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Disables Sippy on this bucket
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/r2/buckets/${t}/sippy`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Gets configuration for Sippy for an existing R2 bucket.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/r2/buckets/${t}/sippy`, n)._thenUnwrap((i) => i.result);
  }
}
Kr || (Kr = {});
class Jr extends o {
  /**
   * Creates temporary access credentials on a bucket that can be optionally scoped
   * to prefixes or objects.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/r2/temp-access-credentials`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
Jr || (Jr = {});
class Qr extends o {
  constructor() {
    super(...arguments), this.buckets = new Wr(this._client), this.sippy = new Kr(this._client), this.temporaryCredentials = new Jr(this._client);
  }
}
(function(s) {
  s.Buckets = Wr, s.BucketsCursorPagination = Nh, s.SippyResource = Kr, s.TemporaryCredentials = Jr;
})(Qr || (Qr = {}));
let Xr = class extends o {
  /**
   * Creates a new rule in a Web Analytics ruleset.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/rum/v2/${t}/rule`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a rule in a Web Analytics ruleset.
   */
  update(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.put(`/accounts/${i}/rum/v2/${t}/rule/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists all the rules in a Web Analytics ruleset.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/rum/v2/${t}/rules`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes an existing rule from a Web Analytics ruleset.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/rum/v2/${t}/rule/${e}`, r)._thenUnwrap((c) => c.result);
  }
};
Xr || (Xr = {});
class qr extends o {
  /**
   * Creates a new Web Analytics site.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/rum/site_info`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Web Analytics site.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/rum/site_info/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all Web Analytics sites of an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/rum/site_info/list`, Fh, {
      query: r,
      ...e
    });
  }
  /**
   * Deletes an existing Web Analytics site.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/rum/site_info/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves a Web Analytics site.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/rum/site_info/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Fh extends A {
}
(function(s) {
  s.SitesV4PagePaginationArray = Fh;
})(qr || (qr = {}));
class ti extends o {
  constructor() {
    super(...arguments), this.siteInfo = new qr(this._client), this.rules = new Xr(this._client);
  }
}
(function(s) {
  s.SiteInfo = qr, s.SitesV4PagePaginationArray = Fh, s.Rules = Xr;
})(ti || (ti = {}));
let ei = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.get("/radar/datasets", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  /**
   * Get a url to download a single dataset.
   */
  download(t, e) {
    const { format: n, ...r } = t;
    return this._client.post("/radar/datasets/download", {
      query: { format: n },
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get the csv content of a given dataset by alias or id. When getting the content
   * by alias the latest dataset is returned, optionally filtered by the latest
   * available at a given date.
   */
  get(t, e) {
    return this._client.get(`/radar/datasets/${t}`, {
      ...e,
      headers: { Accept: "text/csv", ...e == null ? void 0 : e.headers }
    });
  }
};
ei || (ei = {});
class ni extends o {
  /**
   * Lets you search for locations, autonomous systems (AS) and reports.
   */
  global(t, e) {
    return this._client.get("/radar/search/global", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
ni || (ni = {});
class si extends o {
  summary(t = {}, e) {
    return u(t) ? this.summary({}, t) : this._client.get("/radar/tcp_resets_timeouts/summary", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  timeseriesGroups(t = {}, e) {
    return u(t) ? this.timeseriesGroups({}, t) : this._client.get("/radar/tcp_resets_timeouts/timeseries_groups", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
}
si || (si = {});
class ri extends o {
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/annotations/outages", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  locations(t = {}, e) {
    return u(t) ? this.locations({}, t) : this._client.get("/radar/annotations/outages/locations", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
ri || (ri = {});
class ii extends o {
  constructor() {
    super(...arguments), this.outages = new ri(this._client);
  }
}
(function(s) {
  s.Outages = ri;
})(ii || (ii = {}));
let ci = class extends o {
  dnssec(t = {}, e) {
    return u(t) ? this.dnssec({}, t) : this._client.get("/radar/as112/summary/dnssec", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  edns(t = {}, e) {
    return u(t) ? this.edns({}, t) : this._client.get("/radar/as112/summary/edns", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/as112/summary/ip_version", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  protocol(t = {}, e) {
    return u(t) ? this.protocol({}, t) : this._client.get("/radar/as112/summary/protocol", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  queryType(t = {}, e) {
    return u(t) ? this.queryType({}, t) : this._client.get("/radar/as112/summary/query_type", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  responseCodes(t = {}, e) {
    return u(t) ? this.responseCodes({}, t) : this._client.get("/radar/as112/summary/response_codes", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
ci || (ci = {});
let oi = class extends o {
  dnssec(t = {}, e) {
    return u(t) ? this.dnssec({}, t) : this._client.get("/radar/as112/timeseries_groups/dnssec", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  edns(t = {}, e) {
    return u(t) ? this.edns({}, t) : this._client.get("/radar/as112/timeseries_groups/edns", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/as112/timeseries_groups/ip_version", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  protocol(t = {}, e) {
    return u(t) ? this.protocol({}, t) : this._client.get("/radar/as112/timeseries_groups/protocol", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  queryType(t = {}, e) {
    return u(t) ? this.queryType({}, t) : this._client.get("/radar/as112/timeseries_groups/query_type", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  responseCodes(t = {}, e) {
    return u(t) ? this.responseCodes({}, t) : this._client.get("/radar/as112/timeseries_groups/response_codes", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
};
oi || (oi = {});
let ai = class extends o {
  dnssec(t, e = {}, n) {
    return u(e) ? this.dnssec(t, {}, e) : this._client.get(`/radar/as112/top/locations/dnssec/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  edns(t, e = {}, n) {
    return u(e) ? this.edns(t, {}, e) : this._client.get(`/radar/as112/top/locations/edns/${t}`, { query: e, ...n })._thenUnwrap((r) => r.result);
  }
  ipVersion(t, e = {}, n) {
    return u(e) ? this.ipVersion(t, {}, e) : this._client.get(`/radar/as112/top/locations/ip_version/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  locations(t = {}, e) {
    return u(t) ? this.locations({}, t) : this._client.get("/radar/as112/top/locations", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
ai || (ai = {});
class ui extends o {
  constructor() {
    super(...arguments), this.summary = new ci(this._client), this.timeseriesGroups = new oi(this._client), this.top = new ai(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/as112/timeseries", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.Summary = ci, s.TimeseriesGroups = oi, s.Top = ai;
})(ui || (ui = {}));
let li = class extends o {
  bitrate(t = {}, e) {
    return u(t) ? this.bitrate({}, t) : this._client.get("/radar/attacks/layer3/summary/bitrate", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  duration(t = {}, e) {
    return u(t) ? this.duration({}, t) : this._client.get("/radar/attacks/layer3/summary/duration", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/attacks/layer3/summary", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/attacks/layer3/summary/ip_version", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  protocol(t = {}, e) {
    return u(t) ? this.protocol({}, t) : this._client.get("/radar/attacks/layer3/summary/protocol", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  vector(t = {}, e) {
    return u(t) ? this.vector({}, t) : this._client.get("/radar/attacks/layer3/summary/vector", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
li || (li = {});
let di = class extends o {
  bitrate(t = {}, e) {
    return u(t) ? this.bitrate({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/bitrate", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  duration(t = {}, e) {
    return u(t) ? this.duration({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/duration", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  industry(t = {}, e) {
    return u(t) ? this.industry({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/industry", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/ip_version", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  protocol(t = {}, e) {
    return u(t) ? this.protocol({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/protocol", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  vector(t = {}, e) {
    return u(t) ? this.vector({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/vector", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  vertical(t = {}, e) {
    return u(t) ? this.vertical({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/vertical", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
};
di || (di = {});
let hi = class extends o {
  origin(t = {}, e) {
    return u(t) ? this.origin({}, t) : this._client.get("/radar/attacks/layer3/top/locations/origin", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  target(t = {}, e) {
    return u(t) ? this.target({}, t) : this._client.get("/radar/attacks/layer3/top/locations/target", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
};
hi || (hi = {});
let _i = class extends o {
  constructor() {
    super(...arguments), this.locations = new hi(this._client);
  }
  attacks(t = {}, e) {
    return u(t) ? this.attacks({}, t) : this._client.get("/radar/attacks/layer3/top/attacks", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  industry(t = {}, e) {
    return u(t) ? this.industry({}, t) : this._client.get("/radar/attacks/layer3/top/industry", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  vertical(t = {}, e) {
    return u(t) ? this.vertical({}, t) : this._client.get("/radar/attacks/layer3/top/vertical", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
(function(s) {
  s.Locations = hi;
})(_i || (_i = {}));
class pi extends o {
  constructor() {
    super(...arguments), this.summary = new li(this._client), this.timeseriesGroups = new di(this._client), this.top = new _i(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/attacks/layer3/timeseries", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.Summary = li, s.TimeseriesGroups = di, s.Top = _i;
})(pi || (pi = {}));
let gi = class extends o {
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/attacks/layer7/summary", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  httpMethod(t = {}, e) {
    return u(t) ? this.httpMethod({}, t) : this._client.get("/radar/attacks/layer7/summary/http_method", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  httpVersion(t = {}, e) {
    return u(t) ? this.httpVersion({}, t) : this._client.get("/radar/attacks/layer7/summary/http_version", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/attacks/layer7/summary/ip_version", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  managedRules(t = {}, e) {
    return u(t) ? this.managedRules({}, t) : this._client.get("/radar/attacks/layer7/summary/managed_rules", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  mitigationProduct(t = {}, e) {
    return u(t) ? this.mitigationProduct({}, t) : this._client.get("/radar/attacks/layer7/summary/mitigation_product", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
};
gi || (gi = {});
let fi = class extends o {
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  httpMethod(t = {}, e) {
    return u(t) ? this.httpMethod({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/http_method", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  httpVersion(t = {}, e) {
    return u(t) ? this.httpVersion({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/http_version", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  industry(t = {}, e) {
    return u(t) ? this.industry({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/industry", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/ip_version", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  managedRules(t = {}, e) {
    return u(t) ? this.managedRules({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/managed_rules", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  mitigationProduct(t = {}, e) {
    return u(t) ? this.mitigationProduct({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/mitigation_product", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  vertical(t = {}, e) {
    return u(t) ? this.vertical({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/vertical", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
};
fi || (fi = {});
let wi = class extends o {
  origin(t = {}, e) {
    return u(t) ? this.origin({}, t) : this._client.get("/radar/attacks/layer7/top/ases/origin", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
wi || (wi = {});
let mi = class extends o {
  origin(t = {}, e) {
    return u(t) ? this.origin({}, t) : this._client.get("/radar/attacks/layer7/top/locations/origin", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  target(t = {}, e) {
    return u(t) ? this.target({}, t) : this._client.get("/radar/attacks/layer7/top/locations/target", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
};
mi || (mi = {});
let $i = class extends o {
  constructor() {
    super(...arguments), this.locations = new mi(this._client), this.ases = new wi(this._client);
  }
  attacks(t = {}, e) {
    return u(t) ? this.attacks({}, t) : this._client.get("/radar/attacks/layer7/top/attacks", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  industry(t = {}, e) {
    return u(t) ? this.industry({}, t) : this._client.get("/radar/attacks/layer7/top/industry", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  vertical(t = {}, e) {
    return u(t) ? this.vertical({}, t) : this._client.get("/radar/attacks/layer7/top/vertical", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
(function(s) {
  s.Locations = mi, s.Ases = wi;
})($i || ($i = {}));
class yi extends o {
  constructor() {
    super(...arguments), this.summary = new gi(this._client), this.timeseriesGroups = new fi(this._client), this.top = new $i(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/attacks/layer7/timeseries", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.Summary = gi, s.TimeseriesGroups = fi, s.Top = $i;
})(yi || (yi = {}));
class bi extends o {
  constructor() {
    super(...arguments), this.layer3 = new pi(this._client), this.layer7 = new yi(this._client);
  }
}
(function(s) {
  s.Layer3 = pi, s.Layer7 = yi;
})(bi || (bi = {}));
let Pi = class extends o {
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/bgp/ips/timeseries", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
Pi || (Pi = {});
let vi = class extends o {
  ases(t = {}, e) {
    return u(t) ? this.ases({}, t) : this._client.get("/radar/bgp/routes/ases", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  moas(t = {}, e) {
    return u(t) ? this.moas({}, t) : this._client.get("/radar/bgp/routes/moas", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  pfx2as(t = {}, e) {
    return u(t) ? this.pfx2as({}, t) : this._client.get("/radar/bgp/routes/pfx2as", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  stats(t = {}, e) {
    return u(t) ? this.stats({}, t) : this._client.get("/radar/bgp/routes/stats", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
vi || (vi = {});
let Ui = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/radar/bgp/hijacks/events", Mh, {
      query: t,
      ...e
    });
  }
}, Mh = class extends mt {
};
(function(s) {
  s.EventListResponsesV4PagePagination = Mh;
})(Ui || (Ui = {}));
class xi extends o {
  constructor() {
    super(...arguments), this.events = new Ui(this._client);
  }
}
(function(s) {
  s.Events = Ui, s.EventListResponsesV4PagePagination = Mh;
})(xi || (xi = {}));
let Si = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/radar/bgp/leaks/events", Bh, {
      query: t,
      ...e
    });
  }
};
class Bh extends mt {
}
(function(s) {
  s.EventListResponsesV4PagePagination = Bh;
})(Si || (Si = {}));
class zi extends o {
  constructor() {
    super(...arguments), this.events = new Si(this._client);
  }
}
(function(s) {
  s.Events = Si, s.EventListResponsesV4PagePagination = Bh;
})(zi || (zi = {}));
let Oi = class extends o {
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/bgp/top/ases", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  prefixes(t = {}, e) {
    return u(t) ? this.prefixes({}, t) : this._client.get("/radar/bgp/top/ases/prefixes", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
Oi || (Oi = {});
let Ai = class extends o {
  constructor() {
    super(...arguments), this.ases = new Oi(this._client);
  }
  prefixes(t = {}, e) {
    return u(t) ? this.prefixes({}, t) : this._client.get("/radar/bgp/top/prefixes", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
(function(s) {
  s.Ases = Oi;
})(Ai || (Ai = {}));
class Ri extends o {
  constructor() {
    super(...arguments), this.leaks = new zi(this._client), this.top = new Ai(this._client), this.hijacks = new xi(this._client), this.routes = new vi(this._client), this.ips = new Pi(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/bgp/timeseries", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.Leaks = zi, s.Top = Ai, s.Hijacks = xi, s.Routes = vi, s.IPs = Pi;
})(Ri || (Ri = {}));
let Ii = class extends o {
  /**
   * Get top autonomous systems by DNS queries made to Cloudflare's public DNS
   * resolver.
   */
  ases(t, e) {
    return this._client.get("/radar/dns/top/ases", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  /**
   * Get top locations by DNS queries made to Cloudflare's public DNS resolver.
   */
  locations(t, e) {
    return this._client.get("/radar/dns/top/locations", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
Ii || (Ii = {});
class ki extends o {
  constructor() {
    super(...arguments), this.top = new Ii(this._client);
  }
}
(function(s) {
  s.Top = Ii;
})(ki || (ki = {}));
let Li = class extends o {
  arc(t = {}, e) {
    return u(t) ? this.arc({}, t) : this._client.get("/radar/email/routing/summary/arc", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  dkim(t = {}, e) {
    return u(t) ? this.dkim({}, t) : this._client.get("/radar/email/routing/summary/dkim", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  dmarc(t = {}, e) {
    return u(t) ? this.dmarc({}, t) : this._client.get("/radar/email/routing/summary/dmarc", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  encrypted(t = {}, e) {
    return u(t) ? this.encrypted({}, t) : this._client.get("/radar/email/routing/summary/encrypted", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/email/routing/summary/ip_version", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  spf(t = {}, e) {
    return u(t) ? this.spf({}, t) : this._client.get("/radar/email/routing/summary/spf", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
Li || (Li = {});
let Zi = class extends o {
  arc(t = {}, e) {
    return u(t) ? this.arc({}, t) : this._client.get("/radar/email/routing/timeseries_groups/arc", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  dkim(t = {}, e) {
    return u(t) ? this.dkim({}, t) : this._client.get("/radar/email/routing/timeseries_groups/dkim", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  dmarc(t = {}, e) {
    return u(t) ? this.dmarc({}, t) : this._client.get("/radar/email/routing/timeseries_groups/dmarc", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  encrypted(t = {}, e) {
    return u(t) ? this.encrypted({}, t) : this._client.get("/radar/email/routing/timeseries_groups/encrypted", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/email/routing/timeseries_groups/ip_version", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  spf(t = {}, e) {
    return u(t) ? this.spf({}, t) : this._client.get("/radar/email/routing/timeseries_groups/spf", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
};
Zi || (Zi = {});
class Ti extends o {
  constructor() {
    super(...arguments), this.summary = new Li(this._client), this.timeseriesGroups = new Zi(this._client);
  }
}
(function(s) {
  s.Summary = Li, s.TimeseriesGroups = Zi;
})(Ti || (Ti = {}));
let Ci = class extends o {
  arc(t = {}, e) {
    return u(t) ? this.arc({}, t) : this._client.get("/radar/email/security/summary/arc", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  dkim(t = {}, e) {
    return u(t) ? this.dkim({}, t) : this._client.get("/radar/email/security/summary/dkim", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  dmarc(t = {}, e) {
    return u(t) ? this.dmarc({}, t) : this._client.get("/radar/email/security/summary/dmarc", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  malicious(t = {}, e) {
    return u(t) ? this.malicious({}, t) : this._client.get("/radar/email/security/summary/malicious", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  spam(t = {}, e) {
    return u(t) ? this.spam({}, t) : this._client.get("/radar/email/security/summary/spam", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  spf(t = {}, e) {
    return u(t) ? this.spf({}, t) : this._client.get("/radar/email/security/summary/spf", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  spoof(t = {}, e) {
    return u(t) ? this.spoof({}, t) : this._client.get("/radar/email/security/summary/spoof", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  threatCategory(t = {}, e) {
    return u(t) ? this.threatCategory({}, t) : this._client.get("/radar/email/security/summary/threat_category", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  tlsVersion(t = {}, e) {
    return u(t) ? this.tlsVersion({}, t) : this._client.get("/radar/email/security/summary/tls_version", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
};
Ci || (Ci = {});
let Ei = class extends o {
  arc(t = {}, e) {
    return u(t) ? this.arc({}, t) : this._client.get("/radar/email/security/timeseries_groups/arc", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  dkim(t = {}, e) {
    return u(t) ? this.dkim({}, t) : this._client.get("/radar/email/security/timeseries_groups/dkim", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  dmarc(t = {}, e) {
    return u(t) ? this.dmarc({}, t) : this._client.get("/radar/email/security/timeseries_groups/dmarc", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  malicious(t = {}, e) {
    return u(t) ? this.malicious({}, t) : this._client.get("/radar/email/security/timeseries_groups/malicious", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  spam(t = {}, e) {
    return u(t) ? this.spam({}, t) : this._client.get("/radar/email/security/timeseries_groups/spam", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  spf(t = {}, e) {
    return u(t) ? this.spf({}, t) : this._client.get("/radar/email/security/timeseries_groups/spf", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  spoof(t = {}, e) {
    return u(t) ? this.spoof({}, t) : this._client.get("/radar/email/security/timeseries_groups/spoof", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  threatCategory(t = {}, e) {
    return u(t) ? this.threatCategory({}, t) : this._client.get("/radar/email/security/timeseries_groups/threat_category", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  tlsVersion(t = {}, e) {
    return u(t) ? this.tlsVersion({}, t) : this._client.get("/radar/email/security/timeseries_groups/tls_version", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
};
Ei || (Ei = {});
class Vi extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/email/security/top/tlds/malicious/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
Vi || (Vi = {});
class Di extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/email/security/top/tlds/spam/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
Di || (Di = {});
class Ni extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/email/security/top/tlds/spoof/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
Ni || (Ni = {});
class Fi extends o {
  constructor() {
    super(...arguments), this.malicious = new Vi(this._client), this.spam = new Di(this._client), this.spoof = new Ni(this._client);
  }
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/email/security/top/tlds", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.Malicious = Vi, s.Spam = Di, s.Spoof = Ni;
})(Fi || (Fi = {}));
let Mi = class extends o {
  constructor() {
    super(...arguments), this.tlds = new Fi(this._client);
  }
};
(function(s) {
  s.Tlds = Fi;
})(Mi || (Mi = {}));
class Bi extends o {
  constructor() {
    super(...arguments), this.top = new Mi(this._client), this.summary = new Ci(this._client), this.timeseriesGroups = new Ei(this._client);
  }
}
(function(s) {
  s.Top = Mi, s.Summary = Ci, s.TimeseriesGroups = Ei;
})(Bi || (Bi = {}));
class Yi extends o {
  constructor() {
    super(...arguments), this.routing = new Ti(this._client), this.security = new Bi(this._client);
  }
}
(function(s) {
  s.Routing = Ti, s.Security = Bi;
})(Yi || (Yi = {}));
class Hi extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.get("/radar/entities/asns", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/entities/asns/${t}`, { query: e, ...n })._thenUnwrap((r) => r.result);
  }
  /**
   * Get the requested autonomous system information based on IP address. Population
   * estimates come from APNIC (refer to https://labs.apnic.net/?p=526).
   */
  ip(t, e) {
    return this._client.get("/radar/entities/asns/ip", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  rel(t, e = {}, n) {
    return u(e) ? this.rel(t, {}, e) : this._client.get(`/radar/entities/asns/${t}/rel`, { query: e, ...n })._thenUnwrap((r) => r.result);
  }
}
Hi || (Hi = {});
let ji = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.get("/radar/entities/locations", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/entities/locations/${t}`, { query: e, ...n })._thenUnwrap((r) => r.result);
  }
};
ji || (ji = {});
class Gi extends o {
  constructor() {
    super(...arguments), this.asns = new Hi(this._client), this.locations = new ji(this._client);
  }
  /**
   * Get IP address information.
   */
  get(t, e) {
    return this._client.get("/radar/entities/ip", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.ASNs = Hi, s.Locations = ji;
})(Gi || (Gi = {}));
let Wi = class extends o {
  botClass(t = {}, e) {
    return u(t) ? this.botClass({}, t) : this._client.get("/radar/http/summary/bot_class", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  deviceType(t = {}, e) {
    return u(t) ? this.deviceType({}, t) : this._client.get("/radar/http/summary/device_type", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  httpProtocol(t = {}, e) {
    return u(t) ? this.httpProtocol({}, t) : this._client.get("/radar/http/summary/http_protocol", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  httpVersion(t = {}, e) {
    return u(t) ? this.httpVersion({}, t) : this._client.get("/radar/http/summary/http_version", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/http/summary/ip_version", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  os(t = {}, e) {
    return u(t) ? this.os({}, t) : this._client.get("/radar/http/summary/os", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  postQuantum(t = {}, e) {
    return u(t) ? this.postQuantum({}, t) : this._client.get("/radar/http/summary/post_quantum", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  tlsVersion(t = {}, e) {
    return u(t) ? this.tlsVersion({}, t) : this._client.get("/radar/http/summary/tls_version", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
Wi || (Wi = {});
class Ki extends o {
  botClass(t = {}, e) {
    return u(t) ? this.botClass({}, t) : this._client.get("/radar/http/timeseries_groups/bot_class", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  browser(t = {}, e) {
    return u(t) ? this.browser({}, t) : this._client.get("/radar/http/timeseries_groups/browser", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  browserFamily(t = {}, e) {
    return u(t) ? this.browserFamily({}, t) : this._client.get("/radar/http/timeseries_groups/browser_family", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  deviceType(t = {}, e) {
    return u(t) ? this.deviceType({}, t) : this._client.get("/radar/http/timeseries_groups/device_type", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  httpProtocol(t = {}, e) {
    return u(t) ? this.httpProtocol({}, t) : this._client.get("/radar/http/timeseries_groups/http_protocol", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  httpVersion(t = {}, e) {
    return u(t) ? this.httpVersion({}, t) : this._client.get("/radar/http/timeseries_groups/http_version", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/http/timeseries_groups/ip_version", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  os(t = {}, e) {
    return u(t) ? this.os({}, t) : this._client.get("/radar/http/timeseries_groups/os", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  postQuantum(t = {}, e) {
    return u(t) ? this.postQuantum({}, t) : this._client.get("/radar/http/timeseries_groups/post_quantum", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
  tlsVersion(t = {}, e) {
    return u(t) ? this.tlsVersion({}, t) : this._client.get("/radar/http/timeseries_groups/tls_version", {
      query: t,
      ...e
    })._thenUnwrap((n) => n.result);
  }
}
Ki || (Ki = {});
let Ji = class extends o {
  browserFamilies(t = {}, e) {
    return u(t) ? this.browserFamilies({}, t) : this._client.get("/radar/http/top/browser_families", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  browsers(t = {}, e) {
    return u(t) ? this.browsers({}, t) : this._client.get("/radar/http/top/browsers", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
Ji || (Ji = {});
let Qi = class extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/bot_class/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
};
Qi || (Qi = {});
let Xi = class extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/browser_family/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
};
Xi || (Xi = {});
let qi = class extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/device_type/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
};
qi || (qi = {});
let tc = class extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/http_version/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
};
tc || (tc = {});
let ec = class extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/http_protocol/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
};
ec || (ec = {});
let nc = class extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/ip_version/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
};
nc || (nc = {});
let sc = class extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/os/${t}`, { query: e, ...n })._thenUnwrap((r) => r.result);
  }
};
sc || (sc = {});
let rc = class extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/tls_version/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
};
rc || (rc = {});
class ic extends o {
  constructor() {
    super(...arguments), this.botClass = new Qi(this._client), this.deviceType = new qi(this._client), this.httpProtocol = new ec(this._client), this.httpMethod = new tc(this._client), this.ipVersion = new nc(this._client), this.os = new sc(this._client), this.tlsVersion = new rc(this._client), this.browserFamily = new Xi(this._client);
  }
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/http/top/ases", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.BotClass = Qi, s.DeviceType = qi, s.HTTPProtocol = ec, s.HTTPMethod = tc, s.IPVersion = nc, s.OS = sc, s.TLSVersion = rc, s.BrowserFamily = Xi;
})(ic || (ic = {}));
class cc extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/bot_class/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
cc || (cc = {});
class oc extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/browser_family/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
oc || (oc = {});
class ac extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/device_type/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
ac || (ac = {});
class uc extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/http_version/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
uc || (uc = {});
class lc extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/http_protocol/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
lc || (lc = {});
class dc extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/ip_version/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
dc || (dc = {});
class hc extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/os/${t}`, { query: e, ...n })._thenUnwrap((r) => r.result);
  }
}
hc || (hc = {});
class _c extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/tls_version/${t}`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
_c || (_c = {});
let pc = class extends o {
  constructor() {
    super(...arguments), this.botClass = new cc(this._client), this.deviceType = new ac(this._client), this.httpProtocol = new lc(this._client), this.httpMethod = new uc(this._client), this.ipVersion = new dc(this._client), this.os = new hc(this._client), this.tlsVersion = new _c(this._client), this.browserFamily = new oc(this._client);
  }
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/http/top/locations", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
(function(s) {
  s.BotClass = cc, s.DeviceType = ac, s.HTTPProtocol = lc, s.HTTPMethod = uc, s.IPVersion = dc, s.OS = hc, s.TLSVersion = _c, s.BrowserFamily = oc;
})(pc || (pc = {}));
class gc extends o {
  constructor() {
    super(...arguments), this.top = new Ji(this._client), this.locations = new pc(this._client), this.ases = new ic(this._client), this.summary = new Wi(this._client), this.timeseriesGroups = new Ki(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/http/timeseries", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.Top = Ji, s.Locations = pc, s.Ases = ic, s.Summary = Wi, s.TimeseriesGroups = Ki;
})(gc || (gc = {}));
let fc = class extends o {
  ases(t = {}, e) {
    return u(t) ? this.ases({}, t) : this._client.get("/radar/netflows/top/ases", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  locations(t = {}, e) {
    return u(t) ? this.locations({}, t) : this._client.get("/radar/netflows/top/locations", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
fc || (fc = {});
class wc extends o {
  constructor() {
    super(...arguments), this.top = new fc(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/netflows/timeseries", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.Top = fc;
})(wc || (wc = {}));
class mc extends o {
  /**
   * Get a summary (percentiles) of bandwidth, latency or DNS response time from the
   * Radar Internet Quality Index (IQI).
   */
  summary(t, e) {
    return this._client.get("/radar/quality/iqi/summary", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  /**
   * Get a time series (percentiles) of bandwidth, latency or DNS response time from
   * the Radar Internet Quality Index (IQI).
   */
  timeseriesGroups(t, e) {
    return this._client.get("/radar/quality/iqi/timeseries_groups", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
mc || (mc = {});
let $c = class extends o {
  ases(t = {}, e) {
    return u(t) ? this.ases({}, t) : this._client.get("/radar/quality/speed/top/ases", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  locations(t = {}, e) {
    return u(t) ? this.locations({}, t) : this._client.get("/radar/quality/speed/top/locations", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
$c || ($c = {});
let yc = class extends o {
  constructor() {
    super(...arguments), this.top = new $c(this._client);
  }
  histogram(t = {}, e) {
    return u(t) ? this.histogram({}, t) : this._client.get("/radar/quality/speed/histogram", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  summary(t = {}, e) {
    return u(t) ? this.summary({}, t) : this._client.get("/radar/quality/speed/summary", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
(function(s) {
  s.Top = $c;
})(yc || (yc = {}));
class bc extends o {
  constructor() {
    super(...arguments), this.iqi = new mc(this._client), this.speed = new yc(this._client);
  }
}
(function(s) {
  s.IQI = mc, s.Speed = yc;
})(bc || (bc = {}));
class Pc extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/ranking/domain/${t}`, { query: e, ...n })._thenUnwrap((r) => r.result);
  }
}
Pc || (Pc = {});
class vc extends o {
  constructor() {
    super(...arguments), this.domain = new Pc(this._client);
  }
  timeseriesGroups(t = {}, e) {
    return u(t) ? this.timeseriesGroups({}, t) : this._client.get("/radar/ranking/timeseries_groups", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  top(t = {}, e) {
    return u(t) ? this.top({}, t) : this._client.get("/radar/ranking/top", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.Domain = Pc;
})(vc || (vc = {}));
let Uc = class extends o {
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/traffic_anomalies/locations", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
};
Uc || (Uc = {});
class xc extends o {
  constructor() {
    super(...arguments), this.locations = new Uc(this._client);
  }
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/traffic_anomalies", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
(function(s) {
  s.Locations = Uc;
})(xc || (xc = {}));
class Sc extends o {
  bots(t = {}, e) {
    return u(t) ? this.bots({}, t) : this._client.get("/radar/verified_bots/top/bots", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
  categories(t = {}, e) {
    return u(t) ? this.categories({}, t) : this._client.get("/radar/verified_bots/top/categories", { query: t, ...e })._thenUnwrap((n) => n.result);
  }
}
Sc || (Sc = {});
class zc extends o {
  constructor() {
    super(...arguments), this.top = new Sc(this._client);
  }
}
(function(s) {
  s.Top = Sc;
})(zc || (zc = {}));
class Oc extends o {
  constructor() {
    super(...arguments), this.annotations = new ii(this._client), this.bgp = new Ri(this._client), this.datasets = new ei(this._client), this.dns = new ki(this._client), this.netflows = new wc(this._client), this.search = new ni(this._client), this.verifiedBots = new zc(this._client), this.as112 = new ui(this._client), this.email = new Yi(this._client), this.attacks = new bi(this._client), this.entities = new Gi(this._client), this.http = new gc(this._client), this.quality = new bc(this._client), this.ranking = new vc(this._client), this.trafficAnomalies = new xc(this._client), this.tcpResetsTimeouts = new si(this._client);
  }
}
(function(s) {
  s.Annotations = ii, s.BGP = Ri, s.Datasets = ei, s.DNS = ki, s.Netflows = wc, s.Search = ni, s.VerifiedBots = zc, s.AS112 = ui, s.Email = Yi, s.Attacks = bi, s.Entities = Gi, s.HTTP = gc, s.Quality = bc, s.Ranking = vc, s.TrafficAnomalies = xc, s.TCPResetsTimeouts = si;
})(Oc || (Oc = {}));
class qg extends o {
  /**
   * Creates a new rate limit for a zone. Refer to the object definition for a list
   * of required attributes.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/rate_limits`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  list(t, e = {}, n) {
    return u(e) ? this.list(t, {}, e) : this._client.getAPIList(`/zones/${t}/rate_limits`, Ww, {
      query: e,
      ...n
    });
  }
  /**
   * Deletes an existing rate limit.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  delete(t, e, n) {
    return this._client.delete(`/zones/${t}/rate_limits/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Updates an existing rate limit.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  edit(t, e, n, r) {
    return this._client.put(`/zones/${t}/rate_limits/${e}`, {
      body: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a rate limit.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/rate_limits/${e}`, n)._thenUnwrap((r) => r.result);
  }
}
class Ww extends A {
}
class tf extends o {
  /**
   * Lists all rate plans the zone can subscribe to.
   */
  get(t, e) {
    return this._client.get(`/zones/${t}/available_rate_plans`, e)._thenUnwrap((n) => n.result);
  }
}
let Ac = class extends o {
  /**
   * Update individual domain.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/registrar/domains/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List domains handled by Registrar.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/registrar/domains`, Yh, e);
  }
  /**
   * Show individual domain.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/registrar/domains/${t}`, n)._thenUnwrap((i) => i.result);
  }
}, Yh = class extends w {
};
(function(s) {
  s.DomainsSinglePage = Yh;
})(Ac || (Ac = {}));
class Rc extends o {
  constructor() {
    super(...arguments), this.domains = new Ac(this._client);
  }
}
(function(s) {
  s.Domains = Ac, s.DomainsSinglePage = Yh;
})(Rc || (Rc = {}));
class Ic extends o {
  /**
   * Request Trace
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/request-tracer/trace`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
Ic || (Ic = {});
class kc extends o {
  constructor() {
    super(...arguments), this.traces = new Ic(this._client);
  }
}
(function(s) {
  s.Traces = Ic;
})(kc || (kc = {}));
class Lc extends o {
  /**
   * Gets the current status of an asynchronous operation on a list.
   *
   * The `status` property can have one of the following values: `pending`,
   * `running`, `completed`, or `failed`. If the status is `failed`, the `error`
   * property will contain a message describing the error.
   */
  get(t, e, n) {
    return this._client.get(`/accounts/${t}/rules/lists/bulk_operations/${e}`, n)._thenUnwrap((r) => r.result);
  }
}
Lc || (Lc = {});
let Zc = class extends o {
  /**
   * Appends new items to the list.
   *
   * This operation is asynchronous. To get current the operation status, invoke the
   * [Get bulk operation status](/operations/lists-get-bulk-operation-status)
   * endpoint with the returned `operation_id`.
   */
  create(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.post(`/accounts/${r}/rules/lists/${t}/items`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Removes all existing items from the list and adds the provided items to the
   * list.
   *
   * This operation is asynchronous. To get current the operation status, invoke the
   * [Get bulk operation status](/operations/lists-get-bulk-operation-status)
   * endpoint with the returned `operation_id`.
   */
  update(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.put(`/accounts/${r}/rules/lists/${t}/items`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches all the items in the list.
   */
  list(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.getAPIList(`/accounts/${r}/rules/lists/${t}/items`, Hh, { query: i, ...n });
  }
  /**
   * Removes one or more items from a list.
   *
   * This operation is asynchronous. To get current the operation status, invoke the
   * [Get bulk operation status](/operations/lists-get-bulk-operation-status)
   * endpoint with the returned `operation_id`.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/rules/lists/${t}/items`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a list item in the list.
   */
  get(t, e, n, r) {
    return this._client.get(`/accounts/${t}/rules/lists/${e}/items/${n}`, r)._thenUnwrap((i) => i.result);
  }
};
class Hh extends Ld {
}
(function(s) {
  s.ItemListResponsesCursorPagination = Hh;
})(Zc || (Zc = {}));
let Tc = class extends o {
  constructor() {
    super(...arguments), this.bulkOperations = new Lc(this._client), this.items = new Zc(this._client);
  }
  /**
   * Creates a new list of the specified type.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/rules/lists`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates the description of a list.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/rules/lists/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches all lists in the account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/rules/lists`, jh, e);
  }
  /**
   * Deletes a specific list and all its items.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/rules/lists/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a list.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/rules/lists/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class jh extends w {
}
(function(s) {
  s.ListsListsSinglePage = jh, s.BulkOperations = Lc, s.Items = Zc, s.ItemListResponsesCursorPagination = Hh;
})(Tc || (Tc = {}));
let Cc = class extends o {
  constructor() {
    super(...arguments), this.lists = new Tc(this._client);
  }
};
(function(s) {
  s.Lists = Tc, s.ListsListsSinglePage = jh;
})(Cc || (Cc = {}));
let Ec = class extends o {
  /**
   * Adds a new rule to an account or zone ruleset. The rule will be added to the end
   * of the existing list of rules in the ruleset by default.
   */
  create(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${a}/${l}/rulesets/${t}/rules`, {
      body: c,
      ...n
    })._thenUnwrap((p) => p.result);
  }
  delete(t, e, n = {}, r) {
    if (u(n))
      return this.delete(t, e, {}, n);
    const { account_id: i, zone_id: c } = n;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.delete(`/${a}/${l}/rulesets/${t}/rules/${e}`, r)._thenUnwrap((p) => p.result);
  }
  /**
   * Updates an existing rule in an account or zone ruleset.
   */
  edit(t, e, n, r) {
    const { account_id: i, zone_id: c, ...a } = n;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: l, accountOrZoneId: p } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.patch(`/${l}/${p}/rulesets/${t}/rules/${e}`, {
      body: a,
      ...r
    })._thenUnwrap(($) => $.result);
  }
};
Ec || (Ec = {});
let Vc = class extends o {
  list(t, e = {}, n) {
    if (u(e))
      return this.list(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${a}/rulesets/phases/${t}/entrypoint/versions`, Gh, n);
  }
  get(t, e, n = {}, r) {
    if (u(n))
      return this.get(t, e, {}, n);
    const { account_id: i, zone_id: c } = n;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.get(`/${a}/${l}/rulesets/phases/${t}/entrypoint/versions/${e}`, r)._thenUnwrap((p) => p.result);
  }
}, Gh = class extends w {
};
(function(s) {
  s.VersionListResponsesSinglePage = Gh;
})(Vc || (Vc = {}));
class Dc extends o {
  constructor() {
    super(...arguments), this.versions = new Vc(this._client);
  }
  /**
   * Updates an account or zone entry point ruleset, creating a new version.
   */
  update(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/rulesets/phases/${t}/entrypoint`, {
      body: c,
      ...n
    })._thenUnwrap((p) => p.result);
  }
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/rulesets/phases/${t}/entrypoint`, n)._thenUnwrap((l) => l.result);
  }
}
(function(s) {
  s.Versions = Vc, s.VersionListResponsesSinglePage = Gh;
})(Dc || (Dc = {}));
class Nc extends o {
  /**
   * Fetches the rules of a managed account ruleset version for a given tag.
   */
  get(t, e, n, r, i) {
    const { account_id: c } = r;
    return this._client.get(`/accounts/${c}/rulesets/${t}/versions/${e}/by_tag/${n}`, i)._thenUnwrap((a) => a.result);
  }
}
Nc || (Nc = {});
let Fc = class extends o {
  constructor() {
    super(...arguments), this.byTag = new Nc(this._client);
  }
  list(t, e = {}, n) {
    if (u(e))
      return this.list(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${a}/rulesets/${t}/versions`, Wh, n);
  }
  delete(t, e, n = {}, r) {
    if (u(n))
      return this.delete(t, e, {}, n);
    const { account_id: i, zone_id: c } = n;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.delete(`/${a}/${l}/rulesets/${t}/versions/${e}`, { ...r, headers: { Accept: "*/*", ...r == null ? void 0 : r.headers } });
  }
  get(t, e, n = {}, r) {
    if (u(n))
      return this.get(t, e, {}, n);
    const { account_id: i, zone_id: c } = n;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.get(`/${a}/${l}/rulesets/${t}/versions/${e}`, r)._thenUnwrap((p) => p.result);
  }
};
class Wh extends w {
}
(function(s) {
  s.VersionListResponsesSinglePage = Wh, s.ByTag = Nc;
})(Fc || (Fc = {}));
class Mc extends o {
  constructor() {
    super(...arguments), this.phases = new Dc(this._client), this.rules = new Ec(this._client), this.versions = new Fc(this._client);
  }
  /**
   * Creates a ruleset.
   */
  create(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/rulesets`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an account or zone ruleset, creating a new version.
   */
  update(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/rulesets/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((p) => p.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.getAPIList(`/${i}/${c}/rulesets`, Kw, e);
  }
  delete(t, e = {}, n) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/rulesets/${t}`, {
      ...n,
      headers: { Accept: "*/*", ...n == null ? void 0 : n.headers }
    });
  }
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/rulesets/${t}`, n)._thenUnwrap((l) => l.result);
  }
}
class Kw extends w {
}
(function(s) {
  s.Phases = Dc, s.Rules = Ec, s.Versions = Fc, s.VersionListResponsesSinglePage = Wh;
})(Mc || (Mc = {}));
class Bc extends o {
  /**
   * Returns the set of hostnames, the signature algorithm, and the expiration date
   * of the certificate.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/ssl/analyze`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
}
Bc || (Bc = {});
class Yc extends o {
  /**
   * Retrieve the SSL/TLS Recommender's recommendation for a zone.
   */
  get(t, e) {
    return this._client.get(`/zones/${t}/ssl/recommendation`, e)._thenUnwrap((n) => n.result);
  }
}
Yc || (Yc = {});
class Hc extends o {
  /**
   * Edit SSL validation method for a certificate pack. A PATCH request will request
   * an immediate validation check on any certificate, and return the updated status.
   * If a validation method is provided, the validation will be immediately attempted
   * using that method.
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/ssl/verification/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get SSL Verification Info for a Zone.
   */
  get(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.get(`/zones/${n}/ssl/verification`, { query: r, ...e })._thenUnwrap((i) => i.result);
  }
}
Hc || (Hc = {});
class jc extends o {
  /**
   * For a given zone, order an advanced certificate pack.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/ssl/certificate_packs/order`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
jc || (jc = {});
class Gc extends o {
  /**
   * For a given zone, list certificate pack quotas.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/ssl/certificate_packs/quota`, e)._thenUnwrap((r) => r.result);
  }
}
Gc || (Gc = {});
class Wc extends o {
  constructor() {
    super(...arguments), this.order = new jc(this._client), this.quota = new Gc(this._client);
  }
  /**
   * For a given zone, list all active certificate packs.
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/ssl/certificate_packs`, Kh, { query: r, ...e });
  }
  /**
   * For a given zone, delete an advanced certificate pack.
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/ssl/certificate_packs/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * For a given zone, restart validation for an advanced certificate pack. This is
   * only a validation operation for a Certificate Pack in a validation_timed_out
   * status.
   */
  edit(t, e, n) {
    const { zone_id: r, body: i } = e;
    return this._client.patch(`/zones/${r}/ssl/certificate_packs/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * For a given zone, get a certificate pack.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/ssl/certificate_packs/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Kh extends w {
}
(function(s) {
  s.CertificatePackListResponsesSinglePage = Kh, s.Order = jc, s.Quota = Gc;
})(Wc || (Wc = {}));
let Kc = class extends o {
  /**
   * Patch Universal SSL Settings for a Zone.
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/ssl/universal/settings`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Universal SSL Settings for a Zone.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/ssl/universal/settings`, e)._thenUnwrap((r) => r.result);
  }
};
Kc || (Kc = {});
class Jc extends o {
  constructor() {
    super(...arguments), this.settings = new Kc(this._client);
  }
}
(function(s) {
  s.Settings = Kc;
})(Jc || (Jc = {}));
class Qc extends o {
  constructor() {
    super(...arguments), this.analyze = new Bc(this._client), this.certificatePacks = new Wc(this._client), this.recommendations = new Yc(this._client), this.universal = new Jc(this._client), this.verification = new Hc(this._client);
  }
}
(function(s) {
  s.Analyze = Bc, s.CertificatePacks = Wc, s.CertificatePackListResponsesSinglePage = Kh, s.Recommendations = Yc, s.Universal = Jc, s.VerificationResource = Hc;
})(Qc || (Qc = {}));
class Xc extends o {
  /**
   * Create ACL.
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/secondary_dns/acls`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify ACL.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/secondary_dns/acls/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List ACLs.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/secondary_dns/acls`, Jh, e);
  }
  /**
   * Delete ACL.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/secondary_dns/acls/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get ACL.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/secondary_dns/acls/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Jh extends w {
}
(function(s) {
  s.ACLsSinglePage = Jh;
})(Xc || (Xc = {}));
class qc extends o {
  /**
   * Sends AXFR zone transfer request to primary nameserver(s).
   */
  create(t, e) {
    const { zone_id: n, body: r } = t;
    return this._client.post(`/zones/${n}/secondary_dns/force_axfr`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
qc || (qc = {});
class to extends o {
  /**
   * Create secondary zone configuration for incoming zone transfers.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/secondary_dns/incoming`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update secondary zone configuration for incoming zone transfers.
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/secondary_dns/incoming`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete secondary zone configuration for incoming zone transfers.
   */
  delete(t, e) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/secondary_dns/incoming`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Get secondary zone configuration for incoming zone transfers.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/secondary_dns/incoming`, e)._thenUnwrap((r) => r.result);
  }
}
to || (to = {});
class eo extends o {
  /**
   * Create Peer.
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/secondary_dns/peers`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify Peer.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/secondary_dns/peers/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Peers.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/secondary_dns/peers`, Qh, e);
  }
  /**
   * Delete Peer.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/secondary_dns/peers/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Peer.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/secondary_dns/peers/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Qh extends w {
}
(function(s) {
  s.PeersSinglePage = Qh;
})(eo || (eo = {}));
class no extends o {
  /**
   * Create TSIG.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/secondary_dns/tsigs`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify TSIG.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/secondary_dns/tsigs/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List TSIGs.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/secondary_dns/tsigs`, Xh, e);
  }
  /**
   * Delete TSIG.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/secondary_dns/tsigs/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get TSIG.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/secondary_dns/tsigs/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Xh extends w {
}
(function(s) {
  s.TSIGsSinglePage = Xh;
})(no || (no = {}));
class so extends o {
  /**
   * Get primary zone transfer status.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/secondary_dns/outgoing/status`, e)._thenUnwrap((r) => r.result);
  }
}
so || (so = {});
class ro extends o {
  constructor() {
    super(...arguments), this.status = new so(this._client);
  }
  /**
   * Create primary zone configuration for outgoing zone transfers.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/secondary_dns/outgoing`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update primary zone configuration for outgoing zone transfers.
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/secondary_dns/outgoing`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete primary zone configuration for outgoing zone transfers.
   */
  delete(t, e) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}/secondary_dns/outgoing`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Disable outgoing zone transfers for primary zone and clears IXFR backlog of
   * primary zone.
   */
  disable(t, e) {
    const { zone_id: n, body: r } = t;
    return this._client.post(`/zones/${n}/secondary_dns/outgoing/disable`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Enable outgoing zone transfers for primary zone.
   */
  enable(t, e) {
    const { zone_id: n, body: r } = t;
    return this._client.post(`/zones/${n}/secondary_dns/outgoing/enable`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Notifies the secondary nameserver(s) and clears IXFR backlog of primary zone.
   */
  forceNotify(t, e) {
    const { zone_id: n, body: r } = t;
    return this._client.post(`/zones/${n}/secondary_dns/outgoing/force_notify`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get primary zone configuration for outgoing zone transfers.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/secondary_dns/outgoing`, e)._thenUnwrap((r) => r.result);
  }
}
(function(s) {
  s.Status = so;
})(ro || (ro = {}));
class io extends o {
  constructor() {
    super(...arguments), this.forceAXFR = new qc(this._client), this.incoming = new to(this._client), this.outgoing = new ro(this._client), this.acls = new Xc(this._client), this.peers = new eo(this._client), this.tsigs = new no(this._client);
  }
}
(function(s) {
  s.ForceAXFRResource = qc, s.IncomingResource = to, s.OutgoingResource = ro, s.ACLs = Xc, s.ACLsSinglePage = Jh, s.Peers = eo, s.PeersSinglePage = Qh, s.TSIGs = no, s.TSIGsSinglePage = Xh;
})(io || (io = {}));
let co = class extends o {
  /**
   * Snippet Content
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/snippets/${t}/content`, {
      ...n,
      __binaryResponse: !0
    });
  }
};
co || (co = {});
let oo = class extends o {
  /**
   * Put Rules
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/snippets/snippet_rules`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Rules
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/snippets/snippet_rules`, qh, e);
  }
};
class qh extends w {
}
(function(s) {
  s.RuleListResponsesSinglePage = qh;
})(oo || (oo = {}));
class ao extends o {
  constructor() {
    super(...arguments), this.content = new co(this._client), this.rules = new oo(this._client);
  }
  /**
   * Put Snippet
   */
  update(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.put(`/zones/${r}/snippets/${t}`, tt({ body: i, ...n }))._thenUnwrap((c) => c.result);
  }
  /**
   * All Snippets
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/snippets`, Jw, e);
  }
  /**
   * Delete Snippet
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/snippets/${t}`, n);
  }
  /**
   * Snippet
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/snippets/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Jw extends w {
}
(function(s) {
  s.Content = co, s.Rules = oo, s.RuleListResponsesSinglePage = qh;
})(ao || (ao = {}));
class uo extends o {
  /**
   * Creates a new Spectrum application from a configuration using a name for the
   * origin.
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/spectrum/apps`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  /**
   * Updates a previously existing application's configuration that uses a name for
   * the origin.
   */
  update(t, e, n, r) {
    return this._client.put(`/zones/${t}/spectrum/apps/${e}`, { body: n, ...r })._thenUnwrap((i) => i.result);
  }
  list(t, e = {}, n) {
    return u(e) ? this.list(t, {}, e) : this._client.getAPIList(`/zones/${t}/spectrum/apps`, t_, {
      query: e,
      ...n
    });
  }
  /**
   * Deletes a previously existing application.
   */
  delete(t, e, n) {
    return this._client.delete(`/zones/${t}/spectrum/apps/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Gets the application configuration of a specific application inside a zone.
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/spectrum/apps/${e}`, n)._thenUnwrap((r) => r.result);
  }
}
class t_ extends A {
}
(function(s) {
  s.AppListResponsesV4PagePaginationArray = t_;
})(uo || (uo = {}));
class lo extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/zones/${t}/spectrum/analytics/aggregate/current`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
lo || (lo = {});
class ho extends o {
  constructor() {
    super(...arguments), this.currents = new lo(this._client);
  }
}
(function(s) {
  s.Currents = lo;
})(ho || (ho = {}));
class _o extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/zones/${t}/spectrum/analytics/events/bytime`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
_o || (_o = {});
class po extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/zones/${t}/spectrum/analytics/events/summary`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
po || (po = {});
let go = class extends o {
  constructor() {
    super(...arguments), this.bytimes = new _o(this._client), this.summaries = new po(this._client);
  }
};
(function(s) {
  s.Bytimes = _o, s.Summaries = po;
})(go || (go = {}));
let fo = class extends o {
  constructor() {
    super(...arguments), this.aggregates = new ho(this._client), this.events = new go(this._client);
  }
};
(function(s) {
  s.Aggregates = ho, s.Events = go;
})(fo || (fo = {}));
class wo extends o {
  constructor() {
    super(...arguments), this.analytics = new fo(this._client), this.apps = new uo(this._client);
  }
}
(function(s) {
  s.Analytics = fo, s.Apps = uo, s.AppListResponsesV4PagePaginationArray = t_;
})(wo || (wo = {}));
class mo extends o {
  /**
   * Retrieves quota for all plans, as well as the current zone quota.
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/speed_api/availabilities`, e)._thenUnwrap((r) => r.result);
  }
}
mo || (mo = {});
class $o extends o {
  /**
   * Creates a scheduled test for a page.
   */
  create(t, e, n) {
    const { zone_id: r, region: i } = e;
    return this._client.post(`/zones/${r}/speed_api/schedule/${t}`, {
      query: { region: i },
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a scheduled test for a page.
   */
  delete(t, e, n) {
    const { zone_id: r, region: i } = e;
    return this._client.delete(`/zones/${r}/speed_api/schedule/${t}`, {
      query: { region: i },
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieves the test schedule for a page in a specific region.
   */
  get(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.get(`/zones/${r}/speed_api/schedule/${t}`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
$o || ($o = {});
let yo = class extends o {
  /**
   * Starts a test for a specific webpage, in a specific region.
   */
  create(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.post(`/zones/${r}/speed_api/pages/${t}/tests`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Test history (list of tests) for a specific webpage.
   */
  list(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.get(`/zones/${r}/speed_api/pages/${t}/tests`, { query: i, ...n });
  }
  /**
   * Deletes all tests for a specific webpage from a specific region. Deleted tests
   * are still counted as part of the quota.
   */
  delete(t, e, n) {
    const { zone_id: r, region: i } = e;
    return this._client.delete(`/zones/${r}/speed_api/pages/${t}/tests`, {
      query: { region: i },
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieves the result of a specific test.
   */
  get(t, e, n, r) {
    const { zone_id: i } = n;
    return this._client.get(`/zones/${i}/speed_api/pages/${t}/tests/${e}`, r)._thenUnwrap((c) => c.result);
  }
};
yo || (yo = {});
class bo extends o {
  constructor() {
    super(...arguments), this.tests = new yo(this._client);
  }
  /**
   * Lists all webpages which have been tested.
   */
  list(t, e) {
    const { zone_id: n } = t;
    return this._client.getAPIList(`/zones/${n}/speed_api/pages`, e_, e);
  }
  /**
   * Lists the core web vital metrics trend over time for a specific page.
   */
  trend(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.get(`/zones/${r}/speed_api/pages/${t}/trend`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
class e_ extends w {
}
(function(s) {
  s.PageListResponsesSinglePage = e_, s.Tests = yo;
})(bo || (bo = {}));
class Po extends o {
  constructor() {
    super(...arguments), this.schedule = new $o(this._client), this.availabilities = new mo(this._client), this.pages = new bo(this._client);
  }
}
(function(s) {
  s.ScheduleResource = $o, s.Availabilities = mo, s.Pages = bo, s.PageListResponsesSinglePage = e_;
})(Po || (Po = {}));
class vo extends o {
  /**
   * Retrieves Workers KV request metrics for the given account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/storage/analytics`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves Workers KV stored data metrics for the given account.
   */
  stored(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/storage/analytics/stored`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
vo || (vo = {});
class Uo extends o {
  constructor() {
    super(...arguments), this.analytics = new vo(this._client);
  }
}
(function(s) {
  s.Analytics = vo;
})(Uo || (Uo = {}));
class xo extends o {
  /**
   * Deletes additional audio tracks on a video. Deleting a default audio track is
   * not allowed. You must assign another audio track as default prior to deletion.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/stream/${t}/audio/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Adds an additional audio track to a video using the provided audio track URL.
   */
  copy(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/stream/${t}/audio/copy`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Edits additional audio tracks on a video. Editing the default status of an audio
   * track to `true` will mark all other audio tracks on the video default status to
   * `false`.
   */
  edit(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.patch(`/accounts/${i}/stream/${t}/audio/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists additional audio tracks on a video. Note this API will not return
   * information for audio attached to the video upload.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/stream/${t}/audio`, n)._thenUnwrap((i) => i.result);
  }
}
xo || (xo = {});
class So extends o {
  /**
   * Clips a video based on the specified start and end times provided in seconds.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/stream/clip`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
}
So || (So = {});
class zo extends o {
  /**
   * Uploads a video to Stream from a provided URL.
   */
  create(t, e) {
    const { account_id: n, "Upload-Creator": r, "Upload-Metadata": i, ...c } = t;
    return this._client.post(`/accounts/${n}/stream/copy`, {
      body: c,
      ...e,
      headers: {
        ...r != null ? { "Upload-Creator": r } : void 0,
        ...i != null ? { "Upload-Metadata": i } : void 0,
        ...e == null ? void 0 : e.headers
      }
    })._thenUnwrap((a) => a.result);
  }
}
zo || (zo = {});
class Oo extends o {
  /**
   * Creates a direct upload that allows video uploads without an API key.
   */
  create(t, e) {
    const { account_id: n, "Upload-Creator": r, ...i } = t;
    return this._client.post(`/accounts/${n}/stream/direct_upload`, {
      body: i,
      ...e,
      headers: {
        ...r != null ? { "Upload-Creator": r } : void 0,
        ...e == null ? void 0 : e.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
Oo || (Oo = {});
class Ao extends o {
  /**
   * Creates a download for a video when a video is ready to view.
   */
  create(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.post(`/accounts/${r}/stream/${t}/downloads`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Delete the downloads for a video.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/stream/${t}/downloads`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists the downloads created for a video.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/stream/${t}/downloads`, n)._thenUnwrap((i) => i.result);
  }
}
Ao || (Ao = {});
class Ro extends o {
  /**
   * Fetches an HTML code snippet to embed a video in a web page delivered through
   * Cloudflare. On success, returns an HTML fragment for use on web pages to display
   * a video. On failure, returns a JSON response body.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/stream/${t}/embed`, {
      ...n,
      headers: { Accept: "application/json", ...n == null ? void 0 : n.headers }
    });
  }
}
Ro || (Ro = {});
let Ft = class extends o {
  /**
   * Creates an RSA private key in PEM and JWK formats. Key files are only displayed
   * once after creation. Keys are created, used, and deleted independently of
   * videos, and every key can sign any video.
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/stream/keys`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes signing keys and revokes all signed URLs generated with the key.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/stream/keys/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists the video ID and creation date and time when a signing key was created.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/stream/keys`, e)._thenUnwrap((r) => r.result);
  }
};
(function(s) {
  s.Keys = Ft;
})(Ft || (Ft = {}));
let Io = class extends o {
  /**
   * Creates a signed URL token for a video. If a body is not provided in the
   * request, a token is created with default values.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/stream/${t}/token`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
};
Io || (Io = {});
class ko extends o {
  /**
   * Returns information about an account's storage use.
   */
  storageUsage(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/stream/storage-usage`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
ko || (ko = {});
class Lo extends o {
  /**
   * Creates watermark profiles using a single `HTTP POST multipart/form-data`
   * request.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/stream/watermarks`, tt({ body: r, ...e }))._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all watermark profiles for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/stream/watermarks`, n_, e);
  }
  /**
   * Deletes a watermark profile.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/stream/watermarks/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves details for a single watermark profile.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/stream/watermarks/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class n_ extends w {
}
(function(s) {
  s.WatermarksSinglePage = n_;
})(Lo || (Lo = {}));
class Zo extends o {
  /**
   * Creates a webhook notification.
   */
  update(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}/stream/webhook`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes a webhook.
   */
  delete(t, e) {
    const { account_id: n } = t;
    return this._client.delete(`/accounts/${n}/stream/webhook`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Retrieves a list of webhooks.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/stream/webhook`, e)._thenUnwrap((r) => r.result);
  }
}
Zo || (Zo = {});
class To extends o {
  /**
   * Return WebVTT captions for a provided language.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/stream/${t}/captions/${e}/vtt`, {
      ...r,
      headers: { Accept: "text/vtt", ...r == null ? void 0 : r.headers }
    });
  }
}
To || (To = {});
class Co extends o {
  constructor() {
    super(...arguments), this.vtt = new To(this._client);
  }
  /**
   * Generate captions or subtitles for provided language via AI.
   */
  create(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.post(`/accounts/${i}/stream/${t}/captions/${e}/generate`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Uploads the caption or subtitle file to the endpoint for a specific BCP47
   * language. One caption or subtitle file per language is allowed.
   */
  update(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.put(`/accounts/${i}/stream/${t}/captions/${e}`, tt({ body: c, ...r }))._thenUnwrap((a) => a.result);
  }
  /**
   * Removes the captions or subtitles from a video.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/stream/${t}/captions/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Lists the captions or subtitles for provided language.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/stream/${t}/captions/${e}`, r)._thenUnwrap((c) => c.result);
  }
}
(function(s) {
  s.Vtt = To;
})(Co || (Co = {}));
class Eo extends o {
  constructor() {
    super(...arguments), this.language = new Co(this._client);
  }
  /**
   * Lists the available captions or subtitles for a specific video.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/stream/${t}/captions`, n)._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.Language = Co;
})(Eo || (Eo = {}));
class Vo extends o {
  /**
   * Creates a new output that can be used to simulcast or restream live video to
   * other RTMP or SRT destinations. Outputs are always linked to a specific live
   * input — one live input can have many outputs.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/stream/live_inputs/${t}/outputs`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates the state of an output.
   */
  update(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.put(`/accounts/${i}/stream/live_inputs/${t}/outputs/${e}`, { body: c, ...r })._thenUnwrap((a) => a.result);
  }
  /**
   * Retrieves all outputs associated with a specified live input.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/stream/live_inputs/${t}/outputs`, s_, n);
  }
  /**
   * Deletes an output and removes it from the associated live input.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/stream/live_inputs/${t}/outputs/${e}`, { ...r, headers: { Accept: "*/*", ...r == null ? void 0 : r.headers } });
  }
}
class s_ extends w {
}
(function(s) {
  s.OutputsSinglePage = s_;
})(Vo || (Vo = {}));
class Do extends o {
  constructor() {
    super(...arguments), this.outputs = new Vo(this._client);
  }
  /**
   * Creates a live input, and returns credentials that you or your users can use to
   * stream live video to Cloudflare Stream.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/stream/live_inputs`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a specified live input.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/stream/live_inputs/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists the live inputs created for an account. To get the credentials needed to
   * stream to a specific live input, request a single live input.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/stream/live_inputs`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Prevents a live input from being streamed to and makes the live input
   * inaccessible to any future API calls.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/stream/live_inputs/${t}`, {
      ...n,
      headers: { Accept: "*/*", ...n == null ? void 0 : n.headers }
    });
  }
  /**
   * Retrieves details of an existing live input.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/stream/live_inputs/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.Outputs = Vo, s.OutputsSinglePage = s_;
})(Do || (Do = {}));
class No extends o {
  constructor() {
    super(...arguments), this.audioTracks = new xo(this._client), this.videos = new ko(this._client), this.clip = new So(this._client), this.copy = new zo(this._client), this.directUpload = new Oo(this._client), this.keys = new Ft(this._client), this.liveInputs = new Do(this._client), this.watermarks = new Lo(this._client), this.webhooks = new Zo(this._client), this.captions = new Eo(this._client), this.downloads = new Ao(this._client), this.embed = new Ro(this._client), this.token = new Io(this._client);
  }
  /**
   * Initiates a video upload using the TUS protocol. On success, the server responds
   * with a status code 201 (created) and includes a `location` header to indicate
   * where the content should be uploaded. Refer to https://tus.io for protocol
   * details.
   */
  create(t, e) {
    const { account_id: n, body: r, "Tus-Resumable": i, "Upload-Length": c, "Upload-Creator": a, "Upload-Metadata": l } = t;
    return this._client.post(`/accounts/${n}/stream`, {
      body: r,
      ...e,
      headers: {
        Accept: "*/*",
        "Tus-Resumable": i.toString(),
        "Upload-Length": c.toString(),
        ...a != null ? { "Upload-Creator": a } : void 0,
        ...l != null ? { "Upload-Metadata": l } : void 0,
        ...e == null ? void 0 : e.headers
      }
    });
  }
  /**
   * Lists up to 1000 videos from a single request. For a specific range, refer to
   * the optional parameters.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/stream`, Qw, { query: r, ...e });
  }
  /**
   * Deletes a video and its copies from Cloudflare Stream.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/stream/${t}`, {
      ...n,
      headers: { Accept: "*/*", ...n == null ? void 0 : n.headers }
    });
  }
  /**
   * Fetches details for a single video.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/stream/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Qw extends w {
}
(function(s) {
  s.AudioTracks = xo, s.Videos = ko, s.ClipResource = So, s.Copy = zo, s.DirectUpload = Oo, s.Keys = Ft, s.LiveInputs = Do, s.Watermarks = Lo, s.WatermarksSinglePage = n_, s.Webhooks = Zo, s.Captions = Eo, s.Downloads = Ao, s.Embed = Ro, s.Token = Io;
})(No || (No = {}));
let Fo = class extends o {
  /**
   * Updates a user's subscriptions.
   */
  update(t, e, n) {
    return this._client.put(`/user/subscriptions/${t}`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  /**
   * Deletes a user's subscription.
   */
  delete(t, e) {
    return this._client.delete(`/user/subscriptions/${t}`, e);
  }
  /**
   * Updates zone subscriptions, either plan or add-ons.
   */
  edit(t, e, n) {
    return this._client.put(`/zones/${t}/subscription`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  /**
   * Lists all of a user's subscriptions.
   */
  get(t) {
    return this._client.get("/user/subscriptions", t)._thenUnwrap((e) => e.result);
  }
};
class ef extends w {
}
Fo || (Fo = {});
let nf = class extends o {
  /**
   * Create a zone subscription, either plan or add-ons.
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/subscription`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  /**
   * Updates an account subscription.
   */
  update(t, e, n, r) {
    return this._client.put(`/accounts/${t}/subscriptions/${e}`, {
      body: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all of an account's subscriptions.
   */
  list(t, e) {
    return this._client.getAPIList(`/accounts/${t}/subscriptions`, ef, e);
  }
  /**
   * Deletes an account's subscription.
   */
  delete(t, e, n) {
    return this._client.delete(`/accounts/${t}/subscriptions/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Lists zone subscription details.
   */
  get(t, e) {
    return this._client.get(`/zones/${t}/subscription`, e)._thenUnwrap((n) => n.result);
  }
};
class sf extends o {
  /**
   * Updates the URL normalization settings.
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/url_normalization`, { body: r, ...e });
  }
  /**
   * Fetches the current URL normalization settings.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/url_normalization`, e);
  }
}
class Mo extends o {
  /**
   * Submit a URL to scan. You can also set some options, like the visibility level
   * and custom headers. Accounts are limited to 1 new scan every 10 seconds and 8000
   * per month. If you need more, please reach out.
   */
  create(t, e, n) {
    return this._client.post(`/accounts/${t}/urlscanner/scan`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  get(t, e, n = {}, r) {
    return u(n) ? this.get(t, e, {}, n) : this._client.get(`/accounts/${t}/urlscanner/scan/${e}`, {
      query: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get a URL scan's HAR file. See HAR spec at
   * http://www.softwareishard.com/blog/har-12-spec/.
   */
  har(t, e, n) {
    return this._client.get(`/accounts/${t}/urlscanner/scan/${e}/har`, n)._thenUnwrap((r) => r.result);
  }
  screenshot(t, e, n = {}, r) {
    return u(n) ? this.screenshot(t, e, {}, n) : this._client.get(`/accounts/${t}/urlscanner/scan/${e}/screenshot`, {
      query: n,
      ...r,
      __binaryResponse: !0
    });
  }
}
Mo || (Mo = {});
class Bo extends o {
  constructor() {
    super(...arguments), this.scans = new Mo(this._client);
  }
  scan(t, e = {}, n) {
    return u(e) ? this.scan(t, {}, e) : this._client.get(`/accounts/${t}/urlscanner/scan`, { query: e, ...n })._thenUnwrap((r) => r.result);
  }
}
(function(s) {
  s.Scans = Mo;
})(Bo || (Bo = {}));
class Yo extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/user/audit_logs", Eg, { query: t, ...e });
  }
}
Yo || (Yo = {});
class Ho extends o {
  /**
   * Lists all invitations associated with my user.
   */
  list(t) {
    return this._client.getAPIList("/user/invites", r_, t);
  }
  /**
   * Responds to an invitation.
   */
  edit(t, e, n) {
    return this._client.patch(`/user/invites/${t}`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  /**
   * Gets the details of an invitation.
   */
  get(t, e) {
    return this._client.get(`/user/invites/${t}`, e)._thenUnwrap((n) => n.result);
  }
}
class r_ extends w {
}
(function(s) {
  s.InvitesSinglePage = r_;
})(Ho || (Ho = {}));
let jo = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/user/organizations", i_, {
      query: t,
      ...e
    });
  }
  /**
   * Removes association to an organization.
   */
  delete(t, e) {
    return this._client.delete(`/user/organizations/${t}`, e);
  }
  /**
   * Gets a specific organization the user is associated with.
   */
  get(t, e) {
    return this._client.get(`/user/organizations/${t}`, e)._thenUnwrap((n) => n.result);
  }
};
class i_ extends A {
}
(function(s) {
  s.OrganizationsV4PagePaginationArray = i_;
})(jo || (jo = {}));
class Go extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/user/billing/history", c_, {
      query: t,
      ...e
    });
  }
}
class c_ extends A {
}
(function(s) {
  s.BillingHistoriesV4PagePaginationArray = c_;
})(Go || (Go = {}));
class Wo extends o {
  /**
   * Accesses your billing profile object.
   */
  get(t) {
    return this._client.get("/user/billing/profile", t)._thenUnwrap((e) => e.result);
  }
}
Wo || (Wo = {});
class Ko extends o {
  constructor() {
    super(...arguments), this.history = new Go(this._client), this.profile = new Wo(this._client);
  }
}
(function(s) {
  s.History = Go, s.BillingHistoriesV4PagePaginationArray = c_, s.Profile = Wo;
})(Ko || (Ko = {}));
class Jo extends o {
  /**
   * Find all available permission groups for API Tokens
   */
  list(t) {
    return this._client.getAPIList("/user/tokens/permission_groups", o_, t);
  }
}
class o_ extends w {
}
(function(s) {
  s.PermissionGroupListResponsesSinglePage = o_;
})(Jo || (Jo = {}));
class Qo extends o {
  /**
   * Roll the token secret.
   */
  update(t, e, n) {
    return this._client.put(`/user/tokens/${t}/value`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
}
Qo || (Qo = {});
class Xo extends o {
  constructor() {
    super(...arguments), this.permissionGroups = new Jo(this._client), this.value = new Qo(this._client);
  }
  /**
   * Create a new access token.
   */
  create(t, e) {
    return this._client.post("/user/tokens", { body: t, ...e })._thenUnwrap((n) => n.result);
  }
  /**
   * Update an existing token.
   */
  update(t, e, n) {
    return this._client.put(`/user/tokens/${t}`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/user/tokens", a_, {
      query: t,
      ...e
    });
  }
  /**
   * Destroy a token.
   */
  delete(t, e) {
    return this._client.delete(`/user/tokens/${t}`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get information about a specific token.
   */
  get(t, e) {
    return this._client.get(`/user/tokens/${t}`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Test whether a token works.
   */
  verify(t) {
    return this._client.get("/user/tokens/verify", t)._thenUnwrap((e) => e.result);
  }
}
class a_ extends A {
}
(function(s) {
  s.TokenListResponsesV4PagePaginationArray = a_, s.PermissionGroups = Jo, s.PermissionGroupListResponsesSinglePage = o_, s.ValueResource = Qo;
})(Xo || (Xo = {}));
class qo extends o {
  constructor() {
    super(...arguments), this.auditLogs = new Yo(this._client), this.billing = new Ko(this._client), this.invites = new Ho(this._client), this.organizations = new jo(this._client), this.subscriptions = new Fo(this._client), this.tokens = new Xo(this._client);
  }
  /**
   * Edit part of your user details.
   */
  edit(t, e) {
    return this._client.patch("/user", { body: t, ...e })._thenUnwrap((n) => n.result);
  }
  /**
   * User Details
   */
  get(t) {
    return this._client.get("/user", t)._thenUnwrap((e) => e.result);
  }
}
(function(s) {
  s.AuditLogs = Yo, s.Billing = Ko, s.Invites = Ho, s.InvitesSinglePage = r_, s.Organizations = jo, s.OrganizationsV4PagePaginationArray = i_, s.Subscriptions = Fo, s.Tokens = Xo, s.TokenListResponsesV4PagePaginationArray = a_;
})(qo || (qo = {}));
class ta extends o {
  /**
   * Creates and returns a new Vectorize Index.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/vectorize/indexes`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates and returns the specified Vectorize Index.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/vectorize/indexes/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns a list of Vectorize Indexes
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/vectorize/indexes`, u_, e);
  }
  /**
   * Deletes the specified Vectorize Index.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/vectorize/indexes/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Delete a set of vectors from an index by their vector identifiers.
   */
  deleteByIds(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/vectorize/indexes/${t}/delete-by-ids`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the specified Vectorize Index.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/vectorize/indexes/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get a set of vectors from an index by their vector identifiers.
   */
  getByIds(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/vectorize/indexes/${t}/get-by-ids`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Inserts vectors into the specified index and returns the count of the vectors
   * successfully inserted.
   */
  insert(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.post(`/accounts/${r}/vectorize/indexes/${t}/insert`, {
      body: i,
      ...n,
      headers: { "Content-Type": "application/x-ndjson", ...n == null ? void 0 : n.headers },
      __binaryRequest: !0
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Finds vectors closest to a given vector in an index.
   */
  query(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/vectorize/indexes/${t}/query`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Upserts vectors into the specified index, creating them if they do not exist and
   * returns the count of values and ids successfully inserted.
   */
  upsert(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.post(`/accounts/${r}/vectorize/indexes/${t}/upsert`, {
      body: i,
      ...n,
      headers: { "Content-Type": "application/x-ndjson", ...n == null ? void 0 : n.headers },
      __binaryRequest: !0
    })._thenUnwrap((c) => c.result);
  }
}
class u_ extends w {
}
(function(s) {
  s.CreateIndicesSinglePage = u_;
})(ta || (ta = {}));
class ea extends o {
  constructor() {
    super(...arguments), this.indexes = new ta(this._client);
  }
}
(function(s) {
  s.Indexes = ta, s.CreateIndicesSinglePage = u_;
})(ea || (ea = {}));
class rf extends o {
  /**
   * Creates a new Warp Connector Tunnel in an account.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/warp_connector`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters Warp Connector Tunnels in an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/warp_connector`, Xw, { query: r, ...e });
  }
  /**
   * Deletes a Warp Connector Tunnel from an account.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/warp_connector/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Warp Connector Tunnel.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/warp_connector/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Warp Connector Tunnel.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/warp_connector/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the token used to associate warp device with a specific Warp Connector
   * tunnel.
   */
  token(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/warp_connector/${t}/token`, n)._thenUnwrap((i) => i.result);
  }
}
class Xw extends A {
}
class na extends o {
  /**
   * Creates a waiting room page preview. Upload a custom waiting room page for
   * preview. You will receive a preview URL in the form
   * `http://waitingrooms.dev/preview/<uuid>`. You can use the following query
   * parameters to change the state of the preview:
   *
   * 1. `force_queue`: Boolean indicating if all users will be queued in the waiting
   *    room and no one will be let into the origin website (also known as queueAll).
   * 2. `queue_is_full`: Boolean indicating if the waiting room's queue is currently
   *    full and not accepting new users at the moment.
   * 3. `queueing_method`: The queueing method currently used by the waiting room.
   *    - **fifo** indicates a FIFO queue.
   *    - **random** indicates a Random queue.
   *    - **passthrough** indicates a Passthrough queue. Keep in mind that the
   *      waiting room page will only be displayed if `force_queue=true` or
   *      `event=prequeueing` — for other cases the request will pass through to the
   *      origin. For our preview, this will be a fake origin website returning
   *      "Welcome".
   *    - **reject** indicates a Reject queue.
   * 4. `event`: Used to preview a waiting room event.
   *    - **none** indicates no event is occurring.
   *    - **prequeueing** indicates that an event is prequeueing (between
   *      `prequeue_start_time` and `event_start_time`).
   *    - **started** indicates that an event has started (between `event_start_time`
   *      and `event_end_time`).
   * 5. `shuffle_at_event_start`: Boolean indicating if the event will shuffle users
   *    in the prequeue when it starts. This can only be set to **true** if an event
   *    is active (`event` is not **none**).
   *
   * For example, you can make a request to
   * `http://waitingrooms.dev/preview/<uuid>?force_queue=false&queue_is_full=false&queueing_method=random&event=started&shuffle_at_event_start=true` 6.
   * `waitTime`: Non-zero, positive integer indicating the estimated wait time in
   * minutes. The default value is 10 minutes.
   *
   * For example, you can make a request to
   * `http://waitingrooms.dev/preview/<uuid>?waitTime=50` to configure the estimated
   * wait time as 50 minutes.
   */
  preview(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/waiting_rooms/preview`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
}
na || (na = {});
let sa = class extends o {
  /**
   * Only available for the Waiting Room Advanced subscription. Creates a rule for a
   * waiting room.
   */
  create(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.post(`/zones/${r}/waiting_rooms/${t}/rules`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Only available for the Waiting Room Advanced subscription. Replaces all rules
   * for a waiting room.
   */
  update(t, e, n) {
    const { zone_id: r, body: i } = e;
    return this._client.put(`/zones/${r}/waiting_rooms/${t}/rules`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists rules for a waiting room.
   */
  list(t, e, n) {
    const { zone_id: r } = e;
    return this._client.getAPIList(`/zones/${r}/waiting_rooms/${t}/rules`, l_, n);
  }
  /**
   * Deletes a rule for a waiting room.
   */
  delete(t, e, n, r) {
    const { zone_id: i } = n;
    return this._client.delete(`/zones/${i}/waiting_rooms/${t}/rules/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Patches a rule for a waiting room.
   */
  edit(t, e, n, r) {
    const { zone_id: i, ...c } = n;
    return this._client.patch(`/zones/${i}/waiting_rooms/${t}/rules/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
};
class l_ extends w {
}
(function(s) {
  s.WaitingRoomRulesSinglePage = l_;
})(sa || (sa = {}));
let ra = class extends o {
  /**
   * Update zone-level Waiting Room settings
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/waiting_rooms/settings`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Patch zone-level Waiting Room settings
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}/waiting_rooms/settings`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get zone-level Waiting Room settings
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/waiting_rooms/settings`, e)._thenUnwrap((r) => r.result);
  }
};
ra || (ra = {});
class ia extends o {
  /**
   * Fetches the status of a configured waiting room. Response fields include:
   *
   * 1. `status`: String indicating the status of the waiting room. The possible
   *    status are:
   *    - **not_queueing** indicates that the configured thresholds have not been met
   *      and all users are going through to the origin.
   *    - **queueing** indicates that the thresholds have been met and some users are
   *      held in the waiting room.
   *    - **event_prequeueing** indicates that an event is active and is currently
   *      prequeueing users before it starts.
   * 2. `event_id`: String of the current event's `id` if an event is active,
   *    otherwise an empty string.
   * 3. `estimated_queued_users`: Integer of the estimated number of users currently
   *    waiting in the queue.
   * 4. `estimated_total_active_users`: Integer of the estimated number of users
   *    currently active on the origin.
   * 5. `max_estimated_time_minutes`: Integer of the maximum estimated time currently
   *    presented to the users.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/waiting_rooms/${t}/status`, n)._thenUnwrap((i) => i.result);
  }
}
ia || (ia = {});
class ca extends o {
  /**
   * Previews an event's configuration as if it was active. Inherited fields from the
   * waiting room will be displayed with their current values.
   */
  get(t, e, n, r) {
    const { zone_id: i } = n;
    return this._client.get(`/zones/${i}/waiting_rooms/${t}/events/${e}/details`, r)._thenUnwrap((c) => c.result);
  }
}
ca || (ca = {});
class oa extends o {
  constructor() {
    super(...arguments), this.details = new ca(this._client);
  }
  /**
   * Only available for the Waiting Room Advanced subscription. Creates an event for
   * a waiting room. An event takes place during a specified period of time,
   * temporarily changing the behavior of a waiting room. While the event is active,
   * some of the properties in the event's configuration may either override or
   * inherit from the waiting room's configuration. Note that events cannot overlap
   * with each other, so only one event can be active at a time.
   */
  create(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.post(`/zones/${r}/waiting_rooms/${t}/events`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a configured event for a waiting room.
   */
  update(t, e, n, r) {
    const { zone_id: i, ...c } = n;
    return this._client.put(`/zones/${i}/waiting_rooms/${t}/events/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists events for a waiting room.
   */
  list(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.getAPIList(`/zones/${r}/waiting_rooms/${t}/events`, d_, { query: i, ...n });
  }
  /**
   * Deletes an event for a waiting room.
   */
  delete(t, e, n, r) {
    const { zone_id: i } = n;
    return this._client.delete(`/zones/${i}/waiting_rooms/${t}/events/${e}`, r)._thenUnwrap((c) => c.result);
  }
  /**
   * Patches a configured event for a waiting room.
   */
  edit(t, e, n, r) {
    const { zone_id: i, ...c } = n;
    return this._client.patch(`/zones/${i}/waiting_rooms/${t}/events/${e}`, {
      body: c,
      ...r
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetches a single configured event for a waiting room.
   */
  get(t, e, n, r) {
    const { zone_id: i } = n;
    return this._client.get(`/zones/${i}/waiting_rooms/${t}/events/${e}`, r)._thenUnwrap((c) => c.result);
  }
}
class d_ extends w {
}
(function(s) {
  s.EventsSinglePage = d_, s.Details = ca;
})(oa || (oa = {}));
class aa extends o {
  constructor() {
    super(...arguments), this.page = new na(this._client), this.events = new oa(this._client), this.rules = new sa(this._client), this.statuses = new ia(this._client), this.settings = new ra(this._client);
  }
  /**
   * Creates a new waiting room.
   */
  create(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.post(`/zones/${n}/waiting_rooms`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured waiting room.
   */
  update(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.put(`/zones/${r}/waiting_rooms/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists waiting rooms.
   */
  list(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.getAPIList(`/zones/${n}/waiting_rooms`, qw, {
      query: r,
      ...e
    });
  }
  /**
   * Deletes a waiting room.
   */
  delete(t, e, n) {
    const { zone_id: r } = e;
    return this._client.delete(`/zones/${r}/waiting_rooms/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Patches a configured waiting room.
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/waiting_rooms/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single configured waiting room.
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/waiting_rooms/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class qw extends w {
}
(function(s) {
  s.Page = na, s.Events = oa, s.EventsSinglePage = d_, s.Rules = sa, s.WaitingRoomRulesSinglePage = l_, s.Statuses = ia, s.Settings = ra;
})(aa || (aa = {}));
class ua extends o {
  /**
   * Create IPFS Universal Path Gateway Content List Entry
   */
  create(t, e, n, r) {
    return this._client.post(`/zones/${t}/web3/hostnames/${e}/ipfs_universal_path/content_list/entries`, { body: n, ...r })._thenUnwrap((i) => i.result);
  }
  /**
   * Edit IPFS Universal Path Gateway Content List Entry
   */
  update(t, e, n, r, i) {
    return this._client.put(`/zones/${t}/web3/hostnames/${e}/ipfs_universal_path/content_list/entries/${n}`, { body: r, ...i })._thenUnwrap((c) => c.result);
  }
  /**
   * List IPFS Universal Path Gateway Content List Entries
   */
  list(t, e, n) {
    return this._client.get(`/zones/${t}/web3/hostnames/${e}/ipfs_universal_path/content_list/entries`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Delete IPFS Universal Path Gateway Content List Entry
   */
  delete(t, e, n, r) {
    return this._client.delete(`/zones/${t}/web3/hostnames/${e}/ipfs_universal_path/content_list/entries/${n}`, r)._thenUnwrap((i) => i.result);
  }
  /**
   * IPFS Universal Path Gateway Content List Entry Details
   */
  get(t, e, n, r) {
    return this._client.get(`/zones/${t}/web3/hostnames/${e}/ipfs_universal_path/content_list/entries/${n}`, r)._thenUnwrap((i) => i.result);
  }
}
ua || (ua = {});
class la extends o {
  constructor() {
    super(...arguments), this.entries = new ua(this._client);
  }
  /**
   * Update IPFS Universal Path Gateway Content List
   */
  update(t, e, n, r) {
    return this._client.put(`/zones/${t}/web3/hostnames/${e}/ipfs_universal_path/content_list`, { body: n, ...r })._thenUnwrap((i) => i.result);
  }
  /**
   * IPFS Universal Path Gateway Content List Details
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/web3/hostnames/${e}/ipfs_universal_path/content_list`, n)._thenUnwrap((r) => r.result);
  }
}
(function(s) {
  s.Entries = ua;
})(la || (la = {}));
class da extends o {
  constructor() {
    super(...arguments), this.contentLists = new la(this._client);
  }
}
(function(s) {
  s.ContentLists = la;
})(da || (da = {}));
class ha extends o {
  constructor() {
    super(...arguments), this.ipfsUniversalPaths = new da(this._client);
  }
  /**
   * Create Web3 Hostname
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/web3/hostnames`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  /**
   * List Web3 Hostnames
   */
  list(t, e) {
    return this._client.getAPIList(`/zones/${t}/web3/hostnames`, h_, e);
  }
  /**
   * Delete Web3 Hostname
   */
  delete(t, e, n) {
    return this._client.delete(`/zones/${t}/web3/hostnames/${e}`, n)._thenUnwrap((r) => r.result);
  }
  /**
   * Edit Web3 Hostname
   */
  edit(t, e, n, r) {
    return this._client.patch(`/zones/${t}/web3/hostnames/${e}`, {
      body: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Web3 Hostname Details
   */
  get(t, e, n) {
    return this._client.get(`/zones/${t}/web3/hostnames/${e}`, n)._thenUnwrap((r) => r.result);
  }
}
class h_ extends w {
}
(function(s) {
  s.HostnamesSinglePage = h_, s.IPFSUniversalPaths = da;
})(ha || (ha = {}));
class _a extends o {
  constructor() {
    super(...arguments), this.hostnames = new ha(this._client);
  }
}
(function(s) {
  s.Hostnames = ha, s.HostnamesSinglePage = h_;
})(_a || (_a = {}));
class pa extends o {
  /**
   * Creates Worker account settings for an account.
   */
  update(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.put(`/accounts/${n}/workers/account-settings`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches Worker account settings for an account.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/account-settings`, e)._thenUnwrap((r) => r.result);
  }
}
pa || (pa = {});
class ga extends o {
  /**
   * Attaches a Worker to a zone and hostname.
   */
  update(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}/workers/domains`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all Worker Domains for an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/workers/domains`, __, {
      query: r,
      ...e
    });
  }
  /**
   * Detaches a Worker from a zone and hostname.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/workers/domains/${t}`, {
      ...n,
      headers: { Accept: "*/*", ...n == null ? void 0 : n.headers }
    });
  }
  /**
   * Gets a Worker domain.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/workers/domains/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class __ extends w {
}
(function(s) {
  s.DomainsSinglePage = __;
})(ga || (ga = {}));
class fa extends o {
  /**
   * Creates a Workers subdomain for an account.
   */
  update(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.put(`/accounts/${n}/workers/subdomain`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns a Workers subdomain for an account.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/workers/subdomain`, e)._thenUnwrap((r) => r.result);
  }
}
fa || (fa = {});
class wa extends o {
  /**
   * Get Model Schema
   */
  get(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/ai/models/schema`, { query: r, ...e })._thenUnwrap((i) => i.result);
  }
}
wa || (wa = {});
class ma extends o {
  constructor() {
    super(...arguments), this.schema = new wa(this._client);
  }
}
(function(s) {
  s.Schema = wa;
})(ma || (ma = {}));
class $a extends o {
  constructor() {
    super(...arguments), this.models = new ma(this._client);
  }
  /**
   * This endpoint provides users with the capability to run specific AI models
   * on-demand.
   *
   * By submitting the required input data, users can receive real-time predictions
   * or results generated by the chosen AI model. The endpoint supports various AI
   * model types, ensuring flexibility and adaptability for diverse use cases.
   *
   * Model specific inputs available in
   * [Cloudflare Docs](https://developers.cloudflare.com/workers-ai/models/).
   */
  run(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/ai/run/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
(function(s) {
  s.Models = ma;
})($a || ($a = {}));
let ya = class extends o {
  /**
   * Put script content without touching config or metadata
   */
  update(t, e, n) {
    const { account_id: r, "CF-WORKER-BODY-PART": i, "CF-WORKER-MAIN-MODULE-PART": c, ...a } = e;
    return this._client.put(`/accounts/${r}/workers/scripts/${t}/content`, tt({
      body: a,
      ...n,
      headers: {
        ...i != null ? { "CF-WORKER-BODY-PART": i } : void 0,
        ...c != null ? { "CF-WORKER-MAIN-MODULE-PART": c } : void 0,
        ...n == null ? void 0 : n.headers
      }
    }))._thenUnwrap((l) => l.result);
  }
  /**
   * Fetch script content only
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/workers/scripts/${t}/content/v2`, {
      ...n,
      __binaryResponse: !0
    });
  }
};
ya || (ya = {});
class ba extends o {
  /**
   * Deployments configure how
   * [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions)
   * are deployed to traffic. A deployment can consist of one or two versions of a
   * Worker.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/workers/scripts/${t}/deployments`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List of Worker Deployments. The first deployment in the list is the latest
   * deployment actively serving traffic.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/workers/scripts/${t}/deployments`, n)._thenUnwrap((i) => i.result);
  }
}
ba || (ba = {});
class Pa extends o {
  /**
   * Updates Cron Triggers for a Worker.
   */
  update(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.put(`/accounts/${r}/workers/scripts/${t}/schedules`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Cron Triggers for a Worker.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/workers/scripts/${t}/schedules`, n)._thenUnwrap((i) => i.result);
  }
}
Pa || (Pa = {});
let va = class extends o {
  /**
   * Patch script-level settings when using
   * [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions).
   * Includes Logpush and Tail Consumers.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/workers/scripts/${t}/script-settings`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get script-level settings when using
   * [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions).
   * Includes Logpush and Tail Consumers.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/workers/scripts/${t}/script-settings`, n)._thenUnwrap((i) => i.result);
  }
};
va || (va = {});
class Ua extends o {
  /**
   * Starts a tail that receives logs and exception from a Worker.
   */
  create(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.post(`/accounts/${r}/workers/scripts/${t}/tails`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a tail from a Worker.
   */
  delete(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.delete(`/accounts/${i}/workers/scripts/${t}/tails/${e}`, r);
  }
  /**
   * Get list of tails currently deployed on a Worker.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/workers/scripts/${t}/tails`, n)._thenUnwrap((i) => i.result);
  }
}
Ua || (Ua = {});
class xa extends o {
  /**
   * Upload a Worker Version without deploying to Cloudflare's network.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/workers/scripts/${t}/versions`, tt({ body: i, ...n }))._thenUnwrap((c) => c.result);
  }
  /**
   * List of Worker Versions. The first version in the list is the latest version.
   */
  list(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.getAPIList(`/accounts/${r}/workers/scripts/${t}/versions`, p_, { query: i, ...n });
  }
  /**
   * Get Version Detail
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/workers/scripts/${t}/versions/${e}`, r)._thenUnwrap((c) => c.result);
  }
}
class p_ extends mt {
}
(function(s) {
  s.VersionListResponsesV4PagePagination = p_;
})(xa || (xa = {}));
let Sa = class extends o {
  constructor() {
    super(...arguments), this.schedules = new Pa(this._client), this.tail = new Ua(this._client), this.content = new ya(this._client), this.settings = new va(this._client), this.deployments = new ba(this._client), this.versions = new xa(this._client);
  }
  /**
   * Upload a worker module.
   */
  update(t, e, n) {
    const { account_id: r, rollback_to: i, ...c } = e;
    return this._client.put(`/accounts/${r}/workers/scripts/${t}`, mg({
      query: { rollback_to: i },
      body: c,
      ...n,
      headers: { "Content-Type": "application/javascript", ...n == null ? void 0 : n.headers }
    }))._thenUnwrap((a) => a.result);
  }
  /**
   * Fetch a list of uploaded workers.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/workers/scripts`, g_, e);
  }
  /**
   * Delete your worker. This call has no response body on a successful delete.
   */
  delete(t, e, n) {
    const { account_id: r, force: i } = e;
    return this._client.delete(`/accounts/${r}/workers/scripts/${t}`, {
      query: { force: i },
      ...n,
      headers: { Accept: "*/*", ...n == null ? void 0 : n.headers }
    });
  }
  /**
   * Fetch raw script content for your worker. Note this is the original script
   * content, not JSON encoded.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/workers/scripts/${t}`, {
      ...n,
      __binaryResponse: !0
    });
  }
};
class g_ extends w {
}
(function(s) {
  s.ScriptsSinglePage = g_, s.Schedules = Pa, s.Tail = Ua, s.Content = ya, s.Settings = va, s.Deployments = ba, s.Versions = xa, s.VersionListResponsesV4PagePagination = p_;
})(Sa || (Sa = {}));
class za extends o {
  constructor() {
    super(...arguments), this.ai = new $a(this._client), this.scripts = new Sa(this._client), this.accountSettings = new pa(this._client), this.domains = new ga(this._client), this.subdomains = new fa(this._client);
  }
}
(function(s) {
  s.AI = $a, s.Scripts = Sa, s.ScriptsSinglePage = g_, s.AccountSettings = pa, s.Domains = ga, s.DomainsSinglePage = __, s.Subdomains = fa;
})(za || (za = {}));
class Oa extends o {
  /**
   * Fetch script bindings from a script uploaded to a Workers for Platforms
   * namespace.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/bindings`, r)._thenUnwrap((c) => c.result);
  }
}
Oa || (Oa = {});
class Aa extends o {
  /**
   * Put script content for a script uploaded to a Workers for Platforms namespace.
   */
  update(t, e, n, r) {
    const { account_id: i, "CF-WORKER-BODY-PART": c, "CF-WORKER-MAIN-MODULE-PART": a, ...l } = n;
    return this._client.put(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/content`, tt({
      body: l,
      ...r,
      headers: {
        ...c != null ? { "CF-WORKER-BODY-PART": c } : void 0,
        ...a != null ? { "CF-WORKER-MAIN-MODULE-PART": a } : void 0,
        ...r == null ? void 0 : r.headers
      }
    }))._thenUnwrap((p) => p.result);
  }
  /**
   * Fetch script content from a script uploaded to a Workers for Platforms
   * namespace.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/content`, { ...r, __binaryResponse: !0 });
  }
}
Aa || (Aa = {});
class Ra extends o {
  /**
   * Put secrets to a script uploaded to a Workers for Platforms namespace.
   */
  update(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.put(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/secrets`, { body: c, ...r })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetch secrets from a script uploaded to a Workers for Platforms namespace.
   */
  list(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.getAPIList(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/secrets`, f_, r);
  }
}
class f_ extends w {
}
(function(s) {
  s.SecretListResponsesSinglePage = f_;
})(Ra || (Ra = {}));
let Ia = class extends o {
  /**
   * Patch script metadata, such as bindings
   */
  edit(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.patch(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/settings`, tt({ body: c, ...r }))._thenUnwrap((a) => a.result);
  }
  /**
   * Get script settings from a script uploaded to a Workers for Platforms namespace.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/settings`, r)._thenUnwrap((c) => c.result);
  }
};
Ia || (Ia = {});
let ka = class extends o {
  /**
   * Put script tags for a script uploaded to a Workers for Platforms namespace.
   */
  update(t, e, n, r) {
    const { account_id: i, body: c } = n;
    return this._client.put(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/tags`, { body: c, ...r })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetch tags from a script uploaded to a Workers for Platforms namespace.
   */
  list(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.getAPIList(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/tags`, w_, r);
  }
  /**
   * Delete script tag for a script uploaded to a Workers for Platforms namespace.
   */
  delete(t, e, n, r, i) {
    const { account_id: c } = r;
    return this._client.delete(`/accounts/${c}/workers/dispatch/namespaces/${t}/scripts/${e}/tags/${n}`, i)._thenUnwrap((a) => a.result);
  }
};
class w_ extends w {
}
(function(s) {
  s.TagListResponsesSinglePage = w_;
})(ka || (ka = {}));
class La extends o {
  constructor() {
    super(...arguments), this.content = new Aa(this._client), this.settings = new Ia(this._client), this.bindings = new Oa(this._client), this.secrets = new Ra(this._client), this.tags = new ka(this._client);
  }
  /**
   * Upload a worker module to a Workers for Platforms namespace. You can find an
   * example of the metadata on our docs:
   * https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/metadata/
   */
  update(t, e, n, r) {
    const { account_id: i, ...c } = n;
    return this._client.put(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}`, mg({
      body: c,
      ...r,
      headers: { "Content-Type": "application/javascript", ...r == null ? void 0 : r.headers }
    }))._thenUnwrap((a) => a.result);
  }
  /**
   * Delete a worker from a Workers for Platforms namespace. This call has no
   * response body on a successful delete.
   */
  delete(t, e, n, r) {
    const { account_id: i, force: c } = n;
    return this._client.delete(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}`, { query: { force: c }, ...r, headers: { Accept: "*/*", ...r == null ? void 0 : r.headers } });
  }
  /**
   * Fetch information about a script uploaded to a Workers for Platforms namespace.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}`, r)._thenUnwrap((c) => c.result);
  }
}
(function(s) {
  s.Content = Aa, s.Settings = Ia, s.Bindings = Oa, s.Secrets = Ra, s.SecretListResponsesSinglePage = f_, s.Tags = ka, s.TagListResponsesSinglePage = w_;
})(La || (La = {}));
class Za extends o {
  constructor() {
    super(...arguments), this.scripts = new La(this._client);
  }
  /**
   * Create a new Workers for Platforms namespace.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/workers/dispatch/namespaces`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a list of Workers for Platforms namespaces.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/workers/dispatch/namespaces`, m_, e);
  }
  /**
   * Delete a Workers for Platforms namespace.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/workers/dispatch/namespaces/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get a Workers for Platforms namespace.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/workers/dispatch/namespaces/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class m_ extends w {
}
(function(s) {
  s.NamespaceListResponsesSinglePage = m_, s.Scripts = La;
})(Za || (Za = {}));
class Ta extends o {
  constructor() {
    super(...arguments), this.namespaces = new Za(this._client);
  }
}
(function(s) {
  s.Namespaces = Za, s.NamespaceListResponsesSinglePage = m_;
})(Ta || (Ta = {}));
class Ca extends o {
  constructor() {
    super(...arguments), this.dispatch = new Ta(this._client);
  }
}
(function(s) {
  s.Dispatch = Ta;
})(Ca || (Ca = {}));
class Ea extends o {
  /**
   * Updates the Zero Trust Connectivity Settings for the given account.
   */
  edit(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.patch(`/accounts/${n}/zerotrust/connectivity_settings`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the Zero Trust Connectivity Settings for the given account.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/zerotrust/connectivity_settings`, e)._thenUnwrap((r) => r.result);
  }
}
Ea || (Ea = {});
class Va extends o {
  /**
   * Adds a new identity provider to Access.
   */
  create(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/access/identity_providers`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured identity provider.
   */
  update(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/identity_providers/${t}`, { body: c, ...n })._thenUnwrap((p) => p.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.getAPIList(`/${i}/${c}/access/identity_providers`, $_, e);
  }
  delete(t, e = {}, n) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/identity_providers/${t}`, n)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/identity_providers/${t}`, n)._thenUnwrap((l) => l.result);
  }
}
class $_ extends w {
}
(function(s) {
  s.IdentityProviderListResponsesSinglePage = $_;
})(Va || (Va = {}));
class Da extends o {
  /**
   * Sets up a Zero Trust organization for your account or zone.
   */
  create(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/access/organizations`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates the configuration for your Zero Trust organization.
   */
  update(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.put(`/${c}/${a}/access/organizations`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.get(`/${i}/${c}/access/organizations`, e)._thenUnwrap((a) => a.result);
  }
  /**
   * Revokes a user's access across all applications.
   */
  revokeUsers(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/access/organizations/revoke_user`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
}
Da || (Da = {});
class Na extends o {
  /**
   * Removes a user from a Zero Trust seat when both `access_seat` and `gateway_seat`
   * are set to false.
   */
  edit(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.patch(`/accounts/${n}/access/seats`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
Na || (Na = {});
class Fa extends o {
  /**
   * Create a new Bookmark application.
   */
  create(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.post(`/accounts/${r}/access/bookmarks/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a configured Bookmark application.
   */
  update(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.put(`/accounts/${r}/access/bookmarks/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Bookmark applications.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/access/bookmarks`, y_, e);
  }
  /**
   * Deletes a Bookmark application.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/access/bookmarks/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Bookmark application.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/access/bookmarks/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class y_ extends w {
}
(function(s) {
  s.BookmarksSinglePage = y_;
})(Fa || (Fa = {}));
class Ma extends o {
  /**
   * Create a custom page
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/access/custom_pages`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a custom page
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/access/custom_pages/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List custom pages
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/access/custom_pages`, b_, e);
  }
  /**
   * Delete a custom page
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/access/custom_pages/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a custom page and also returns its HTML.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/access/custom_pages/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class b_ extends w {
}
(function(s) {
  s.CustomPageWithoutHTMLsSinglePage = b_;
})(Ma || (Ma = {}));
class Ba extends o {
  /**
   * Creates a new Access group.
   */
  create(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/access/groups`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured Access group.
   */
  update(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/groups/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((p) => p.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.getAPIList(`/${i}/${c}/access/groups`, P_, e);
  }
  delete(t, e = {}, n) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/groups/${t}`, n)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/groups/${t}`, n)._thenUnwrap((l) => l.result);
  }
}
class P_ extends w {
}
(function(s) {
  s.ZeroTrustGroupsSinglePage = P_;
})(Ba || (Ba = {}));
class Ya extends o {
  /**
   * Updates the Access key rotation settings for an account.
   */
  update(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}/access/keys`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the Access key rotation settings for an account.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/access/keys`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Perfoms a key rotation for an account.
   */
  rotate(t, e) {
    const { account_id: n } = t;
    return this._client.post(`/accounts/${n}/access/keys/rotate`, e)._thenUnwrap((r) => r.result);
  }
}
Ya || (Ya = {});
let Ha = class extends o {
  /**
   * Creates a new Access reusable policy.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/access/policies`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a Access reusable policy.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/access/policies/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Access reusable policies.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/access/policies`, v_, e);
  }
  /**
   * Deletes an Access reusable policy.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/access/policies/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Access reusable policy.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/access/policies/${t}`, n)._thenUnwrap((i) => i.result);
  }
}, v_ = class extends w {
};
(function(s) {
  s.PolicyListResponsesSinglePage = v_;
})(Ha || (Ha = {}));
class ja extends o {
  /**
   * Generates a new service token. **Note:** This is the only time you can get the
   * Client Secret. If you lose the Client Secret, you will have to rotate the Client
   * Secret or create a new service token.
   */
  create(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/access/service_tokens`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured service token.
   */
  update(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/service_tokens/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((p) => p.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.getAPIList(`/${i}/${c}/access/service_tokens`, U_, e);
  }
  delete(t, e = {}, n) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/service_tokens/${t}`, n)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/service_tokens/${t}`, n)._thenUnwrap((l) => l.result);
  }
  /**
   * Refreshes the expiration of a service token.
   */
  refresh(t, e, n) {
    const { account_id: r } = e;
    return this._client.post(`/accounts/${r}/access/service_tokens/${t}/refresh`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Generates a new Client Secret for a service token and revokes the old one.
   */
  rotate(t, e, n) {
    const { account_id: r } = e;
    return this._client.post(`/accounts/${r}/access/service_tokens/${t}/rotate`, n)._thenUnwrap((i) => i.result);
  }
}
class U_ extends w {
}
(function(s) {
  s.ServiceTokensSinglePage = U_;
})(ja || (ja = {}));
class Ga extends o {
  /**
   * Create a tag
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/access/tags`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a tag
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/access/tags/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List tags
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/access/tags`, x_, e);
  }
  /**
   * Delete a tag
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/access/tags/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get a tag
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/access/tags/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class x_ extends w {
}
(function(s) {
  s.TagsSinglePage = x_;
})(Ga || (Ga = {}));
class Wa extends o {
  create(t, e = {}, n) {
    if (u(e))
      return this.create(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${c}/${a}/access/apps/${t}/ca`, n)._thenUnwrap((l) => l.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.getAPIList(`/${i}/${c}/access/apps/ca`, S_, e);
  }
  delete(t, e = {}, n) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/apps/${t}/ca`, n)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/apps/${t}/ca`, n)._thenUnwrap((l) => l.result);
  }
}
class S_ extends w {
}
(function(s) {
  s.CAsSinglePage = S_;
})(Wa || (Wa = {}));
let Ka = class extends o {
  /**
   * Creates a policy applying exclusive to a single application that defines the
   * users or groups who can reach it. We recommend creating a reusable policy
   * instead and subsequently referencing its ID in the application's 'policies'
   * array.
   */
  create(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${a}/${l}/access/apps/${t}/policies`, {
      body: c,
      ...n
    })._thenUnwrap((p) => p.result);
  }
  /**
   * Updates an Access policy specific to an application. To update a reusable
   * policy, use the /account or zones/{account or zone_id}/policies/{uid} endpoint.
   */
  update(t, e, n, r) {
    const { account_id: i, zone_id: c, ...a } = n;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: l, accountOrZoneId: p } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.put(`/${l}/${p}/access/apps/${t}/policies/${e}`, {
      body: a,
      ...r
    })._thenUnwrap(($) => $.result);
  }
  list(t, e = {}, n) {
    if (u(e))
      return this.list(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${a}/access/apps/${t}/policies`, z_, n);
  }
  delete(t, e, n = {}, r) {
    if (u(n))
      return this.delete(t, e, {}, n);
    const { account_id: i, zone_id: c } = n;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.delete(`/${a}/${l}/access/apps/${t}/policies/${e}`, r)._thenUnwrap((p) => p.result);
  }
  get(t, e, n = {}, r) {
    if (u(n))
      return this.get(t, e, {}, n);
    const { account_id: i, zone_id: c } = n;
    if (!i && !c)
      throw new d("You must provide either account_id or zone_id.");
    if (i && c)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.get(`/${a}/${l}/access/apps/${t}/policies/${e}`, r)._thenUnwrap((p) => p.result);
  }
};
class z_ extends w {
}
(function(s) {
  s.PolicyListResponsesSinglePage = z_;
})(Ka || (Ka = {}));
class Ja extends o {
  list(t, e = {}, n) {
    if (u(e))
      return this.list(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/apps/${t}/user_policy_checks`, n)._thenUnwrap((l) => l.result);
  }
}
Ja || (Ja = {});
class Qa extends o {
  constructor() {
    super(...arguments), this.cas = new Wa(this._client), this.userPolicyChecks = new Ja(this._client), this.policies = new Ka(this._client);
  }
  /**
   * Adds a new application to Access.
   */
  create(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/access/apps`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an Access application.
   */
  update(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/apps/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((p) => p.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.getAPIList(`/${i}/${c}/access/apps`, O_, e);
  }
  delete(t, e = {}, n) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/apps/${t}`, n)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/apps/${t}`, n)._thenUnwrap((l) => l.result);
  }
  revokeTokens(t, e = {}, n) {
    if (u(e))
      return this.revokeTokens(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${c}/${a}/access/apps/${t}/revoke_tokens`, n)._thenUnwrap((l) => l.result);
  }
}
class O_ extends w {
}
(function(s) {
  s.ApplicationListResponsesSinglePage = O_, s.CAs = Wa, s.CAsSinglePage = S_, s.UserPolicyChecks = Ja, s.Policies = Ka, s.PolicyListResponsesSinglePage = z_;
})(Qa || (Qa = {}));
let Xa = class extends o {
  /**
   * Updates an mTLS certificate's hostname settings.
   */
  update(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.put(`/${c}/${a}/access/certificates/settings`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  get(t = {}, e) {
    if (u(t))
      return this.get({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.get(`/${i}/${c}/access/certificates/settings`, e)._thenUnwrap((a) => a.result);
  }
};
Xa || (Xa = {});
let qa = class extends o {
  constructor() {
    super(...arguments), this.settings = new Xa(this._client);
  }
  /**
   * Adds a new mTLS root certificate to Access.
   */
  create(t, e) {
    const { account_id: n, zone_id: r, ...i } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.post(`/${c}/${a}/access/certificates`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured mTLS certificate.
   */
  update(t, e, n) {
    const { account_id: r, zone_id: i, ...c } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/certificates/${t}`, {
      body: c,
      ...n
    })._thenUnwrap((p) => p.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: n, zone_id: r } = t;
    if (!n && !r)
      throw new d("You must provide either account_id or zone_id.");
    if (n && r)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: r
    };
    return this._client.getAPIList(`/${i}/${c}/access/certificates`, A_, e);
  }
  delete(t, e = {}, n) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/certificates/${t}`, n)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, n) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: r, zone_id: i } = e;
    if (!r && !i)
      throw new d("You must provide either account_id or zone_id.");
    if (r && i)
      throw new d("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = r ? {
      accountOrZone: "accounts",
      accountOrZoneId: r
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/certificates/${t}`, n)._thenUnwrap((l) => l.result);
  }
};
class A_ extends w {
}
(function(s) {
  s.CertificatesSinglePage = A_, s.Settings = Xa;
})(qa || (qa = {}));
class Mt extends o {
  /**
   * Gets a list of Access authentication audit logs for an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/access/logs/access_requests`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.AccessRequests = Mt;
})(Mt || (Mt = {}));
class tu extends o {
  constructor() {
    super(...arguments), this.accessRequests = new Mt(this._client);
  }
}
(function(s) {
  s.AccessRequests = Mt;
})(tu || (tu = {}));
class eu extends o {
  /**
   * Get active sessions for a single user.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/access/users/${t}/active_sessions`, R_, n);
  }
  /**
   * Get an active session for a single user.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/access/users/${t}/active_sessions/${e}`, r)._thenUnwrap((c) => c.result);
  }
}
class R_ extends w {
}
(function(s) {
  s.ActiveSessionListResponsesSinglePage = R_;
})(eu || (eu = {}));
class nu extends o {
  /**
   * Get all failed login attempts for a single user.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/access/users/${t}/failed_logins`, I_, n);
  }
}
class I_ extends w {
}
(function(s) {
  s.FailedLoginListResponsesSinglePage = I_;
})(nu || (nu = {}));
class su extends o {
  /**
   * Get last seen identity for a single user.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/access/users/${t}/last_seen_identity`, n)._thenUnwrap((i) => i.result);
  }
}
su || (su = {});
class ru extends o {
  constructor() {
    super(...arguments), this.activeSessions = new eu(this._client), this.lastSeenIdentity = new su(this._client), this.failedLogins = new nu(this._client);
  }
  /**
   * Gets a list of users for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/access/users`, k_, e);
  }
}
class k_ extends w {
}
(function(s) {
  s.AccessUsersSinglePage = k_, s.ActiveSessions = eu, s.ActiveSessionListResponsesSinglePage = R_, s.LastSeenIdentity = su, s.FailedLogins = nu, s.FailedLoginListResponsesSinglePage = I_;
})(ru || (ru = {}));
class iu extends o {
  constructor() {
    super(...arguments), this.applications = new Qa(this._client), this.certificates = new qa(this._client), this.groups = new Ba(this._client), this.serviceTokens = new ja(this._client), this.bookmarks = new Fa(this._client), this.keys = new Ya(this._client), this.logs = new tu(this._client), this.users = new ru(this._client), this.customPages = new Ma(this._client), this.tags = new Ga(this._client), this.policies = new Ha(this._client);
  }
}
(function(s) {
  s.Applications = Qa, s.ApplicationListResponsesSinglePage = O_, s.Certificates = qa, s.CertificatesSinglePage = A_, s.Groups = Ba, s.ZeroTrustGroupsSinglePage = P_, s.ServiceTokens = ja, s.ServiceTokensSinglePage = U_, s.Bookmarks = Fa, s.BookmarksSinglePage = y_, s.Keys = Ya, s.Logs = tu, s.Users = ru, s.AccessUsersSinglePage = k_, s.CustomPages = Ma, s.CustomPageWithoutHTMLsSinglePage = b_, s.Tags = Ga, s.TagsSinglePage = x_, s.Policies = Ha, s.PolicyListResponsesSinglePage = v_;
})(iu || (iu = {}));
class cu extends o {
  /**
   * Create a DEX test.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/devices/dex_tests`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a DEX test.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/devices/dex_tests/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch all DEX tests.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/dex_tests`, L_, e);
  }
  /**
   * Delete a Device DEX test. Returns the remaining device dex tests for the
   * account.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/devices/dex_tests/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a single DEX test.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/devices/dex_tests/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class L_ extends w {
}
(function(s) {
  s.SchemaHTTPSSinglePage = L_;
})(cu || (cu = {}));
let ou = class extends o {
  /**
   * Creates a new device managed network.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/devices/networks`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured device managed network.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/devices/networks/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a list of managed networks for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/networks`, Z_, e);
  }
  /**
   * Deletes a device managed network and fetches a list of the remaining device
   * managed networks for an account.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/devices/networks/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches details for a single managed network.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/devices/networks/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class Z_ extends w {
}
(function(s) {
  s.DeviceNetworksSinglePage = Z_;
})(ou || (ou = {}));
class au extends o {
  /**
   * Fetches a one-time use admin override code for a device. This relies on the
   * **Admin Override** setting being enabled in your device configuration.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/devices/${t}/override_codes`, n)._thenUnwrap((i) => i.result);
  }
}
au || (au = {});
class uu extends o {
  /**
   * Revokes a list of devices.
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/devices/revoke`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
uu || (uu = {});
let lu = class extends o {
  /**
   * Updates the current device settings for a Zero Trust account.
   */
  update(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}/devices/settings`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Describes the current device settings for a Zero Trust account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/devices/settings`, e)._thenUnwrap((r) => r.result);
  }
};
lu || (lu = {});
class du extends o {
  /**
   * Unrevokes a list of devices.
   */
  create(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.post(`/accounts/${n}/devices/unrevoke`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
du || (du = {});
class hu extends o {
  /**
   * Fetches the default device settings profile for an account.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/devices/policy`, e)._thenUnwrap((r) => r.result);
  }
}
hu || (hu = {});
class _u extends o {
  /**
   * Sets the list of routes excluded from the WARP client's tunnel.
   */
  update(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.put(`/accounts/${n}/devices/policy/exclude`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the list of routes excluded from the WARP client's tunnel.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/exclude`, T_, e);
  }
  /**
   * Fetches the list of routes excluded from the WARP client's tunnel for a specific
   * device settings profile.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/devices/policy/${t}/exclude`, n)._thenUnwrap((i) => i.result);
  }
}
class T_ extends w {
}
(function(s) {
  s.SplitTunnelExcludesSinglePage = T_;
})(_u || (_u = {}));
class pu extends o {
  /**
   * Sets the list of domains to bypass Gateway DNS resolution. These domains will
   * use the specified local DNS resolver instead. This will only apply to the
   * specified device settings profile.
   */
  update(t, e, n) {
    const { account_id: r, body: i } = e;
    return this._client.put(`/accounts/${r}/devices/policy/${t}/fallback_domains`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a list of domains to bypass Gateway DNS resolution. These domains will
   * use the specified local DNS resolver instead.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/fallback_domains`, C_, e);
  }
  /**
   * Fetches the list of domains to bypass Gateway DNS resolution from a specified
   * device settings profile. These domains will use the specified local DNS resolver
   * instead.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/devices/policy/${t}/fallback_domains`, n)._thenUnwrap((i) => i.result);
  }
}
class C_ extends w {
}
(function(s) {
  s.FallbackDomainsSinglePage = C_;
})(pu || (pu = {}));
class gu extends o {
  /**
   * Sets the list of routes included in the WARP client's tunnel.
   */
  update(t, e) {
    const { account_id: n, body: r } = t;
    return this._client.put(`/accounts/${n}/devices/policy/include`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the list of routes included in the WARP client's tunnel.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/include`, E_, e);
  }
  /**
   * Fetches the list of routes included in the WARP client's tunnel for a specific
   * device settings profile.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/devices/policy/${t}/include`, n)._thenUnwrap((i) => i.result);
  }
}
class E_ extends w {
}
(function(s) {
  s.SplitTunnelIncludesSinglePage = E_;
})(gu || (gu = {}));
class fu extends o {
  constructor() {
    super(...arguments), this.defaultPolicy = new hu(this._client), this.excludes = new _u(this._client), this.fallbackDomains = new pu(this._client), this.includes = new gu(this._client);
  }
  /**
   * Creates a device settings profile to be applied to certain devices matching the
   * criteria.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/devices/policy`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a list of the device settings profiles for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/policies`, V_, e);
  }
  /**
   * Deletes a device settings profile and fetches a list of the remaining profiles
   * for an account.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/devices/policy/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured device settings profile.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/devices/policy/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a device settings profile by ID.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/devices/policy/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class V_ extends w {
}
(function(s) {
  s.SettingsPoliciesSinglePage = V_, s.DefaultPolicy = hu, s.Excludes = _u, s.SplitTunnelExcludesSinglePage = T_, s.FallbackDomains = pu, s.FallbackDomainsSinglePage = C_, s.Includes = gu, s.SplitTunnelIncludesSinglePage = E_;
})(fu || (fu = {}));
let wu = class extends o {
  /**
   * Create a new device posture integration.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/devices/posture/integration`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the list of device posture integrations for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/posture/integration`, D_, e);
  }
  /**
   * Delete a configured device posture integration.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/devices/posture/integration/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured device posture integration.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/devices/posture/integration/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches details for a single device posture integration.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/devices/posture/integration/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class D_ extends w {
}
(function(s) {
  s.IntegrationsSinglePage = D_;
})(wu || (wu = {}));
class mu extends o {
  constructor() {
    super(...arguments), this.integrations = new wu(this._client);
  }
  /**
   * Creates a new device posture rule.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/devices/posture`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a device posture rule.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/devices/posture/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches device posture rules for a Zero Trust account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices/posture`, N_, e);
  }
  /**
   * Deletes a device posture rule.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/devices/posture/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single device posture rule.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/devices/posture/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class N_ extends w {
}
(function(s) {
  s.DevicePostureRulesSinglePage = N_, s.Integrations = wu, s.IntegrationsSinglePage = D_;
})(mu || (mu = {}));
let $u = class extends o {
  constructor() {
    super(...arguments), this.dexTests = new cu(this._client), this.networks = new ou(this._client), this.policies = new fu(this._client), this.posture = new mu(this._client), this.revoke = new uu(this._client), this.settings = new lu(this._client), this.unrevoke = new du(this._client), this.overrideCodes = new au(this._client);
  }
  /**
   * Fetches a list of enrolled devices.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/devices`, F_, e);
  }
  /**
   * Fetches details for a single device.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/devices/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
class F_ extends w {
}
(function(s) {
  s.DevicesSinglePage = F_, s.DEXTests = cu, s.SchemaHTTPSSinglePage = L_, s.Networks = ou, s.DeviceNetworksSinglePage = Z_, s.Policies = fu, s.SettingsPoliciesSinglePage = V_, s.Posture = mu, s.DevicePostureRulesSinglePage = N_, s.Revoke = uu, s.Settings = lu, s.Unrevoke = du, s.OverrideCodes = au;
})($u || ($u = {}));
class yu extends o {
  /**
   * List Cloudflare colos that account's devices were connected to during a time
   * period, sorted by usage starting from the most used colo. Colos without traffic
   * are also returned and sorted alphabetically.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/dex/colos`, M_, {
      query: r,
      ...e
    });
  }
}
class M_ extends w {
}
(function(s) {
  s.ColoListResponsesSinglePage = M_;
})(yu || (yu = {}));
class bu extends o {
  /**
   * Get test details and aggregate performance metrics for an traceroute test for a
   * given time period between 1 hour and 7 days.
   */
  get(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.get(`/accounts/${r}/dex/traceroute-tests/${t}`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a breakdown of metrics by hop for individual traceroute test runs
   */
  networkPath(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.get(`/accounts/${r}/dex/traceroute-tests/${t}/network-path`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get percentiles for a traceroute test for a given time period between 1 hour and
   * 7 days.
   */
  percentiles(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.get(`/accounts/${r}/dex/traceroute-tests/${t}/percentiles`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
bu || (bu = {});
class Pu extends o {
  /**
   * List details for devices using WARP
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/dex/fleet-status/devices`, B_, { query: r, ...e });
  }
}
class B_ extends A {
}
(function(s) {
  s.DeviceListResponsesV4PagePaginationArray = B_;
})(Pu || (Pu = {}));
class vu extends o {
  constructor() {
    super(...arguments), this.devices = new Pu(this._client);
  }
  /**
   * List details for live (up to 60 minutes) devices using WARP
   */
  live(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/dex/fleet-status/live`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List details for devices using WARP, up to 7 days
   */
  overTime(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/dex/fleet-status/over-time`, {
      query: r,
      ...e,
      headers: { Accept: "*/*", ...e == null ? void 0 : e.headers }
    });
  }
}
(function(s) {
  s.Devices = Pu, s.DeviceListResponsesV4PagePaginationArray = B_;
})(vu || (vu = {}));
class Uu extends o {
  /**
   * Get percentiles for an http test for a given time period between 1 hour and 7
   * days.
   */
  get(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.get(`/accounts/${r}/dex/http-tests/${t}/percentiles`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
Uu || (Uu = {});
class xu extends o {
  constructor() {
    super(...arguments), this.percentiles = new Uu(this._client);
  }
  /**
   * Get test details and aggregate performance metrics for an http test for a given
   * time period between 1 hour and 7 days.
   */
  get(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.get(`/accounts/${r}/dex/http-tests/${t}`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
(function(s) {
  s.Percentiles = Uu;
})(xu || (xu = {}));
class Bt extends o {
  /**
   * Returns unique count of devices that have run synthetic application monitoring
   * tests in the past 7 days.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.get(`/accounts/${n}/dex/tests/unique-devices`, {
      query: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
(function(s) {
  s.UniqueDevices = Bt;
})(Bt || (Bt = {}));
class Yt extends o {
  constructor() {
    super(...arguments), this.uniqueDevices = new Bt(this._client);
  }
  /**
   * List DEX tests
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/dex/tests`, Y_, {
      query: r,
      ...e
    });
  }
}
class Y_ extends mt {
}
(function(s) {
  s.Tests = Yt, s.TestListResponsesV4PagePagination = Y_, s.UniqueDevices = Bt;
})(Yt || (Yt = {}));
class Su extends o {
  /**
   * Get a breakdown of hops and performance metrics for a specific traceroute test
   * run
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/dex/traceroute-test-results/${t}/network-path`, n)._thenUnwrap((i) => i.result);
  }
}
Su || (Su = {});
class zu extends o {
  constructor() {
    super(...arguments), this.networkPath = new Su(this._client);
  }
}
(function(s) {
  s.NetworkPath = Su;
})(zu || (zu = {}));
class Ou extends o {
  constructor() {
    super(...arguments), this.colos = new yu(this._client), this.fleetStatus = new vu(this._client), this.httpTests = new xu(this._client), this.tests = new Yt(this._client), this.tracerouteTestResults = new zu(this._client), this.tracerouteTests = new bu(this._client);
  }
}
(function(s) {
  s.Colos = yu, s.ColoListResponsesSinglePage = M_, s.FleetStatus = vu, s.HTTPTests = xu, s.Tests = Yt, s.TestListResponsesV4PagePagination = Y_, s.TracerouteTestResults = zu, s.TracerouteTests = bu;
})(Ou || (Ou = {}));
class Au extends o {
  /**
   * Validates whether this pattern is a valid regular expression. Rejects it if the
   * regular expression is too complex or can match an unbounded-length string. Your
   * regex will be rejected if it uses the Kleene Star -- be sure to bound the
   * maximum number of characters that can be matched.
   */
  validate(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/dlp/patterns/validate`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
Au || (Au = {});
class Ru extends o {
  /**
   * Updates the DLP payload log settings for this account.
   */
  update(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}/dlp/payload_log`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the current DLP payload log settings for this account.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/dlp/payload_log`, e)._thenUnwrap((r) => r.result);
  }
}
Ru || (Ru = {});
class Iu extends o {
  /**
   * Prepare to upload a new version of a dataset.
   */
  create(t, e, n) {
    const { account_id: r } = e;
    return this._client.post(`/accounts/${r}/dlp/datasets/${t}/upload`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Upload a new version of a dataset.
   */
  edit(t, e, n, r) {
    const { account_id: i, body: c } = n;
    return this._client.post(`/accounts/${i}/dlp/datasets/${t}/upload/${e}`, {
      body: c,
      ...r,
      headers: { "Content-Type": "application/octet-stream", ...r == null ? void 0 : r.headers },
      __binaryRequest: !0
    })._thenUnwrap((a) => a.result);
  }
}
Iu || (Iu = {});
class ku extends o {
  constructor() {
    super(...arguments), this.upload = new Iu(this._client);
  }
  /**
   * Create a new dataset.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/dlp/datasets`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update details about a dataset.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/dlp/datasets/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch all datasets with information about available versions.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/dlp/datasets`, H_, e);
  }
  /**
   * Delete a dataset.
   *
   * This deletes all versions of the dataset.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/dlp/datasets/${t}`, {
      ...n,
      headers: { Accept: "*/*", ...n == null ? void 0 : n.headers }
    });
  }
  /**
   * Fetch a specific dataset with information about available versions.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/dlp/datasets/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class H_ extends w {
}
(function(s) {
  s.DatasetsSinglePage = H_, s.Upload = Iu;
})(ku || (ku = {}));
class Lu extends o {
  /**
   * Creates a set of DLP custom profiles.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/dlp/profiles/custom`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a DLP custom profile.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/dlp/profiles/custom/${t}`, { body: i, ...n });
  }
  /**
   * Deletes a DLP custom profile.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/dlp/profiles/custom/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a custom DLP profile.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/dlp/profiles/custom/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
Lu || (Lu = {});
class Zu extends o {
  /**
   * Updates a DLP predefined profile. Only supports enabling/disabling entries.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/dlp/profiles/predefined/${t}`, {
      body: i,
      ...n
    });
  }
  /**
   * Fetches a predefined DLP profile.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/dlp/profiles/predefined/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
Zu || (Zu = {});
class Tu extends o {
  constructor() {
    super(...arguments), this.custom = new Lu(this._client), this.predefined = new Zu(this._client);
  }
  /**
   * Lists all DLP profiles in an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/dlp/profiles`, j_, e);
  }
  /**
   * Fetches a DLP profile by ID. Supports both predefined and custom profiles
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/dlp/profiles/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class j_ extends w {
}
(function(s) {
  s.ProfilesSinglePage = j_, s.Custom = Lu, s.Predefined = Zu;
})(Tu || (Tu = {}));
class Cu extends o {
  constructor() {
    super(...arguments), this.datasets = new ku(this._client), this.patterns = new Au(this._client), this.payloadLogs = new Ru(this._client), this.profiles = new Tu(this._client);
  }
}
(function(s) {
  s.Datasets = ku, s.DatasetsSinglePage = H_, s.Patterns = Au, s.PayloadLogs = Ru, s.Profiles = Tu, s.ProfilesSinglePage = j_;
})(Cu || (Cu = {}));
class Eu extends o {
  /**
   * Fetches all application and application type mappings.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/gateway/app_types`, G_, e);
  }
}
class G_ extends w {
}
(function(s) {
  s.AppTypesSinglePage = G_;
})(Eu || (Eu = {}));
class Vu extends o {
  /**
   * Updates Zero Trust Audit SSH settings.
   */
  update(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}/gateway/audit_ssh_settings`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get all Zero Trust Audit SSH settings for an account.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/gateway/audit_ssh_settings`, e)._thenUnwrap((r) => r.result);
  }
}
Vu || (Vu = {});
class Du extends o {
  /**
   * Fetches a list of all categories.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/gateway/categories`, W_, e);
  }
}
class W_ extends w {
}
(function(s) {
  s.CategoriesSinglePage = W_;
})(Du || (Du = {}));
class Nu extends o {
  /**
   * Creates a new Zero Trust certificate.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/gateway/certificates`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches all Zero Trust certificates for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/gateway/certificates`, K_, e);
  }
  /**
   * Deletes a gateway-managed Zero Trust certificate.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/gateway/certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Zero Trust certificate.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/gateway/certificates/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class K_ extends w {
}
(function(s) {
  s.CertificateListResponsesSinglePage = K_;
})(Nu || (Nu = {}));
let Fu = class extends o {
  /**
   * Updates the current Zero Trust account configuration.
   */
  update(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}/gateway/configuration`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Patches the current Zero Trust account configuration. This endpoint can update a
   * single subcollection of settings such as `antivirus`, `tls_decrypt`,
   * `activity_log`, `block_page`, `browser_isolation`, `fips`, `body_scanning`, or
   * `certificate`, without updating the entire configuration object. Returns an
   * error if any collection of settings is not properly configured.
   */
  edit(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.patch(`/accounts/${n}/gateway/configuration`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the current Zero Trust account configuration.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/gateway/configuration`, e)._thenUnwrap((r) => r.result);
  }
};
Fu || (Fu = {});
class Mu extends o {
  /**
   * Creates a new Zero Trust Gateway location.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/gateway/locations`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust Gateway location.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/gateway/locations/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Zero Trust Gateway locations for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/gateway/locations`, J_, e);
  }
  /**
   * Deletes a configured Zero Trust Gateway location.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/gateway/locations/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Zero Trust Gateway location.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/gateway/locations/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class J_ extends w {
}
(function(s) {
  s.LocationsSinglePage = J_;
})(Mu || (Mu = {}));
class Bu extends o {
  /**
   * Updates logging settings for the current Zero Trust account.
   */
  update(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.put(`/accounts/${n}/gateway/logging`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the current logging settings for Zero Trust account.
   */
  get(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/gateway/logging`, e)._thenUnwrap((r) => r.result);
  }
}
Bu || (Bu = {});
class Yu extends o {
  /**
   * Creates a new Zero Trust Gateway proxy endpoint.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/gateway/proxy_endpoints`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches all Zero Trust Gateway proxy endpoints for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/gateway/proxy_endpoints`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Deletes a configured Zero Trust Gateway proxy endpoint.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/gateway/proxy_endpoints/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust Gateway proxy endpoint.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/gateway/proxy_endpoints/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Zero Trust Gateway proxy endpoint.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/gateway/proxy_endpoints/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
Yu || (Yu = {});
class Hu extends o {
  /**
   * Creates a new Zero Trust Gateway rule.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/gateway/rules`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust Gateway rule.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/gateway/rules/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches the Zero Trust Gateway rules for an account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/gateway/rules`, Q_, e);
  }
  /**
   * Deletes a Zero Trust Gateway rule.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/gateway/rules/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Zero Trust Gateway rule.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/gateway/rules/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class Q_ extends w {
}
(function(s) {
  s.GatewayRulesSinglePage = Q_;
})(Hu || (Hu = {}));
class ju extends o {
  /**
   * Fetches all items in a single Zero Trust list.
   */
  list(t, e, n) {
    const { account_id: r } = e;
    return this._client.getAPIList(`/accounts/${r}/gateway/lists/${t}/items`, X_, n);
  }
}
class X_ extends w {
}
(function(s) {
  s.ItemListResponsesSinglePage = X_;
})(ju || (ju = {}));
class Gu extends o {
  constructor() {
    super(...arguments), this.items = new ju(this._client);
  }
  /**
   * Creates a new Zero Trust list.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/gateway/lists`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust list.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/gateway/lists/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches all Zero Trust lists for an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/gateway/lists`, q_, {
      query: r,
      ...e
    });
  }
  /**
   * Deletes a Zero Trust list.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/gateway/lists/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Appends or removes an item from a configured Zero Trust list.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/gateway/lists/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Zero Trust list.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/gateway/lists/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class q_ extends w {
}
(function(s) {
  s.GatewayListsSinglePage = q_, s.Items = ju, s.ItemListResponsesSinglePage = X_;
})(Gu || (Gu = {}));
class Wu extends o {
  constructor() {
    super(...arguments), this.auditSSHSettings = new Vu(this._client), this.categories = new Du(this._client), this.appTypes = new Eu(this._client), this.configurations = new Fu(this._client), this.lists = new Gu(this._client), this.locations = new Mu(this._client), this.logging = new Bu(this._client), this.proxyEndpoints = new Yu(this._client), this.rules = new Hu(this._client), this.certificates = new Nu(this._client);
  }
  /**
   * Creates a Zero Trust account with an existing Cloudflare account.
   */
  create(t, e) {
    const { account_id: n } = t;
    return this._client.post(`/accounts/${n}/gateway`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Gets information about the current Zero Trust account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.get(`/accounts/${n}/gateway`, e)._thenUnwrap((r) => r.result);
  }
}
(function(s) {
  s.AuditSSHSettings = Vu, s.Categories = Du, s.CategoriesSinglePage = W_, s.AppTypes = Eu, s.AppTypesSinglePage = G_, s.Configurations = Fu, s.Lists = Gu, s.GatewayListsSinglePage = q_, s.Locations = Mu, s.LocationsSinglePage = J_, s.Logging = Bu, s.ProxyEndpoints = Yu, s.Rules = Hu, s.GatewayRulesSinglePage = Q_, s.Certificates = Nu, s.CertificateListResponsesSinglePage = K_;
})(Wu || (Wu = {}));
class Ku extends o {
  /**
   * Adds a new virtual network to an account.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/teamnet/virtual_networks`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters virtual networks in an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/teamnet/virtual_networks`, tp, { query: r, ...e });
  }
  /**
   * Deletes an existing virtual network.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/teamnet/virtual_networks/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing virtual network.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/teamnet/virtual_networks/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
class tp extends w {
}
(function(s) {
  s.VirtualNetworksSinglePage = tp;
})(Ku || (Ku = {}));
class Ju extends o {
  /**
   * Fetches routes that contain the given IP address.
   */
  get(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.get(`/accounts/${r}/teamnet/routes/ip/${t}`, {
      query: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
Ju || (Ju = {});
let Qu = class extends o {
  /**
   * Routes a private network through a Cloudflare Tunnel. The CIDR in
   * `ip_network_encoded` must be written in URL-encoded format.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/teamnet/routes/network/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a private network route from an account. The CIDR in
   * `ip_network_encoded` must be written in URL-encoded format. If no
   * virtual_network_id is provided it will delete the route from the default vnet.
   * If no tun_type is provided it will fetch the type from the tunnel_id or if that
   * is missing it will assume Cloudflare Tunnel as default. If tunnel_id is provided
   * it will delete the route from that tunnel, otherwise it will delete the route
   * based on the vnet and tun_type.
   */
  delete(t, e, n) {
    const { account_id: r, tun_type: i, tunnel_id: c, virtual_network_id: a } = e;
    return this._client.delete(`/accounts/${r}/teamnet/routes/network/${t}`, {
      query: { tun_type: i, tunnel_id: c, virtual_network_id: a },
      ...n
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an existing private network route in an account. The CIDR in
   * `ip_network_encoded` must be written in URL-encoded format.
   */
  edit(t, e, n) {
    const { account_id: r } = e;
    return this._client.patch(`/accounts/${r}/teamnet/routes/network/${t}`, n)._thenUnwrap((i) => i.result);
  }
};
Qu || (Qu = {});
class Xu extends o {
  constructor() {
    super(...arguments), this.ips = new Ju(this._client), this.networks = new Qu(this._client);
  }
  /**
   * Routes a private network through a Cloudflare Tunnel.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/teamnet/routes`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters private network routes in an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/teamnet/routes`, ep, {
      query: r,
      ...e
    });
  }
  /**
   * Deletes a private network route from an account.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/teamnet/routes/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing private network route in an account. The fields that are
   * meant to be updated should be provided in the body of the request.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/teamnet/routes/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
class ep extends A {
}
(function(s) {
  s.TeamnetsV4PagePaginationArray = ep, s.IPs = Ju, s.Networks = Qu;
})(Xu || (Xu = {}));
class qu extends o {
  constructor() {
    super(...arguments), this.routes = new Xu(this._client), this.virtualNetworks = new Ku(this._client);
  }
}
(function(s) {
  s.Routes = Xu, s.TeamnetsV4PagePaginationArray = ep, s.VirtualNetworks = Ku, s.VirtualNetworksSinglePage = tp;
})(qu || (qu = {}));
class tl extends o {
  /**
   * Update configuration for risk behaviors
   */
  update(t, e, n) {
    return this._client.put(`/accounts/${t}/zt_risk_scoring/behaviors`, {
      body: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
  /**
   * Get all behaviors and associated configuration
   */
  get(t, e) {
    return this._client.get(`/accounts/${t}/zt_risk_scoring/behaviors`, e)._thenUnwrap((n) => n.result);
  }
}
tl || (tl = {});
class el extends o {
  get(t, e = {}, n) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/accounts/${t}/zt_risk_scoring/summary`, {
      query: e,
      ...n
    })._thenUnwrap((r) => r.result);
  }
}
el || (el = {});
class nl extends o {
  /**
   * Get risk score integration by reference id.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/zt_risk_scoring/integrations/reference_id/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
nl || (nl = {});
class sl extends o {
  constructor() {
    super(...arguments), this.references = new nl(this._client);
  }
  /**
   * Create new risk score integration.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/zt_risk_scoring/integrations`, {
      body: r,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a risk score integration.
   *
   * Overwrite the reference_id, tenant_url, and active values with the ones provided
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/zt_risk_scoring/integrations/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all risk score integrations for the account.
   */
  list(t, e) {
    const { account_id: n } = t;
    return this._client.getAPIList(`/accounts/${n}/zt_risk_scoring/integrations`, np, e);
  }
  /**
   * Delete a risk score integration.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/zt_risk_scoring/integrations/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Get risk score integration by id.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/zt_risk_scoring/integrations/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class np extends w {
}
(function(s) {
  s.IntegrationListResponsesSinglePage = np, s.References = nl;
})(sl || (sl = {}));
class rl extends o {
  constructor() {
    super(...arguments), this.behaviours = new tl(this._client), this.summary = new el(this._client), this.integrations = new sl(this._client);
  }
  get(t, e, n = {}, r) {
    return u(n) ? this.get(t, e, {}, n) : this._client.get(`/accounts/${t}/zt_risk_scoring/${e}`, {
      query: n,
      ...r
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Clear the risk score for a particular user
   */
  reset(t, e, n) {
    return this._client.post(`/accounts/${t}/zt_risk_scoring/${e}/reset`, n)._thenUnwrap((r) => r.result);
  }
}
(function(s) {
  s.Behaviours = tl, s.Summary = el, s.Integrations = sl, s.IntegrationListResponsesSinglePage = np;
})(rl || (rl = {}));
class il extends o {
  /**
   * Adds or updates the configuration for a remotely-managed tunnel.
   */
  update(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.put(`/accounts/${r}/cfd_tunnel/${t}/configurations`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets the configuration for a remotely-managed tunnel
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/cfd_tunnel/${t}/configurations`, n)._thenUnwrap((i) => i.result);
  }
}
il || (il = {});
class cl extends o {
  /**
   * Removes connections that are in a disconnected or pending reconnect state. We
   * recommend running this command after shutting down a tunnel.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/tunnels/${t}/connections`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches connection details for a Cloudflare Tunnel.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/cfd_tunnel/${t}/connections`, n)._thenUnwrap((i) => i.result);
  }
}
cl || (cl = {});
class ol extends o {
  /**
   * Fetches connector and connection details for a Cloudflare Tunnel.
   */
  get(t, e, n, r) {
    const { account_id: i } = n;
    return this._client.get(`/accounts/${i}/cfd_tunnel/${t}/connectors/${e}`, r)._thenUnwrap((c) => c.result);
  }
}
ol || (ol = {});
class al extends o {
  /**
   * Gets a management token used to access the management resources (i.e. Streaming
   * Logs) of a tunnel.
   */
  create(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.post(`/accounts/${r}/cfd_tunnel/${t}/management`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
}
al || (al = {});
class ul extends o {
  /**
   * Gets the token used to associate cloudflared with a specific tunnel.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/cfd_tunnel/${t}/token`, n)._thenUnwrap((i) => i.result);
  }
}
ul || (ul = {});
class ll extends o {
  constructor() {
    super(...arguments), this.configurations = new il(this._client), this.connections = new cl(this._client), this.token = new ul(this._client), this.connectors = new ol(this._client), this.management = new al(this._client);
  }
  /**
   * Creates a new Argo Tunnel in an account.
   */
  create(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.post(`/accounts/${n}/tunnels`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters all types of Tunnels in an account.
   */
  list(t, e) {
    const { account_id: n, ...r } = t;
    return this._client.getAPIList(`/accounts/${n}/tunnels`, sp, { query: r, ...e });
  }
  /**
   * Deletes an Argo Tunnel from an account.
   */
  delete(t, e, n) {
    const { account_id: r } = e;
    return this._client.delete(`/accounts/${r}/tunnels/${t}`, n)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Cloudflare Tunnel.
   */
  edit(t, e, n) {
    const { account_id: r, ...i } = e;
    return this._client.patch(`/accounts/${r}/cfd_tunnel/${t}`, {
      body: i,
      ...n
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Argo Tunnel.
   */
  get(t, e, n) {
    const { account_id: r } = e;
    return this._client.get(`/accounts/${r}/tunnels/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
class sp extends A {
}
(function(s) {
  s.TunnelListResponsesV4PagePaginationArray = sp, s.Configurations = il, s.Connections = cl, s.Token = ul, s.Connectors = ol, s.Management = al;
})(ll || (ll = {}));
class dl extends o {
  constructor() {
    super(...arguments), this.devices = new $u(this._client), this.identityProviders = new Va(this._client), this.organizations = new Da(this._client), this.seats = new Na(this._client), this.access = new iu(this._client), this.dex = new Ou(this._client), this.tunnels = new ll(this._client), this.connectivitySettings = new Ea(this._client), this.dlp = new Cu(this._client), this.gateway = new Wu(this._client), this.networks = new qu(this._client), this.riskScoring = new rl(this._client);
  }
}
(function(s) {
  s.Devices = $u, s.DevicesSinglePage = F_, s.IdentityProviders = Va, s.IdentityProviderListResponsesSinglePage = $_, s.Organizations = Da, s.Seats = Na, s.Access = iu, s.DEX = Ou, s.Tunnels = ll, s.TunnelListResponsesV4PagePaginationArray = sp, s.ConnectivitySettings = Ea, s.DLP = Cu, s.Gateway = Wu, s.Networks = qu, s.RiskScoring = rl;
})(dl || (dl = {}));
class hl extends o {
  /**
   * Triggeres a new activation check for a PENDING Zone. This can be triggered every
   * 5 min for paygo/ent customers, every hour for FREE Zones.
   */
  trigger(t, e) {
    const { zone_id: n } = t;
    return this._client.put(`/zones/${n}/activation_check`, e)._thenUnwrap((r) => r.result);
  }
}
hl || (hl = {});
class _l extends o {
  /**
   * Set metadata for account-level custom nameservers on a zone.
   *
   * If you would like new zones in the account to use account custom nameservers by
   * default, use PUT /accounts/:identifier to set the account setting
   * use_account_custom_ns_by_default to true.
   */
  update(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.put(`/zones/${n}/custom_ns`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Get metadata for account-level custom nameservers on a zone.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/custom_ns`, e)._thenUnwrap((r) => r.result);
  }
}
_l || (_l = {});
class pl extends o {
  /**
   * Enforce a zone hold on the zone, blocking the creation and activation of zones
   * with this zone's hostname.
   */
  create(t, e) {
    const { zone_id: n, include_subdomains: r } = t;
    return this._client.post(`/zones/${n}/hold`, {
      query: { include_subdomains: r },
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Stop enforcement of a zone hold on the zone, permanently or temporarily,
   * allowing the creation and activation of zones with this zone's hostname.
   */
  delete(t, e) {
    const { zone_id: n, hold_after: r } = t;
    return this._client.delete(`/zones/${n}/hold`, {
      query: { hold_after: r },
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve whether the zone is subject to a zone hold, and metadata about the
   * hold.
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}/hold`, e)._thenUnwrap((r) => r.result);
  }
}
pl || (pl = {});
class gl extends o {
  /**
   * Updates a single zone setting by the identifier
   */
  edit(t, e, n) {
    const { zone_id: r, ...i } = e;
    return this._client.patch(`/zones/${r}/settings/${t}`, { body: i, ...n })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single zone setting by name
   */
  get(t, e, n) {
    const { zone_id: r } = e;
    return this._client.get(`/zones/${r}/settings/${t}`, n)._thenUnwrap((i) => i.result);
  }
}
gl || (gl = {});
class fl extends o {
  /**
   * Create a zone subscription, either plan or add-ons.
   */
  create(t, e, n) {
    return this._client.post(`/zones/${t}/subscription`, { body: e, ...n })._thenUnwrap((r) => r.result);
  }
  /**
   * Lists all of an account's subscriptions.
   */
  list(t, e) {
    return this._client.getAPIList(`/accounts/${t}/subscriptions`, ef, e);
  }
  /**
   * Lists zone subscription details.
   */
  get(t, e) {
    return this._client.get(`/zones/${t}/subscription`, e)._thenUnwrap((n) => n.result);
  }
}
fl || (fl = {});
class wl extends o {
  constructor() {
    super(...arguments), this.activationCheck = new hl(this._client), this.settings = new gl(this._client), this.customNameservers = new _l(this._client), this.holds = new pl(this._client), this.subscriptions = new fl(this._client);
  }
  /**
   * Create Zone
   */
  create(t, e) {
    return this._client.post("/zones", { body: t, ...e })._thenUnwrap((n) => n.result);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/zones", tm, { query: t, ...e });
  }
  /**
   * Deletes an existing zone.
   */
  delete(t, e) {
    const { zone_id: n } = t;
    return this._client.delete(`/zones/${n}`, e)._thenUnwrap((r) => r.result);
  }
  /**
   * Edits a zone. Only one zone property can be changed at a time.
   */
  edit(t, e) {
    const { zone_id: n, ...r } = t;
    return this._client.patch(`/zones/${n}`, { body: r, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Zone Details
   */
  get(t, e) {
    const { zone_id: n } = t;
    return this._client.get(`/zones/${n}`, e)._thenUnwrap((r) => r.result);
  }
}
class tm extends A {
}
(function(s) {
  s.ActivationCheck = hl, s.Settings = gl, s.CustomNameservers = _l, s.Holds = pl, s.Subscriptions = fl;
})(wl || (wl = {}));
var cf;
class G extends Ef {
  /**
   * API Client for interfacing with the Cloudflare API.
   *
   * @param {string | null | undefined} [opts.apiToken=process.env['CLOUDFLARE_API_TOKEN'] ?? null]
   * @param {string | null | undefined} [opts.apiKey=process.env['CLOUDFLARE_API_KEY'] ?? null]
   * @param {string | null | undefined} [opts.apiEmail=process.env['CLOUDFLARE_EMAIL'] ?? null]
   * @param {string | null | undefined} [opts.userServiceKey=process.env['CLOUDFLARE_API_USER_SERVICE_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['CLOUDFLARE_BASE_URL'] ?? https://api.cloudflare.com/client/v4] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({ baseURL: t = Lt("CLOUDFLARE_BASE_URL"), apiToken: e = Lt("CLOUDFLARE_API_TOKEN") ?? null, apiKey: n = Lt("CLOUDFLARE_API_KEY") ?? null, apiEmail: r = Lt("CLOUDFLARE_EMAIL") ?? null, userServiceKey: i = Lt("CLOUDFLARE_API_USER_SERVICE_KEY") ?? null, ...c } = {}) {
    const a = {
      apiToken: e,
      apiKey: n,
      apiEmail: r,
      userServiceKey: i,
      ...c,
      baseURL: t || "https://api.cloudflare.com/client/v4"
    };
    super({
      baseURL: a.baseURL,
      timeout: a.timeout ?? 6e4,
      httpAgent: a.httpAgent,
      maxRetries: a.maxRetries,
      fetch: a.fetch
    }), this.accounts = new fe(this), this.originCACertificates = new Jg(this), this.ips = new jg(this), this.memberships = new Kg(this), this.user = new qo(this), this.zones = new wl(this), this.loadBalancers = new Ys(this), this.cache = new We(this), this.ssl = new Qc(this), this.subscriptions = new nf(this), this.acm = new ee(this), this.argo = new Fe(this), this.plans = new Xg(this), this.ratePlans = new tf(this), this.certificateAuthorities = new qe(this), this.clientCertificates = new Fg(this), this.customCertificates = new ln(this), this.customHostnames = new hn(this), this.customNameservers = new Mg(this), this.dns = new Un(this), this.dnssec = new Yg(this), this.emailRouting = new Zn(this), this.filters = new Hg(this), this.firewall = new Wn(this), this.healthchecks = new Jn(this), this.keylessCertificates = new Gg(this), this.logpush = new Xs(this), this.logs = new cr(this), this.originTLSClientAuth = new Or(this), this.pagerules = new Vr(this), this.rateLimits = new qg(this), this.secondaryDNS = new io(this), this.waitingRooms = new aa(this), this.web3 = new _a(this), this.workers = new za(this), this.kv = new Zs(this), this.durableObjects = new An(this), this.queues = new Gr(this), this.apiGateway = new _e(this), this.managedHeaders = new Wg(this), this.pageShield = new Cr(this), this.rulesets = new Mc(this), this.urlNormalization = new sf(this), this.spectrum = new wo(this), this.addressing = new Ie(this), this.auditLogs = new Vg(this), this.billing = new Be(this), this.brandProtection = new Ng(this), this.diagnostics = new Sn(this), this.images = new hs(this), this.intel = new Os(this), this.magicTransit = new Ur(this), this.magicNetworkMonitoring = new _r(this), this.mtlsCertificates = new ar(this), this.pages = new Yr(this), this.pcaps = new Ir(this), this.registrar = new Rc(this), this.requestTracers = new kc(this), this.rules = new Cc(this), this.storage = new Uo(this), this.stream = new No(this), this.alerting = new Ve(this), this.d1 = new pn(this), this.r2 = new Qr(this), this.warpConnector = new rf(this), this.workersForPlatforms = new Ca(this), this.zeroTrust = new dl(this), this.challenges = new en(this), this.hyperdrive = new es(this), this.rum = new ti(this), this.vectorize = new ea(this), this.urlScanner = new Bo(this), this.radar = new Oc(this), this.botManagement = new Dg(this), this.originPostQuantumEncryption = new Qg(this), this.speed = new Po(this), this.dcvDelegation = new Bg(this), this.hostnames = new qn(this), this.snippets = new ao(this), this.calls = new Qe(this), this.cloudforceOne = new an(this), this.eventNotifications = new Vn(this), this.aiGateway = new se(this), this.iam = new rs(this), this.cloudConnector = new sn(this), this._options = a, this.apiToken = e, this.apiKey = n, this.apiEmail = r, this.userServiceKey = i;
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  defaultHeaders(t) {
    return {
      ...super.defaultHeaders(t),
      "X-Auth-Key": this.apiKey,
      "X-Auth-Email": this.apiEmail,
      ...this._options.defaultHeaders
    };
  }
  validateHeaders(t, e) {
    if (!(this.apiEmail && t["x-auth-email"]) && e["x-auth-email"] !== null && !(this.apiKey && t["x-auth-key"]) && e["x-auth-key"] !== null && !(this.apiToken && t.authorization) && e.authorization !== null && !(this.userServiceKey && t["x-auth-user-service-key"]) && e["x-auth-user-service-key"] !== null)
      throw new Error('Could not resolve authentication method. Expected one of apiEmail, apiKey, apiToken or userServiceKey to be set. Or for one of the "X-Auth-Email", "X-Auth-Key", "Authorization" or "X-Auth-User-Service-Key" headers to be explicitly omitted');
  }
  authHeaders(t) {
    const e = this.apiEmailAuth(t), n = this.apiKeyAuth(t), r = this.apiTokenAuth(t), i = this.userServiceKeyAuth(t);
    return e != null && !Ot(e) && n != null && !Ot(n) ? { ...e, ...n } : r != null && !Ot(r) ? r : i != null && !Ot(i) ? i : {};
  }
  apiEmailAuth(t) {
    return this.apiEmail == null ? {} : { "X-Auth-Email": this.apiEmail };
  }
  apiKeyAuth(t) {
    return this.apiKey == null ? {} : { "X-Auth-Key": this.apiKey };
  }
  apiTokenAuth(t) {
    return this.apiToken == null ? {} : { Authorization: `Bearer ${this.apiToken}` };
  }
  userServiceKeyAuth(t) {
    return this.userServiceKey == null ? {} : { "X-Auth-User-Service-Key": this.userServiceKey };
  }
  stringifyQuery(t) {
    return Sw.stringify(t, { allowDots: !0, arrayFormat: "repeat" });
  }
}
cf = G;
G.Cloudflare = cf;
G.CloudflareError = d;
G.APIError = q;
G.APIConnectionError = yl;
G.APIConnectionTimeoutError = Pg;
G.APIUserAbortError = Sd;
G.NotFoundError = Sg;
G.ConflictError = zg;
G.RateLimitError = Ag;
G.BadRequestError = vg;
G.AuthenticationError = Ug;
G.InternalServerError = Rg;
G.PermissionDeniedError = xg;
G.UnprocessableEntityError = Og;
G.toFile = wg;
G.fileFromPath = hg;
(function(s) {
  s.V4PagePagination = mt, s.V4PagePaginationArray = A, s.CursorPagination = Ld, s.CursorLimitPagination = Zd, s.SinglePage = w, s.Accounts = fe, s.OriginCACertificates = Jg, s.IPs = jg, s.Memberships = Kg, s.User = qo, s.Zones = wl, s.LoadBalancers = Ys, s.Cache = We, s.SSL = Qc, s.Subscriptions = nf, s.ACM = ee, s.Argo = Fe, s.Plans = Xg, s.RatePlans = tf, s.CertificateAuthorities = qe, s.ClientCertificates = Fg, s.CustomCertificates = ln, s.CustomHostnames = hn, s.CustomNameservers = Mg, s.DNS = Un, s.DNSSECResource = Yg, s.EmailRouting = Zn, s.Filters = Hg, s.Firewall = Wn, s.Healthchecks = Jn, s.KeylessCertificates = Gg, s.Logpush = Xs, s.Logs = cr, s.OriginTLSClientAuth = Or, s.Pagerules = Vr, s.RateLimits = qg, s.SecondaryDNS = io, s.WaitingRooms = aa, s.Web3 = _a, s.Workers = za, s.KV = Zs, s.DurableObjects = An, s.Queues = Gr, s.APIGateway = _e, s.ManagedHeaders = Wg, s.PageShield = Cr, s.Rulesets = Mc, s.URLNormalization = sf, s.Spectrum = wo, s.Addressing = Ie, s.AuditLogs = Vg, s.Billing = Be, s.BrandProtection = Ng, s.Diagnostics = Sn, s.Images = hs, s.Intel = Os, s.MagicTransit = Ur, s.MagicNetworkMonitoring = _r, s.MTLSCertificates = ar, s.Pages = Yr, s.PCAPs = Ir, s.Registrar = Rc, s.RequestTracers = kc, s.Rules = Cc, s.Storage = Uo, s.Stream = No, s.Alerting = Ve, s.D1Resource = pn, s.R2 = Qr, s.WARPConnector = rf, s.WorkersForPlatforms = Ca, s.ZeroTrust = dl, s.Challenges = en, s.HyperdriveResource = es, s.RUM = ti, s.Vectorize = ea, s.URLScanner = Bo, s.Radar = Oc, s.BotManagement = Dg, s.OriginPostQuantumEncryption = Qg, s.Speed = Po, s.DCVDelegation = Bg, s.Hostnames = qn, s.Snippets = ao, s.Calls = Qe, s.CloudforceOne = an, s.EventNotifications = Vn, s.AIGateway = se, s.IAM = rs, s.CloudConnector = sn;
})(G || (G = {}));
function em(s) {
  const t = new URL(`https://${s.SUB}/sub`), e = new URLSearchParams();
  return e.set("target", "clash"), e.set("new_name", "true"), e.set("insert", "false"), e.set("config", s.SUB_CONFIG), e.set("url", s.SUB_URLS), e.set("filename", "sub"), e.set("emoji", "true"), e.set("list", "false"), e.set("tfo", "false"), e.set("scv", "false"), e.set("fdn", "false"), e.set("sort", "false"), `${t.toString()}?${e.toString()}`;
}
async function nm(s) {
  const t = new G({
    apiToken: s.KV_API_TOKEN,
    apiEmail: s.ACCOUNT_EMAIL
  }), e = em(s), n = await qt(e);
  if (n.ok) {
    const r = await n.data.text();
    await t.kv.namespaces.values.update(s.KV_NAMESPACE_ID, "sub.yml", {
      account_id: s.ACCOUNT_ID,
      metadata: JSON.stringify({
        name: "sub.yml",
        type: "text"
      }),
      value: r
    });
  }
}
let Xt = null;
async function V(s) {
  await Qt(100), Xt == null || Xt.send(s);
}
const yd = (s) => `packages/vps-parse/address/${s}`, ot = {
  trojanCount: 0,
  vlessCount: 0,
  vmessCount: 0,
  vlessPushStatus: "error",
  trojanPushStatus: "error",
  vmessPushStatus: "error"
};
async function sm(s, t) {
  try {
    const e = [], n = [], r = [], i = [];
    await V(
      JSON.stringify({
        type: "info",
        content: ["开始获取 VPS 数据...", ...s].join(`
`)
      })
    );
    for await (const a of s) {
      await V(
        JSON.stringify({
          type: "info",
          content: `正在获取订阅信息: ${a}`
        })
      );
      const l = new Request(a, {
        headers: new Headers({
          "User-Agent": "PostmanRuntime/7.43.0",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        })
      }), p = await qt(l, {
        retries: t,
        headers: l.headers,
        onError: async ($, P) => {
          await V(
            JSON.stringify({
              type: "error",
              content: `正在尝试第 ${P} 次请求... ${$.message || $}`
            })
          );
        }
      });
      if (p.ok) {
        const $ = await p.data.text();
        await V(
          JSON.stringify({
            type: "success",
            content: `成功获取链接数据: ${p.config.url}`
          })
        ), e.push(og($));
      } else
        await V(
          JSON.stringify({
            type: "error",
            content: `获取链接数据失败: ${p.config.url}`
          })
        );
    }
    const c = e.map((a) => a.split(`
`)).flat();
    for await (const a of c)
      await V(
        JSON.stringify({
          type: "info",
          content: `${ml(a, (l) => l)}`
        })
      ), a.trim().startsWith("trojan://") ? n.push(a) : a.trim().startsWith("vless://") ? r.push(a) : a.trim().startsWith("vmess://") && i.push(a);
    return ot.trojanCount = n.length, ot.vlessCount = r.length, ot.vmessCount = i.length, await V(
      JSON.stringify({
        type: "success",
        content: `数据分类完成：
trojan: ${n.length}条
vless: ${r.length}条
vmess: ${i.length}条`
      })
    ), {
      trojan: n,
      vless: r,
      vmess: i
    };
  } catch (e) {
    throw await V(
      JSON.stringify({
        type: "error",
        content: `获取VPS数据失败: ${e.message || e}`
      })
    ), new Error(`catch on getVps => reason: ${e.message || e}`);
  }
}
async function bd(s, t, e) {
  try {
    await V(
      JSON.stringify({
        type: "info",
        content: `开始推送到 GitHub: ${t}`
      })
    );
    const n = mf(s.join(`
`)), r = `https://api.github.com/repos/${e.GITHUB_USERNAME}/${e.REPO_NAME}/contents/${t}`, i = {
      Authorization: `Bearer ${e.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Cloudflare-Worker"
    }, c = async () => {
      const l = await qt(r, { headers: i });
      if (l.ok)
        return (await l.data.json()).sha;
    }, a = async (l) => {
      const p = {
        message: `scheduled: update ${t} by ${Uf()}`,
        content: n,
        branch: e.REPO_BRANCH
      };
      l && (p.sha = l);
      const $ = await qt(r, {
        method: "PUT",
        headers: {
          ...i,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(p)
      });
      if (!$.ok) {
        const P = await $.data.text();
        throw new Error(`GitHub API responded with ${$.status}: ${P}`);
      }
      return $.data.json();
    };
    try {
      const l = await c();
      await V(
        JSON.stringify({
          type: "info",
          content: `获取到最新 SHA: ${l || "null"}`
        })
      );
      const p = await a(l);
      return await V(
        JSON.stringify({
          type: "success",
          content: `成功推送到GitHub: ${t}`
        })
      ), p;
    } catch (l) {
      if (l.message.includes("409")) {
        await V(
          JSON.stringify({
            type: "warning",
            content: "检测到文件冲突，正在重试..."
          })
        );
        const p = await c(), $ = await a(p);
        return await V(
          JSON.stringify({
            type: "success",
            content: `重试成功，已推送到GitHub: ${t}`
          })
        ), $;
      }
      throw l;
    }
  } catch (n) {
    throw await V(
      JSON.stringify({
        type: "error",
        content: `GitHub推送失败: ${n.message || n}`
      })
    ), new Error(`catch on pushGithub => reason: ${n.message || n}`);
  }
}
async function cg(s) {
  var t;
  try {
    await V(
      JSON.stringify({
        type: "info",
        content: "开始初始化同步流程..."
      })
    );
    const e = ((t = s.LINKS) == null ? void 0 : t.split(",")) ?? [], { trojan: n, vless: r, vmess: i } = await sm(e, Number(s.RETRY ?? "3"));
    await V(
      JSON.stringify({
        type: "info",
        content: "处理VPS数据..."
      })
    );
    const c = xf(r.filter(Boolean)), a = Sf(n.filter(Boolean)), l = zf(i.filter(Boolean));
    await V(
      JSON.stringify({
        type: "success",
        content: `vless count: ${c.length}`
      })
    ), await V(
      JSON.stringify({
        type: "success",
        content: `trojan count: ${a.length}`
      })
    ), await V(
      JSON.stringify({
        type: "success",
        content: `vmess count: ${l.length}`
      })
    ), await V(
      JSON.stringify({
        type: "info",
        content: "开始推送到GitHub..."
      })
    );
    const p = {
      vless: "",
      trojan: "",
      vmess: ""
    };
    try {
      p.vless = await bd(c, yd("vless_api.txt"), s), ot.vlessPushStatus = "success", await Qt(2e3), p.trojan = await bd(a, yd("trojan_api.txt"), s), ot.trojanPushStatus = "success", await Qt(2e3), p.vmess = await bd(l, yd("vmess_api.txt"), s), ot.vmessPushStatus = "success", await Qt(2e3);
    } catch ($) {
      await V(
        JSON.stringify({
          type: "error",
          content: `GitHub推送过程中出错: ${$.message || $}`
        })
      );
    }
    return await V(
      JSON.stringify({
        type: "success",
        content: "所有操作已完成！, 通知telegram"
      })
    ), await $f({
      token: s.TG_TOKEN,
      chatId: s.TG_ID,
      message: [
        `vless: ${ot.vlessPushStatus} (${ot.vlessCount})`,
        `trojan: ${ot.trojanPushStatus} (${ot.trojanCount})`,
        `vmess: ${ot.vmessPushStatus} (${ot.vmessCount})`
      ]
    }), await nm(s), await V(
      JSON.stringify({
        type: "success",
        content: "同步完成！"
      })
    ), Response.json({
      vless: { status: "fulfilled", value: p.vless },
      trojan: { status: "fulfilled", value: p.trojan },
      vmess: { status: "fulfilled", value: p.vmess }
    });
  } catch (e) {
    throw await V(
      JSON.stringify({
        type: "error",
        content: `初始化过程失败: ${e.message || e}`
      })
    ), new Error(`cache on init => reason: ${e.message || e}`);
  }
}
const ob = {
  async fetch(s, t) {
    try {
      if (s.headers.get("Upgrade") === "websocket") {
        const e = new WebSocketPair(), [n, r] = Object.values(e);
        return r.accept(), Xt = r, await V(
          JSON.stringify({
            type: "success",
            content: "WebSocket连接已建立"
          })
        ), r.addEventListener("message", async (i) => {
          try {
            const c = JSON.parse(i.data);
            if (c.type === "command" && c.content === "sync") {
              await V(
                JSON.stringify({
                  type: "info",
                  content: "收到同步命令，开始执行..."
                })
              );
              try {
                await cg(t), await V(
                  JSON.stringify({
                    type: "success",
                    content: "同步操作完成"
                  })
                );
              } catch (a) {
                await V(
                  JSON.stringify({
                    type: "error",
                    content: `同步操作失败: ${a.message || a}`
                  })
                );
              }
            }
          } catch (c) {
            await V(
              JSON.stringify({
                type: "error",
                content: `处理消息失败: ${c.message || c}`
              })
            );
          }
        }), new Response(null, {
          status: 101,
          webSocket: n
        });
      }
      return new Response(yf, {
        headers: new Headers({
          "content-type": "text/html;charset=UTF-8"
        })
      });
    } catch (e) {
      return await V(
        JSON.stringify({
          type: "error",
          content: `服务器错误: ${e.message || e}`
        })
      ), new Response(e.message || e, {
        status: 500,
        headers: new Headers({
          "content-type": "text/plain;charset=UTF-8"
        })
      });
    }
  },
  async scheduled(s, t, e) {
    e.waitUntil(cg(t));
  }
};
export {
  ob as default
};
