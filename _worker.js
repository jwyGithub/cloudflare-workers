const y = {
  async fetch(t) {
    return await l(t);
  }
};
async function l(t) {
  const s = new URL(t.url), o = `https://registry.npmjs.org${s.pathname}${s.search}`, n = t.method, u = new Headers(t.headers), i = s.pathname.startsWith("/-/user/org.couchdb.user:"), c = {
    method: n,
    headers: u,
    body: t.body ? t.body : void 0,
    redirect: "follow"
  };
  n === "PUT" && s.pathname.startsWith("/-/user/org.couchdb.user:") || n === "GET" && s.pathname.startsWith("/") || n === "PUT" && s.pathname.endsWith(".tgz") || n === "GET" && s.pathname.endsWith(".tgz");
  const d = new Request(o, c);
  let e;
  try {
    e = await fetch(d);
  } catch (a) {
    return console.error("Failed to send request to npm registry", a), new Response("Internal Server Error", { status: 500 });
  }
  if (e.status === 201 && i && (e.headers.get("content-type") || "").includes("application/json")) {
    let r;
    try {
      r = await e.json();
    } catch (p) {
      return console.error("Failed to parse response JSON", p), new Response("Internal Server Error", { status: 500 });
    }
    r.token;
    const h = JSON.stringify(r);
    return new Response(h, {
      status: e.status,
      statusText: e.statusText,
      headers: e.headers
    });
  }
  return [101, 204, 205, 304].includes(e.status) ? new Response(null, {
    status: e.status,
    statusText: e.statusText,
    headers: e.headers
  }) : new Response(e.body, {
    status: e.status,
    statusText: e.statusText,
    headers: e.headers
  });
}
export {
  y as default
};
