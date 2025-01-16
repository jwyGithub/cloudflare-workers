import type { AuthConfig, RegistryConfig } from '../../types';
import { AUTH_REG, REGISTRY_PATH_PATTERN, registryConfigs, REPOSITORY_REG } from '../../constants/registry';

export class DockerProxy {
    private request: Request;
    private url: URL;
    private authorization: string = '';
    private isDocker: boolean = false;
    constructor(request: Request) {
        this.request = request;
        this.url = new URL(request.url);
    }

    public async forward(upstream: string): Promise<Response> {
        this.authorization = this.request.headers.get('Authorization') || '';
        this.isDocker = this.isDockerRegistry();

        if (this.url.pathname === '/v2/') {
            const registryUrl = new URL(`${upstream}/v2/`);
            const headers = new Headers();
            if (this.authorization) {
                headers.set('Authorization', this.authorization);
            }

            const resp = await fetch(registryUrl.toString(), {
                method: this.request.method,
                headers,
                redirect: 'follow'
            });

            if (resp.status === 401) {
                // 将realm设置为当前服务的/v2/auth
                const { realm, service } = this.parseAuthenticate(resp);
                headers.set(
                    'Www-Authenticate',
                    `Bearer realm="https://${this.url.hostname}/v2/auth?get_token_url=${realm}",service="${service}"`
                );
                return new Response('UNAUTHORIZED', { status: 401, headers });
            } else {
                return resp;
            }
        }

        if (this.url.pathname === '/v2/auth') {
            const get_token_url = this.url.searchParams.get('get_token_url');
            const service = this.url.searchParams.get('service');
            const scope = this.isDocker ? this.updateScope(this.url.searchParams.get('scope')!) : this.url.searchParams.get('scope');
            const token = await this.getToken(get_token_url, service, scope);
            return token;
        }

        if (this.isDocker && this.isRegistryPath(this.url.pathname)) {
            const redirectUrl = new URL(this.request.url);
            redirectUrl.pathname = redirectUrl.pathname.replace('/v2/', '/v2/library/');
            return Response.redirect(redirectUrl.href, 301);
        }

        const newUrl = new URL(upstream + this.url.pathname);
        const newReq = new Request(newUrl, {
            method: this.request.method,
            headers: this.request.headers,
            redirect: 'follow'
        });

        return await fetch(newReq);
    }

    /**
     * 判断请求是否是 Docker Registry 请求
     * @returns 是否是 Docker Registry 请求
     */
    private isDockerRegistry(): boolean {
        const keys = Object.keys(registryConfigs) as (keyof RegistryConfig)[];
        return keys.some(key => this.url.hostname.startsWith(key));
    }

    /**
     * 判断路径是否是 Registry 路径
     * @param path 路径
     * @returns 是否是 Registry 路径
     */
    private isRegistryPath(path: string): boolean {
        return REGISTRY_PATH_PATTERN.test(path);
    }

    /**
     * 更新 scope
     * @param scope scope
     * @returns 更新后的 scope
     */
    private updateScope(scope: string): string {
        const [_, __, library] = scope.match(REPOSITORY_REG) || [];
        if (!library) {
            return scope.replace(/repository:([^:]+)/, 'repository:library/$1');
        }
        return scope;
    }

    /**
     * 解析认证信息
     * @param resp 响应
     * @returns 认证信息
     */
    private parseAuthenticate(resp: Response): AuthConfig {
        const authenticate = resp.headers.get('www-authenticate');
        const [_, realm, service, scope] = authenticate?.match(AUTH_REG) ?? [];
        return {
            realm,
            service,
            scope
        };
    }

    /**
     * 获取 token
     * @param get_token_url 获取 token 的 url
     * @param service 服务
     * @param scope scope
     * @returns 响应
     */
    private async getToken(get_token_url: string | null, service: string | null, scope: string | null): Promise<Response> {
        if (!get_token_url || !service || !scope) {
            return new Response('Failed to get request token url', { status: 400 });
        }
        const searchParams = new URLSearchParams();
        searchParams.set('service', service);
        searchParams.set('scope', scope);
        const tokenUrl = `${get_token_url}?${searchParams.toString()}`;
        const token = await fetch(tokenUrl);
        return token;
    }
}
