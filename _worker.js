var g = (t) => {
  throw TypeError(t);
};
var m = (t, e, s) => e.has(t) || g("Cannot " + s);
var o = (t, e, s) => (m(t, e, "read from private field"), s ? s.call(t) : e.get(t)), y = (t, e, s) => e.has(t) ? g("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), p = (t, e, s, r) => (m(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
const U = "success", A = "unauthorized", v = new Headers({
  "Content-type": "application/json"
}), T = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
new Headers({
  "Content-type": "text/html"
});
const W = (t, e = U, s = v) => new Response(
  JSON.stringify({
    status: 200,
    message: e,
    data: t
  }),
  {
    status: 200,
    statusText: e,
    headers: s
  }
), k = (t, e = T) => new Response(t, {
  status: 200,
  headers: e
}), x = (t = A, e = 401, s = v) => new Response(
  JSON.stringify({
    status: e,
    message: t
  }),
  {
    status: e,
    statusText: t,
    headers: s
  }
), E = /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/;
function L(t) {
  return t ? E.test(t) : !1;
}
function P(t, e) {
  if (!t || !e || !L(t)) return !1;
  for (let s = 0; s < e.length; s++)
    if (new RegExp(e[s].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(t))
      return !0;
  return !1;
}
var n;
class b {
  constructor() {
    y(this, n, []);
    p(this, n, []);
  }
  setEnv(e) {
    if (o(this, n).length || !Reflect.has(e, "IP_WHITELIST")) return;
    const s = Reflect.get(e, "IP_WHITELIST") ?? "*";
    s === "*" ? p(this, n, "*") : p(this, n, s.split(",").map((r) => r.trim()));
  }
  checkIpIsWhitelisted(e) {
    return (typeof o(this, n) == "string" && o(this, n)) === "*" || Array.isArray(o(this, n)) && o(this, n).length === 0 ? !0 : Array.isArray(o(this, n)) && o(this, n).length > 0 ? P(e, o(this, n)) : !1;
  }
}
n = new WeakMap();
const R = new b(), H = "https://registry-1.docker.io", w = {
  docker: H,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function C(t) {
  const s = Object.keys(w).find((r) => t.startsWith(r));
  return s ? w[s] : "";
}
const z = {
  async fetch(t, e) {
    R.setEnv(e);
    const { pathname: s } = new URL(t.url);
    if (s === "/") {
      const c = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`, u = await fetch(c), l = u.headers;
      l.set("Content-Type", "text/html");
      const i = await u.text();
      return k(i, l);
    }
    const r = t.headers.get("x-real-ip");
    return R.checkIpIsWhitelisted(r) ? s === "/favicon.ico" ? k("", t.headers) : await S(t) : x();
  }
};
async function S(t) {
  const e = new URL(t.url), s = C(e.hostname);
  if (s === "")
    return W(w, "success", t.headers);
  const r = s === H, c = t.headers.get("Authorization");
  if (e.pathname === "/v2/") {
    const i = new URL(`${s}/v2/`), a = new Headers();
    c && a.set("Authorization", c);
    const h = await fetch(i.toString(), {
      method: "GET",
      headers: a,
      redirect: "follow"
    });
    return h.status === 401 ? (a.set("Www-Authenticate", `Bearer realm="https://${e.hostname}/v2/auth",service="cloudflare-docker-proxy"`), x("UNAUTHORIZED", 401, a)) : h;
  }
  if (e.pathname === "/v2/auth") {
    const i = new URL(`${s}/v2/`), a = await fetch(i.toString(), {
      method: "GET",
      redirect: "follow"
    });
    if (a.status !== 401)
      return a;
    const h = a.headers.get("WWW-Authenticate");
    if (h === null)
      return a;
    const I = $(h);
    let f = e.searchParams.get("scope");
    if (f && r) {
      const d = f.split(":");
      d.length === 3 && !d[1].includes("/") && (d[1] = `library/${d[1]}`, f = d.join(":"));
    }
    return await j(I, f, c);
  }
  if (r) {
    const i = e.pathname.split("/");
    if (i.length === 5) {
      i.splice(2, 0, "library");
      const a = new URL(e);
      return a.pathname = i.join("/"), Response.redirect(a.href, 301);
    }
  }
  const u = new URL(s + e.pathname), l = new Request(u, {
    method: t.method,
    headers: t.headers,
    redirect: "follow"
  });
  return await fetch(l);
}
function $(t) {
  const e = new RegExp('(?<==")(?:\\\\.|[^"\\\\])*(?=")', "g"), s = t.match(e);
  if (s == null || s.length < 2)
    throw new Error(`invalid Www-Authenticate Header: ${t}`);
  return {
    realm: s[0],
    service: s[1]
  };
}
async function j(t, e, s) {
  const r = new URL(t.realm);
  t.service.length && r.searchParams.set("service", t.service), e && r.searchParams.set("scope", e);
  const c = new Headers();
  return s && c.set("Authorization", s), await fetch(r, { method: "GET", headers: c });
}
export {
  z as default
};
