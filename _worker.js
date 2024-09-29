const w = {
  async fetch(t) {
    return await f(t);
  }
};
async function f(t) {
  const s = new URL(t.url), o = `https://registry.npmjs.org${s.pathname}${s.search}`, r = t.method, u = new Headers(t.headers), i = s.pathname.startsWith("/-/user/org.couchdb.user:"), d = {
    method: r,
    headers: u,
    body: t.body ? t.body : void 0,
    redirect: "follow"
  };
  r === "PUT" && s.pathname.startsWith("/-/user/org.couchdb.user:") || r === "GET" && s.pathname.startsWith("/") || r === "PUT" && s.pathname.endsWith(".tgz") || r === "GET" && s.pathname.endsWith(".tgz");
  const c = new Request(o, d);
  let e;
  try {
    e = await fetch(c);
  } catch (a) {
    return console.error("Failed to send request to npm registry", a), new Response("Internal Server Error", { status: 500 });
  }
  if (e.status === 201 && i && (e.headers.get("content-type") || "").includes("application/json")) {
    let n;
    try {
      n = await e.json();
    } catch (y) {
      return console.error("Failed to parse response JSON", y), new Response("Internal Server Error", { status: 500 });
    }
    n.token;
    const l = JSON.stringify(n);
    return new Response(l, {
      status: e.status,
      statusText: e.statusText,
      headers: e.headers
    });
  }
  if ([101, 204, 205, 304].includes(e.status))
    return new Response(null, {
      status: e.status,
      statusText: e.statusText,
      headers: e.headers
    });
  const { readable: h, writable: p } = new TransformStream();
  return e.body && e.body.pipeTo(p), new Response(h, {
    status: e.status,
    statusText: e.statusText,
    headers: e.headers
  });
}
export {
  w as default
};
