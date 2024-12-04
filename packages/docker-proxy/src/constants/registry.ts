import type { RegistryConfig } from '../types';

export const registryConfigs: RegistryConfig = {
    docker: 'https://registry-1.docker.io',
    quay: 'https://quay.io',
    gcr: 'https://gcr.io',
    'k8s-gcr': 'https://k8s.gcr.io',
    k8s: 'https://registry.k8s.io',
    ghcr: 'https://ghcr.io',
    cloudsmith: 'https://docker.cloudsmith.io'
};
