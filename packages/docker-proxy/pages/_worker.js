const l = "https://registry-1.docker.io", u = {
  docker: l,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function w(s) {
  const t = Object.keys(u).find((n) => s.startsWith(n));
  return t ? u[t] : "";
}
const k = {
  async fetch(s) {
    const { pathname: e } = new URL(s.url);
    if (e === "/favicon.ico")
      return new Response("", {
        status: 200
      });
    if (e === "/") {
      const n = await fetch("https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html").then((o) => o.text());
      return new Response(n, {
        status: 200,
        headers: {
          "content-type": "text/html"
        }
      });
    }
    return await m(s);
  }
};
async function m(s) {
  const e = new URL(s.url), t = w(e.hostname);
  if (t === "")
    return new Response(
      JSON.stringify({
        routes: u
      }),
      {
        status: 404
      }
    );
  const n = t === l, o = s.headers.get("Authorization");
  if (e.pathname === "/v2/") {
    const a = new URL(`${t}/v2/`), r = new Headers();
    o && r.set("Authorization", o);
    const c = await fetch(a.toString(), {
      method: "GET",
      headers: r,
      redirect: "follow"
    });
    return c.status === 401 ? (r.set("Www-Authenticate", `Bearer realm="https://${e.hostname}/v2/auth",service="cloudflare-docker-proxy"`), new Response(JSON.stringify({ message: "UNAUTHORIZED" }), {
      status: 401,
      headers: r
    })) : c;
  }
  if (e.pathname === "/v2/auth") {
    const a = new URL(`${t}/v2/`), r = await fetch(a.toString(), {
      method: "GET",
      redirect: "follow"
    });
    if (r.status !== 401)
      return r;
    const c = r.headers.get("WWW-Authenticate");
    if (c === null)
      return r;
    const p = g(c);
    let h = e.searchParams.get("scope");
    if (h && n) {
      const i = h.split(":");
      i.length === 3 && !i[1].includes("/") && (i[1] = `library/${i[1]}`, h = i.join(":"));
    }
    return await y(p, h, o);
  }
  if (n) {
    const a = e.pathname.split("/");
    if (a.length === 5) {
      a.splice(2, 0, "library");
      const r = new URL(e);
      return r.pathname = a.join("/"), Response.redirect(r.href, 301);
    }
  }
  const d = new URL(t + e.pathname), f = new Request(d, {
    method: s.method,
    headers: s.headers,
    redirect: "follow"
  });
  return await fetch(f);
}
function g(s) {
  const e = new RegExp('(?<==")(?:\\\\.|[^"\\\\])*(?=")', "g"), t = s.match(e);
  if (t == null || t.length < 2)
    throw new Error(`invalid Www-Authenticate Header: ${s}`);
  return {
    realm: t[0],
    service: t[1]
  };
}
async function y(s, e, t) {
  const n = new URL(s.realm);
  s.service.length && n.searchParams.set("service", s.service), e && n.searchParams.set("scope", e);
  const o = new Headers();
  return t && o.set("Authorization", t), await fetch(n, { method: "GET", headers: o });
}
export {
  k as default
};
