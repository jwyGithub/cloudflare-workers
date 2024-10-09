const d = "https://registry-1.docker.io", f = {
  docker: d,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function w(t) {
  const s = Object.keys(f).find((r) => t.startsWith(r));
  return s ? f[s] : "";
}
function m(t, e) {
  return t ? Reflect.has(e, "IP_WHITELIST") ? e.IP_WHITELIST !== "*" && typeof e.IP_WHITELIST == "string" ? e.IP_WHITELIST.split(`
`).map((r) => r.trim()).includes(t) : e.IP_WHITELIST === "*" : !0 : !1;
}
const I = {
  async fetch(t, e) {
    const { pathname: s } = new URL(t.url);
    if (s === "/") {
      const o = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`, u = await fetch(o).then((l) => l.text());
      return new Response(u, {
        status: 200,
        headers: {
          "content-type": "text/html"
        }
      });
    }
    const r = t.headers.get("x-real-ip");
    return m(r, e) ? s === "/favicon.ico" ? new Response("", {
      status: 200
    }) : await g(t) : new Response("Unauthorized", {
      status: 401
    });
  }
};
async function g(t) {
  const e = new URL(t.url), s = w(e.hostname);
  if (s === "")
    return new Response(
      JSON.stringify({
        routes: f
      }),
      {
        status: 404
      }
    );
  const r = s === d, o = t.headers.get("Authorization");
  if (e.pathname === "/v2/") {
    const a = new URL(`${s}/v2/`), n = new Headers();
    o && n.set("Authorization", o);
    const i = await fetch(a.toString(), {
      method: "GET",
      headers: n,
      redirect: "follow"
    });
    return i.status === 401 ? (n.set("Www-Authenticate", `Bearer realm="https://${e.hostname}/v2/auth",service="cloudflare-docker-proxy"`), new Response(JSON.stringify({ message: "UNAUTHORIZED" }), {
      status: 401,
      headers: n
    })) : i;
  }
  if (e.pathname === "/v2/auth") {
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
    let h = e.searchParams.get("scope");
    if (h && r) {
      const c = h.split(":");
      c.length === 3 && !c[1].includes("/") && (c[1] = `library/${c[1]}`, h = c.join(":"));
    }
    return await k(p, h, o);
  }
  if (r) {
    const a = e.pathname.split("/");
    if (a.length === 5) {
      a.splice(2, 0, "library");
      const n = new URL(e);
      return n.pathname = a.join("/"), Response.redirect(n.href, 301);
    }
  }
  const u = new URL(s + e.pathname), l = new Request(u, {
    method: t.method,
    headers: t.headers,
    redirect: "follow"
  });
  return await fetch(l);
}
function y(t) {
  const e = new RegExp('(?<==")(?:\\\\.|[^"\\\\])*(?=")', "g"), s = t.match(e);
  if (s == null || s.length < 2)
    throw new Error(`invalid Www-Authenticate Header: ${t}`);
  return {
    realm: s[0],
    service: s[1]
  };
}
async function k(t, e, s) {
  const r = new URL(t.realm);
  t.service.length && r.searchParams.set("service", t.service), e && r.searchParams.set("scope", e);
  const o = new Headers();
  return s && o.set("Authorization", s), await fetch(r, { method: "GET", headers: o });
}
export {
  I as default
};
