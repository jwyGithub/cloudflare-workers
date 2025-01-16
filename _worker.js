var x = Object.defineProperty;
var T = (r, t, e) => t in r ? x(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var u = (r, t, e) => T(r, typeof t != "symbol" ? t + "" : t, e);
const m = {
  // docker
  docker: "https://registry-1.docker.io",
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io",
  // npm
  npm: "https://registry.npmjs.org"
}, q = {
  docker: ["docker", "quay", "gcr", "k8s-gcr", "k8s", "ghcr", "cloudsmith"],
  npm: ["npm"]
}, U = /^\/v2\/[^/]+\/[^/]+\/[^/]+$/, O = /realm="(.+)",service="(.+)"(?:,scope="(.+)")?/, A = /^repository:((?:([^/]+)\/)?([^/:]+))(:(.+))?$/;
class C {
  constructor(t) {
    u(this, "request");
    u(this, "url");
    u(this, "authorization", "");
    u(this, "isDocker", !1);
    this.request = t, this.url = new URL(t.url);
  }
  async forward(t) {
    if (this.authorization = this.request.headers.get("Authorization") || "", this.isDocker = this.isDockerRegistry(), this.url.pathname === "/v2/") {
      const o = new URL(`${t}/v2/`), n = new Headers();
      this.authorization && n.set("Authorization", this.authorization);
      const i = await fetch(o.toString(), {
        method: this.request.method,
        headers: n,
        redirect: "follow"
      });
      if (i.status === 401) {
        const { realm: l, service: a } = this.parseAuthenticate(i);
        return n.set(
          "Www-Authenticate",
          `Bearer realm="https://${this.url.hostname}/v2/auth?get_token_url=${l}",service="${a}"`
        ), new Response("UNAUTHORIZED", { status: 401, headers: n });
      } else
        return i;
    }
    if (this.url.pathname === "/v2/auth") {
      const o = this.url.searchParams.get("get_token_url"), n = this.url.searchParams.get("service"), i = this.isDocker ? this.updateScope(this.url.searchParams.get("scope")) : this.url.searchParams.get("scope");
      return await this.getToken(o, n, i);
    }
    if (this.isDocker && this.isRegistryPath(this.url.pathname)) {
      const o = new URL(this.request.url);
      return o.pathname = o.pathname.replace("/v2/", "/v2/library/"), Response.redirect(o.href, 301);
    }
    const e = new URL(t + this.url.pathname), s = new Request(e, {
      method: this.request.method,
      headers: this.request.headers,
      redirect: "follow"
    });
    return await fetch(s);
  }
  /**
   * 判断请求是否是 Docker Registry 请求
   * @returns 是否是 Docker Registry 请求
   */
  isDockerRegistry() {
    return Object.keys(m).some((e) => this.url.hostname.startsWith(e));
  }
  /**
   * 判断路径是否是 Registry 路径
   * @param path 路径
   * @returns 是否是 Registry 路径
   */
  isRegistryPath(t) {
    return U.test(t);
  }
  /**
   * 更新 scope
   * @param scope scope
   * @returns 更新后的 scope
   */
  updateScope(t) {
    const [e, s, o] = t.match(A) || [];
    return o ? t : t.replace(/repository:([^:]+)/, "repository:library/$1");
  }
  /**
   * 解析认证信息
   * @param resp 响应
   * @returns 认证信息
   */
  parseAuthenticate(t) {
    const e = t.headers.get("www-authenticate"), [s, o, n, i] = (e == null ? void 0 : e.match(O)) ?? [];
    return {
      realm: o,
      service: n,
      scope: i
    };
  }
  /**
   * 获取 token
   * @param get_token_url 获取 token 的 url
   * @param service 服务
   * @param scope scope
   * @returns 响应
   */
  async getToken(t, e, s) {
    if (!t || !e || !s)
      return new Response("Failed to get request token url", { status: 400 });
    const o = new URLSearchParams();
    o.set("service", e), o.set("scope", s);
    const n = `${t}?${o.toString()}`;
    return await fetch(n);
  }
}
const w = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function g(r, t = w) {
  const {
    retries: e = w.retries,
    retryDelay: s = w.retryDelay,
    retryOnStatusCodes: o = w.retryOnStatusCodes,
    onError: n,
    ...i
  } = t;
  let l = 0;
  const a = async () => {
    l++;
    try {
      let c, h;
      r instanceof Request ? (h = r.url, c = new Request(r, i)) : (h = r.toString(), c = new Request(h, i));
      const d = await fetch(c), y = {
        status: d.status,
        statusText: d.statusText,
        headers: Object.fromEntries(d.headers.entries()),
        data: d,
        config: { url: h, ...i },
        ok: d.ok
      };
      if (o.includes(y.status) && l <= e) {
        if (n) {
          const p = n(new Error(`请求失败，状态码 ${y.status}`), l);
          p instanceof Promise && await p;
        }
        return await new Promise((p) => setTimeout(p, s)), a();
      }
      return y;
    } catch (c) {
      if (n) {
        const h = n(c, l);
        h instanceof Promise && await h;
      }
      if (l <= e)
        return await new Promise((h) => setTimeout(h, s)), a();
      throw c;
    }
  };
  return a();
}
function f(r) {
  const t = new Headers(r.headers);
  return t.set("Access-Control-Allow-Origin", "*"), t.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"), t.set("Access-Control-Allow-Headers", "Content-Type, Authorization"), new Response(r.body, {
    status: r.status,
    headers: t
  });
}
class E {
  constructor(t, e, s) {
    u(this, "request");
    u(this, "ctx");
    u(this, "url");
    this.request = t, this.ctx = s, this.url = new URL(t.url);
  }
  async forward(t) {
    if (this.request.method === "OPTIONS")
      return f(new Response(null));
    const e = `${t}${this.url.pathname}${this.url.search}`, s = this.request.method, o = new Headers(this.request.headers), n = this.url.pathname.startsWith("/-/user/org.couchdb.user:");
    if (s === "GET" && this.url.pathname.endsWith(".tgz")) {
      const c = caches.default, h = await c.match(this.request);
      if (h)
        return h;
      const d = {
        method: s,
        headers: o,
        redirect: "follow"
      }, y = new Request(e, d), { data: p, ok: k, status: R } = await g(y, { retries: 3 });
      if (k && R === 200) {
        const P = p.clone();
        this.ctx.waitUntil(c.put(this.request, P));
      }
      return p;
    }
    const i = {
      method: s,
      headers: o,
      body: this.request.body ? this.request.body : void 0,
      redirect: "follow"
    }, l = new Request(e, i), a = await g(l, { retries: 3 }).then((c) => c.data);
    if (a.status === 201 && n)
      return a;
    if ([101, 204, 205, 304].includes(a.status))
      return new Response(null, {
        status: a.status,
        statusText: a.statusText,
        headers: a.headers
      });
    if (s === "GET") {
      const c = new Headers(a.headers);
      return c.set("Cache-Control", "public, max-age=3600"), new Response(a.body, {
        status: a.status,
        statusText: a.statusText,
        headers: c
      });
    }
    return a;
  }
}
class S {
  constructor(t, e, s) {
    u(this, "dockerProxy");
    u(this, "npmProxy");
    u(this, "url");
    u(this, "upstreamConfig", {
      key: "docker",
      registry: m.docker
    });
    u(this, "upstreamGroup", "docker");
    this.url = new URL(t.url), this.dockerProxy = new C(t), this.npmProxy = new E(t, e, s);
  }
  /**
   * 匹配请求
   * @returns 响应
   */
  async match() {
    return this.upstreamConfig = this.getUpstreamConfig(), this.upstreamGroup = this.getUpstreamGroup(), this.upstreamGroup === "docker" ? await this.dockerProxy.forward(this.upstreamConfig.registry) : this.upstreamGroup === "npm" ? await this.npmProxy.forward(this.upstreamConfig.registry) : new Response("Not Found", { status: 404 });
  }
  /**
   * 获取上游地址
   * @returns 上游地址
   */
  getUpstreamConfig() {
    const e = Object.keys(m).find((s) => this.url.hostname.startsWith(s));
    return e ? {
      key: e,
      registry: m[e]
    } : {
      key: "docker",
      registry: m.docker
    };
  }
  /**
   * 获取上游所属的组
   * @returns 上游组
   */
  getUpstreamGroup() {
    for (const [t, e] of Object.entries(q))
      if (e.includes(this.upstreamConfig.key))
        return t;
    return "docker";
  }
}
const v = {
  async fetch(r, t, e) {
    try {
      return r.method === "OPTIONS" || r.method === "HEAD" ? f(new Response(null)) : await new S(r, t, e).match();
    } catch (s) {
      return new Response(s.message || s, { status: 500 });
    }
  }
};
export {
  v as default
};
