import { UrlController } from './controllers/url.controller';
import { handlePageRequest } from './core/page';
import { Router } from './core/router';
import { UrlService } from './services/url.service';

const router = new Router();

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const service = new UrlService(env.DB);
        const controller = new UrlController(service);

        // 添加cors请求头
        request.headers.set('Access-Control-Allow-Origin', '*');
        request.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        request.headers.set('Access-Control-Allow-Headers', 'Content-Type');

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            });
        }

        router
            .get('/', () => handlePageRequest())
            .post('/api/add', req => controller.add(req))
            .delete('/api/delete', req => controller.delete(req))
            .get('/api/queryByCode', req => controller.queryByCode(req))
            .get('/api/queryList', req => controller.queryList(req))
            .get('/:code', req => controller.redirect(req));

        return router.handle(request, env);
    }
} satisfies ExportedHandler<Env>;
