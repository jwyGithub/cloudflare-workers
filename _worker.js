var g = (e) => {
  throw TypeError(e);
};
var y = (e, t, s) => t.has(e) || g("Cannot " + s);
var i = (e, t, s) => (y(e, t, "read from private field"), s ? s.call(e) : t.get(e)), k = (e, t, s) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), p = (e, t, s, r) => (y(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s);
const I = "success", U = "unauthorized", A = "internal server error", m = new Headers({
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
const L = (e, t = I, s = m) => Response.json(
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
), R = (e, t = W) => new Response(e, {
  status: 200,
  headers: t
}), x = (e = U, t = 401, s = m) => Response.json(
  {
    status: t,
    message: e
  },
  {
    status: t,
    statusText: e,
    headers: s
  }
), j = (e = A, t = 500, s = m) => Response.json(
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
    k(this, n, []);
    p(this, n, []);
  }
  setEnv(t) {
    if (i(this, n).length || i(this, n) === "*" || !Reflect.has(t, "IP_WHITELIST")) return;
    const s = Reflect.get(t, "IP_WHITELIST") ?? "*";
    s === "*" ? p(this, n, "*") : p(this, n, s.split(",").map((r) => r.trim()));
  }
  checkIpIsWhitelisted(t) {
    return (typeof i(this, n) == "string" && i(this, n)) === "*" || Array.isArray(i(this, n)) && i(this, n).length === 0 ? !0 : Array.isArray(i(this, n)) && i(this, n).length > 0 ? b(t, i(this, n)) : !1;
  }
}
n = new WeakMap();
const v = new E(), T = "https://registry-1.docker.io", w = {
  docker: T,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function P(e) {
  const s = Object.keys(w).find((r) => e.startsWith(r));
  return s ? w[s] : "";
}
const z = {
  async fetch(e, t) {
    try {
      v.setEnv(t);
      const { pathname: s } = new URL(e.url);
      if (s === "/") {
        const o = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`, l = await fetch(o), f = await l.text();
        return R(f, l.headers);
      }
      const r = e.headers.get("x-real-ip");
      return r && !v.checkIpIsWhitelisted(r) ? x() : s === "/favicon.ico" ? R("", e.headers) : await $(e);
    } catch (s) {
      return j(s.message);
    }
  }
};
async function $(e) {
  const t = new URL(e.url), s = P(t.hostname);
  if (s === "")
    return L(w, "success", e.headers);
  const r = s === T, o = e.headers.get("Authorization");
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
    const H = G(h);
    let d = t.searchParams.get("scope");
    if (d && r) {
      const u = d.split(":");
      u.length === 3 && !u[1].includes("/") && (u[1] = `library/${u[1]}`, d = u.join(":"));
    }
    return await S(H, d, o);
  }
  if (r) {
    const c = t.pathname.split("/");
    if (c.length === 5) {
      c.splice(2, 0, "library");
      const a = new URL(t);
      return a.pathname = c.join("/"), Response.redirect(a.href, 301);
    }
  }
  const l = new URL(s + t.pathname), f = new Request(l, {
    method: e.method,
    headers: e.headers,
    redirect: "follow"
  });
  return await fetch(f);
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
