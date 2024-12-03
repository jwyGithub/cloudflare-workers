import { toServerError, toStream, toUnauthorized } from '@jiangweiye/worker-service';
import { handleProxyRequest } from './services/proxy';
import { ValidateIp } from './validate';

const validateIp = new ValidateIp();

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            validateIp.setEnv(env);
            const { pathname } = new URL(request.url);

            if (pathname === '/') {
                const doc = `https://raw.githubusercontent.com/jwyGithub/cloudflare-workers/refs/heads/main/packages/docker-proxy/src/index.html?t=${Date.now()}`;
                const docs = await fetch(doc);
                const content = await docs.text();
                return toStream(content, docs.headers);
            }

            if (!validateIp.checkIpIsWhitelisted(request)) {
                return toUnauthorized();
            }

            if (pathname === '/favicon.ico') {
                return toStream('', request.headers);
            }

            return await handleProxyRequest(request);
        } catch (error: any) {
            return toServerError(error.message);
        }
    }
};

// async function handleRequest(request: Request): Promise<Response> {
//     const url = new URL(request.url);
//     const upstream = routeByHosts(url.hostname);
//     if (upstream === '') {
//         return toSuccess(routes, 'success', request.headers);
//     }
//     const isDockerHub = upstream === dockerHub;
//     const authorization = request.headers.get('Authorization');
//     if (url.pathname === '/v2/') {
//         const newUrl = new URL(`${upstream}/v2/`);
//         const headers = new Headers();
//         if (authorization) {
//             headers.set('Authorization', authorization);
//         }
//         const resp = await fetch(newUrl.toString(), {
//             method: 'GET',
//             headers,
//             redirect: 'follow'
//         });
//         if (resp.status === 401) {
//             headers.set('Www-Authenticate', `Bearer realm="https://${url.hostname}/v2/auth",service="cloudflare-docker-proxy"`);
//             return toUnauthorized('UNAUTHORIZED', RESPONSE_UNAUTHORIZED_CODE, headers);
//         } else {
//             return resp;
//         }
//     }
//     if (url.pathname === '/v2/auth') {
//         const newUrl = new URL(`${upstream}/v2/`);
//         const resp = await fetch(newUrl.toString(), {
//             method: 'GET',
//             redirect: 'follow'
//         });
//         if (resp.status !== 401) {
//             return resp;
//         }
//         const authenticateStr = resp.headers.get('WWW-Authenticate');
//         if (authenticateStr === null) {
//             return resp;
//         }
//         const wwwAuthenticate = parseAuthenticate(authenticateStr);
//         let scope = url.searchParams.get('scope');
//         if (scope && isDockerHub) {
//             const scopeParts = scope.split(':');
//             if (scopeParts.length === 3 && !scopeParts[1].includes('/')) {
//                 scopeParts[1] = `library/${scopeParts[1]}`;
//                 scope = scopeParts.join(':');
//             }
//         }
//         return await fetchToken(wwwAuthenticate, scope, authorization);
//     }
//     if (isDockerHub) {
//         const pathParts = url.pathname.split('/');
//         if (pathParts.length === 5) {
//             pathParts.splice(2, 0, 'library');
//             const redirectUrl = new URL(url);
//             redirectUrl.pathname = pathParts.join('/');
//             return Response.redirect(redirectUrl.href, 301);
//         }
//     }
//     const newUrl = new URL(upstream + url.pathname);
//     const newReq = new Request(newUrl, {
//         method: request.method,
//         headers: request.headers,
//         redirect: 'follow'
//     });

//     return await fetch(newReq);
// }

// function parseAuthenticate(authenticateStr: string): { realm: string; service: string } {
//     const re = /(?<==")(?:\\.|[^"\\])*(?=")/g;
//     const matches = authenticateStr.match(re);
//     if (matches == null || matches.length < 2) {
//         throw new Error(`invalid Www-Authenticate Header: ${authenticateStr}`);
//     }
//     return {
//         realm: matches[0],
//         service: matches[1]
//     };
// }

// async function fetchToken(
//     wwwAuthenticate: { realm: string; service: string },
//     scope: string | null,
//     authorization: string | null
// ): Promise<Response> {
//     const url = new URL(wwwAuthenticate.realm);
//     if (wwwAuthenticate.service.length) {
//         url.searchParams.set('service', wwwAuthenticate.service);
//     }
//     if (scope) {
//         url.searchParams.set('scope', scope);
//     }
//     const headers = new Headers();
//     if (authorization) {
//         headers.set('Authorization', authorization);
//     }
//     return await fetch(url, { method: 'GET', headers });
// }
