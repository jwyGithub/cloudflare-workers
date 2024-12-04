import { toSuccess } from '@jiangweiye/worker-service';
import { registryConfigs } from '../constants/registry';

import { logger } from '../utils/logger';
import { getUpstream, isDockerHub } from '../utils/registry';
import { RouteService } from './route';

const routeService = new RouteService();

export async function handleProxyRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const upstream = getUpstream(url.hostname);
    if (!upstream) {
        return toSuccess(registryConfigs, 'success', request.headers);
    }

    const authorization = request.headers.get('Authorization');

    logger.info(`upstream: ${upstream}, ${url.pathname}, ${authorization}`);

    if (url.pathname === '/v2/') {
        logger.info('Redirect to /v2');
        return await routeService.toV2(url, upstream, authorization);
    }
    if (url.pathname === '/v2/auth') {
        logger.info('Redirect to /v2/auth');
        return await routeService.toV2Auth(url, upstream, authorization);
    }

    logger.info(`isDockerHub: ${registryConfigs.docker}, ${url.hostname}`);

    if (isDockerHub(url.hostname)) {
        const pathParts = url.pathname.split('/');
        if (pathParts.length === 5) {
            pathParts.splice(2, 0, 'library');
            const redirectUrl = new URL(url);
            redirectUrl.pathname = pathParts.join('/');
            return Response.redirect(redirectUrl.href, 301);
        }
    }
    logger.info('Redirect to registry');
    return await routeService.toRegistry(url, upstream, request);
}
