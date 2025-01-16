import { RegistryProxy } from './core';
import { cors } from './shared/shared';

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        try {
            if (request.method === 'OPTIONS' || request.method === 'HEAD') {
                return cors(new Response(null));
            }
            const registryProxy = new RegistryProxy(request, env, ctx);
            return await registryProxy.match();
        } catch (error: any) {
            return new Response(error.message || error, { status: 500 });
        }
    }
} satisfies ExportedHandler<Env>;
