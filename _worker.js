var C = Object.defineProperty;
var b = (t) => {
  throw TypeError(t);
};
var E = (t, e, r) => e in t ? C(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var p = (t, e, r) => E(t, typeof e != "symbol" ? e + "" : e, r), k = (t, e, r) => e.has(t) || b("Cannot " + r);
var h = (t, e, r) => (k(t, e, "read from private field"), r ? r.call(t) : e.get(t)), w = (t, e, r) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), f = (t, e, r, s) => (k(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r);
const A = "bad request", T = "unauthorized", S = "internal server error", y = new Headers({
  "Content-type": "application/json"
});
new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const U = new Headers({
  "Content-type": "text/html"
}), F = (t, e = U) => new Response(t, {
  headers: e
}), H = (t = A, e = 400, r = y) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: r
  }
), x = (t = T, e = 401, r = y) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: r
  }
), R = (t = S, e = 500, r = y) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: r
  }
), g = {
  docker: {
    baseUrl: "https://registry-1.docker.io",
    authRequired: !1,
    needLibrary: !0,
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json"
    },
    scopeFormat: (t) => t.split("/").length === 1 ? `repository:library/${t}:pull` : `repository:${t}:pull`,
    useExample: (t) => ({
      title: "Docker Hub 官方镜像",
      bash: [`docker pull ${t}/nginx:latest`]
    })
  },
  ghcr: {
    baseUrl: "https://ghcr.io",
    authRequired: !1,
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json"
    },
    scopeFormat: (t) => `repository:${t}:pull`,
    // useExample: (host: string) => [`# GitHub Container Registry`, `docker pull ${host}/ghcr/owner/repo:tag`]
    useExample: (t) => ({
      title: "# GitHub Container Registry",
      bash: [`docker pull ${t}/ghcr/owner/repo:tag`]
    })
  },
  gcr: {
    baseUrl: "https://gcr.io",
    authRequired: !1,
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json"
    },
    scopeFormat: (t) => `repository:${t}:pull`,
    useExample: (t) => ({
      title: "# Google Container Registry",
      bash: [`docker pull ${t}/gcr/project/image:tag`]
    })
  },
  "k8s-gcr": {
    baseUrl: "https://k8s.gcr.io",
    authRequired: !1,
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json"
    },
    scopeFormat: (t) => `repository:${t}:pull`,
    useExample: (t) => ({
      title: "# Kubernetes GCR 镜像",
      bash: [`docker pull ${t}/k8s-gcr/kube-apiserver:v1.21.0`]
    })
  },
  k8s: {
    baseUrl: "https://registry.k8s.io",
    authRequired: !1,
    // k8s registry 通常不需要认证
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json"
    },
    scopeFormat: (t) => `repository:${t}:pull`,
    useExample: (t) => ({
      title: "# Kubernetes Registry 镜像",
      bash: [`docker pull ${t}/k8s/kube-apiserver:v1.25.0`]
    })
  },
  quay: {
    baseUrl: "https://quay.io",
    authRequired: !1,
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json"
    },
    scopeFormat: (t) => `repository:${t}:pull`,
    useExample: (t) => ({
      title: "# Quay 镜像",
      bash: [`docker pull ${t}/quay/organization/image:tag`]
    })
  },
  cloudsmith: {
    baseUrl: "https://docker.cloudsmith.io",
    authRequired: !1,
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json"
    },
    scopeFormat: (t) => `repository:${t}:pull`,
    useExample: (t) => ({
      title: "# Cloudsmith 镜像",
      bash: [`docker pull ${t}/cloudsmith/organization/repository/image:tag`]
    })
  }
}, I = (t) => Object.keys(g).reduce((e, r) => {
  var n;
  const s = g[r], { title: o, bash: a } = (n = s.useExample) == null ? void 0 : n.call(s, t);
  return e[o] = a, e;
}, {}), L = (t) => `<!DOCTYPE html>
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
        const CONFIG = ${JSON.stringify(I(t))}

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
</html>`, m = {
  token: {
    enabled: !0,
    ttl: 300
    // 令牌缓存 5 分钟
  },
  manifest: {
    enabled: !0,
    ttl: 3600
    // 清单缓存 1 小时
  },
  layer: {
    enabled: !0,
    ttl: 86400
    // 层缓存 24 小时
  }
};
class $ {
  constructor(e = "docker-proxy") {
    p(this, "namespace");
    this.namespace = e;
  }
  generateCacheKey(e) {
    return `${this.namespace}:${e}`;
  }
  async get(e) {
    try {
      const r = this.generateCacheKey(e), o = await caches.default.match(r);
      return o ? await o.json() : null;
    } catch (r) {
      return console.error("Cache get error:", r), null;
    }
  }
  async set(e, r) {
    try {
      const s = this.generateCacheKey(e.key), o = caches.default, a = new Response(JSON.stringify(r), {
        headers: {
          "Cache-Control": e.cacheControl || `public, max-age=${e.ttl || 3600}`,
          "Content-Type": "application/json"
        }
      });
      await o.put(s, a);
    } catch (s) {
      console.error("Cache set error:", s);
    }
  }
  async delete(e) {
    try {
      const r = this.generateCacheKey(e);
      await caches.default.delete(r);
    } catch (r) {
      console.error("Cache delete error:", r);
    }
  }
}
async function j(t, e, r = {}) {
  const { retries: s = 3, backoff: o = 300, timeout: a = 3e4 } = r;
  let n = new Error("Failed to fetch");
  for (let c = 0; c < s; c++)
    try {
      const d = new AbortController(), l = setTimeout(() => d.abort(), a), u = await fetch(t, {
        ...e,
        signal: d.signal
      });
      if (clearTimeout(l), !u.ok && u.status !== 401)
        throw new Error(`HTTP Error: ${u.status}`);
      return u;
    } catch (d) {
      if (n = d, c === s - 1)
        break;
      await new Promise((l) => setTimeout(l, o * 2 ** c));
    }
  throw n;
}
function M(t) {
  const e = t.split("/").filter(Boolean);
  return e.length === 0 ? { registryType: "docker", imagePath: "/" } : e[0] in g ? {
    registryType: e.shift() || "docker",
    imagePath: `/${e.join("/")}`
  } : {
    registryType: "docker",
    imagePath: t
  };
}
function z(t, e) {
  const r = new Headers(), s = g[t];
  return e && r.set("Authorization", e), s != null && s.headers && Object.entries(s.headers).forEach(([o, a]) => {
    r.set(o, a);
  }), r;
}
function G(t, e) {
  switch (t) {
    case "k8s-gcr":
    case "k8s":
      return e.replace(/^\//, "");
    case "cloudsmith": {
      const r = e.split("/").filter(Boolean);
      if (r.length < 3)
        throw new Error("Invalid Cloudsmith image path format. Expected: organization/repository/image");
      return r.join("/");
    }
    default:
      return e.replace(/^\//, "");
  }
}
async function K(t, e, r) {
  const s = new URL(e.realm);
  s.searchParams.set("service", e.service), e.scope && s.searchParams.set("scope", e.scope);
  const o = z(t, r);
  try {
    return await j(s.toString(), {
      method: "GET",
      headers: o
    });
  } catch (a) {
    return console.error(`Authentication failed for ${t}:`, a), x("Authentication failed");
  }
}
class O {
  constructor() {
    p(this, "cacheManager");
    this.cacheManager = new $();
  }
  async getToken(e, r, s) {
    const o = `token:${e}:${r.service}:${r.scope}:${s || ""}`, a = await this.cacheManager.get(o);
    if (a)
      return a.token;
    const n = await K(e, r, s);
    if (!n.ok)
      return null;
    const c = await n.json();
    return c.token && await this.cacheManager.set(
      {
        key: o,
        ttl: m.token.ttl
      },
      c
    ), c.token;
  }
}
class B {
  constructor() {
    p(this, "cacheManager");
    p(this, "authService");
    this.cacheManager = new $(), this.authService = new O();
  }
  async handleRequest(e) {
    const r = new URL(e.url), { registryType: s, imagePath: o } = M(r.pathname), a = g[s];
    if (!a)
      return H("Unsupported registry type");
    try {
      const n = G(s, o), c = this.canUseCache(e, n);
      if (c) {
        const l = await this.getCachedResponse(e, s, n);
        if (l)
          return l;
      }
      if (a.authRequired) {
        const l = await this.handleAuthentication(e, s, n);
        if (!l)
          return new Response("Authentication failed", { status: 401 });
        e.headers.set("Authorization", `Bearer ${l}`);
      }
      const d = await this.fetchFromRegistry(e, a, n);
      return c && d.ok && await this.cacheResponse(e, d.clone(), s, n), d;
    } catch (n) {
      return console.error("Registry proxy error:", n), R(`Registry error: ${n.message || n}`);
    }
  }
  canUseCache(e, r) {
    if (e.method !== "GET")
      return !1;
    const s = r.includes("/manifests/"), o = r.includes("/blobs/");
    return s ? m.manifest.enabled : o ? m.layer.enabled : !1;
  }
  async getCachedResponse(e, r, s) {
    const o = `${r}:${s}:${e.method}`, a = await this.cacheManager.get(o);
    return a ? new Response(JSON.stringify(a.body), {
      headers: new Headers(a.headers)
    }) : null;
  }
  async cacheResponse(e, r, s, o) {
    const a = o.includes("/manifests/"), n = o.includes("/blobs/"), c = a ? m.manifest.ttl : n ? m.layer.ttl : 3600, d = `${s}:${o}:${e.method}`, l = await r.clone().json(), u = Object.fromEntries(r.headers.entries());
    await this.cacheManager.set(
      {
        key: d,
        ttl: c
      },
      {
        body: l,
        headers: u
      }
    );
  }
  async handleAuthentication(e, r, s) {
    const { hostname: o } = new URL(e.url), a = e.headers.get("Authorization"), n = r === "docker" && !s.includes("/") ? `repository:library/${s}:pull` : `repository:${s}:pull`, c = {
      realm: `https://${o}/v2/auth`,
      service: "registry.docker.io",
      scope: n
    };
    return await this.authService.getToken(r, c, a);
  }
  async fetchFromRegistry(e, r, s) {
    const o = new URL(s.startsWith("/") ? s : `/${s}`, r.baseUrl);
    return await j(o.toString(), {
      method: e.method,
      headers: e.headers,
      body: e.method === "GET" ? null : e.body,
      redirect: "follow"
    });
  }
}
function P(t, e) {
  if (!t || !e) return !1;
  for (let r = 0; r < e.length; r++)
    if (new RegExp(e[r].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(t))
      return !0;
  return !1;
}
var i;
class D {
  constructor() {
    w(this, i, []);
    f(this, i, []);
  }
  setEnv(e) {
    if (h(this, i).length || h(this, i) === "*" || !Reflect.has(e, "IP_WHITELIST")) return;
    const r = Reflect.get(e, "IP_WHITELIST") ?? "*";
    r === "*" ? f(this, i, "*") : f(this, i, r.split(",").map((s) => s.trim()));
  }
  checkIpIsWhitelisted(e) {
    const r = e.headers.get("x-real-ip") || "";
    return (typeof h(this, i) == "string" && h(this, i)) === "*" || Array.isArray(h(this, i)) && h(this, i).length === 0 ? !0 : Array.isArray(h(this, i)) && h(this, i).length > 0 ? P(r, h(this, i)) : !1;
  }
}
i = new WeakMap();
const Y = new B(), v = new D(), N = {
  async fetch(t, e) {
    try {
      const { pathname: r, host: s } = new URL(t.url);
      return v.setEnv(e), v.checkIpIsWhitelisted(t) ? r === "/" ? F(L(s)) : await Y.handleRequest(t) : x();
    } catch (r) {
      return R(r.message || r);
    }
  }
};
export {
  N as default
};
