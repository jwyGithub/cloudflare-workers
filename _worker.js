var l = (e) => {
  throw TypeError(e);
};
var p = (e, t, s) => t.has(e) || l("Cannot " + s);
var a = (e, t, s) => (p(e, t, "read from private field"), s ? s.call(e) : t.get(e)), d = (e, t, s) => t.has(e) ? l("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), i = (e, t, s, o) => (p(e, t, "write to private field"), o ? o.call(e, s) : t.set(e, s), s);
const I = "unauthorized", j = "internal server error", y = new Headers({
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
const S = (e, t = H) => new Response(e, {
  status: 200,
  headers: t
}), W = (e = I, t = 401, s = y) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: s
  }
), u = (e = j, t = 500, s = y) => Response.json(
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
function b(e, t) {
  if (!e || !t) return !1;
  for (let s = 0; s < t.length; s++)
    if (new RegExp(t[s].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(e))
      return !0;
  return !1;
}
var n;
class v {
  constructor() {
    d(this, n, []);
    i(this, n, []);
  }
  setEnv(t) {
    if (a(this, n).length || a(this, n) === "*" || !Reflect.has(t, "IP_WHITELIST")) return;
    const s = Reflect.get(t, "IP_WHITELIST") ?? "*";
    s === "*" ? i(this, n, "*") : i(this, n, s.split(",").map((o) => o.trim()));
  }
  checkIpIsWhitelisted(t) {
    return (typeof a(this, n) == "string" && a(this, n)) === "*" || Array.isArray(a(this, n)) && a(this, n).length === 0 ? !0 : Array.isArray(a(this, n)) && a(this, n).length > 0 ? b(t, a(this, n)) : !1;
  }
}
n = new WeakMap();
const f = new v(), C = {
  async fetch(e, t) {
    try {
      const { pathname: s } = new URL(e.url);
      f.setEnv(t);
      const o = e.headers.get("x-real-ip");
      return o && !f.checkIpIsWhitelisted(o) ? W() : s === "/favicon.ico" ? S("", e.headers) : await _(e);
    } catch (s) {
      return u(s.message);
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
    return console.error("Failed to send request to npm registry", c), u();
  }
  if (r.status === 201 && w && (r.headers.get("content-type") || "").includes("application/json")) {
    let h;
    try {
      h = await r.json();
    } catch (T) {
      return console.error("Failed to parse response JSON", T), u();
    }
    const R = JSON.stringify(h);
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
  C as default
};
