var E = Object.defineProperty;
var L = (e) => {
  throw TypeError(e);
};
var U = (e, t, s) => t in e ? E(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var p = (e, t, s) => U(e, typeof t != "symbol" ? t + "" : t, s), x = (e, t, s) => t.has(e) || L("Cannot " + s);
var h = (e, t, s) => (x(e, t, "read from private field"), s ? s.call(e) : t.get(e)), b = (e, t, s) => t.has(e) ? L("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), g = (e, t, s, n) => (x(e, t, "write to private field"), n ? n.call(e, s) : t.set(e, s), s);
const j = "unauthorized", H = "internal server error", I = new Headers({
  "Content-type": "application/json"
}), W = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
new Headers({
  "Content-type": "text/html"
});
const k = (e, t = W) => new Response(e, {
  status: 200,
  headers: t
}), z = (e = j, t = 401, s = I) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: s
  }
), w = (e = H, t = 500, s = I) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: s
  }
);
async function y(e) {
  var i;
  const t = e.headers.get("content-type") || "";
  if (!t.includes("text/") && !t.includes("application/json") && !t.includes("application/javascript"))
    return e;
  const s = new CompressionStream("gzip"), n = (i = e.body) == null ? void 0 : i.pipeThrough(s), r = new Headers(e.headers);
  return r.set("content-encoding", "gzip"), new Response(n, {
    status: e.status,
    statusText: e.statusText,
    headers: r
  });
}
async function P(e) {
  if (e.headers.get("content-encoding") !== "gzip" || !e.body)
    return e;
  const s = new DecompressionStream("gzip"), n = e.body.pipeThrough(s), r = new Headers(e.headers);
  return r.delete("content-encoding"), new Request(e.url, {
    method: e.method,
    headers: r,
    body: n,
    redirect: e.redirect
  });
}
class v {
  constructor() {
    p(this, "limits");
    p(this, "usage");
    p(this, "queues");
    p(this, "lastCleanup");
    this.limits = /* @__PURE__ */ new Map(), this.usage = /* @__PURE__ */ new Map(), this.queues = /* @__PURE__ */ new Map(), this.lastCleanup = Date.now(), this.setDefaultLimits();
  }
  setDefaultLimits() {
    this.setLimit("install", {
      windowMs: 60 * 1e3,
      maxRequests: 1500,
      // 增加限制
      burstLimit: 300,
      // 允许更多突发请求
      concurrent: 50,
      // 增加并发数
      priority: 1
    }), this.setLimit("metadata", {
      windowMs: 60 * 1e3,
      maxRequests: 600,
      burstLimit: 100,
      concurrent: 20,
      priority: 2
    }), this.setLimit("tarball", {
      windowMs: 60 * 1e3,
      maxRequests: 1e3,
      burstLimit: 200,
      concurrent: 30,
      priority: 3
    }), this.setLimit("write", {
      windowMs: 60 * 1e3,
      maxRequests: 30,
      burstLimit: 10,
      concurrent: 5,
      priority: 4
    });
  }
  setLimit(t, s) {
    this.limits.set(t, s);
  }
  cleanup() {
    const t = Date.now();
    if (!(t - this.lastCleanup < 5 * 60 * 1e3)) {
      this.lastCleanup = t;
      for (const [s, n] of this.queues.entries())
        n.queue = n.queue.filter((r) => t - r.timestamp < 60 * 1e3), n.queue.length === 0 && n.processing === 0 && this.queues.delete(s);
      for (const [s, n] of this.usage.entries())
        n === 0 && this.usage.delete(s);
    }
  }
  async acquireToken(t, s, n) {
    this.cleanup();
    const r = this.limits.get(s);
    if (!r) return !0;
    const i = `${t}:${s}`, c = this.usage.get(i) || 0, u = this.getOrCreateQueue(i);
    return c >= r.concurrent ? u.queue.length >= r.burstLimit ? !1 : new Promise((m) => {
      u.queue.push({
        resolve: m,
        priority: n || r.priority,
        timestamp: Date.now()
      }), this.sortQueue(u);
    }) : (this.usage.set(i, c + 1), u.processing++, setTimeout(() => {
      this.releaseToken(i);
    }, r.windowMs), !0);
  }
  getOrCreateQueue(t) {
    let s = this.queues.get(t);
    return s || (s = {
      queue: [],
      processing: 0
    }, this.queues.set(t, s)), s;
  }
  sortQueue(t) {
    t.queue.sort((s, n) => s.priority !== n.priority ? s.priority - n.priority : s.timestamp - n.timestamp);
  }
  releaseToken(t) {
    const s = this.queues.get(t);
    if (!s) return;
    s.processing--;
    const n = this.usage.get(t) || 0;
    if (n > 0 && this.usage.set(t, n - 1), s.queue.length > 0 && s.processing < this.getLimitForKey(t).concurrent) {
      const r = s.queue.shift();
      r && (s.processing++, r.resolve(!0), setTimeout(() => {
        this.releaseToken(t);
      }, this.getLimitForKey(t).windowMs));
    }
  }
  getLimitForKey(t) {
    const s = t.split(":")[1];
    return this.limits.get(s) || {
      windowMs: 60 * 1e3,
      maxRequests: 100,
      burstLimit: 20,
      concurrent: 10,
      priority: 10
    };
  }
}
const O = new v();
function q(e, t) {
  if (!e || !t) return !1;
  for (let s = 0; s < t.length; s++)
    if (new RegExp(t[s].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(e))
      return !0;
  return !1;
}
var a;
class F {
  constructor() {
    b(this, a, []);
    g(this, a, []);
  }
  setEnv(t) {
    if (h(this, a).length || h(this, a) === "*" || !Reflect.has(t, "IP_WHITELIST")) return;
    const s = Reflect.get(t, "IP_WHITELIST") ?? "*";
    s === "*" ? g(this, a, "*") : g(this, a, s.split(",").map((n) => n.trim()));
  }
  checkIpIsWhitelisted(t) {
    const s = t.headers.get("x-real-ip") || "";
    return (typeof h(this, a) == "string" && h(this, a)) === "*" || Array.isArray(h(this, a)) && h(this, a).length === 0 ? !0 : Array.isArray(h(this, a)) && h(this, a).length > 0 ? q(s, h(this, a)) : !1;
  }
}
a = new WeakMap();
const C = new F(), f = {
  maxContentLength: 100 * 1024 * 1024,
  // 100MB
  allowedMethods: ["GET", "PUT", "POST", "DELETE"],
  blockedUserAgents: ["curl/7.29.0"]
  // 示例：阻止特定的User-Agent
};
async function N(e) {
  if (!f.allowedMethods.includes(e.method))
    return new Response("Method Not Allowed", { status: 405 });
  if (Number.parseInt(e.headers.get("content-length") || "0") > f.maxContentLength)
    return new Response("Content Too Large", { status: 413 });
  const s = e.headers.get("user-agent") || "";
  if (f.blockedUserAgents.some((u) => s.includes(u)))
    return new Response("Forbidden User Agent", { status: 403 });
  const n = e.headers.get("x-real-ip") || "", r = G(e.url, e.method);
  let i = 2;
  return _(e) && (i = 1), await O.acquireToken(n, r, i) ? null : new Response("Too Many Requests", {
    status: 429,
    headers: {
      "Retry-After": "60",
      "X-RateLimit-Reset": String(Math.floor(Date.now() / 1e3) + 60)
    }
  });
}
function _(e) {
  return (e.headers.get("user-agent") || "").includes("npm/") && e.method === "GET";
}
const K = {
  async fetch(e, t) {
    const s = Date.now(), n = e.headers.get("cf-connecting-ip") || "";
    try {
      const r = await N(e);
      if (r)
        return await d(e, r, s, n), r;
      const { pathname: i } = new URL(e.url);
      if (C.setEnv(t), !C.checkIpIsWhitelisted(e)) {
        const u = z();
        return await d(e, u, s, n), u;
      }
      if (i === "/favicon.ico") {
        const u = k("", e.headers);
        return await d(e, u, s, n), u;
      }
      const c = await Q(e);
      return await d(e, c, s, n), c;
    } catch (r) {
      const i = w(r.message);
      return await d(e, i, s, n), i;
    }
  }
};
function G(e, t) {
  return e.endsWith(".tgz") ? "tarball" : t !== "GET" ? "write" : "metadata";
}
async function d(e, t, s, n) {
  const r = Date.now() - s, i = new URL(e.url), c = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    method: e.method,
    path: i.pathname,
    status: t.status,
    duration: r,
    ip: n
  };
  console.log(JSON.stringify(c));
}
async function S(e, t = 3) {
  try {
    return await fetch(e);
  } catch (s) {
    if (t > 0)
      return await new Promise((n) => setTimeout(n, 1e3)), S(e, t - 1);
    throw s;
  }
}
async function Q(e) {
  const t = new URL(e.url), s = `https://registry.npmjs.org${t.pathname}${t.search}`, n = e.method, r = new Headers(e.headers), i = e.headers.get("authorization");
  if (i && r.set("authorization", i), n === "PUT") {
    const l = e.headers.get("content-length");
    l && r.set("content-length", l);
  }
  let c = e;
  e.headers.get("content-encoding") === "gzip" && (c = await P(e));
  const u = {
    method: n,
    headers: r,
    body: c.body || void 0,
    redirect: "follow"
  }, m = new Request(s, u);
  let o;
  try {
    o = await S(m);
  } catch (l) {
    return console.error("Failed to send request to npm registry", l), w();
  }
  if (t.pathname.startsWith("/-/") && t.pathname.includes("/-/package/") && t.pathname.endsWith("/dist-tags"))
    return $(e, o);
  const M = t.pathname.startsWith("/-/user/org.couchdb.user:");
  if (o.status === 201 && M && (o.headers.get("content-type") || "").includes("application/json")) {
    let T;
    try {
      T = await o.json();
    } catch (D) {
      return console.error("Failed to parse response JSON", D), w();
    }
    const A = JSON.stringify(T);
    return y(
      new Response(A, {
        status: o.status,
        statusText: o.statusText,
        headers: o.headers
      })
    );
  }
  if ([101, 204, 205, 304].includes(o.status))
    return new Response(null, {
      status: o.status,
      statusText: o.statusText,
      headers: o.headers
    });
  const R = o.headers.get("cache-control");
  return R && r.set("cache-control", R), y(
    new Response(o.body, {
      status: o.status,
      statusText: o.statusText,
      headers: o.headers
    })
  );
}
async function $(e, t) {
  return y(t);
}
export {
  K as default
};
