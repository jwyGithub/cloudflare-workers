export interface ClashType {
    proxies: Array<Record<string, string>>;
    'proxy-groups': Array<{
        name: string;
        type: string;
        proxies?: string[];
        [key: string]: any;
    }>;
    [key: string]: any;
}
