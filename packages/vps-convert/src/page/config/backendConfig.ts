export function getBackendConfig(request: Request, env: Env): { label: string; value: string }[] {
    const { origin } = new URL(request.url);
    const envConfigArr = env.BACKEND?.split('\n').filter(Boolean) ?? [];
    return envConfigArr.reduce<{ label: string; value: string }[]>(
        (acc, cur) => {
            acc.unshift({ label: cur, value: cur });
            return acc;
        },
        [
            { label: origin, value: origin },
            { label: '肥羊增强型后端【vless+hysteria】', value: 'https://api.v1.mk' },
            { label: '肥羊备用后端【vless+hysteria】', value: 'https://sub.d1.mk' },
            { label: '品云提供后端【实验性】', value: 'https://v.id9.cc' },
            { label: 'つつ-多地防失联【负载均衡+国内优化】', value: 'https://api.tsutsu.one' },
            { label: 'nameless13提供', value: 'https://www.nameless13.com' },
            { label: 'subconverter作者提供', value: 'https://sub.xeton.dev' },
            { label: 'sub-web作者提供', value: 'https://api.wcc.best' },
            { label: 'sub作者&lhie1提供', value: 'https://api.dler.io' }
        ]
    );
}
