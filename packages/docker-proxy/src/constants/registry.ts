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
        },
        useExample: (host: string) => {
            return {
                title: 'Docker Hub 官方镜像',
                bash: [`docker pull ${host}/nginx:latest`]
            };
        }
    },
    ghcr: {
        baseUrl: 'https://ghcr.io',
        authRequired: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => `repository:${imagePath}:pull`,
        // useExample: (host: string) => [`# GitHub Container Registry`, `docker pull ${host}/ghcr/owner/repo:tag`]
        useExample: host => ({
            title: '# GitHub Container Registry',
            bash: [`docker pull ${host}/ghcr/owner/repo:tag`]
        })
    },
    gcr: {
        baseUrl: 'https://gcr.io',
        authRequired: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => `repository:${imagePath}:pull`,
        useExample: (host: string) => ({
            title: '# Google Container Registry',
            bash: [`docker pull ${host}/gcr/project/image:tag`]
        })
    },
    'k8s-gcr': {
        baseUrl: 'https://k8s.gcr.io',
        authRequired: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => `repository:${imagePath}:pull`,
        useExample: (host: string) => ({
            title: `# Kubernetes GCR 镜像`,
            bash: [`docker pull ${host}/k8s-gcr/kube-apiserver:v1.21.0`]
        })
    },
    k8s: {
        baseUrl: 'https://registry.k8s.io',
        authRequired: false, // k8s registry 通常不需要认证
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => `repository:${imagePath}:pull`,
        useExample: (host: string) => ({
            title: `# Kubernetes Registry 镜像`,
            bash: [`docker pull ${host}/k8s/kube-apiserver:v1.25.0`]
        })
    },
    quay: {
        baseUrl: 'https://quay.io',
        authRequired: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        scopeFormat: (imagePath: string) => `repository:${imagePath}:pull`,
        useExample: host => ({
            title: '# Quay 镜像',
            bash: [`docker pull ${host}/quay/organization/image:tag`]
        })
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
        },
        useExample: host => ({
            title: '# Cloudsmith 镜像',
            bash: [`docker pull ${host}/cloudsmith/organization/repository/image:tag`]
        })
    }
};
