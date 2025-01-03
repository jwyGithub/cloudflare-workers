import { validateIp } from 'cloudflare-tools';

const dockerHub = 'https://registry-1.docker.io';

const routes = {
    docker: dockerHub,
    quay: 'https://quay.io',
    gcr: 'https://gcr.io',
    'k8s-gcr': 'https://k8s.gcr.io',
    k8s: 'https://registry.k8s.io',
    ghcr: 'https://ghcr.io',
    cloudsmith: 'https://docker.cloudsmith.io'
};

function routeByHosts(hostname: string): string {
    const keys = Object.keys(routes);
    const key = keys.find(k => hostname.startsWith(k));
    if (key) {
        return routes[key];
    }

    return '';
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            const { pathname } = new URL(request.url);

            if (pathname === '/') {
                const doc = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`;
                const docs = await fetch(doc);
                const content = await docs.text();
                return new Response(content, {
                    headers: docs.headers
                });
            }

            if (!validateIp(request, env.IP_WHITELIST?.split(/\\n|\|/))) {
                return new Response('Unauthorized', { status: 401 });
            }

            if (pathname === '/favicon.ico') {
                return new Response(null, { status: 404 });
            }

            return await handleRequest(request);
        } catch (error: any) {
            return new Response(error.message, { status: 500 });
        }
    }
};

async function handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const upstream = routeByHosts(url.hostname);
    if (upstream === '') {
        return Response.json(routes, { headers: request.headers });
    }
    const isDockerHub = upstream === dockerHub;
    const authorization = request.headers.get('Authorization');
    if (url.pathname === '/v2/') {
        const newUrl = new URL(`${upstream}/v2/`);
        const headers = new Headers();
        if (authorization) {
            headers.set('Authorization', authorization);
        }
        const resp = await fetch(newUrl.toString(), {
            method: 'GET',
            headers,
            redirect: 'follow'
        });
        if (resp.status === 401) {
            headers.set('Www-Authenticate', `Bearer realm="https://${url.hostname}/v2/auth",service="cloudflare-docker-proxy"`);
            return new Response('UNAUTHORIZED', { status: 401, headers });
        } else {
            return resp;
        }
    }
    if (url.pathname === '/v2/auth') {
        const newUrl = new URL(`${upstream}/v2/`);
        const resp = await fetch(newUrl.toString(), {
            method: 'GET',
            redirect: 'follow'
        });
        if (resp.status !== 401) {
            return resp;
        }
        const authenticateStr = resp.headers.get('WWW-Authenticate');
        if (authenticateStr === null) {
            return resp;
        }
        const wwwAuthenticate = parseAuthenticate(authenticateStr);
        let scope = url.searchParams.get('scope');
        if (scope && isDockerHub) {
            const scopeParts = scope.split(':');
            if (scopeParts.length === 3 && !scopeParts[1].includes('/')) {
                scopeParts[1] = `library/${scopeParts[1]}`;
                scope = scopeParts.join(':');
            }
        }
        return await fetchToken(wwwAuthenticate, scope, authorization);
    }
    if (isDockerHub) {
        const pathParts = url.pathname.split('/');
        if (pathParts.length === 5) {
            pathParts.splice(2, 0, 'library');
            const redirectUrl = new URL(url);
            redirectUrl.pathname = pathParts.join('/');
            return Response.redirect(redirectUrl.href, 301);
        }
    }
    const newUrl = new URL(upstream + url.pathname);
    const newReq = new Request(newUrl, {
        method: request.method,
        headers: request.headers,
        redirect: 'follow'
    });

    return await fetch(newReq);
}

function parseAuthenticate(authenticateStr: string): { realm: string; service: string } {
    const re = /(?<==")(?:\\.|[^"\\])*(?=")/g;
    const matches = authenticateStr.match(re);
    if (matches == null || matches.length < 2) {
        throw new Error(`invalid Www-Authenticate Header: ${authenticateStr}`);
    }
    return {
        realm: matches[0],
        service: matches[1]
    };
}

async function fetchToken(
    wwwAuthenticate: { realm: string; service: string },
    scope: string | null,
    authorization: string | null
): Promise<Response> {
    const url = new URL(wwwAuthenticate.realm);
    if (wwwAuthenticate.service.length) {
        url.searchParams.set('service', wwwAuthenticate.service);
    }
    if (scope) {
        url.searchParams.set('scope', scope);
    }
    const headers = new Headers();
    if (authorization) {
        headers.set('Authorization', authorization);
    }
    return await fetch(url, { method: 'GET', headers });
}
