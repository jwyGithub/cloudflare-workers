var I = Object.defineProperty;
var M = (t) => {
  throw TypeError(t);
};
var U = (t, e, s) => e in t ? I(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var m = (t, e, s) => U(t, typeof e != "symbol" ? e + "" : e, s), E = (t, e, s) => e.has(t) || M("Cannot " + s);
var f = (t, e, s) => (E(t, e, "read from private field"), s ? s.call(t) : e.get(t)), C = (t, e, s) => e.has(t) ? M("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), y = (t, e, s, n) => (E(t, e, "write to private field"), n ? n.call(t, s) : e.set(t, s), s);
const T = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function j(t, e = T) {
  const {
    retries: s = T.retries,
    retryDelay: n = T.retryDelay,
    retryOnStatusCodes: r = T.retryOnStatusCodes,
    onError: i,
    ...u
  } = e;
  let a = 0;
  const c = async () => {
    a++;
    try {
      let o, d;
      t instanceof Request ? (d = t.url, o = new Request(t, u)) : (d = t.toString(), o = new Request(d, u));
      const l = await fetch(o), p = {
        status: l.status,
        statusText: l.statusText,
        headers: Object.fromEntries(l.headers.entries()),
        data: await l.json(),
        config: { url: d, ...u },
        ok: l.ok
      };
      if (r.includes(p.status) && a <= s) {
        if (i) {
          const g = i(new Error(`请求失败，状态码 ${p.status}`), a);
          g instanceof Promise && await g;
        }
        return await new Promise((g) => setTimeout(g, n)), c();
      }
      return p;
    } catch (o) {
      if (i) {
        const d = i(o, a);
        d instanceof Promise && await d;
      }
      if (a <= s)
        return await new Promise((d) => setTimeout(d, n)), c();
      throw o;
    }
  };
  return c();
}
const q = "unauthorized", A = "internal server error", P = new Headers({
  "Content-type": "application/json"
}), O = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
new Headers({
  "Content-type": "text/html"
});
const H = (t, e = O) => new Response(t, {
  status: 200,
  headers: e
}), W = (t = q, e = 401, s = P) => Response.json(
  {
    status: e,
    message: t
  },
  {
    status: e,
    statusText: t,
    headers: s
  }
), x = (t = A, e = 500, s = P) => Response.json(
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
class k {
  constructor() {
    m(this, "buffer");
    this.buffer = new Uint8Array(0);
  }
  transform(e, s) {
    const n = new Uint8Array(this.buffer.length + e.length);
    n.set(this.buffer), n.set(e, this.buffer.length), this.buffer = n;
    let r = 0;
    for (let i = 0; i < this.buffer.length; i++)
      if (this.buffer[i] === 10) {
        try {
          const u = this.buffer.slice(r, i), a = new TextDecoder().decode(u);
          if (a.trim()) {
            const c = JSON.parse(a);
            this.handleProgressData(c, s);
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
    const { name: s, completed: n, total: r } = e.data, i = r > 0 ? Math.round(n / r * 100) : 0, u = 20, a = Math.round(i / 100 * u), c = u - a, o = `[${"=".repeat(a)}${" ".repeat(c)}]`;
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
async function b(t) {
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
async function z(t) {
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
class N {
  constructor() {
    m(this, "limits");
    m(this, "usage");
    m(this, "queues");
    m(this, "lastCleanup");
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
    const i = `${e}:${s}`, u = this.usage.get(i) || 0, a = this.getOrCreateQueue(i);
    return u >= r.concurrent ? a.queue.length >= r.burstLimit ? !1 : new Promise((c) => {
      a.queue.push({
        resolve: c,
        priority: n || r.priority,
        timestamp: Date.now()
      }), this.sortQueue(a);
    }) : (this.usage.set(i, u + 1), a.processing++, setTimeout(() => {
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
const v = new N();
function F(t, e) {
  if (!t || !e) return !1;
  for (let s = 0; s < e.length; s++)
    if (new RegExp(e[s].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(t))
      return !0;
  return !1;
}
var h;
class J {
  constructor() {
    C(this, h, []);
    y(this, h, []);
  }
  setEnv(e) {
    if (f(this, h).length || f(this, h) === "*" || !Reflect.has(e, "IP_WHITELIST")) return;
    const s = Reflect.get(e, "IP_WHITELIST") ?? "*";
    s === "*" ? y(this, h, "*") : y(this, h, s.split(",").map((n) => n.trim()));
  }
  checkIpIsWhitelisted(e) {
    const s = e.headers.get("x-real-ip") || "";
    return (typeof f(this, h) == "string" && f(this, h)) === "*" || Array.isArray(f(this, h)) && f(this, h).length === 0 ? !0 : Array.isArray(f(this, h)) && f(this, h).length > 0 ? F(s, f(this, h)) : !1;
  }
}
h = new WeakMap();
const D = new J(), R = {
  maxContentLength: 100 * 1024 * 1024,
  // 100MB
  allowedMethods: ["GET", "PUT", "POST", "DELETE"],
  blockedUserAgents: ["curl/7.29.0"]
  // 示例：阻止特定的User-Agent
};
async function _(t) {
  if (!R.allowedMethods.includes(t.method))
    return new Response("Method Not Allowed", { status: 405 });
  if (Number.parseInt(t.headers.get("content-length") || "0") > R.maxContentLength)
    return new Response("Content Too Large", { status: 413 });
  const s = t.headers.get("user-agent") || "";
  if (R.blockedUserAgents.some((a) => s.includes(a)))
    return new Response("Forbidden User Agent", { status: 403 });
  const n = t.headers.get("x-real-ip") || "", r = G(t.url, t.method);
  let i = 2;
  return L(t) && (i = 1), await v.acquireToken(n, r, i) ? null : new Response("Too Many Requests", {
    status: 429,
    headers: {
      "Retry-After": "60",
      "X-RateLimit-Reset": String(Math.floor(Date.now() / 1e3) + 60)
    }
  });
}
async function B(t) {
  const e = t.headers.get("content-type") || "", s = t.headers.get("content-encoding");
  if (e.includes("application/json") && (t.headers.get("npm-notice") || t.headers.get("npm-in-progress"))) {
    const n = new Headers(t.headers), r = ["npm-notice", "npm-in-progress", "npm-progress", "npm-json", "npm-in-progress-details"];
    for (const c of r) {
      const o = t.headers.get(c);
      o && n.set(c, o);
    }
    let i = t.body;
    if (s === "gzip" && i) {
      const c = new DecompressionStream("gzip");
      i = i == null ? void 0 : i.pipeThrough(c);
    }
    const u = new TransformStream(new k()), a = i == null ? void 0 : i.pipeThrough(u);
    return new Response(a, {
      status: t.status,
      statusText: t.statusText,
      headers: n
    });
  }
  return t;
}
function L(t) {
  const e = t.headers.get("user-agent") || "", s = t.headers.get("accept") || "";
  return (e.includes("npm/") || e.includes("Node")) && t.method === "GET" && s.includes("application/json");
}
const X = {
  async fetch(t, e) {
    const s = Date.now(), n = t.headers.get("cf-connecting-ip") || "";
    try {
      const r = await _(t);
      if (r)
        return await w(t, r, s, n), r;
      const { pathname: i } = new URL(t.url);
      if (D.setEnv(e), !D.checkIpIsWhitelisted(t)) {
        const a = W();
        return await w(t, a, s, n), a;
      }
      if (i === "/favicon.ico") {
        const a = H("", t.headers);
        return await w(t, a, s, n), a;
      }
      const u = await Q(t);
      return await w(t, u, s, n), u;
    } catch (r) {
      const i = x(r.message);
      return await w(t, i, s, n), i;
    }
  }
};
function G(t, e) {
  return t.endsWith(".tgz") ? "tarball" : e !== "GET" ? "write" : "metadata";
}
async function w(t, e, s, n) {
  const r = Date.now() - s, i = new URL(t.url), u = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    method: t.method,
    path: i.pathname,
    status: e.status,
    duration: r,
    ip: n
  };
  console.log(JSON.stringify(u));
}
async function Q(t) {
  const e = new URL(t.url), s = `https://registry.npmjs.org${e.pathname}${e.search}`, n = t.method, r = new Headers(t.headers);
  r.set("accept", "application/json"), L(t) && (r.set("npm-in-progress", "1"), r.set("npm-progress", "true"));
  const i = t.headers.get("authorization");
  if (i && r.set("authorization", i), n === "PUT") {
    const p = t.headers.get("content-length");
    p && r.set("content-length", p);
  }
  let u = t;
  t.headers.get("content-encoding") === "gzip" && (u = await z(t));
  const a = {
    method: n,
    headers: r,
    body: u.body || void 0,
    redirect: "follow"
  }, c = new Request(s, a);
  let o;
  try {
    o = await j(c).then((p) => p.data);
  } catch (p) {
    return console.error("Failed to send request to npm registry", p), x();
  }
  if (L(t))
    return B(o);
  if (e.pathname.startsWith("/-/") && e.pathname.includes("/-/package/") && e.pathname.endsWith("/dist-tags"))
    return K(t, o);
  const d = e.pathname.startsWith("/-/user/org.couchdb.user:");
  if (o.status === 201 && d && (o.headers.get("content-type") || "").includes("application/json")) {
    let g;
    try {
      g = await o.json();
    } catch ($) {
      return console.error("Failed to parse response JSON", $), x();
    }
    const S = JSON.stringify(g);
    return o.headers.set("content-length", String(S.length)), o.headers.set("content-type", "application/json; charset=utf-8"), b(
      new Response(S, {
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
  const l = o.headers.get("cache-control");
  return l && r.set("cache-control", l), b(
    new Response(o.body, {
      status: o.status,
      statusText: o.statusText,
      headers: o.headers
    })
  );
}
async function K(t, e) {
  return b(e);
}
export {
  X as default
};
