import type { RegistryConfig } from '../types';
import { REGISTRIES } from '../constants/registry';

export function parseRegistryInfo(path: string): { registry: string; repository: string; config: RegistryConfig } {
    // 移除开头的斜杠
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const parts = cleanPath.split('/');

    // 确保路径至少包含registry部分
    if (parts.length < 1) {
        throw new Error('Invalid path: registry not specified');
    }

    const registry = parts[0];

    if (!REGISTRIES[registry]) {
        throw new Error(`Unsupported registry: ${registry}`);
    }

    // 获取repository部分（排除registry部分）
    const repository = parts.slice(1).join('/');
    if (!repository) {
        throw new Error('Invalid path: repository not specified');
    }

    return {
        registry,
        repository,
        config: REGISTRIES[registry]
    };
}
