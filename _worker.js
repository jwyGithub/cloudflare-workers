var g = (e) => {
  throw TypeError(e);
};
var y = (e, t, r) => t.has(e) || g("Cannot " + r);
var i = (e, t, r) => (y(e, t, "read from private field"), r ? r.call(e) : t.get(e)), b = (e, t, r) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), u = (e, t, r, o) => (y(e, t, "write to private field"), o ? o.call(e, r) : t.set(e, r), r);
const $ = "unauthorized", U = "internal server error", v = new Headers({
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
}), S = (e, t = j) => new Response(e, {
  headers: t
}), C = (e = $, t = 401, r = v) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: r
  }
), E = (e = U, t = 500, r = v) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: r
  }
), I = () => ({
  docker: ["1"]
}), H = (e) => `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docker Hub Mirror - 镜像加速服务</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css" media="(prefers-color-scheme: dark)">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"><\/script>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #333333;
            --code-bg: #f6f8fa;
            --border-color: #e1e4e8;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #0d1117;
                --text-color: #c9d1d9;
                --code-bg: #161b22;
                --border-color: #30363d;
            }
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            transition: background-color 0.3s ease;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }

        .hero {
            text-align: center;
            margin-bottom: 4rem;
            animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #007AFF, #5856D6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero p {
            font-size: 1.2rem;
            color: var(--text-color);
            opacity: 0.8;
        }

        .code-section {
            margin: 2rem 0;
            opacity: 0;
            transform: translateY(20px);
            animation: slideUp 0.5s ease-out forwards;
        }

        @keyframes slideUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .code-block {
            position: relative;
            background: var(--code-bg);
            border-radius: 10px;
            padding: 1rem;
            margin: 1rem 0;
            border: 1px solid var(--border-color);
        }

        .code-block pre {
            margin: 0;
            padding: 0;
        }

        .copy-button {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: #007AFF;
            color: white;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 6px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .code-block:hover .copy-button {
            opacity: 1;
        }

        .copy-button:active {
            transform: scale(0.95);
        }

        .copy-button i {
            font-size: 18px;
        }

        h2 {
            margin: 2rem 0 1rem;
            font-size: 1.5rem;
        }

        .floating-animation {
            animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        .success-animation {
            animation: success 0.3s ease-in-out;
        }

        @keyframes success {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>Docker Hub Mirror</h1>
            <p class="floating-animation">🚀 加速你的容器之旅</p>
        </div>
        <div id="code-container"></div>
    </div>

    <script>
        // 配置数据
        const CONFIG = ${JSON.stringify(I())}

        // 生成代码块HTML
        function generateCodeBlock(title, commands) {
            const commandsStr = commands.join('\\n');
            return \`
                <div class="code-section">
                    <h2>\${title}</h2>
                    <div class="code-block">
                        <button class="copy-button" title="复制代码">
                            <i class="mdi mdi-content-copy"></i>
                        </button>
                        <pre><code class="language-bash">\${commandsStr}</code></pre>
                    </div>
                </div>
            \`;
        }

        // 渲染所有代码块
        const container = document.getElementById('code-container');
        Object.entries(CONFIG).forEach(([title, commands]) => {
            container.innerHTML += generateCodeBlock(title, commands);
        });

        // 初始化代码高亮
        hljs.highlightAll();

        // 复制功能
        document.querySelectorAll('.code-block').forEach(block => {
            const copyButton = block.querySelector('.copy-button');
            const code = block.querySelector('code');

            copyButton.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    const icon = copyButton.querySelector('i');
                    icon.classList.remove('mdi-content-copy');
                    icon.classList.add('mdi-check', 'success-animation');
                    
                    setTimeout(() => {
                        icon.classList.remove('mdi-check', 'success-animation');
                        icon.classList.add('mdi-content-copy');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            });
        });

        // 添加延迟动画效果
        document.querySelectorAll('.code-section').forEach((section, index) => {
            section.style.animationDelay = \`\${index * 0.2}s\`;
        });
    <\/script>
</body>
</html>`;
async function A(e, t, r = 3) {
  let o = new Error("Unknown error");
  for (let s = 0; s < r; s++)
    try {
      const a = await fetch(e, t);
      if (a.ok || a.status === 401)
        return a;
      throw new Error(`HTTP Error: ${a.status}`);
    } catch (a) {
      if (o = a, s === r - 1) break;
      await new Promise((l) => setTimeout(l, 2 ** s * 1e3));
    }
  throw o;
}
const k = {
  docker: {
    baseUrl: "https://registry-1.docker.io",
    authUrl: "https://auth.docker.io/token",
    needAuth: !0,
    headers: {
      "Docker-Distribution-Api-Version": "registry/2.0"
    },
    formatTargetUrl: (e, t) => {
      const [r, ...o] = t.split("/");
      return o.length === 0 ? `${e}/v2/library/${r}` : `${e}/v2/${t}`;
    },
    auth: {
      service: "registry.docker.io",
      formatScope: (e) => {
        const [t, ...r] = e.split("/");
        return `repository:${r.length === 0 ? `library/${t}` : e}:pull`;
      }
    }
  },
  ghcr: {
    baseUrl: "https://ghcr.io",
    authUrl: "https://ghcr.io/token",
    needAuth: !0,
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json"
    },
    formatTargetUrl: (e, t) => `${e}/v2/${t}`,
    auth: {
      formatScope: (e) => `repository:${e}:pull`
    }
  },
  gcr: {
    baseUrl: "https://gcr.io",
    needAuth: !1,
    formatTargetUrl: (e, t) => `${e}/v2/${t}`,
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json,application/vnd.oci.image.manifest.v1+json"
    }
  },
  "k8s-gcr": {
    baseUrl: "https://k8s.gcr.io",
    needAuth: !1,
    formatTargetUrl: (e, t) => `${e}/v2/${t}`
  },
  k8s: {
    baseUrl: "https://registry.k8s.io",
    needAuth: !1,
    formatTargetUrl: (e, t) => `${e}/v2/${t}`
  },
  quay: {
    baseUrl: "https://quay.io",
    authUrl: "https://quay.io/v2/auth",
    needAuth: !0,
    formatTargetUrl: (e, t) => `${e}/v2/${t}`,
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json"
    },
    auth: {
      formatScope: (e) => `repository:${e}:pull`
    }
  },
  cloudsmith: {
    baseUrl: "https://docker.cloudsmith.io",
    needAuth: !0,
    formatTargetUrl: (e, t) => `${e}/v2/${t}`
  }
};
function R(e) {
  const r = (e.startsWith("/") ? e.slice(1) : e).split("/");
  if (r.length < 1)
    throw new Error("Invalid path: registry not specified");
  const o = r[0];
  if (!k[o])
    throw new Error(`Unsupported registry: ${o}`);
  const s = r.slice(1).join("/");
  if (!s)
    throw new Error("Invalid path: repository not specified");
  return {
    registry: o,
    repository: s,
    config: k[o]
  };
}
async function O(e, t) {
  var a, l;
  if (!e.needAuth || !e.authUrl)
    return "";
  const r = new URLSearchParams();
  (a = e.auth) != null && a.service && r.set("service", e.auth.service), (l = e.auth) != null && l.formatScope ? r.set("scope", e.auth.formatScope(t)) : r.set("scope", `repository:${t}:pull`);
  const o = await A(`${e.authUrl}?${r.toString()}`, {
    headers: {
      Accept: "application/json",
      ...e.headers || {}
    }
  });
  if (!o.ok)
    throw new Error(`Auth failed: ${o.status}`);
  return (await o.json()).token;
}
async function P(e) {
  if (e.method === "OPTIONS")
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Max-Age": "86400"
      }
    });
  const t = new URL(e.url), { registry: r, repository: o, config: s } = R(t.pathname), a = caches.default, l = new Request(t.toString(), e);
  let c = await a.match(l);
  if (c)
    return c;
  let m = "";
  s.needAuth && (m = await O(s, o));
  const x = s.formatTargetUrl(s.baseUrl, o), f = new Headers(e.headers);
  if (m && f.set("Authorization", `Bearer ${m}`), s.headers)
    for (const [d, p] of Object.entries(s.headers))
      f.set(d, p);
  try {
    c = await A(x, {
      method: e.method,
      headers: f,
      body: e.body,
      redirect: "follow"
    });
    const d = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type"
    });
    for (const [h, T] of c.headers.entries())
      h.toLowerCase().startsWith("access-control-") || d.set(h, T);
    r === "docker" && d.set("Docker-Distribution-Api-Version", "registry/2.0");
    const p = new Response(c.body, {
      status: c.status,
      statusText: c.statusText,
      headers: d
    });
    if (c.ok && e.method === "GET") {
      const h = c.headers.get("Cache-Control");
      h && !h.includes("no-store") && await a.put(l, p.clone());
    }
    return p;
  } catch (d) {
    return new Response(`Proxy error: ${d.message}`, {
      status: 502,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain"
      }
    });
  }
}
function L(e, t) {
  if (!e || !t) return !1;
  for (let r = 0; r < t.length; r++)
    if (new RegExp(t[r].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(e))
      return !0;
  return !1;
}
var n;
class D {
  constructor() {
    b(this, n, []);
    u(this, n, []);
  }
  setEnv(t) {
    if (i(this, n).length || i(this, n) === "*" || !Reflect.has(t, "IP_WHITELIST")) return;
    const r = Reflect.get(t, "IP_WHITELIST") ?? "*";
    r === "*" ? u(this, n, "*") : u(this, n, r.split(",").map((o) => o.trim()));
  }
  checkIpIsWhitelisted(t) {
    const r = t.headers.get("x-real-ip") || "";
    return (typeof i(this, n) == "string" && i(this, n)) === "*" || Array.isArray(i(this, n)) && i(this, n).length === 0 ? !0 : Array.isArray(i(this, n)) && i(this, n).length > 0 ? L(r, i(this, n)) : !1;
  }
}
n = new WeakMap();
const w = new D(), F = {
  async fetch(e, t) {
    try {
      const { pathname: r, host: o } = new URL(e.url);
      return w.setEnv(t), w.checkIpIsWhitelisted(e) ? r === "/" ? S(H(o)) : await P(e) : C();
    } catch (r) {
      return E(r.message || r);
    }
  }
};
export {
  F as default
};
