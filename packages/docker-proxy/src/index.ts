import { toHTML, toServerError, toUnauthorized } from '@jiangweiye/worker-service';
import { page } from './code';
import { proxyRequest } from './services/proxy';
import { ValidateIp } from './validate';

const validate = new ValidateIp();

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            const { pathname, host } = new URL(request.url);
            validate.setEnv(env);

            if (!validate.checkIpIsWhitelisted(request)) {
                return toUnauthorized();
            }

            if (pathname === '/') {
                return toHTML(page(host));
            }

            return await proxyRequest(request);
        } catch (error: any) {
            return toServerError(error.message || error);
        }
    }
} satisfies ExportedHandler<Env>;
