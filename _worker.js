var h = (e) => {
  throw TypeError(e);
};
var l = (e, t, s) => t.has(e) || h("Cannot " + s);
var a = (e, t, s) => (l(e, t, "read from private field"), s ? s.call(e) : t.get(e)), p = (e, t, s) => t.has(e) ? h("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), i = (e, t, s, o) => (l(e, t, "write to private field"), o ? o.call(e, s) : t.set(e, s), s);
const I = "unauthorized", S = "internal server error", y = new Headers({
  "Content-type": "application/json"
}), H = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
new Headers({
  "Content-type": "text/html"
});
const W = (e, t = H) => new Response(e, {
  status: 200,
  headers: t
}), b = (e = I, t = 401, s = y) => new Response(
  JSON.stringify({
    status: t,
    message: e
  }),
  {
    status: t,
    statusText: e,
    headers: s
  }
), d = (e = S, t = 500, s = y) => new Response(
  JSON.stringify({
    status: t,
    message: e
  }),
  {
    status: t,
    statusText: e,
    headers: s
  }
), j = /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/;
function v(e) {
  return e ? j.test(e) : !1;
}
function A(e, t) {
  if (!e || !t || !v(e)) return !1;
  for (let s = 0; s < t.length; s++)
    if (new RegExp(t[s].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(e))
      return !0;
  return !1;
}
var n;
class N {
  constructor() {
    p(this, n, []);
    i(this, n, []);
  }
  setEnv(t) {
    if (a(this, n).length || !Reflect.has(t, "IP_WHITELIST")) return;
    const s = Reflect.get(t, "IP_WHITELIST") ?? "*";
    s === "*" ? i(this, n, "*") : i(this, n, s.split(",").map((o) => o.trim()));
  }
  checkIpIsWhitelisted(t) {
    return (typeof a(this, n) == "string" && a(this, n)) === "*" || Array.isArray(a(this, n)) && a(this, n).length === 0 ? !0 : Array.isArray(a(this, n)) && a(this, n).length > 0 ? A(t, a(this, n)) : !1;
  }
}
n = new WeakMap();
const f = new N(), J = {
  async fetch(e, t) {
    try {
      const { pathname: s } = new URL(e.url);
      f.setEnv(t);
      const o = e.headers.get("x-real-ip");
      return f.checkIpIsWhitelisted(o) ? s === "/favicon.ico" ? W("", e.headers) : await _(e) : b();
    } catch (s) {
      return d(s.message);
    }
  }
};
async function _(e) {
  const t = new URL(e.url), s = `https://registry.npmjs.org${t.pathname}${t.search}`, o = e.method, g = new Headers(e.headers), w = t.pathname.startsWith("/-/user/org.couchdb.user:"), x = {
    method: o,
    headers: g,
    body: e.body ? e.body : void 0,
    redirect: "follow"
  }, m = new Request(s, x);
  let r;
  try {
    r = await fetch(m);
  } catch (c) {
    return console.error("Failed to send request to npm registry", c), d();
  }
  if (r.status === 201 && w && (r.headers.get("content-type") || "").includes("application/json")) {
    let u;
    try {
      u = await r.json();
    } catch (T) {
      return console.error("Failed to parse response JSON", T), d();
    }
    const R = JSON.stringify(u);
    return new Response(R, {
      status: r.status,
      statusText: r.statusText,
      headers: r.headers
    });
  }
  return [101, 204, 205, 304].includes(r.status) ? new Response(null, {
    status: r.status,
    statusText: r.statusText,
    headers: r.headers
  }) : new Response(r.body, {
    status: r.status,
    statusText: r.statusText,
    headers: r.headers
  });
}
export {
  J as default
};
