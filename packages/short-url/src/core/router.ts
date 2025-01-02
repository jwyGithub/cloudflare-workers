type Handler = (request: Request, env: Env) => Response | Promise<Response>;
interface Route {
    pattern: URLPattern;
    handler: Handler;
}

export class Router {
    private routes: Route[] = [];

    public get(path: string, handler: Handler): Router {
        this.add('GET', path, handler);
        return this;
    }

    public post(path: string, handler: Handler): Router {
        this.add('POST', path, handler);
        return this;
    }

    public put(path: string, handler: Handler): Router {
        this.add('PUT', path, handler);
        return this;
    }

    public delete(path: string, handler: Handler): Router {
        this.add('DELETE', path, handler);
        return this;
    }

    private add(method: string, path: string, handler: Handler): void {
        const patternPath = path.replace(/:(\w+)/g, '/:$1');

        this.routes.push({
            pattern: new URLPattern({ pathname: patternPath }),
            handler: async (request: Request, env: Env) => {
                if (request.method !== method) {
                    return new Response('Method Not Allowed', { status: 405 });
                }
                return handler(request, env);
            }
        });
    }

    public async handle(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        for (const route of this.routes) {
            const match = route.pattern.exec(url);
            if (match) {
                const params = match.pathname.groups;
                Object.defineProperty(request, 'params', {
                    value: params,
                    writable: false
                });
                return route.handler(request, env);
            }
        }

        return new Response('Not Found', { status: 404 });
    }
}

declare global {
    interface Request {
        params?: Record<string, string>;
    }
}
