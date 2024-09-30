const y = {
  async fetch(e) {
    return await l(e);
  }
};
async function l(e) {
  const s = new URL(e.url), a = `https://registry.npmjs.org${s.pathname}${s.search}`, o = e.method, u = new Headers(e.headers), c = s.pathname.startsWith("/-/user/org.couchdb.user:"), d = {
    method: o,
    headers: u,
    body: e.body ? e.body : void 0,
    redirect: "follow"
  }, i = new Request(a, d);
  let t;
  try {
    t = await fetch(i);
  } catch (r) {
    return console.error("Failed to send request to npm registry", r), new Response("Internal Server Error", { status: 500 });
  }
  if (t.status === 201 && c && (t.headers.get("content-type") || "").includes("application/json")) {
    let n;
    try {
      n = await t.json();
    } catch (p) {
      return console.error("Failed to parse response JSON", p), new Response("Internal Server Error", { status: 500 });
    }
    const h = JSON.stringify(n);
    return new Response(h, {
      status: t.status,
      statusText: t.statusText,
      headers: t.headers
    });
  }
  return [101, 204, 205, 304].includes(t.status) ? new Response(null, {
    status: t.status,
    statusText: t.statusText,
    headers: t.headers
  }) : new Response(t.body, {
    status: t.status,
    statusText: t.statusText,
    headers: t.headers
  });
}
export {
  y as default
};
