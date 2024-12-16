import type { SS } from '../parser/ss';
import type { Trojan } from '../parser/trojan';
import type { Vless } from '../parser/vless';
import type { Vmess } from '../parser/vmess';

export type VpsMap = Map<string, Vless | Vmess | Trojan | SS>;
export type SubType = 'base64' | 'yaml' | 'json' | 'unknown';

export type ConvertTarget = 'clash' | 'clashr' | 'singbox' | (string & {});

export * from './Clash';
export * from './Singbox';
export * from './Surge';
