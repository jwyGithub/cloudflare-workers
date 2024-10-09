const d = "https://registry-1.docker.io", f = {
  docker: d,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function w(e) {
  const s = Object.keys(f).find((r) => e.startsWith(r));
  return s ? f[s] : "";
}
function m(e, t) {
  return e ? Reflect.has(t, "IP_WHITELIST") ? typeof t.IP_WHITELIST == "string" ? t.IP_WHITELIST.split(`
`).map((r) => r.trim()).includes(e) : !1 : !0 : !1;
}
const R = {
  async fetch(e, t) {
    const { pathname: s } = new URL(e.url), r = e.headers.get("x-real-ip");
    if (!m(r, t))
      return new Response("Unauthorized", {
        status: 401
      });
    if (s === "/favicon.ico")
      return new Response("", {
        status: 200
      });
    if (s === "/") {
      const o = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`, u = await fetch(o).then((l) => l.text());
      return new Response(u, {
        status: 200,
        headers: {
          "content-type": "text/html"
        }
      });
    }
    return await g(e);
  }
};
async function g(e) {
  const t = new URL(e.url), s = w(t.hostname);
  if (s === "")
    return new Response(
      JSON.stringify({
        routes: f
      }),
      {
        status: 404
      }
    );
  const r = s === d, o = e.headers.get("Authorization");
  if (t.pathname === "/v2/") {
    const a = new URL(`${s}/v2/`), n = new Headers();
    o && n.set("Authorization", o);
    const i = await fetch(a.toString(), {
      method: "GET",
      headers: n,
      redirect: "follow"
    });
    return i.status === 401 ? (n.set("Www-Authenticate", `Bearer realm="https://${t.hostname}/v2/auth",service="cloudflare-docker-proxy"`), new Response(JSON.stringify({ message: "UNAUTHORIZED" }), {
      status: 401,
      headers: n
    })) : i;
  }
  if (t.pathname === "/v2/auth") {
    const a = new URL(`${s}/v2/`), n = await fetch(a.toString(), {
      method: "GET",
      redirect: "follow"
    });
    if (n.status !== 401)
      return n;
    const i = n.headers.get("WWW-Authenticate");
    if (i === null)
      return n;
    const p = y(i);
    let h = t.searchParams.get("scope");
    if (h && r) {
      const c = h.split(":");
      c.length === 3 && !c[1].includes("/") && (c[1] = `library/${c[1]}`, h = c.join(":"));
    }
    return await k(p, h, o);
  }
  if (r) {
    const a = t.pathname.split("/");
    if (a.length === 5) {
      a.splice(2, 0, "library");
      const n = new URL(t);
      return n.pathname = a.join("/"), Response.redirect(n.href, 301);
    }
  }
  const u = new URL(s + t.pathname), l = new Request(u, {
    method: e.method,
    headers: e.headers,
    redirect: "follow"
  });
  return await fetch(l);
}
function y(e) {
  const t = new RegExp('(?<==")(?:\\\\.|[^"\\\\])*(?=")', "g"), s = e.match(t);
  if (s == null || s.length < 2)
    throw new Error(`invalid Www-Authenticate Header: ${e}`);
  return {
    realm: s[0],
    service: s[1]
  };
}
async function k(e, t, s) {
  const r = new URL(e.realm);
  e.service.length && r.searchParams.set("service", e.service), t && r.searchParams.set("scope", t);
  const o = new Headers();
  return s && o.set("Authorization", s), await fetch(r, { method: "GET", headers: o });
}
export {
  R as default
};
