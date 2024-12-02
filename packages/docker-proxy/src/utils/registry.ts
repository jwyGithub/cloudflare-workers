import type { RegistryConfig } from '../types';
import { REGISTRIES } from '../constants/registry';

// utils/registry.ts

export function parseRegistryInfo(path: string): {
    isV2Check: boolean;
    registry: string;
    repository: string;
    config: RegistryConfig | null;
} {
    // 移除开头的斜杠
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // 处理 /v2/ 和 /v2 的情况
    if (cleanPath === 'v2' || cleanPath === 'v2/') {
        // 返回一个特殊标记，表示这是 API 版本检查请求
        return {
            isV2Check: true,
            registry: '',
            repository: '',
            config: null
        };
    }

    // 如果路径以 'v2/' 开头，移除它
    const parts = cleanPath.startsWith('v2/') ? cleanPath.slice(3).split('/') : cleanPath.split('/');

    if (parts.length < 1) {
        throw new Error('Invalid path: registry not specified');
    }

    const registry = parts[0];

    if (!REGISTRIES[registry]) {
        throw new Error(`Unsupported registry: ${registry}`);
    }

    const repository = parts.slice(1).join('/');
    if (!repository) {
        throw new Error('Invalid path: repository not specified');
    }

    return {
        isV2Check: false,
        registry,
        repository,
        config: REGISTRIES[registry]
    };
}
