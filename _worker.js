var m = (e) => {
  throw TypeError(e);
};
var g = (e, t, s) => t.has(e) || m("Cannot " + s);
var i = (e, t, s) => (g(e, t, "read from private field"), s ? s.call(e) : t.get(e)), y = (e, t, s) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), d = (e, t, s, r) => (g(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s);
const U = "success", T = "unauthorized", A = "internal server error", w = new Headers({
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
const j = (e, t = U, s = w) => Response.json(
  {
    status: 200,
    message: t,
    data: e
  },
  {
    status: 200,
    statusText: t,
    headers: s
  }
), k = (e, t = W) => new Response(e, {
  status: 200,
  headers: t
}), v = (e = T, t = 401, s = w) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: s
  }
), L = (e = A, t = 500, s = w) => Response.json(
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
class E {
  constructor() {
    y(this, n, []);
    d(this, n, []);
  }
  setEnv(t) {
    if (i(this, n).length || i(this, n) === "*" || !Reflect.has(t, "IP_WHITELIST")) return;
    const s = Reflect.get(t, "IP_WHITELIST") ?? "*";
    s === "*" ? d(this, n, "*") : d(this, n, s.split(",").map((r) => r.trim()));
  }
  checkIpIsWhitelisted(t) {
    const s = t.headers.get("x-real-ip") || "";
    return (typeof i(this, n) == "string" && i(this, n)) === "*" || Array.isArray(i(this, n)) && i(this, n).length === 0 ? !0 : Array.isArray(i(this, n)) && i(this, n).length > 0 ? b(s, i(this, n)) : !1;
  }
}
n = new WeakMap();
const R = new E(), x = "https://registry-1.docker.io", f = {
  docker: x,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function P(e) {
  const s = Object.keys(f).find((r) => e.startsWith(r));
  return s ? f[s] : "";
}
const z = {
  async fetch(e, t) {
    try {
      R.setEnv(t);
      const { pathname: s } = new URL(e.url);
      if (s === "/") {
        const r = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`, o = await fetch(r), p = await o.text();
        return k(p, o.headers);
      }
      return R.checkIpIsWhitelisted(e) ? s === "/favicon.ico" ? k("", e.headers) : await $(e) : v();
    } catch (s) {
      return L(s.message);
    }
  }
};
async function $(e) {
  const t = new URL(e.url), s = P(t.hostname);
  if (s === "")
    return j(f, "success", e.headers);
  const r = s === x, o = e.headers.get("Authorization");
  if (t.pathname === "/v2/") {
    const c = new URL(`${s}/v2/`), a = new Headers();
    o && a.set("Authorization", o);
    const h = await fetch(c.toString(), {
      method: "GET",
      headers: a,
      redirect: "follow"
    });
    return h.status === 401 ? (a.set("Www-Authenticate", `Bearer realm="https://${t.hostname}/v2/auth",service="cloudflare-docker-proxy"`), v("UNAUTHORIZED", 401, a)) : h;
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
    const I = G(h);
    let l = t.searchParams.get("scope");
    if (l && r) {
      const u = l.split(":");
      u.length === 3 && !u[1].includes("/") && (u[1] = `library/${u[1]}`, l = u.join(":"));
    }
    return await S(I, l, o);
  }
  if (r) {
    const c = t.pathname.split("/");
    if (c.length === 5) {
      c.splice(2, 0, "library");
      const a = new URL(t);
      return a.pathname = c.join("/"), Response.redirect(a.href, 301);
    }
  }
  const p = new URL(s + t.pathname), H = new Request(p, {
    method: e.method,
    headers: e.headers,
    redirect: "follow"
  });
  return await fetch(H);
}
function G(e) {
  const t = new RegExp('(?<==")(?:\\\\.|[^"\\\\])*(?=")', "g"), s = e.match(t);
  if (s == null || s.length < 2)
    throw new Error(`invalid Www-Authenticate Header: ${e}`);
  return {
    realm: s[0],
    service: s[1]
  };
}
async function S(e, t, s) {
  const r = new URL(e.realm);
  e.service.length && r.searchParams.set("service", e.service), t && r.searchParams.set("scope", t);
  const o = new Headers();
  return s && o.set("Authorization", s), await fetch(r, { method: "GET", headers: o });
}
export {
  z as default
};
