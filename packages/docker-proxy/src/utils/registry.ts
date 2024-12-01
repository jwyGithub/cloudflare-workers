import type { AuthResponse } from '../types';
import { REGISTRY_CONFIGS } from '../constants/registry';

export function parseRegistryInfo(pathname: string): {
    registryType: string;
    imagePath: string;
} {
    const parts = pathname.split('/').filter(Boolean);

    // 默认为 docker hub
    if (parts.length === 0) {
        return { registryType: 'docker', imagePath: '/' };
    }

    // 检查第一个部分是否是支持的注册表类型
    if (parts[0] in REGISTRY_CONFIGS) {
        const registryType = parts.shift() || 'docker';
        return {
            registryType,
            imagePath: `/${parts.join('/')}`
        };
    }

    return {
        registryType: 'docker',
        imagePath: pathname
    };
}

export function configureRegistryHeaders(registryType: string, authorization?: string | null): Headers {
    const headers = new Headers();
    const config = REGISTRY_CONFIGS[registryType];

    if (authorization) {
        headers.set('Authorization', authorization);
    }

    if (config?.headers) {
        Object.entries(config.headers).forEach(([key, value]) => {
            headers.set(key, value);
        });
    }

    return headers;
}

export function parseAuthenticateHeader(authenticateStr: string): AuthResponse {
    const regex = /Bearer realm="([^"]+)",service="([^"]+)"(?:,scope="([^"]+)")?/;
    const matches = authenticateStr.match(regex);

    if (!matches) {
        throw new Error(`Invalid WWW-Authenticate header: ${authenticateStr}`);
    }

    return {
        realm: matches[1],
        service: matches[2],
        scope: matches[3]
    };
}

export function normalizeImagePath(registryType: string, imagePath: string): string {
    switch (registryType) {
        case 'k8s-gcr':
        case 'k8s':
            // 移除可能的前导斜杠
            return imagePath.replace(/^\//, '');

        case 'cloudsmith': // Cloudsmith 需要确保路径格式为 org/repo/image
        {
            const parts = imagePath.split('/').filter(Boolean);
            if (parts.length < 3) {
                throw new Error('Invalid Cloudsmith image path format. Expected: organization/repository/image');
            }
            return parts.join('/');
        }

        default:
            return imagePath.replace(/^\//, '');
    }
}
