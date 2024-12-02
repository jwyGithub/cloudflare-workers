import type { RegistryInfo } from '../types';
import { REGISTRIES } from '../constants/registry';

export function parseRegistryInfo(path: string): RegistryInfo {
    // 移除开头的斜杠
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // 处理 /v2/ 和 /v2 的情况
    if (cleanPath === 'v2' || cleanPath === 'v2/') {
        return {
            isV2Check: true,
            registry: 'docker', // 默认使用 docker registry
            repository: '',
            config: REGISTRIES.docker
        };
    }

    // 如果路径以 'v2/' 开头，移除它
    const parts = cleanPath.startsWith('v2/') ? cleanPath.slice(3).split('/') : cleanPath.split('/');

    // 特殊处理 library/ 开头的路径
    if (parts[0] === 'library') {
        return {
            isV2Check: false,
            registry: 'docker',
            repository: parts.join('/'), // 保持完整路径，包括 library
            config: REGISTRIES.docker
        };
    }

    // 处理正常的 registry 路径
    const registry = parts[0];
    if (REGISTRIES[registry]) {
        return {
            isV2Check: false,
            registry,
            repository: parts.slice(1).join('/'),
            config: REGISTRIES[registry]
        };
    }

    // 如果没有匹配的 registry，假设是 Docker Hub 路径
    return {
        isV2Check: false,
        registry: 'docker',
        repository: parts.join('/'),
        config: REGISTRIES.docker
    };
}
