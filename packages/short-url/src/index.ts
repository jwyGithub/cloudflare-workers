import { UrlController } from './controllers/url.controller';
import { handlePageRequest } from './core/page';
import { Router } from './core/router';
import { UrlService } from './services/url.service';

const router = new Router();

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const service = new UrlService(env.DB);
        const controller = new UrlController(service);

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
