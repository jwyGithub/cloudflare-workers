var m = (e) => {
  throw TypeError(e);
};
var y = (e, t, s) => t.has(e) || m("Cannot " + s);
var o = (e, t, s) => (y(e, t, "read from private field"), s ? s.call(e) : t.get(e)), k = (e, t, s) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), p = (e, t, s, r) => (y(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s);
const T = "success", U = "unauthorized", A = "internal server error", g = new Headers({
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
const L = (e, t = T, s = g) => new Response(
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
}), x = (e = U, t = 401, s = g) => new Response(
  JSON.stringify({
    status: t,
    message: e
  }),
  {
    status: t,
    statusText: e,
    headers: s
  }
), E = (e = A, t = 500, s = g) => new Response(
  JSON.stringify({
    status: t,
    message: e
  }),
  {
    status: t,
    statusText: e,
    headers: s
  }
), P = /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/;
function S(e) {
  return e ? P.test(e) : !1;
}
function b(e, t) {
  if (!e || !t || !S(e)) return !1;
  for (let s = 0; s < t.length; s++)
    if (new RegExp(t[s].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(e))
      return !0;
  return !1;
}
var n;
class C {
  constructor() {
    k(this, n, []);
    p(this, n, []);
  }
  setEnv(t) {
    if (o(this, n).length || !Reflect.has(t, "IP_WHITELIST")) return;
    const s = Reflect.get(t, "IP_WHITELIST") ?? "*";
    s === "*" ? p(this, n, "*") : p(this, n, s.split(",").map((r) => r.trim()));
  }
  checkIpIsWhitelisted(t) {
    return (typeof o(this, n) == "string" && o(this, n)) === "*" || Array.isArray(o(this, n)) && o(this, n).length === 0 ? !0 : Array.isArray(o(this, n)) && o(this, n).length > 0 ? b(t, o(this, n)) : !1;
  }
}
n = new WeakMap();
const v = new C(), H = "https://registry-1.docker.io", w = {
  docker: H,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function $(e) {
  const s = Object.keys(w).find((r) => e.startsWith(r));
  return s ? w[s] : "";
}
const z = {
  async fetch(e, t) {
    try {
      v.setEnv(t);
      const { pathname: s } = new URL(e.url);
      if (s === "/") {
        const c = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`, d = await fetch(c), l = new Headers(d.headers);
        l.set("Content-Type", "text/html");
        const i = await d.text();
        return R(i, l);
      }
      const r = e.headers.get("x-real-ip");
      return v.checkIpIsWhitelisted(r) ? s === "/favicon.ico" ? R("", e.headers) : await j(e) : x();
    } catch (s) {
      return E(s.message);
    }
  }
};
async function j(e) {
  const t = new URL(e.url), s = $(t.hostname);
  if (s === "")
    return L(w, "success", e.headers);
  const r = s === H, c = e.headers.get("Authorization");
  if (t.pathname === "/v2/") {
    const i = new URL(`${s}/v2/`), a = new Headers();
    c && a.set("Authorization", c);
    const h = await fetch(i.toString(), {
      method: "GET",
      headers: a,
      redirect: "follow"
    });
    return h.status === 401 ? (a.set("Www-Authenticate", `Bearer realm="https://${t.hostname}/v2/auth",service="cloudflare-docker-proxy"`), x("UNAUTHORIZED", 401, a)) : h;
  }
  if (t.pathname === "/v2/auth") {
    const i = new URL(`${s}/v2/`), a = await fetch(i.toString(), {
      method: "GET",
      redirect: "follow"
    });
    if (a.status !== 401)
      return a;
    const h = a.headers.get("WWW-Authenticate");
    if (h === null)
      return a;
    const I = N(h);
    let f = t.searchParams.get("scope");
    if (f && r) {
      const u = f.split(":");
      u.length === 3 && !u[1].includes("/") && (u[1] = `library/${u[1]}`, f = u.join(":"));
    }
    return await O(I, f, c);
  }
  if (r) {
    const i = t.pathname.split("/");
    if (i.length === 5) {
      i.splice(2, 0, "library");
      const a = new URL(t);
      return a.pathname = i.join("/"), Response.redirect(a.href, 301);
    }
  }
  const d = new URL(s + t.pathname), l = new Request(d, {
    method: e.method,
    headers: e.headers,
    redirect: "follow"
  });
  return await fetch(l);
}
function N(e) {
  const t = new RegExp('(?<==")(?:\\\\.|[^"\\\\])*(?=")', "g"), s = e.match(t);
  if (s == null || s.length < 2)
    throw new Error(`invalid Www-Authenticate Header: ${e}`);
  return {
    realm: s[0],
    service: s[1]
  };
}
async function O(e, t, s) {
  const r = new URL(e.realm);
  e.service.length && r.searchParams.set("service", e.service), t && r.searchParams.set("scope", t);
  const c = new Headers();
  return s && c.set("Authorization", s), await fetch(r, { method: "GET", headers: c });
}
export {
  z as default
};
