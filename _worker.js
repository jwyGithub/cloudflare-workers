var $ = Object.defineProperty;
var b = (t) => {
  throw TypeError(t);
};
var A = (t, e, s) => e in t ? $(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var d = (t, e, s) => A(t, typeof e != "symbol" ? e + "" : e, s), L = (t, e, s) => e.has(t) || b("Cannot " + s);
var p = (t, e, s) => (L(t, e, "read from private field"), s ? s.call(t) : e.get(t)), M = (t, e, s) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), g = (t, e, s, n) => (L(t, e, "write to private field"), n ? n.call(t, s) : e.set(t, s), s);
const P = "unauthorized", j = "internal server error", E = new Headers({
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
const H = (t, e = W) => new Response(t, {
  status: 200,
  headers: e
}), q = (t = P, e = 401, s = E) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: s
  }
), w = (t = j, e = 500, s = E) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: s
  }
);
class z {
  constructor() {
    d(this, "buffer");
    this.buffer = new Uint8Array(0);
  }
  transform(e, s) {
    const n = new Uint8Array(this.buffer.length + e.length);
    n.set(this.buffer), n.set(e, this.buffer.length), this.buffer = n;
    let r = 0;
    for (let i = 0; i < this.buffer.length; i++)
      if (this.buffer[i] === 10) {
        try {
          const c = this.buffer.slice(r, i), a = new TextDecoder().decode(c);
          if (a.trim()) {
            const h = JSON.parse(a);
            this.handleProgressData(h, s);
          }
        } catch {
          s.enqueue(this.buffer.slice(r, i)), s.enqueue(new Uint8Array([10]));
        }
        r = i + 1;
      }
    r < this.buffer.length ? this.buffer = this.buffer.slice(r) : this.buffer = new Uint8Array(0);
  }
  flush(e) {
    if (this.buffer.length > 0)
      try {
        const s = new TextDecoder().decode(this.buffer);
        if (s.trim()) {
          const n = JSON.parse(s);
          this.handleProgressData(n, e);
        }
      } catch {
        this.buffer.length > 0 && (e.enqueue(this.buffer), e.enqueue(new Uint8Array([10])));
      }
  }
  handleProgressData(e, s) {
    if (e.type === "progress") {
      const n = this.formatProgressMessage(e);
      s.enqueue(new TextEncoder().encode(`${n}
`));
    } else if (e.type === "status") {
      const n = this.formatStatusMessage(e);
      s.enqueue(new TextEncoder().encode(`${n}
`));
    } else if (e.type === "error") {
      const n = this.formatErrorMessage(e);
      s.enqueue(new TextEncoder().encode(`${n}
`));
    } else
      s.enqueue(new TextEncoder().encode(`${JSON.stringify(e)}
`));
  }
  formatProgressMessage(e) {
    if (!e.data) return "";
    const { name: s, completed: n, total: r } = e.data, i = r > 0 ? Math.round(n / r * 100) : 0, c = 20, a = Math.round(i / 100 * c), h = c - a, o = `[${"=".repeat(a)}${" ".repeat(h)}]`;
    return `${s} ${o} ${i}% (${n}/${r})`;
  }
  formatStatusMessage(e) {
    if (!e.data) return "";
    const { status: s, name: n } = e.data;
    return `${s}: ${n}`;
  }
  formatErrorMessage(e) {
    return e.error ? `Error: ${e.error.message || "Unknown error"}` : "";
  }
}
async function y(t) {
  var i;
  const e = t.headers.get("content-type") || "";
  if (!e.includes("text/") && !e.includes("application/json") && !e.includes("application/javascript"))
    return t;
  const s = new CompressionStream("gzip"), n = (i = t.body) == null ? void 0 : i.pipeThrough(s), r = new Headers(t.headers);
  return r.set("content-encoding", "gzip"), new Response(n, {
    status: t.status,
    statusText: t.statusText,
    headers: r
  });
}
async function N(t) {
  if (t.headers.get("content-encoding") !== "gzip" || !t.body)
    return t;
  const s = new DecompressionStream("gzip"), n = t.body.pipeThrough(s), r = new Headers(t.headers);
  return r.delete("content-encoding"), new Request(t.url, {
    method: t.method,
    headers: r,
    body: n,
    redirect: t.redirect
  });
}
class O {
  constructor() {
    d(this, "limits");
    d(this, "usage");
    d(this, "queues");
    d(this, "lastCleanup");
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
  setLimit(e, s) {
    this.limits.set(e, s);
  }
  cleanup() {
    const e = Date.now();
    if (!(e - this.lastCleanup < 5 * 60 * 1e3)) {
      this.lastCleanup = e;
      for (const [s, n] of this.queues.entries())
        n.queue = n.queue.filter((r) => e - r.timestamp < 60 * 1e3), n.queue.length === 0 && n.processing === 0 && this.queues.delete(s);
      for (const [s, n] of this.usage.entries())
        n === 0 && this.usage.delete(s);
    }
  }
  async acquireToken(e, s, n) {
    this.cleanup();
    const r = this.limits.get(s);
    if (!r) return !0;
    const i = `${e}:${s}`, c = this.usage.get(i) || 0, a = this.getOrCreateQueue(i);
    return c >= r.concurrent ? a.queue.length >= r.burstLimit ? !1 : new Promise((h) => {
      a.queue.push({
        resolve: h,
        priority: n || r.priority,
        timestamp: Date.now()
      }), this.sortQueue(a);
    }) : (this.usage.set(i, c + 1), a.processing++, setTimeout(() => {
      this.releaseToken(i);
    }, r.windowMs), !0);
  }
  getOrCreateQueue(e) {
    let s = this.queues.get(e);
    return s || (s = {
      queue: [],
      processing: 0
    }, this.queues.set(e, s)), s;
  }
  sortQueue(e) {
    e.queue.sort((s, n) => s.priority !== n.priority ? s.priority - n.priority : s.timestamp - n.timestamp);
  }
  releaseToken(e) {
    const s = this.queues.get(e);
    if (!s) return;
    s.processing--;
    const n = this.usage.get(e) || 0;
    if (n > 0 && this.usage.set(e, n - 1), s.queue.length > 0 && s.processing < this.getLimitForKey(e).concurrent) {
      const r = s.queue.shift();
      r && (s.processing++, r.resolve(!0), setTimeout(() => {
        this.releaseToken(e);
      }, this.getLimitForKey(e).windowMs));
    }
  }
  getLimitForKey(e) {
    const s = e.split(":")[1];
    return this.limits.get(s) || {
      windowMs: 60 * 1e3,
      maxRequests: 100,
      burstLimit: 20,
      concurrent: 10,
      priority: 10
    };
  }
}
const k = new O();
function v(t, e) {
  if (!t || !e) return !1;
  for (let s = 0; s < e.length; s++)
    if (new RegExp(e[s].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(t))
      return !0;
  return !1;
}
var u;
class F {
  constructor() {
    M(this, u, []);
    g(this, u, []);
  }
  setEnv(e) {
    if (p(this, u).length || p(this, u) === "*" || !Reflect.has(e, "IP_WHITELIST")) return;
    const s = Reflect.get(e, "IP_WHITELIST") ?? "*";
    s === "*" ? g(this, u, "*") : g(this, u, s.split(",").map((n) => n.trim()));
  }
  checkIpIsWhitelisted(e) {
    const s = e.headers.get("x-real-ip") || "";
    return (typeof p(this, u) == "string" && p(this, u)) === "*" || Array.isArray(p(this, u)) && p(this, u).length === 0 ? !0 : Array.isArray(p(this, u)) && p(this, u).length > 0 ? v(s, p(this, u)) : !1;
  }
}
u = new WeakMap();
const S = new F(), m = {
  maxContentLength: 100 * 1024 * 1024,
  // 100MB
  allowedMethods: ["GET", "PUT", "POST", "DELETE"],
  blockedUserAgents: ["curl/7.29.0"]
  // 示例：阻止特定的User-Agent
};
async function J(t) {
  if (!m.allowedMethods.includes(t.method))
    return new Response("Method Not Allowed", { status: 405 });
  if (Number.parseInt(t.headers.get("content-length") || "0") > m.maxContentLength)
    return new Response("Content Too Large", { status: 413 });
  const s = t.headers.get("user-agent") || "";
  if (m.blockedUserAgents.some((a) => s.includes(a)))
    return new Response("Forbidden User Agent", { status: 403 });
  const n = t.headers.get("x-real-ip") || "", r = B(t.url, t.method);
  let i = 2;
  return T(t) && (i = 1), await k.acquireToken(n, r, i) ? null : new Response("Too Many Requests", {
    status: 429,
    headers: {
      "Retry-After": "60",
      "X-RateLimit-Reset": String(Math.floor(Date.now() / 1e3) + 60)
    }
  });
}
async function _(t) {
  const e = t.headers.get("content-type") || "", s = t.headers.get("content-encoding");
  if (e.includes("application/json") && (t.headers.get("npm-notice") || t.headers.get("npm-in-progress"))) {
    const n = new Headers(t.headers), r = ["npm-notice", "npm-in-progress", "npm-progress", "npm-json", "npm-in-progress-details"];
    for (const h of r) {
      const o = t.headers.get(h);
      o && n.set(h, o);
    }
    let i = t.body;
    if (s === "gzip" && i) {
      const h = new DecompressionStream("gzip");
      i = i == null ? void 0 : i.pipeThrough(h);
    }
    const c = new TransformStream(new z()), a = i == null ? void 0 : i.pipeThrough(c);
    return new Response(a, {
      status: t.status,
      statusText: t.statusText,
      headers: n
    });
  }
  return t;
}
function T(t) {
  const e = t.headers.get("user-agent") || "", s = t.headers.get("accept") || "";
  return (e.includes("npm/") || e.includes("Node")) && t.method === "GET" && s.includes("application/json");
}
const V = {
  async fetch(t, e) {
    const s = Date.now(), n = t.headers.get("cf-connecting-ip") || "";
    try {
      const r = await J(t);
      if (r)
        return await l(t, r, s, n), r;
      const { pathname: i } = new URL(t.url);
      if (S.setEnv(e), !S.checkIpIsWhitelisted(t)) {
        const a = q();
        return await l(t, a, s, n), a;
      }
      if (i === "/favicon.ico") {
        const a = H("", t.headers);
        return await l(t, a, s, n), a;
      }
      const c = await G(t);
      return await l(t, c, s, n), c;
    } catch (r) {
      const i = w(r.message);
      return await l(t, i, s, n), i;
    }
  }
};
function B(t, e) {
  return t.endsWith(".tgz") ? "tarball" : e !== "GET" ? "write" : "metadata";
}
async function l(t, e, s, n) {
  const r = Date.now() - s, i = new URL(t.url), c = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    method: t.method,
    path: i.pathname,
    status: e.status,
    duration: r,
    ip: n
  };
  console.log(JSON.stringify(c));
}
async function C(t, e = 3) {
  try {
    return await fetch(t);
  } catch (s) {
    if (e > 0)
      return await new Promise((n) => setTimeout(n, 1e3)), C(t, e - 1);
    throw s;
  }
}
async function G(t) {
  const e = new URL(t.url), s = `https://registry.npmjs.org${e.pathname}${e.search}`, n = t.method, r = new Headers(t.headers);
  r.set("accept", "application/json"), T(t) && (r.set("npm-in-progress", "1"), r.set("npm-progress", "true"));
  const i = t.headers.get("authorization");
  if (i && r.set("authorization", i), n === "PUT") {
    const f = t.headers.get("content-length");
    f && r.set("content-length", f);
  }
  let c = t;
  t.headers.get("content-encoding") === "gzip" && (c = await N(t));
  const a = {
    method: n,
    headers: r,
    body: c.body || void 0,
    redirect: "follow"
  }, h = new Request(s, a);
  let o;
  try {
    o = await C(h);
  } catch (f) {
    return console.error("Failed to send request to npm registry", f), w();
  }
  if (T(t))
    return _(o);
  if (e.pathname.startsWith("/-/") && e.pathname.includes("/-/package/") && e.pathname.endsWith("/dist-tags"))
    return Q(t, o);
  const D = e.pathname.startsWith("/-/user/org.couchdb.user:");
  if (o.status === 201 && D && (o.headers.get("content-type") || "").includes("application/json")) {
    let x;
    try {
      x = await o.json();
    } catch (U) {
      return console.error("Failed to parse response JSON", U), w();
    }
    const I = JSON.stringify(x);
    return y(
      new Response(I, {
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
async function Q(t, e) {
  return y(e);
}
export {
  V as default
};
