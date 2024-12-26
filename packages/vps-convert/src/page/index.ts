interface IPageOption {
    url: string;
    lockBackend: boolean;
    remoteConfig: string;
    origin: string;
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

function replaceBackend(data: string, origin: string): string {
    return data.replace('#{cloudflare_worker_sub}', origin);
}

function replaceRemoteConfig(data: string, config: string): string {
    const remoteConfig = config === '' ? [] : getRemoteConfig(config);
    return data.replace('[] // #{CLOUDFLARE_ENV_REMOTE}', JSON.stringify(remoteConfig));
}

function replaceDisabled(data: string, v: boolean): string {
    return data.replace(`'#{DISABLED_BACKEND}'`, v ? 'true' : 'false');
}

export const DEFAULT_CONFIG: Required<Env> = {
    PAGE_URL: `https://github.08050611.xyz/https://raw.githubusercontent.com/jwyGithub/subconverter-cloudflare/main/index.html`,
    BACKEND: 'https://url.v1.mk',
    LOCK_BACKEND: false,
    REMOTE_CONFIG: '',
    CHUNK_COUNT: '20'
};

export async function showPage(pageOptions: IPageOption): Promise<Response> {
    try {
        const { url, lockBackend, remoteConfig, origin } = pageOptions;
        const response = await fetch(`${url}?t=${Date.now()}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        let originPage = await response.text();
        //  替换后端地址
        originPage = replaceBackend(originPage, origin);
        // 替换远程配置
        originPage = replaceRemoteConfig(originPage, remoteConfig);
        // 替换是否锁定后端
        originPage = replaceDisabled(originPage, lockBackend);

        return new Response(originPage, {
            headers: new Headers({ ...response.headers, 'Content-Type': 'text/html; charset=utf-8' })
        });
    } catch (error: any) {
        return new Response(error.message || error);
    }
}
