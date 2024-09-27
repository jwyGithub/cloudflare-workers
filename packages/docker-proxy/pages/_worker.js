const l = "https://registry-1.docker.io", u = {
  docker: l,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function w(t) {
  const e = Object.keys(u).find((n) => t.startsWith(n));
  return e ? u[e] : "";
}
const k = {
  async fetch(t) {
    return await m(t);
  }
};
async function m(t) {
  const s = new URL(t.url), e = w(s.hostname);
  if (e === "")
    return new Response(
      JSON.stringify({
        routes: u
      }),
      {
        status: 404
      }
    );
  const n = e === l, a = t.headers.get("Authorization");
  if (s.pathname === "/v2/") {
    const o = new URL(`${e}/v2/`), r = new Headers();
    a && r.set("Authorization", a);
    const c = await fetch(o.toString(), {
      method: "GET",
      headers: r,
      redirect: "follow"
    });
    return c.status === 401 ? (r.set("Www-Authenticate", `Bearer realm="https://${s.hostname}/v2/auth",service="cloudflare-docker-proxy"`), new Response(JSON.stringify({ message: "UNAUTHORIZED" }), {
      status: 401,
      headers: r
    })) : c;
  }
  if (s.pathname === "/v2/auth") {
    const o = new URL(`${e}/v2/`), r = await fetch(o.toString(), {
      method: "GET",
      redirect: "follow"
    });
    if (r.status !== 401)
      return r;
    const c = r.headers.get("WWW-Authenticate");
    if (c === null)
      return r;
    const p = g(c);
    let h = s.searchParams.get("scope");
    if (h && n) {
      const i = h.split(":");
      i.length === 3 && !i[1].includes("/") && (i[1] = `library/${i[1]}`, h = i.join(":"));
    }
    return await y(p, h, a);
  }
  if (n) {
    const o = s.pathname.split("/");
    if (o.length === 5) {
      o.splice(2, 0, "library");
      const r = new URL(s);
      return r.pathname = o.join("/"), Response.redirect(r.href, 301);
    }
  }
  const f = new URL(e + s.pathname), d = new Request(f, {
    method: t.method,
    headers: t.headers,
    redirect: "follow"
  });
  return await fetch(d);
}
function g(t) {
  const s = new RegExp('(?<==")(?:\\\\.|[^"\\\\])*(?=")', "g"), e = t.match(s);
  if (e == null || e.length < 2)
    throw new Error(`invalid Www-Authenticate Header: ${t}`);
  return {
    realm: e[0],
    service: e[1]
  };
}
async function y(t, s, e) {
  const n = new URL(t.realm);
  t.service.length && n.searchParams.set("service", t.service), s && n.searchParams.set("scope", s);
  const a = new Headers();
  return e && a.set("Authorization", e), await fetch(n, { method: "GET", headers: a });
}
export {
  k as default
};
