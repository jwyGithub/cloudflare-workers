var h = (t) => {
  throw TypeError(t);
};
var l = (t, e, s) => e.has(t) || h("Cannot " + s);
var a = (t, e, s) => (l(t, e, "read from private field"), s ? s.call(t) : e.get(t)), p = (t, e, s) => e.has(t) ? h("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), o = (t, e, s, i) => (l(t, e, "write to private field"), i ? i.call(t, s) : e.set(t, s), s);
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
const W = (t, e = H) => new Response(t, {
  status: 200,
  headers: e
}), b = (t = I, e = 401, s = y) => new Response(
  JSON.stringify({
    status: e,
    message: t
  }),
  {
    status: e,
    statusText: t,
    headers: s
  }
), d = (t = S, e = 500, s = y) => new Response(
  JSON.stringify({
    status: e,
    message: t
  }),
  {
    status: e,
    statusText: t,
    headers: s
  }
), j = /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/;
function v(t) {
  return t ? j.test(t) : !1;
}
function A(t, e) {
  if (!t || !e || !v(t)) return !1;
  for (let s = 0; s < e.length; s++)
    if (new RegExp(e[s].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(t))
      return !0;
  return !1;
}
var n;
class N {
  constructor() {
    p(this, n, []);
    o(this, n, []);
  }
  setEnv(e) {
    if (a(this, n).length || a(this, n) === "*" || !Reflect.has(e, "IP_WHITELIST")) return;
    const s = Reflect.get(e, "IP_WHITELIST") ?? "*";
    s === "*" ? o(this, n, "*") : o(this, n, s.split(",").map((i) => i.trim()));
  }
  checkIpIsWhitelisted(e) {
    return (typeof a(this, n) == "string" && a(this, n)) === "*" || Array.isArray(a(this, n)) && a(this, n).length === 0 ? !0 : Array.isArray(a(this, n)) && a(this, n).length > 0 ? A(e, a(this, n)) : !1;
  }
}
n = new WeakMap();
const f = new N(), J = {
  async fetch(t, e) {
    try {
      const { pathname: s } = new URL(t.url);
      f.setEnv(e);
      const i = t.headers.get("x-real-ip");
      return f.checkIpIsWhitelisted(i) ? s === "/favicon.ico" ? W("", t.headers) : await _(t) : b();
    } catch (s) {
      return d(s.message);
    }
  }
};
async function _(t) {
  const e = new URL(t.url), s = `https://registry.npmjs.org${e.pathname}${e.search}`, i = t.method, g = new Headers(t.headers), w = e.pathname.startsWith("/-/user/org.couchdb.user:"), x = {
    method: i,
    headers: g,
    body: t.body ? t.body : void 0,
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
