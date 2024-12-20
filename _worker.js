var b = Object.defineProperty;
var S = (e, t, s) => t in e ? b(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var f = (e, t, s) => S(e, typeof t != "symbol" ? t + "" : t, s);
const m = {
  /** 默认不启用重试 */
  retries: 0,
  /** 默认重试间隔（毫秒） */
  retryDelay: 1e3,
  /** 默认需要重试的状态码 */
  retryOnStatusCodes: [500, 502, 503, 504]
};
async function L(e, t = m) {
  const {
    retries: s = m.retries,
    retryDelay: n = m.retryDelay,
    retryOnStatusCodes: r = m.retryOnStatusCodes,
    onError: o,
    ...c
  } = t;
  let a = 0;
  const u = async () => {
    a++;
    try {
      let i, d;
      e instanceof Request ? (d = e.url, i = new Request(e, c)) : (d = e.toString(), i = new Request(d, c));
      const p = await fetch(i), h = {
        status: p.status,
        statusText: p.statusText,
        headers: Object.fromEntries(p.headers.entries()),
        data: p,
        config: { url: d, ...c },
        ok: p.ok
      };
      if (r.includes(h.status) && a <= s) {
        if (o) {
          const g = o(new Error(`请求失败，状态码 ${h.status}`), a);
          g instanceof Promise && await g;
        }
        return await new Promise((g) => setTimeout(g, n)), u();
      }
      return h;
    } catch (i) {
      if (o) {
        const d = o(i, a);
        d instanceof Promise && await d;
      }
      if (a <= s)
        return await new Promise((d) => setTimeout(d, n)), u();
      throw i;
    }
  };
  return u();
}
function M(e, t = ["*"]) {
  const s = typeof e == "string" ? e : e.headers.get("x-real-ip") || e.headers.get("cf-connecting-ip") || e.headers.get("x-forwarded-for");
  return !s || !t || t.length === 0 ? !1 : t.includes("*") ? !0 : t.map((n) => {
    const r = n.replace(/\./g, "\\.").replace(/\*/g, "\\d+");
    return new RegExp(`^${r}$`);
  }).some((n) => n.test(s));
}
class E {
  constructor() {
    f(this, "buffer");
    this.buffer = new Uint8Array(0);
  }
  transform(t, s) {
    const n = new Uint8Array(this.buffer.length + t.length);
    n.set(this.buffer), n.set(t, this.buffer.length), this.buffer = n;
    let r = 0;
    for (let o = 0; o < this.buffer.length; o++)
      if (this.buffer[o] === 10) {
        try {
          const c = this.buffer.slice(r, o), a = new TextDecoder().decode(c);
          if (a.trim()) {
            const u = JSON.parse(a);
            this.handleProgressData(u, s);
          }
        } catch {
          s.enqueue(this.buffer.slice(r, o)), s.enqueue(new Uint8Array([10]));
        }
        r = o + 1;
      }
    r < this.buffer.length ? this.buffer = this.buffer.slice(r) : this.buffer = new Uint8Array(0);
  }
  flush(t) {
    if (this.buffer.length > 0)
      try {
        const s = new TextDecoder().decode(this.buffer);
        if (s.trim()) {
          const n = JSON.parse(s);
          this.handleProgressData(n, t);
        }
      } catch {
        this.buffer.length > 0 && (t.enqueue(this.buffer), t.enqueue(new Uint8Array([10])));
      }
  }
  handleProgressData(t, s) {
    if (t.type === "progress") {
      const n = this.formatProgressMessage(t);
      s.enqueue(new TextEncoder().encode(`${n}
`));
    } else if (t.type === "status") {
      const n = this.formatStatusMessage(t);
      s.enqueue(new TextEncoder().encode(`${n}
`));
    } else if (t.type === "error") {
      const n = this.formatErrorMessage(t);
      s.enqueue(new TextEncoder().encode(`${n}
`));
    } else
      s.enqueue(new TextEncoder().encode(`${JSON.stringify(t)}
`));
  }
  formatProgressMessage(t) {
    if (!t.data) return "";
    const { name: s, completed: n, total: r } = t.data, o = r > 0 ? Math.round(n / r * 100) : 0, c = 20, a = Math.round(o / 100 * c), u = c - a, i = `[${"=".repeat(a)}${" ".repeat(u)}]`;
    return `${s} ${i} ${o}% (${n}/${r})`;
  }
  formatStatusMessage(t) {
    if (!t.data) return "";
    const { status: s, name: n } = t.data;
    return `${s}: ${n}`;
  }
  formatErrorMessage(t) {
    return t.error ? `Error: ${t.error.message || "Unknown error"}` : "";
  }
}
async function y(e) {
  var o;
  const t = e.headers.get("content-type") || "";
  if (!t.includes("text/") && !t.includes("application/json") && !t.includes("application/javascript"))
    return e;
  const s = new CompressionStream("gzip"), n = (o = e.body) == null ? void 0 : o.pipeThrough(s), r = new Headers(e.headers);
  return r.set("content-encoding", "gzip"), new Response(n, {
    status: e.status,
    statusText: e.statusText,
    headers: r
  });
}
async function D(e) {
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
class $ {
  constructor() {
    f(this, "limits");
    f(this, "usage");
    f(this, "queues");
    f(this, "lastCleanup");
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
    const o = `${t}:${s}`, c = this.usage.get(o) || 0, a = this.getOrCreateQueue(o);
    return c >= r.concurrent ? a.queue.length >= r.burstLimit ? !1 : new Promise((u) => {
      a.queue.push({
        resolve: u,
        priority: n || r.priority,
        timestamp: Date.now()
      }), this.sortQueue(a);
    }) : (this.usage.set(o, c + 1), a.processing++, setTimeout(() => {
      this.releaseToken(o);
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
const P = new $(), w = {
  maxContentLength: 100 * 1024 * 1024,
  // 100MB
  allowedMethods: ["GET", "PUT", "POST", "DELETE"],
  blockedUserAgents: ["curl/7.29.0"]
  // 示例：阻止特定的User-Agent
};
async function U(e) {
  if (!w.allowedMethods.includes(e.method))
    return new Response("Method Not Allowed", { status: 405 });
  if (Number.parseInt(e.headers.get("content-length") || "0") > w.maxContentLength)
    return new Response("Content Too Large", { status: 413 });
  const s = e.headers.get("user-agent") || "";
  if (w.blockedUserAgents.some((a) => s.includes(a)))
    return new Response("Forbidden User Agent", { status: 403 });
  const n = e.headers.get("x-real-ip") || "", r = q(e.url, e.method);
  let o = 2;
  return T(e) && (o = 1), await P.acquireToken(n, r, o) ? null : new Response("Too Many Requests", {
    status: 429,
    headers: {
      "Retry-After": "60",
      "X-RateLimit-Reset": String(Math.floor(Date.now() / 1e3) + 60)
    }
  });
}
async function C(e) {
  const t = e.headers.get("content-type") || "", s = e.headers.get("content-encoding");
  if (t.includes("application/json") && (e.headers.get("npm-notice") || e.headers.get("npm-in-progress"))) {
    const n = new Headers(e.headers), r = ["npm-notice", "npm-in-progress", "npm-progress", "npm-json", "npm-in-progress-details"];
    for (const u of r) {
      const i = e.headers.get(u);
      i && n.set(u, i);
    }
    let o = e.body;
    if (s === "gzip" && o) {
      const u = new DecompressionStream("gzip");
      o = o == null ? void 0 : o.pipeThrough(u);
    }
    const c = new TransformStream(new E()), a = o == null ? void 0 : o.pipeThrough(c);
    return new Response(a, {
      status: e.status,
      statusText: e.statusText,
      headers: n
    });
  }
  return e;
}
function T(e) {
  const t = e.headers.get("user-agent") || "", s = e.headers.get("accept") || "";
  return (t.includes("npm/") || t.includes("Node")) && e.method === "GET" && s.includes("application/json");
}
const N = {
  async fetch(e, t) {
    var r;
    const s = Date.now(), n = e.headers.get("cf-connecting-ip") || "";
    try {
      const o = await U(e);
      if (o)
        return await l(e, o, s, n), o;
      const { pathname: c } = new URL(e.url);
      if (!M(e, (r = t.IP_WHITELIST) == null ? void 0 : r.split(/\\n|\|/))) {
        const u = new Response();
        return await l(e, u, s, n), u;
      }
      if (c === "/favicon.ico") {
        const u = new Response("", { headers: e.headers });
        return await l(e, u, s, n), u;
      }
      const a = await O(e);
      return await l(e, a, s, n), a;
    } catch (o) {
      const c = new Response(o.message);
      return await l(e, c, s, n), c;
    }
  }
};
function q(e, t) {
  return e.endsWith(".tgz") ? "tarball" : t !== "GET" ? "write" : "metadata";
}
async function l(e, t, s, n) {
  const r = Date.now() - s, o = new URL(e.url), c = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    method: e.method,
    path: o.pathname,
    status: t.status,
    duration: r,
    ip: n
  };
  console.log(JSON.stringify(c));
}
async function O(e) {
  const t = new URL(e.url), s = `https://registry.npmjs.org${t.pathname}${t.search}`, n = e.method, r = new Headers(e.headers);
  r.set("accept", "application/json"), T(e) && (r.set("npm-in-progress", "1"), r.set("npm-progress", "true"));
  const o = e.headers.get("authorization");
  if (o && r.set("authorization", o), n === "PUT") {
    const h = e.headers.get("content-length");
    h && r.set("content-length", h);
  }
  let c = e;
  e.headers.get("content-encoding") === "gzip" && (c = await D(e));
  const a = {
    method: n,
    headers: r,
    body: c.body || void 0,
    redirect: "follow"
  }, u = new Request(s, a);
  let i;
  try {
    i = await L(u).then((h) => h.data);
  } catch (h) {
    return console.error("Failed to send request to npm registry", h), new Response(h.message || h, { status: 502 });
  }
  if (T(e))
    return C(i);
  if (t.pathname.startsWith("/-/") && t.pathname.includes("/-/package/") && t.pathname.endsWith("/dist-tags"))
    return j(e, i);
  const d = t.pathname.startsWith("/-/user/org.couchdb.user:");
  if (i.status === 201 && d && (i.headers.get("content-type") || "").includes("application/json")) {
    let g;
    try {
      g = await i.json();
    } catch (x) {
      return console.error("Failed to parse response JSON", x), new Response("Failed to parse response JSON", { status: 502 });
    }
    const R = JSON.stringify(g);
    return i.headers.set("content-length", String(R.length)), i.headers.set("content-type", "application/json; charset=utf-8"), y(
      new Response(R, {
        status: i.status,
        statusText: i.statusText,
        headers: i.headers
      })
    );
  }
  if ([101, 204, 205, 304].includes(i.status))
    return new Response(null, {
      status: i.status,
      statusText: i.statusText,
      headers: i.headers
    });
  const p = i.headers.get("cache-control");
  return p && r.set("cache-control", p), y(
    new Response(i.body, {
      status: i.status,
      statusText: i.statusText,
      headers: i.headers
    })
  );
}
async function j(e, t) {
  return y(t);
}
export {
  N as default
};
