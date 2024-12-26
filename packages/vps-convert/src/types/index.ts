import type { ParserType } from '../core/parser/types';

export type VpsMap = Map<string, ParserType>;
export type SubType = 'base64' | 'yaml' | 'json' | 'unknown';

export type ConvertTarget = 'clash' | 'clashr' | 'singbox' | (string & {});

export * from './Clash';
export * from './Singbox';
