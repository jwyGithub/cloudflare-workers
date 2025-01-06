export function getRemoteConfig(env: Env): { label: string; value: string }[] {
    const envConfigArr = env.REMOTE_CONFIG?.split('\n').filter(Boolean) ?? [];
    return envConfigArr.reduce<{ label: string; value: string }[]>(
        (acc, cur) => {
            acc.unshift({
                label: cur,
                value: cur
            });
            return acc;
        },
        [
            {
                label: 'ACL4SSR_Online 默认版 分组比较全 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini'
            },
            {
                label: 'ACL4SSR_Online_AdblockPlus 更多去广告 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_AdblockPlus.ini'
            },
            {
                label: 'ACL4SSR_Online_NoAuto 无自动测速 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoAuto.ini'
            },
            {
                label: 'ACL4SSR_Online_NoReject 无广告拦截规则 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoReject.ini'
            },
            {
                label: 'ACL4SSR_Online_Mini 精简版 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini'
            },
            {
                label: 'ACL4SSR_Online_Mini_AdblockPlus.ini 精简版 更多去广告 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_AdblockPlus.ini'
            },
            {
                label: 'ACL4SSR_Online_Mini_NoAuto.ini 精简版 不带自动测速 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_NoAuto.ini'
            },
            {
                label: 'ACL4SSR_Online_Mini_Fallback.ini 精简版 带故障转移 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_Fallback.ini'
            },
            {
                label: 'ACL4SSR_Online_Mini_MultiMode.ini 精简版 自动测速、故障转移、负载均衡 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiMode.ini'
            },
            {
                label: 'ACL4SSR_Online_Full 全分组 重度用户使用 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini'
            },
            {
                label: 'ACL4SSR_Online_Full_NoAuto.ini 全分组 无自动测速 重度用户使用 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_NoAuto.ini'
            },
            {
                label: 'ACL4SSR_Online_Full_AdblockPlus 全分组 重度用户使用 更多去广告 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_AdblockPlus.ini'
            },
            {
                label: 'ACL4SSR_Online_Full_Netflix 全分组 重度用户使用 奈飞全量 (与Github同步)',
                value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Netflix.ini'
            }
        ]
    );
}
