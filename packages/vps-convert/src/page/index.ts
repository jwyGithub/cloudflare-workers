import { toServerError, toStream } from '@jiangweiye/cloudflare-service';

interface IPageOption {
    url: string;
    lockBackend: boolean;
    remoteConfig: string;
    host: string;
}

function getRemoteConfig(envConfig = ''): { label: string; value: string }[] {
    const envConfigArr = envConfig.split('\n');
    return envConfigArr.reduce<{ label: string; value: string }[]>((acc, cur) => {
        acc.push({
            label: cur,
            value: cur
        });
        return acc;
    }, []);
}

function replaceBackend(data: string, host: string): string {
    return data.replace('#{cloudflare_worker_sub}', host);
}

function replaceRemoteConfig(data: string, config: string): string {
    const remoteConfig = config === '' ? [] : getRemoteConfig(config);
    return data.replace('[] // #{CLOUDFLARE_ENV_REMOTE}', JSON.stringify(remoteConfig));
}

function replaceDisabled(data: string, v: boolean): string {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    return data.replace(`'#{DISABLED_BACKEND}'`, v);
}

export const DEFAULT_CONFIG: Required<Env> = {
    PAGE_URL: `https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html`,
    BACKEND: 'https://url.v1.mk',
    LOCK_BACKEND: false,
    REMOTE_CONFIG: '[]'
};

export async function showPage(pageOptions: IPageOption): Promise<Response> {
    try {
        const { url, lockBackend, remoteConfig, host } = pageOptions;
        const response = await fetch(`${url}?t=${Date.now()}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        let originPage = await response.text();
        //  替换后端地址
        originPage = replaceBackend(originPage, host);
        // 替换远程配置
        originPage = replaceRemoteConfig(originPage, remoteConfig);
        // 替换是否锁定后端
        originPage = replaceDisabled(originPage, lockBackend);

        return toStream(
            originPage,
            new Headers({
                ...response.headers,
                'Content-Type': 'text/html; charset=utf-8'
            })
        );
    } catch (error: any) {
        return toServerError(error.message || error);
    }
}
