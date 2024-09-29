async function handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/crates.io-index/')) {
        const newUrl = new URL('https://github.com/rust-lang/crates.io-index');
        newUrl.pathname = url.pathname.slice('/crates.io-index/'.length);
        newUrl.search = url.search;
        return fetch(newUrl.toString(), req);
    }
    return fetch(req);
}

export default {
    async fetch(request: Request): Promise<Response> {
        return await handleRequest(request);
    }
};
