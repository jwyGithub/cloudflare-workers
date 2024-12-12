import type { SS } from '../parser/ss';
import type { Trojan } from '../parser/trojan';
import type { Vless } from '../parser/vless';
import type { Vmess } from '../parser/vmess';

export type VpsMap = Map<string, Vless | Vmess | Trojan | SS>;
