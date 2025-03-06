import type { Config } from './types';

export function getClashConfig(config: Config): string {
    const url = new URL(`https://${config.SUB_API}/sub`);
    const urlParams = new URLSearchParams();
    urlParams.set('target', 'clash');
    urlParams.set('new_name', 'true');
    urlParams.set('insert', 'false');
    urlParams.set('config', config.SUB_CONFIG);
    urlParams.set('url', config.SUB_LIST_URL);
    urlParams.set('filename', 'sub');
    urlParams.set('emoji', 'true');
    urlParams.set('list', 'false');
    urlParams.set('tfo', 'false');
    urlParams.set('scv', 'false');
    urlParams.set('fdn', 'false');
    urlParams.set('sort', 'false');
    return `${url.toString()}?${urlParams.toString()}`;
}
