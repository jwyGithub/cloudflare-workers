import type { RegistryConfig } from '../types';

// registry.ts - 配置镜像仓库信息
export const registryConfigs: Record<string, RegistryConfig> = {
    docker: {
        baseUrl: 'https://registry-1.docker.io',
        requiresAuth: true,
        authUrl: 'https://auth.docker.io/token'
    },
    quay: {
        baseUrl: 'https://quay.io',
        requiresAuth: true,
        authUrl: 'https://quay.io/v2/token'
    },
    gcr: {
        baseUrl: 'https://gcr.io',
        requiresAuth: true,
        authUrl: 'https://gcr.io/v2/token'
    },
    'k8s-gcr': {
        baseUrl: 'https://k8s.gcr.io',
        requiresAuth: true,
        authUrl: 'https://k8s.gcr.io/v2/token'
    },
    ghcr: {
        baseUrl: 'https://ghcr.io',
        requiresAuth: true,
        authUrl: 'https://ghcr.io/v2/token'
    },
    cloudsmith: {
        baseUrl: 'https://docker.cloudsmith.io',
        requiresAuth: true,
        authUrl: 'https://docker.cloudsmith.io/token'
    },
    k8s: {
        baseUrl: 'https://registry.k8s.io',
        requiresAuth: false,
        authUrl: ''
    }
};
