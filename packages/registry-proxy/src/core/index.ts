import type { RegistryConfig, RegistryType } from '../types';
import { registryConfigs, registryGroupMap } from '../constants/registry';
import { DockerProxy } from './proxys/docker.proxy';
import { NpmProxy } from './proxys/npm.proxy';

export class RegistryProxy {
    private dockerProxy: DockerProxy;
    private npmProxy: NpmProxy;
    private url: URL;
    private upstreamConfig: { key: RegistryType; registry: string } = {
        key: 'docker',
        registry: registryConfigs.docker
    };

    private upstreamGroup: keyof typeof registryGroupMap = 'docker';

    constructor(request: Request, env: Env, ctx: ExecutionContext) {
        this.url = new URL(request.url);
        this.dockerProxy = new DockerProxy(request);
        this.npmProxy = new NpmProxy(request, env, ctx);
    }

    /**
     * 匹配请求
     * @returns 响应
     */
    public async match(): Promise<Response> {
        this.upstreamConfig = this.getUpstreamConfig();
        this.upstreamGroup = this.getUpstreamGroup();

        // 如果上游是 docker，则使用 docker 代理
        if (this.upstreamGroup === 'docker') {
            return await this.dockerProxy.forward(this.upstreamConfig.registry);
        }

        // 如果上游是 npm，则使用 npm 代理
        if (this.upstreamGroup === 'npm') {
            return await this.npmProxy.forward(this.upstreamConfig.registry);
        }

        return new Response('Not Found', { status: 404 });
    }

    /**
     * 获取上游地址
     * @returns 上游地址
     */
    private getUpstreamConfig(): { key: RegistryType; registry: string } {
        const keys = Object.keys(registryConfigs) as (keyof RegistryConfig)[];
        const key = keys.find(key => this.url.hostname.startsWith(key));
        if (key) {
            return {
                key,
                registry: registryConfigs[key]
            };
        }
        return {
            key: 'docker',
            registry: registryConfigs.docker
        };
    }

    /**
     * 获取上游所属的组
     * @returns 上游组
     */
    private getUpstreamGroup(): keyof typeof registryGroupMap {
        for (const [key, value] of Object.entries(registryGroupMap) as [keyof typeof registryGroupMap, string[]][]) {
            if (value.includes(this.upstreamConfig.key)) {
                return key;
            }
        }
        return 'docker';
    }
}
