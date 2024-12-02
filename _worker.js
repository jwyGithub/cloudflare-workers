var g = (e) => {
  throw TypeError(e);
};
var y = (e, t, r) => t.has(e) || g("Cannot " + r);
var c = (e, t, r) => (y(e, t, "read from private field"), r ? r.call(e) : t.get(e)), b = (e, t, r) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), m = (e, t, r, o) => (y(e, t, "write to private field"), o ? o.call(e, r) : t.set(e, r), r);
const x = "unauthorized", U = "internal server error", v = new Headers({
  "Content-type": "application/json"
});
new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const $ = new Headers({
  "Content-type": "text/html"
}), T = (e, t = $) => new Response(e, {
  headers: t
}), R = (e = x, t = 401, r = v) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: r
  }
), j = (e = U, t = 500, r = v) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: r
  }
), C = () => ({
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
        const CONFIG = ${JSON.stringify(C())}

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
      const n = await fetch(e, t);
      if (n.ok || n.status === 401)
        return n;
      throw new Error(`HTTP Error: ${n.status}`);
    } catch (n) {
      if (o = n, s === r - 1) break;
      await new Promise((i) => setTimeout(i, 2 ** s * 1e3));
    }
  throw o;
}
const u = {
  docker: {
    baseUrl: "https://registry-1.docker.io",
    authUrl: "https://auth.docker.io/token",
    needAuth: !0,
    headers: {
      "Docker-Distribution-Api-Version": "registry/2.0"
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
function E(e) {
  const t = e.startsWith("/") ? e.slice(1) : e;
  if (t === "v2" || t === "v2/")
    return {
      isV2Check: !0,
      registry: "docker",
      // 默认使用 docker registry
      repository: "",
      config: u.docker
    };
  const r = t.startsWith("v2/") ? t.slice(3).split("/") : t.split("/");
  if (r[0] === "library")
    return {
      isV2Check: !1,
      registry: "docker",
      repository: r.join("/"),
      // 保持完整路径，包括 library
      config: u.docker
    };
  const o = r[0];
  return u[o] ? {
    isV2Check: !1,
    registry: o,
    repository: r.slice(1).join("/"),
    config: u[o]
  } : {
    isV2Check: !1,
    registry: "docker",
    repository: r.join("/"),
    config: u.docker
  };
}
async function I(e, t) {
  var l, d, p;
  if (!e.authUrl)
    throw new Error("Auth URL not configured");
  const r = ((l = e.auth) == null ? void 0 : l.service) || new URL(e.baseUrl).hostname, o = ((p = (d = e.auth) == null ? void 0 : d.formatScope) == null ? void 0 : p.call(d, t)) || `repository:${t}:pull`, s = new URL(e.authUrl);
  s.searchParams.set("service", r), s.searchParams.set("scope", o);
  const n = await A(s.toString(), {
    headers: {
      Accept: "application/json"
    }
  });
  if (!n.ok)
    throw new Error(`Failed to get auth token: ${n.statusText}`);
  return (await n.json()).token;
}
function h(e = new Headers()) {
  return e.set("Access-Control-Allow-Origin", "*"), e.set("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS"), e.set("Access-Control-Allow-Headers", "Authorization, Content-Type, Docker-Distribution-Api-Version"), e.set("Access-Control-Max-Age", "86400"), e;
}
function k(e, t) {
  var n, i, l;
  const r = e.authUrl, o = ((n = e.auth) == null ? void 0 : n.service) || new URL(e.baseUrl).hostname, s = ((l = (i = e.auth) == null ? void 0 : i.formatScope) == null ? void 0 : l.call(i, t)) || `repository:${t}:pull`;
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Bearer realm="${r}",service="${o}",scope="${s}"`,
      "Docker-Distribution-Api-Version": "registry/2.0",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
}
async function S(e, t) {
  const r = {
    headers: new Headers({
      Host: "auth.docker.io",
      "User-Agent": e.headers.get("User-Agent") || "",
      Accept: e.headers.get("Accept") || "",
      "Accept-Language": e.headers.get("Accept-Language") || "",
      "Accept-Encoding": e.headers.get("Accept-Encoding") || "",
      Connection: "keep-alive",
      "Cache-Control": "max-age=0"
    })
  }, o = `https://auth.docker.io${t.pathname}${t.search}`, s = await fetch(
    new Request(o, {
      method: e.method,
      headers: r.headers
    })
  ), n = new Headers(s.headers);
  return h(n), new Response(s.body, {
    status: s.status,
    headers: n
  });
}
function f(e, t) {
  const r = new Headers(e.headers);
  if (h(r), r.has("Www-Authenticate")) {
    const o = r.get("Www-Authenticate"), s = /https:\/\/auth.docker.io/g;
    r.set("Www-Authenticate", (o == null ? void 0 : o.replace(s, t)) || "");
  }
  return r.set("Cache-Control", "public, max-age=3600"), new Response(e.body, {
    status: e.status,
    headers: r
  });
}
function L(e) {
  return !e.startsWith("/v2/library/") && /^\/v2\/[^/]+\/[^/]+/.test(e) ? e.replace("/v2/", "/v2/library/") : e;
}
async function D(e) {
  try {
    if (e.method === "OPTIONS")
      return new Response(null, {
        headers: h()
      });
    const t = new URL(e.url), r = `https://${t.hostname}`;
    if (t.pathname.includes("/token"))
      return S(e, t);
    const o = E(t.pathname);
    if (o.isV2Check)
      return new Response(null, {
        status: 200,
        headers: h(
          new Headers({
            "Docker-Distribution-Api-Version": "registry/2.0"
          })
        )
      });
    if (!o.config)
      return new Response("Registry configuration not found", {
        status: 500,
        headers: h()
      });
    o.registry === "docker" && (t.pathname = L(t.pathname));
    let s = "";
    if (o.config.needAuth)
      try {
        s = await I(o.config, o.repository);
      } catch (d) {
        return console.error("Auth Error:", d), f(k(o.config, o.repository), r);
      }
    const n = o.config.formatTargetUrl(o.config.baseUrl, o.repository), i = new Headers(e.headers);
    if (i.set("Host", new URL(o.config.baseUrl).hostname), s && i.set("Authorization", `Bearer ${s}`), o.config.headers)
      for (const [d, p] of Object.entries(o.config.headers))
        i.set(d, p);
    const l = await A(n, {
      method: e.method,
      headers: i,
      body: e.body,
      redirect: "follow"
    });
    return l.status === 401 ? f(k(o.config, o.repository), r) : f(l, r);
  } catch (t) {
    return console.error("Proxy Error:", t), new Response(`Proxy error: ${t.message}`, {
      status: 502,
      headers: h(
        new Headers({
          "Content-Type": "text/plain"
        })
      )
    });
  }
}
function P(e, t) {
  if (!e || !t) return !1;
  for (let r = 0; r < t.length; r++)
    if (new RegExp(t[r].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(e))
      return !0;
  return !1;
}
var a;
class W {
  constructor() {
    b(this, a, []);
    m(this, a, []);
  }
  setEnv(t) {
    if (c(this, a).length || c(this, a) === "*" || !Reflect.has(t, "IP_WHITELIST")) return;
    const r = Reflect.get(t, "IP_WHITELIST") ?? "*";
    r === "*" ? m(this, a, "*") : m(this, a, r.split(",").map((o) => o.trim()));
  }
  checkIpIsWhitelisted(t) {
    const r = t.headers.get("x-real-ip") || "";
    return (typeof c(this, a) == "string" && c(this, a)) === "*" || Array.isArray(c(this, a)) && c(this, a).length === 0 ? !0 : Array.isArray(c(this, a)) && c(this, a).length > 0 ? P(r, c(this, a)) : !1;
  }
}
a = new WeakMap();
const w = new W(), F = {
  async fetch(e, t) {
    try {
      const { pathname: r, host: o } = new URL(e.url);
      return w.setEnv(t), w.checkIpIsWhitelisted(e) ? r === "/" ? T(H(o)) : await D(e) : R();
    } catch (r) {
      return j(r.message || r);
    }
  }
};
export {
  F as default
};
