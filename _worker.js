async function a(t) {
  const e = new URL(t.url);
  if (e.pathname.startsWith("/crates.io-index/")) {
    const n = new URL("https://github.com/rust-lang/crates.io-index");
    return n.pathname = e.pathname.slice(17), n.search = e.search, fetch(n.toString(), t);
  }
  return fetch(t);
}
const s = {
  async fetch(t) {
    return await a(t);
  }
};
export {
  s as default
};
