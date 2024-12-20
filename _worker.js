function w(e, r = ["*"]) {
  const t = typeof e == "string" ? e : e.headers.get("x-real-ip") || e.headers.get("cf-connecting-ip") || e.headers.get("x-forwarded-for");
  return !t || !r || r.length === 0 ? !1 : r.includes("*") ? !0 : r.map((s) => {
    const o = s.replace(/\./g, "\\.").replace(/\*/g, "\\d+");
    return new RegExp(`^${o}$`);
  }).some((s) => s.test(t));
}
const f = "https://registry-1.docker.io", l = {
  docker: f,
  quay: "https://quay.io",
  gcr: "https://gcr.io",
  "k8s-gcr": "https://k8s.gcr.io",
  k8s: "https://registry.k8s.io",
  ghcr: "https://ghcr.io",
  cloudsmith: "https://docker.cloudsmith.io"
};
function g(e) {
  const t = Object.keys(l).find((s) => e.startsWith(s));
  return t ? l[t] : "";
}
const k = {
  async fetch(e, r) {
    var t;
    try {
      const { pathname: s } = new URL(e.url);
      if (s === "/") {
        const o = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`, h = await fetch(o), d = await h.text();
        return new Response(d, {
          headers: h.headers
        });
      }
      return w(e, (t = r.IP_WHITELIST) == null ? void 0 : t.split(/\\n|\|/)) ? s === "/favicon.ico" ? new Response(null, { status: 404 }) : await m(e) : new Response("Unauthorized", { status: 401 });
    } catch (s) {
      return new Response(s.message, { status: 500 });
    }
  }
};
async function m(e) {
  const r = new URL(e.url), t = g(r.hostname);
  if (t === "")
    return Response.json(l, { headers: e.headers });
  const s = t === f, o = e.headers.get("Authorization");
  if (r.pathname === "/v2/") {
    const a = new URL(`${t}/v2/`), n = new Headers();
    o && n.set("Authorization", o);
    const c = await fetch(a.toString(), {
      method: "GET",
      headers: n,
      redirect: "follow"
    });
    return c.status === 401 ? (n.set("Www-Authenticate", `Bearer realm="https://${r.hostname}/v2/auth",service="cloudflare-docker-proxy"`), new Response("UNAUTHORIZED", { status: 401, headers: n })) : c;
  }
  if (r.pathname === "/v2/auth") {
    const a = new URL(`${t}/v2/`), n = await fetch(a.toString(), {
      method: "GET",
      redirect: "follow"
    });
    if (n.status !== 401)
      return n;
    const c = n.headers.get("WWW-Authenticate");
    if (c === null)
      return n;
    const p = y(c);
    let u = r.searchParams.get("scope");
    if (u && s) {
      const i = u.split(":");
      i.length === 3 && !i[1].includes("/") && (i[1] = `library/${i[1]}`, u = i.join(":"));
    }
    return await R(p, u, o);
  }
  if (s) {
    const a = r.pathname.split("/");
    if (a.length === 5) {
      a.splice(2, 0, "library");
      const n = new URL(r);
      return n.pathname = a.join("/"), Response.redirect(n.href, 301);
    }
  }
  const h = new URL(t + r.pathname), d = new Request(h, {
    method: e.method,
    headers: e.headers,
    redirect: "follow"
  });
  return await fetch(d);
}
function y(e) {
  const r = new RegExp('(?<==")(?:\\\\.|[^"\\\\])*(?=")', "g"), t = e.match(r);
  if (t == null || t.length < 2)
    throw new Error(`invalid Www-Authenticate Header: ${e}`);
  return {
    realm: t[0],
    service: t[1]
  };
}
async function R(e, r, t) {
  const s = new URL(e.realm);
  e.service.length && s.searchParams.set("service", e.service), r && s.searchParams.set("scope", r);
  const o = new Headers();
  return t && o.set("Authorization", t), await fetch(s, { method: "GET", headers: o });
}
export {
  k as default
};
