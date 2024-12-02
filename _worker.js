var k = (e) => {
  throw TypeError(e);
};
var w = (e, t, r) => t.has(e) || k("Cannot " + r);
var c = (e, t, r) => (w(e, t, "read from private field"), r ? r.call(e) : t.get(e)), v = (e, t, r) => t.has(e) ? k("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), f = (e, t, r, s) => (w(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r);
const U = "unauthorized", $ = "internal server error", x = new Headers({
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
}), C = (e, t = j) => new Response(e, {
  headers: t
}), R = (e = U, t = 401, r = x) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: r
  }
), S = (e = $, t = 500, r = x) => Response.json(
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
}), E = (e) => `<!DOCTYPE html>
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
async function T(e, t, r = 3) {
  let s = new Error("Unknown error");
  for (let i = 0; i < r; i++)
    try {
      const o = await fetch(e, t);
      if (o.ok || o.status === 401)
        return o;
      throw new Error(`HTTP Error: ${o.status}`);
    } catch (o) {
      if (s = o, i === r - 1) break;
      await new Promise((a) => setTimeout(a, 2 ** i * 1e3));
    }
  throw s;
}
const p = {
  docker: {
    baseUrl: "https://registry-1.docker.io",
    authUrl: "https://auth.docker.io/token",
    needAuth: !0,
    headers: {
      "Docker-Distribution-Api-Version": "registry/2.0",
      Accept: "application/vnd.docker.distribution.manifest.v2+json"
    },
    formatTargetUrl: (e, t) => t.startsWith("library/") ? `${e}/v2/${t}` : `${e}/v2/${t.includes("/") ? t : `library/${t}`}`,
    auth: {
      service: "registry.docker.io",
      formatScope: (e) => `repository:${e.includes("/") ? e : `library/${e}`}:pull`
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
function H(e) {
  const t = e.startsWith("/") ? e.slice(1) : e;
  if (t === "v2" || t === "v2/")
    return {
      isV2Check: !0,
      registry: "docker",
      // 默认使用 docker registry
      repository: "",
      config: p.docker
    };
  const r = t.startsWith("v2/") ? t.slice(3).split("/") : t.split("/");
  if (r[0] === "library")
    return {
      isV2Check: !1,
      registry: "docker",
      repository: r.join("/"),
      // 保持完整路径，包括 library
      config: p.docker
    };
  const s = r[0];
  return p[s] ? {
    isV2Check: !1,
    registry: s,
    repository: r.slice(1).join("/"),
    config: p[s]
  } : {
    isV2Check: !1,
    registry: "docker",
    repository: r.join("/"),
    config: p.docker
  };
}
async function L(e, t) {
  var h, d, u;
  if (!e.authUrl)
    throw new Error("Auth URL not configured");
  const r = ((h = e.auth) == null ? void 0 : h.service) || new URL(e.baseUrl).hostname, s = ((u = (d = e.auth) == null ? void 0 : d.formatScope) == null ? void 0 : u.call(d, t)) || `repository:${t}:pull`, i = new URL(e.authUrl);
  i.searchParams.set("service", r), i.searchParams.set("scope", s);
  const o = await T(i.toString(), {
    headers: {
      Accept: "application/json"
    }
  });
  if (!o.ok)
    throw new Error(`Failed to get auth token: ${o.statusText}`);
  return (await o.json()).token;
}
function g(e = new Headers()) {
  return e.set("Access-Control-Allow-Origin", "*"), e.set("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS"), e.set("Access-Control-Allow-Headers", "Authorization, Content-Type"), e.set("Access-Control-Max-Age", "86400"), e;
}
async function O(e) {
  try {
    if (e.method === "OPTIONS")
      return new Response(null, {
        headers: g()
      });
    const t = new URL(e.url), r = H(t.pathname);
    if (r.isV2Check)
      return new Response(null, {
        status: 200,
        headers: g(new Headers({ "Docker-Distribution-Api-Version": "registry/2.0" }))
      });
    if (!r.config)
      return new Response("Registry configuration not found", {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
    const s = caches.default, i = new Request(t.toString(), e);
    let o = await s.match(i);
    if (o)
      return o;
    let a = "";
    if (r.config.needAuth)
      try {
        if (a = await L(r.config, r.repository), !a)
          return y(r.config, r.repository);
      } catch (l) {
        return console.error("Auth error:", l), y(r.config, r.repository);
      }
    const h = r.config.formatTargetUrl(r.config.baseUrl, r.repository), d = new Headers(e.headers);
    if (a && d.set("Authorization", `Bearer ${a}`), r.config.headers)
      for (const [l, m] of Object.entries(r.config.headers))
        d.set(l, m);
    if (o = await T(h, {
      method: e.method,
      headers: d,
      body: e.body,
      redirect: "follow"
    }), o.status === 401)
      return y(r.config, r.repository);
    const u = g();
    for (const [l, m] of o.headers.entries())
      l.toLowerCase().startsWith("access-control-") || u.set(l, m);
    const b = new Response(o.body, {
      status: o.status,
      statusText: o.statusText,
      headers: u
    });
    if (o.ok && e.method === "GET") {
      const l = o.headers.get("Cache-Control");
      l && !l.includes("no-store") && await s.put(i, b.clone());
    }
    return b;
  } catch (t) {
    return new Response(`Proxy error: ${t.message}`, {
      status: 502,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain"
      }
    });
  }
}
function y(e, t) {
  var o, a, h;
  const r = e.authUrl, s = ((o = e.auth) == null ? void 0 : o.service) || new URL(e.baseUrl).hostname, i = ((h = (a = e.auth) == null ? void 0 : a.formatScope) == null ? void 0 : h.call(a, t)) || `repository:${t}:pull`;
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Bearer realm="${r}",service="${s}",scope="${i}"`,
      "Docker-Distribution-Api-Version": "registry/2.0",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
}
function D(e, t) {
  if (!e || !t) return !1;
  for (let r = 0; r < t.length; r++)
    if (new RegExp(t[r].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(e))
      return !0;
  return !1;
}
var n;
class P {
  constructor() {
    v(this, n, []);
    f(this, n, []);
  }
  setEnv(t) {
    if (c(this, n).length || c(this, n) === "*" || !Reflect.has(t, "IP_WHITELIST")) return;
    const r = Reflect.get(t, "IP_WHITELIST") ?? "*";
    r === "*" ? f(this, n, "*") : f(this, n, r.split(",").map((s) => s.trim()));
  }
  checkIpIsWhitelisted(t) {
    const r = t.headers.get("x-real-ip") || "";
    return (typeof c(this, n) == "string" && c(this, n)) === "*" || Array.isArray(c(this, n)) && c(this, n).length === 0 ? !0 : Array.isArray(c(this, n)) && c(this, n).length > 0 ? D(r, c(this, n)) : !1;
  }
}
n = new WeakMap();
const A = new P(), F = {
  async fetch(e, t) {
    try {
      const { pathname: r, host: s } = new URL(e.url);
      return A.setEnv(t), A.checkIpIsWhitelisted(e) ? r === "/" ? C(E(s)) : await O(e) : R();
    } catch (r) {
      return S(r.message || r);
    }
  }
};
export {
  F as default
};
