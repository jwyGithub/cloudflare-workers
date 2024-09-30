const s = "https://github.com/rust-lang/crates.io-index", c = {
  async fetch(e) {
    const t = new URL(e.url), n = new URL(`${s}${t.pathname}${t.search}`), o = new Request(n.toString(), {
      method: e.method,
      headers: e.headers,
      body: e.body
    });
    return fetch(o);
  }
};
export {
  c as default
};
