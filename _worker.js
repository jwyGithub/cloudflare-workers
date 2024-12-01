var A = Object.defineProperty;
var v = (t) => {
  throw TypeError(t);
};
var U = (t, e, r) => e in t ? A(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var g = (t, e, r) => U(t, typeof e != "symbol" ? e + "" : e, r), x = (t, e, r) => e.has(t) || v("Cannot " + r);
var h = (t, e, r) => (x(t, e, "read from private field"), r ? r.call(t) : e.get(t)), C = (t, e, r) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), y = (t, e, r, s) => (x(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r);
const S = "bad request", F = "unauthorized", I = "internal server error", k = new Headers({
  "Content-type": "application/json"
});
new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const H = new Headers({
  "Content-type": "text/html"
}), M = (t, e = H) => new Response(t, {
  headers: e
}), L = (t = S, e = 400, r = k) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: r
  }
), j = (t = F, e = 401, r = k) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: r
  }
), $ = (t = I, e = 500, r = k) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: r
  }
), f = {
  docker: {
    baseUrl: "https://registry-1.docker.io",
    authRequired: !0,
    // 改为 true，因为 Docker Hub 需要认证
    needLibrary: !0,
    authUrl: "https://auth.docker.io/token",
    // 添加认证 URL
    headers: {
      Accept: "application/vnd.docker.distribution.manifest.v2+json,application/vnd.docker.distribution.manifest.list.v2+json,application/vnd.oci.image.manifest.v1+json"
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
}, K = (t) => Object.keys(f).reduce((e, r) => {
  var a;
  const s = f[r], { title: n, bash: o } = (a = s.useExample) == null ? void 0 : a.call(s, t);
  return e[n] = o, e;
}, {}), z = (t) => `<!DOCTYPE html>
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
        const CONFIG = ${JSON.stringify(K(t))}

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
</html>`, u = {
  manifest: {
    enabled: !0,
    ttl: 3600
    // 1 hour
  },
  layer: {
    enabled: !0,
    ttl: 86400
    // 24 hours
  },
  token: {
    enabled: !0,
    ttl: 300
    // 5 minutes
  }
};
class E {
  constructor(e = "docker-proxy") {
    g(this, "namespace");
    this.namespace = e;
  }
  generateCacheKey(e) {
    return `${this.namespace}:${e}`;
  }
  async get(e) {
    try {
      const r = this.generateCacheKey(e), n = await caches.default.match(r);
      return n ? await n.json() : null;
    } catch (r) {
      return console.error("Cache get error:", r), null;
    }
  }
  async set(e, r) {
    try {
      const s = this.generateCacheKey(e.key), n = caches.default, o = new Response(JSON.stringify(r), {
        headers: {
          "Cache-Control": e.cacheControl || `public, max-age=${e.ttl || 3600}`,
          "Content-Type": "application/json"
        }
      });
      await n.put(s, o);
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
async function T(t, e, r = {}) {
  const { retries: s = 3, backoff: n = 300, timeout: o = 3e4 } = r;
  let a = new Error("Failed to fetch");
  for (let i = 0; i < s; i++)
    try {
      const c = new AbortController(), p = setTimeout(() => c.abort(), o), d = await fetch(t, {
        ...e,
        signal: c.signal
      });
      if (clearTimeout(p), !d.ok && d.status !== 401)
        throw new Error(`HTTP Error: ${d.status}`);
      return d;
    } catch (c) {
      if (a = c, i === s - 1)
        break;
      await new Promise((p) => setTimeout(p, n * 2 ** i));
    }
  throw a;
}
function G(t) {
  const e = t.split("/").filter(Boolean);
  return e.length === 0 ? { registryType: "docker", imagePath: "/" } : e[0] in f ? {
    registryType: e.shift() || "docker",
    // 移除开头的斜杠，因为 baseUrl 会包含完整路径
    imagePath: e.join("/")
  } : {
    registryType: "docker",
    // 移除开头的斜杠
    imagePath: t.startsWith("/") ? t.slice(1) : t
  };
}
function O(t, e) {
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
class D {
  constructor() {
    g(this, "cacheManager");
    this.cacheManager = new E();
  }
  async getToken(e, r, s) {
    const n = `token:${e}:${r.service}:${r.scope}`, o = await this.cacheManager.get(n);
    if (o)
      return o.token;
    const a = new URL(r.realm);
    a.searchParams.set("service", r.service), r.scope && a.searchParams.set("scope", r.scope);
    try {
      const i = await T(a.toString(), {
        method: "GET",
        headers: s ? { Authorization: s } : void 0
      });
      if (!i.ok)
        return console.error("Auth failed:", await i.text()), null;
      const c = await i.json();
      return u.token.enabled && c.token && await this.cacheManager.set(
        {
          key: n,
          ttl: u.token.ttl
        },
        c
      ), c.token;
    } catch (i) {
      return console.error("Error getting token:", i), null;
    }
  }
}
class B {
  constructor() {
    g(this, "cacheManager");
    g(this, "authService");
    this.cacheManager = new E(), this.authService = new D();
  }
  async handleRequest(e) {
    const r = new URL(e.url), { registryType: s, imagePath: n } = G(r.pathname), o = f[s];
    if (!o)
      return L("Unsupported registry type");
    try {
      const a = O(s, n), i = this.canUseCache(e, a);
      if (i) {
        const m = await this.getCachedResponse(s, a, e.method);
        if (m)
          return m;
      }
      const c = new Headers(e.headers);
      if (o.headers && Object.entries(o.headers).forEach(([m, b]) => {
        c.set(m, b);
      }), o.authRequired) {
        const m = o.scopeFormat ? o.scopeFormat(a) : `repository:${a}:pull`, b = {
          realm: o.authUrl || "https://auth.docker.io/token",
          service: "registry.docker.io",
          scope: m
        }, w = await this.authService.getToken(s, b, e.headers.get("Authorization"));
        if (!w)
          return j("Failed to obtain authentication token");
        c.set("Authorization", `Bearer ${w}`);
      }
      const p = new URL(`${o.baseUrl}/v2/${a}`, o.baseUrl), d = await T(p.toString(), {
        method: e.method,
        headers: c,
        redirect: "follow",
        body: e.method === "GET" ? null : e.body
      });
      return i && d.ok && await this.cacheResponse(s, a, d.clone(), e.method), d;
    } catch (a) {
      return console.error("Registry proxy error:", a), $(`Registry error: ${a.message || a}`);
    }
  }
  canUseCache(e, r) {
    if (e.method !== "GET")
      return !1;
    const s = r.includes("/manifests/"), n = r.includes("/blobs/");
    return s ? u.manifest.enabled : n ? u.layer.enabled : !1;
  }
  async getCachedResponse(e, r, s) {
    const n = this.generateCacheKey(e, r, s), o = await this.cacheManager.get(n);
    if (o) {
      const a = r.includes("/manifests/"), i = r.includes("/blobs/"), c = a ? u.manifest.ttl : i ? u.layer.ttl : 3600;
      if (Date.now() - o.timestamp < c * 1e3)
        return new Response(JSON.stringify(o.body), {
          headers: new Headers(o.headers)
        });
    }
    return null;
  }
  async cacheResponse(e, r, s, n) {
    const o = r.includes("/manifests/"), a = r.includes("/blobs/"), i = o ? u.manifest.ttl : a ? u.layer.ttl : 3600, c = this.generateCacheKey(e, r, n), p = await s.clone().json(), d = Object.fromEntries(s.headers.entries());
    await this.cacheManager.set(
      {
        key: c,
        ttl: i
      },
      {
        body: p,
        headers: d,
        timestamp: Date.now()
      }
    );
  }
  generateCacheKey(e, r, s) {
    return `${e}:${r}:${s}`;
  }
}
function P(t, e) {
  if (!t || !e) return !1;
  for (let r = 0; r < e.length; r++)
    if (new RegExp(e[r].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(t))
      return !0;
  return !1;
}
var l;
class q {
  constructor() {
    C(this, l, []);
    y(this, l, []);
  }
  setEnv(e) {
    if (h(this, l).length || h(this, l) === "*" || !Reflect.has(e, "IP_WHITELIST")) return;
    const r = Reflect.get(e, "IP_WHITELIST") ?? "*";
    r === "*" ? y(this, l, "*") : y(this, l, r.split(",").map((s) => s.trim()));
  }
  checkIpIsWhitelisted(e) {
    const r = e.headers.get("x-real-ip") || "";
    return (typeof h(this, l) == "string" && h(this, l)) === "*" || Array.isArray(h(this, l)) && h(this, l).length === 0 ? !0 : Array.isArray(h(this, l)) && h(this, l).length > 0 ? P(r, h(this, l)) : !1;
  }
}
l = new WeakMap();
const Y = new B(), R = new q(), _ = {
  async fetch(t, e) {
    try {
      const { pathname: r, host: s } = new URL(t.url);
      return R.setEnv(e), R.checkIpIsWhitelisted(t) ? r === "/" ? M(z(s)) : await Y.handleRequest(t) : j();
    } catch (r) {
      return $(r.message || r);
    }
  }
};
export {
  _ as default
};
