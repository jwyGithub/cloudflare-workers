import { RESPONSE_UNAUTHORIZED_CODE, toUnauthorized } from '@jiangweiye/worker-service';
import { cacheResponse, getCacheResponse } from '../utils/cache';
import { fetchWithRetry } from '../utils/fetch';
import { logger } from '../utils/logger';
import { fetchToken, isDockerHub, parseAuthenticate } from '../utils/registry';

export class RouteService {
    async toV2(url: URL, upstream: string, authorization: string | null): Promise<Response> {
        const newUrl = new URL(`${upstream}/v2/`);
        const headers = new Headers();
        if (authorization) {
            headers.set('Authorization', authorization);
        }

        const cache = await getCacheResponse(newUrl.toString());
        if (cache) {
            return cache;
        }

        const resp = await fetchWithRetry(newUrl.toString(), {
            method: 'GET',
            headers,
            redirect: 'follow'
        });

        logger.info(`toV2: ${newUrl.toString()}, ${resp.status}`);

        await cacheResponse(newUrl.toString(), resp.clone());
        if (resp.status === 401) {
            headers.set('Www-Authenticate', `Bearer realm="https://${url.hostname}/v2/auth",service="cloudflare-docker-proxy"`);
            return toUnauthorized('UNAUTHORIZED', RESPONSE_UNAUTHORIZED_CODE, headers);
        } else {
            return resp;
        }
    }

    async toV2Auth(url: URL, upstream: string, authorization: string | null): Promise<Response> {
        const newUrl = new URL(`${upstream}/v2/`);

        const cache = await getCacheResponse(newUrl.toString());
        if (cache) {
            return cache;
        }

        const resp = await fetch(newUrl.toString(), {
            method: 'GET',
            redirect: 'follow'
        });
        await cacheResponse(newUrl.toString(), resp.clone());
        if (resp.status !== 401) {
            return resp;
        }
        const authenticateStr =
            resp.headers.get('WWW-Authenticate') || resp.headers.get('Www-Authenticate') || resp.headers.get('www-authenticate');
        if (authenticateStr === null) {
            return resp;
        }
        const wwwAuthenticate = parseAuthenticate(authenticateStr);
        let scope = url.searchParams.get('scope');
        if (scope && isDockerHub(url.hostname)) {
            const scopeParts = scope.split(':');
            if (scopeParts.length === 3 && !scopeParts[1].includes('/')) {
                scopeParts[1] = `library/${scopeParts[1]}`;
                scope = scopeParts.join(':');
            }
        }
        return await fetchToken(wwwAuthenticate, scope, authorization);
    }

    async toRegistry(url: URL, upstream: string, request: Request): Promise<Response> {
        const newUrl = new URL(upstream + url.pathname);

        const cache = await getCacheResponse(newUrl.toString());
        if (cache) {
            return cache;
        }

        const newReq = new Request(newUrl, {
            method: request.method,
            headers: request.headers,
            redirect: 'follow'
        });

        const resp = await fetch(newReq);
        await cacheResponse(newUrl.toString(), resp.clone());
        return resp;
    }
}
