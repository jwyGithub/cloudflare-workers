var m = (e) => {
  throw TypeError(e);
};
var y = (e, t, s) => t.has(e) || m("Cannot " + s);
var i = (e, t, s) => (y(e, t, "read from private field"), s ? s.call(e) : t.get(e)), k = (e, t, s) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), l = (e, t, s, r) => (y(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s);
const U = "success", A = "unauthorized", T = "internal server error", w = new Headers({
  "Content-type": "application/json"
}), W = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
const L = new Headers({
  "Content-type": "text/html"
}), E = (e, t = U, s = w) => new Response(
  JSON.stringify({
    status: 200,
    message: t,
    data: e
  }),
  {
    status: 200,
    statusText: t,
    headers: s
  }
), R = (e, t = W) => new Response(e, {
  status: 200,
  headers: t
}), x = (e = A, t = 401, s = w) => new Response(
  JSON.stringify({
    status: t,
    message: e
  }),
  {
    status: t,
    statusText: e,
    headers: s
  }
), P = (e = T, t = 500, s = w) => new Response(
  JSON.stringify({
    status: t,
    message: e
  }),
  {
    status: t,
    statusText: e,
    headers: s
  }
), S = /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/;
function b(e) {
  return e ? S.test(e) : !1;
}
function $(e, t) {
  if (!e || !t || !b(e)) return !1;
  for (let s = 0; s < t.length; s++)
    if (new RegExp(t[s].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(e))
      return !0;
  return !1;
}
var n;
class C {
  constructor() {
    k(this, n, []);
    l(this, n, []);
  }
  setEnv(t) {
    if (i(this, n).length || !Reflect.has(t, "IP_WHITELIST")) return;
    const s = Reflect.get(t, "IP_WHITELIST") ?? "*";
    s === "*" ? l(this, n, "*") : l(this, n, s.split(",").map((r) => r.trim()));
  }
  checkIpIsWhitelisted(t) {
    return (typeof i(this, n) == "string" && i(this, n)) === "*" || Array.isArray(i(this, n)) && i(this, n).length === 0 ? !0 : Array.isArray(i(this, n)) && i(this, n).length > 0 ? $(t, i(this, n)) : !1;
  }
}
n = new WeakMap();
const v = new C(), H = "https://registry-1.docker.io", p = {
  docker: H,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function j(e) {
  const s = Object.keys(p).find((r) => e.startsWith(r));
  return s ? p[s] : "";
}
const D = {
  async fetch(e, t) {
    try {
      v.setEnv(t);
      const { pathname: s } = new URL(e.url);
      if (s === "/") {
        const o = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`, f = await (await fetch(o)).text();
        return R(f, L);
      }
      const r = e.headers.get("x-real-ip");
      return v.checkIpIsWhitelisted(r) ? s === "/favicon.ico" ? R("", e.headers) : await N(e) : x();
    } catch (s) {
      return P(s.message);
    }
  }
};
async function N(e) {
  const t = new URL(e.url), s = j(t.hostname);
  if (s === "")
    return E(p, "success", e.headers);
  const r = s === H, o = e.headers.get("Authorization");
  if (t.pathname === "/v2/") {
    const c = new URL(`${s}/v2/`), a = new Headers();
    o && a.set("Authorization", o);
    const h = await fetch(c.toString(), {
      method: "GET",
      headers: a,
      redirect: "follow"
    });
    return h.status === 401 ? (a.set("Www-Authenticate", `Bearer realm="https://${t.hostname}/v2/auth",service="cloudflare-docker-proxy"`), x("UNAUTHORIZED", 401, a)) : h;
  }
  if (t.pathname === "/v2/auth") {
    const c = new URL(`${s}/v2/`), a = await fetch(c.toString(), {
      method: "GET",
      redirect: "follow"
    });
    if (a.status !== 401)
      return a;
    const h = a.headers.get("WWW-Authenticate");
    if (h === null)
      return a;
    const I = O(h);
    let d = t.searchParams.get("scope");
    if (d && r) {
      const u = d.split(":");
      u.length === 3 && !u[1].includes("/") && (u[1] = `library/${u[1]}`, d = u.join(":"));
    }
    return await _(I, d, o);
  }
  if (r) {
    const c = t.pathname.split("/");
    if (c.length === 5) {
      c.splice(2, 0, "library");
      const a = new URL(t);
      return a.pathname = c.join("/"), Response.redirect(a.href, 301);
    }
  }
  const g = new URL(s + t.pathname), f = new Request(g, {
    method: e.method,
    headers: e.headers,
    redirect: "follow"
  });
  return await fetch(f);
}
function O(e) {
  const t = new RegExp('(?<==")(?:\\\\.|[^"\\\\])*(?=")', "g"), s = e.match(t);
  if (s == null || s.length < 2)
    throw new Error(`invalid Www-Authenticate Header: ${e}`);
  return {
    realm: s[0],
    service: s[1]
  };
}
async function _(e, t, s) {
  const r = new URL(e.realm);
  e.service.length && r.searchParams.set("service", e.service), t && r.searchParams.set("scope", t);
  const o = new Headers();
  return s && o.set("Authorization", s), await fetch(r, { method: "GET", headers: o });
}
export {
  D as default
};
