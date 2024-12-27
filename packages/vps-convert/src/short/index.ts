export async function getShortUrl(env: Env, pathname: string): Promise<string | null | undefined> {
    return await env.KV?.get(pathname);
}

export async function setShortUrl(env: Env, subUrl: string, request: Request): Promise<Response> {
    const pathname = Math.random().toString(36).substring(2, 7);

    const exist = await getShortUrl(env, pathname);
    if (exist) {
        return setShortUrl(env, subUrl, request);
    }
    await env.KV?.put(pathname, subUrl);

    const url = new URL(request.url);
    url.pathname = `/${pathname}`;
    return new Response(url.toString());
}
