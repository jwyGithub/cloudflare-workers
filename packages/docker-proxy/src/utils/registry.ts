import type { RegistryConfig } from '../types';
import { registryConfigs } from '../constants/registry';

export const getRegistryConfig = (hostname: string): RegistryConfig | null => {
    return registryConfigs[hostname] || null;
};

// 格式化 Docker Hub 镜像路径
export const formatDockerHubPath = (path: string): string => {
    const parts = path.split('/');
    if (parts.length === 5) {
        parts.splice(2, 0, 'library'); // 添加 `library/` 前缀
        return parts.join('/');
    }
    return path;
};
