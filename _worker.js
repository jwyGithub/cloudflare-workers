var f = (e) => {
  throw TypeError(e);
};
var w = (e, r, t) => r.has(e) || f("Cannot " + t);
var c = (e, r, t) => (w(e, r, "read from private field"), t ? t.call(e) : r.get(e)), g = (e, r, t) => r.has(e) ? f("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, t), i = (e, r, t, s) => (w(e, r, "write to private field"), s ? s.call(e, t) : r.set(e, t), t);
const v = "unauthorized", b = "internal server error", U = new Headers({
  "Content-type": "application/json"
}), C = new Headers({
  "Content-type": "application/octet-stream"
});
new Headers({
  "Content-type": "text/plain"
});
new Headers({
  "Content-type": "text/html"
});
const m = (e, r = C) => new Response(e, {
  status: 200,
  headers: r
}), H = (e = v, r = 401, t = U) => Response.json(
  {
    status: r,
    message: e
  },
  {
    status: r,
    statusText: e,
    headers: t
  }
), E = (e = b, r = 500, t = U) => Response.json(
  {
    status: r,
    message: e
  },
  {
    status: r,
    statusText: e,
    headers: t
  }
), k = (e) => {
  try {
    return new URL(e).href;
  } catch {
    return console.error("Invalid URL for cache key:", e), "";
  }
}, L = async (e) => {
  const r = caches.default, t = k(e);
  return t && await r.match(t) || null;
}, T = async (e, r) => {
  const t = caches.default, s = k(e);
  s && await t.put(s, r);
}, A = async (e, r, t = 3) => {
  let s;
  for (let o = 1; o <= t; o++) {
    try {
      const n = await fetch(e, r);
      if (n.ok)
        return n;
      s = new Error(`Attempt ${o} failed with status: ${n.status}`);
    } catch (n) {
      s = n;
    }
    o < t && await new Promise((n) => setTimeout(n, 1e3 * o));
  }
  throw s;
}, y = {
  docker: {
    baseUrl: "https://registry-1.docker.io",
    requiresAuth: !0,
    authUrl: "https://auth.docker.io/token"
  },
  quay: {
    baseUrl: "https://quay.io",
    requiresAuth: !0,
    authUrl: "https://quay.io/v2/token"
  },
  gcr: {
    baseUrl: "https://gcr.io",
    requiresAuth: !0,
    authUrl: "https://gcr.io/v2/token"
  },
  "k8s-gcr": {
    baseUrl: "https://k8s.gcr.io",
    requiresAuth: !0,
    authUrl: "https://k8s.gcr.io/v2/token"
  },
  ghcr: {
    baseUrl: "https://ghcr.io",
    requiresAuth: !0,
    authUrl: "https://ghcr.io/v2/token"
  },
  cloudsmith: {
    baseUrl: "https://docker.cloudsmith.io",
    requiresAuth: !0,
    authUrl: "https://docker.cloudsmith.io/token"
  },
  k8s: {
    baseUrl: "https://registry.k8s.io",
    requiresAuth: !1,
    authUrl: ""
  }
}, j = (e) => {
  const r = Object.keys(y).find((t) => e.includes(t));
  return r ? y[r] : null;
};
function P(e) {
  const r = new RegExp('(?<==")[^"]*(?=")', "g"), t = e.match(r);
  if (!t || t.length < 2)
    throw new Error(`Invalid WWW-Authenticate Header: ${e}`);
  return {
    realm: decodeURIComponent(t[0]),
    service: decodeURIComponent(t[1])
  };
}
function q(e, r) {
  if (r && e) {
    const t = e.split(":");
    if (t.length === 3 && !t[1].includes("/"))
      return t[1] = `library/${t[1]}`, t.join(":");
  }
  return decodeURIComponent(e);
}
async function z(e, r, t) {
  const s = new URL(e);
  s.searchParams.set("scope", r || "");
  const o = new Headers();
  t && o.set("Authorization", t);
  const n = await fetch(s.toString(), {
    method: "GET",
    headers: o
  });
  if (!n.ok)
    throw new Error(`Failed to fetch token: ${n.status}`);
  return (await n.json()).token;
}
async function S(e, r) {
  const t = new Headers(e.headers);
  t.set("Authorization", `Bearer ${r}`);
  const s = new URL(e.url), o = new URL(`${s.protocol}//${s.hostname}${s.pathname}`), n = new Request(o.toString(), {
    method: e.method,
    headers: t
  });
  return await A(n.url, {
    method: e.method,
    headers: n.headers
  });
}
async function _(e) {
  const r = new URL(e.url), t = await L(r.href);
  if (t)
    return t;
  const s = j(r.hostname);
  if (!s)
    return new Response("Unknown registry", { status: 404 });
  if (s.requiresAuth) {
    const x = `${s.authUrl}`, u = new Headers(), l = e.headers.get("Authorization");
    l && u.set("Authorization", l);
    const d = await fetch(x, { method: "GET", headers: u, redirect: "follow" });
    if (d.status === 401) {
      const p = d.headers.get("WWW-Authenticate");
      if (!p)
        throw new Error("Missing WWW-Authenticate header");
      const I = P(p), W = q(r.searchParams.get("scope") || "", s.baseUrl === "https://registry-1.docker.io"), $ = await z(s.authUrl, W, `Bearer ${I.service}`);
      return await S(e, $);
    }
  }
  const o = new URL(`${r.protocol}//${r.hostname}${r.pathname}`), n = new Request(o.toString(), {
    method: e.method,
    headers: e.headers
  }), h = await A(n.url, {
    method: e.method,
    headers: n.headers
  });
  return await T(r.href, h.clone()), h;
}
function G(e, r) {
  if (!e || !r) return !1;
  for (let t = 0; t < r.length; t++)
    if (new RegExp(r[t].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(e))
      return !0;
  return !1;
}
var a;
class K {
  constructor() {
    g(this, a, []);
    i(this, a, []);
  }
  setEnv(r) {
    if (c(this, a).length || c(this, a) === "*" || !Reflect.has(r, "IP_WHITELIST")) return;
    const t = Reflect.get(r, "IP_WHITELIST") ?? "*";
    t === "*" ? i(this, a, "*") : i(this, a, t.split(",").map((s) => s.trim()));
  }
  checkIpIsWhitelisted(r) {
    const t = r.headers.get("x-real-ip") || "";
    return (typeof c(this, a) == "string" && c(this, a)) === "*" || Array.isArray(c(this, a)) && c(this, a).length === 0 ? !0 : Array.isArray(c(this, a)) && c(this, a).length > 0 ? G(t, c(this, a)) : !1;
  }
}
a = new WeakMap();
const R = new K(), F = {
  async fetch(e, r) {
    try {
      R.setEnv(r);
      const { pathname: t } = new URL(e.url);
      if (t === "/") {
        const s = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`, o = await fetch(s), n = await o.text();
        return m(n, o.headers);
      }
      return R.checkIpIsWhitelisted(e) ? t === "/favicon.ico" ? m("", e.headers) : await _(e) : H();
    } catch (t) {
      return E(t.message);
    }
  }
};
export {
  F as default
};
