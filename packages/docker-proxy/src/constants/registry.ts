import type { RegistryConfig } from '../types';

export const REGISTRY_CONFIGS: Record<string, RegistryConfig> = {
    docker: {
        baseUrl: 'https://registry-1.docker.io',
        authRequired: true,
        needLibrary: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => {
            const parts = imagePath.split('/');
            if (parts.length === 1) {
                return `repository:library/${imagePath}:pull`;
            }
            return `repository:${imagePath}:pull`;
        }
    },
    ghcr: {
        baseUrl: 'https://ghcr.io',
        authRequired: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => `repository:${imagePath}:pull`
    },
    gcr: {
        baseUrl: 'https://gcr.io',
        authRequired: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => `repository:${imagePath}:pull`
    },
    'k8s-gcr': {
        baseUrl: 'https://k8s.gcr.io',
        authRequired: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => `repository:${imagePath}:pull`
    },
    k8s: {
        baseUrl: 'https://registry.k8s.io',
        authRequired: false, // k8s registry 通常不需要认证
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => `repository:${imagePath}:pull`
    },
    quay: {
        baseUrl: 'https://quay.io',
        authRequired: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => `repository:${imagePath}:pull`
    },
    cloudsmith: {
        baseUrl: 'https://docker.cloudsmith.io',
        authRequired: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => {
            // Cloudsmith 格式: organization/repository/image:tag
            return `repository:${imagePath}:pull`;
        }
    }
};
