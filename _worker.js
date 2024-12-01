var S = Object.defineProperty;
var R = (t) => {
  throw TypeError(t);
};
var I = (t, e, r) => e in t ? S(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var f = (t, e, r) => I(t, typeof e != "symbol" ? e + "" : e, r), j = (t, e, r) => e.has(t) || R("Cannot " + r);
var h = (t, e, r) => (j(t, e, "read from private field"), r ? r.call(t) : e.get(t)), C = (t, e, r) => e.has(t) ? R("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), y = (t, e, r, s) => (j(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r);
const U = "bad request", H = "unauthorized", F = "internal server error", v = new Headers({
  "Content-type": "application/json"
});
new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const M = new Headers({
  "Content-type": "text/html"
}), L = (t, e = M) => new Response(t, {
  headers: e
}), K = (t = U, e = 400, r = v) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: r
  }
), E = (t = H, e = 401, r = v) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: r
  }
), A = (t = F, e = 500, r = v) => Response.json(
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
}, z = (t) => Object.keys(g).reduce((e, r) => {
  var n;
  const s = g[r], { title: a, bash: o } = (n = s.useExample) == null ? void 0 : n.call(s, t);
  return e[a] = o, e;
}, {}), G = (t) => `<!DOCTYPE html>
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
        const CONFIG = ${JSON.stringify(z(t))}

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
class T {
  constructor(e = "docker-proxy") {
    f(this, "namespace");
    this.namespace = e;
  }
  generateCacheKey(e) {
    return `${this.namespace}:${e}`;
  }
  async get(e) {
    try {
      const r = this.generateCacheKey(e), a = await caches.default.match(r);
      return a ? await a.json() : null;
    } catch (r) {
      return console.error("Cache get error:", r), null;
    }
  }
  async set(e, r) {
    try {
      const s = this.generateCacheKey(e.key), a = caches.default, o = new Response(JSON.stringify(r), {
        headers: {
          "Cache-Control": e.cacheControl || `public, max-age=${e.ttl || 3600}`,
          "Content-Type": "application/json"
        }
      });
      await a.put(s, o);
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
async function w(t, e, r = {}) {
  const { retries: s = 3, backoff: a = 300, timeout: o = 3e4 } = r;
  let n = new Error("Failed to fetch");
  for (let i = 0; i < s; i++)
    try {
      const l = new AbortController(), u = setTimeout(() => l.abort(), o), d = await fetch(t, {
        ...e,
        signal: l.signal
      });
      if (clearTimeout(u), !d.ok && d.status !== 401)
        throw new Error(`HTTP Error: ${d.status}`);
      return d;
    } catch (l) {
      if (n = l, i === s - 1)
        break;
      await new Promise((u) => setTimeout(u, a * 2 ** i));
    }
  throw n;
}
function O(t) {
  const e = t.split("/").filter(Boolean);
  return e.length === 0 ? { registryType: "docker", imagePath: "/" } : e[0] in g ? {
    registryType: e.shift() || "docker",
    // 移除开头的斜杠，因为 baseUrl 会包含完整路径
    imagePath: e.join("/")
  } : {
    registryType: "docker",
    // 移除开头的斜杠
    imagePath: t.startsWith("/") ? t.slice(1) : t
  };
}
function B(t, e) {
  const r = new Headers(), s = g[t];
  return e && r.set("Authorization", e), s != null && s.headers && Object.entries(s.headers).forEach(([a, o]) => {
    r.set(a, o);
  }), r;
}
function D(t, e) {
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
async function P(t, e, r) {
  const s = new URL(e.realm);
  s.searchParams.set("service", e.service), e.scope && s.searchParams.set("scope", e.scope);
  const a = B(t, r);
  try {
    return await w(s.toString(), {
      method: "GET",
      headers: a
    });
  } catch (o) {
    return console.error(`Authentication failed for ${t}:`, o), E("Authentication failed");
  }
}
class W {
  constructor() {
    f(this, "cacheManager");
    this.cacheManager = new T();
  }
  async getToken(e, r, s) {
    const a = `token:${e}:${r.service}:${r.scope}:${s || ""}`, o = await this.cacheManager.get(a);
    if (o)
      return o.token;
    const n = await P(e, r, s);
    if (!n.ok)
      return null;
    const i = await n.json();
    return i.token && await this.cacheManager.set(
      {
        key: a,
        ttl: m.token.ttl
      },
      i
    ), i.token;
  }
}
class Y {
  constructor() {
    f(this, "cacheManager");
    f(this, "authService");
    this.cacheManager = new T(), this.authService = new W();
  }
  async handleRequest(e) {
    const r = new URL(e.url), { registryType: s, imagePath: a } = O(r.pathname), o = g[s];
    if (!o)
      return K("Unsupported registry type");
    try {
      const n = D(s, a), i = this.canUseCache(e, n);
      if (i) {
        const p = await this.getCachedResponse(s, n, e.method);
        if (p)
          return p;
      }
      const l = new Headers(e.headers);
      o.headers && Object.entries(o.headers).forEach(([p, b]) => {
        l.set(p, b);
      });
      const u = new URL(`${o.baseUrl}/v2/${n}`, o.baseUrl), d = await w(u.toString(), {
        method: e.method,
        headers: l,
        redirect: "follow",
        body: e.method === "GET" ? null : e.body
      });
      if (d.status === 401) {
        const p = d.headers.get("Www-Authenticate");
        if (p && o.authRequired) {
          const b = this.parseAuthInfo(p), x = await this.authService.getToken(s, b, e.headers.get("Authorization"));
          if (x) {
            l.set("Authorization", `Bearer ${x}`);
            const k = await w(u.toString(), {
              method: e.method,
              headers: l,
              redirect: "follow",
              body: e.method === "GET" ? null : e.body
            });
            return i && k.ok && await this.cacheResponse(s, n, k.clone(), e.method), k;
          }
        }
      }
      return i && d.ok && await this.cacheResponse(s, n, d.clone(), e.method), d;
    } catch (n) {
      return console.error("Registry proxy error:", n), A(`Registry error: ${n.message || n}`);
    }
  }
  canUseCache(e, r) {
    if (e.method !== "GET")
      return !1;
    const s = r.includes("/manifests/"), a = r.includes("/blobs/");
    return s ? m.manifest.enabled : a ? m.layer.enabled : !1;
  }
  async getCachedResponse(e, r, s) {
    const a = this.generateCacheKey(e, r, s), o = await this.cacheManager.get(a);
    if (o) {
      const n = r.includes("/manifests/"), i = r.includes("/blobs/"), l = n ? m.manifest.ttl : i ? m.layer.ttl : 3600;
      if (Date.now() - o.timestamp < l * 1e3)
        return new Response(JSON.stringify(o.body), {
          headers: new Headers(o.headers)
        });
    }
    return null;
  }
  async cacheResponse(e, r, s, a) {
    const o = r.includes("/manifests/"), n = r.includes("/blobs/"), i = o ? m.manifest.ttl : n ? m.layer.ttl : 3600, l = this.generateCacheKey(e, r, a), u = await s.clone().json(), d = Object.fromEntries(s.headers.entries());
    await this.cacheManager.set(
      {
        key: l,
        ttl: i
      },
      {
        body: u,
        headers: d,
        timestamp: Date.now()
      }
    );
  }
  generateCacheKey(e, r, s) {
    return `${e}:${r}:${s}`;
  }
  parseAuthInfo(e) {
    const r = e.match(/Bearer realm="([^"]+)",service="([^"]+)"(?:,scope="([^"]+)")?/);
    if (!r)
      throw new Error("Invalid WWW-Authenticate header");
    return {
      realm: r[1],
      service: r[2],
      scope: r[3]
    };
  }
}
function N(t, e) {
  if (!t || !e) return !1;
  for (let r = 0; r < e.length; r++)
    if (new RegExp(e[r].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(t))
      return !0;
  return !1;
}
var c;
class _ {
  constructor() {
    C(this, c, []);
    y(this, c, []);
  }
  setEnv(e) {
    if (h(this, c).length || h(this, c) === "*" || !Reflect.has(e, "IP_WHITELIST")) return;
    const r = Reflect.get(e, "IP_WHITELIST") ?? "*";
    r === "*" ? y(this, c, "*") : y(this, c, r.split(",").map((s) => s.trim()));
  }
  checkIpIsWhitelisted(e) {
    const r = e.headers.get("x-real-ip") || "";
    return (typeof h(this, c) == "string" && h(this, c)) === "*" || Array.isArray(h(this, c)) && h(this, c).length === 0 ? !0 : Array.isArray(h(this, c)) && h(this, c).length > 0 ? N(r, h(this, c)) : !1;
  }
}
c = new WeakMap();
const q = new Y(), $ = new _(), Q = {
  async fetch(t, e) {
    try {
      const { pathname: r, host: s } = new URL(t.url);
      return $.setEnv(e), $.checkIpIsWhitelisted(t) ? r === "/" ? L(G(s)) : await q.handleRequest(t) : E();
    } catch (r) {
      return A(r.message || r);
    }
  }
};
export {
  Q as default
};
