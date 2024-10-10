var g = (t) => {
  throw TypeError(t);
};
var m = (t, e, s) => e.has(t) || g("Cannot " + s);
var a = (t, e, s) => (m(t, e, "read from private field"), s ? s.call(t) : e.get(t)), y = (t, e, s) => e.has(t) ? g("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), d = (t, e, s, r) => (m(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
const U = /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/;
function I(t) {
  return t ? U.test(t) : !1;
}
function A(t, e) {
  if (!t || !e || !I(t)) return !1;
  for (let s = 0; s < e.length; s++)
    if (new RegExp(e[s].replace(/\./g, "\\.").replace(/\*/g, "\\d+")).test(t))
      return !0;
  return !1;
}
var n;
class E {
  constructor() {
    y(this, n, []);
    d(this, n, []);
  }
  setEnv(e) {
    if (a(this, n).length || !Reflect.has(e, "IP_WHITELIST")) return;
    const s = Reflect.get(e, "IP_WHITELIST") ?? "*";
    s === "*" ? d(this, n, "*") : d(this, n, s.split(",").map((r) => r.trim()));
  }
  checkIpIsWhitelisted(e) {
    return (typeof a(this, n) == "string" && a(this, n)) === "*" || Array.isArray(a(this, n)) && a(this, n).length === 0 ? !0 : Array.isArray(a(this, n)) && a(this, n).length > 0 ? A(e, a(this, n)) : !1;
  }
}
n = new WeakMap();
const k = new E(), R = "https://registry-1.docker.io", w = {
  docker: R,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function W(t) {
  const s = Object.keys(w).find((r) => t.startsWith(r));
  return s ? w[s] : "";
}
const b = {
  async fetch(t, e) {
    k.setEnv(e);
    const { pathname: s } = new URL(t.url);
    if (s === "/") {
      const o = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`, f = await fetch(o).then((p) => p.text());
      return new Response(f, {
        status: 200,
        headers: {
          "content-type": "text/html"
        }
      });
    }
    const r = t.headers.get("x-real-ip");
    return k.checkIpIsWhitelisted(r) ? new Response("Unauthorized", {
      status: 401
    }) : s === "/favicon.ico" ? new Response("", {
      status: 200
    }) : await x(t);
  }
};
async function x(t) {
  const e = new URL(t.url), s = W(e.hostname);
  if (s === "")
    return new Response(
      JSON.stringify({
        routes: w
      }),
      {
        status: 404
      }
    );
  const r = s === R, o = t.headers.get("Authorization");
  if (e.pathname === "/v2/") {
    const c = new URL(`${s}/v2/`), i = new Headers();
    o && i.set("Authorization", o);
    const h = await fetch(c.toString(), {
      method: "GET",
      headers: i,
      redirect: "follow"
    });
    return h.status === 401 ? (i.set("Www-Authenticate", `Bearer realm="https://${e.hostname}/v2/auth",service="cloudflare-docker-proxy"`), new Response(JSON.stringify({ message: "UNAUTHORIZED" }), {
      status: 401,
      headers: i
    })) : h;
  }
  if (e.pathname === "/v2/auth") {
    const c = new URL(`${s}/v2/`), i = await fetch(c.toString(), {
      method: "GET",
      redirect: "follow"
    });
    if (i.status !== 401)
      return i;
    const h = i.headers.get("WWW-Authenticate");
    if (h === null)
      return i;
    const v = H(h);
    let l = e.searchParams.get("scope");
    if (l && r) {
      const u = l.split(":");
      u.length === 3 && !u[1].includes("/") && (u[1] = `library/${u[1]}`, l = u.join(":"));
    }
    return await L(v, l, o);
  }
  if (r) {
    const c = e.pathname.split("/");
    if (c.length === 5) {
      c.splice(2, 0, "library");
      const i = new URL(e);
      return i.pathname = c.join("/"), Response.redirect(i.href, 301);
    }
  }
  const f = new URL(s + e.pathname), p = new Request(f, {
    method: t.method,
    headers: t.headers,
    redirect: "follow"
  });
  return await fetch(p);
}
function H(t) {
  const e = new RegExp('(?<==")(?:\\\\.|[^"\\\\])*(?=")', "g"), s = t.match(e);
  if (s == null || s.length < 2)
    throw new Error(`invalid Www-Authenticate Header: ${t}`);
  return {
    realm: s[0],
    service: s[1]
  };
}
async function L(t, e, s) {
  const r = new URL(t.realm);
  t.service.length && r.searchParams.set("service", t.service), e && r.searchParams.set("scope", e);
  const o = new Headers();
  return s && o.set("Authorization", s), await fetch(r, { method: "GET", headers: o });
}
export {
  b as default
};
