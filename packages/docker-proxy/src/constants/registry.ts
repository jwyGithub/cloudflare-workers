import type { RegistryConfig } from '../types';

export const REGISTRIES: Record<string, RegistryConfig> = {
    docker: {
        baseUrl: 'https://registry-1.docker.io',
        authUrl: 'https://auth.docker.io/token',
        needAuth: true,
        headers: {
            'Docker-Distribution-Api-Version': 'registry/2.0',
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        formatTargetUrl: (baseUrl: string, repository: string) => {
            if (repository.startsWith('library/')) {
                return `${baseUrl}/v2/${repository}`;
            }
            return `${baseUrl}/v2/${repository.includes('/') ? repository : `library/${repository}`}`;
        },
        auth: {
            service: 'registry.docker.io',
            formatScope: (repository: string) => {
                const repo = repository.includes('/') ? repository : `library/${repository}`;
                return `repository:${repo}:pull`;
            }
        }
    },
    ghcr: {
        baseUrl: 'https://ghcr.io',
        authUrl: 'https://ghcr.io/token',
        needAuth: true,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        formatTargetUrl: (baseUrl: string, repository: string) => `${baseUrl}/v2/${repository}`,
        auth: {
            formatScope: (repository: string) => `repository:${repository}:pull`
        }
    },
    gcr: {
        baseUrl: 'https://gcr.io',
        needAuth: false,
        formatTargetUrl: (baseUrl: string, repository: string) => `${baseUrl}/v2/${repository}`,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json,application/vnd.oci.image.manifest.v1+json'
        }
    },
    'k8s-gcr': {
        baseUrl: 'https://k8s.gcr.io',
        needAuth: false,
        formatTargetUrl: (baseUrl: string, repository: string) => `${baseUrl}/v2/${repository}`
    },
    k8s: {
        baseUrl: 'https://registry.k8s.io',
        needAuth: false,
        formatTargetUrl: (baseUrl: string, repository: string) => `${baseUrl}/v2/${repository}`
    },
    quay: {
        baseUrl: 'https://quay.io',
        authUrl: 'https://quay.io/v2/auth',
        needAuth: true,
        formatTargetUrl: (baseUrl: string, repository: string) => `${baseUrl}/v2/${repository}`,
        headers: {
            Accept: 'application/vnd.docker.distribution.manifest.v2+json'
        },
        auth: {
            formatScope: (repository: string) => `repository:${repository}:pull`
        }
    },
    cloudsmith: {
        baseUrl: 'https://docker.cloudsmith.io',
        needAuth: true,
        formatTargetUrl: (baseUrl: string, repository: string) => `${baseUrl}/v2/${repository}`
    }
};
