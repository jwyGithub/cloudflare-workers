import type { SsParser } from './protocol/ss';
import type { TrojanParser } from './protocol/trojan';
import type { VlessParser } from './protocol/vless';
import type { VmessParser } from './protocol/vmess';

export interface BaseConfig {
    href: string;
    origin: string;
    protocol: string;
    username: string;
    password: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    searchParams: URLSearchParams;
    hash: string;
}

export interface VmessConfig {
    v: string;
    ps: string;
    add: string;
    port: string;
    id: string;
    aid: string;
    scy: string;
    net: string;
    type: string;
    host: string;
    path: string;
    tls: string;
    sni: string;
    alpn: string;
    fp: string;
}

export interface VlessConfig extends BaseConfig {}

export interface TrojanConfig extends BaseConfig {}

export interface SsConfig extends BaseConfig {}

export type ParserType = VlessParser | VmessParser | TrojanParser | SsParser;
