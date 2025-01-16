import type { RegistryConfig } from '../types';

export const registryConfigs: RegistryConfig = {
    // docker
    docker: 'https://registry-1.docker.io',
    quay: 'https://quay.io',
    gcr: 'https://gcr.io',
    'k8s-gcr': 'https://k8s.gcr.io',
    k8s: 'https://registry.k8s.io',
    ghcr: 'https://ghcr.io',
    cloudsmith: 'https://docker.cloudsmith.io',

    // npm
    npm: 'https://registry.npmjs.org'
};

export const registryGroupMap = {
    docker: ['docker', 'quay', 'gcr', 'k8s-gcr', 'k8s', 'ghcr', 'cloudsmith'],
    npm: ['npm']
};

export const REGISTRY_PATH_PATTERN = /^\/v2\/[^/]+\/[^/]+\/[^/]+$/;

export const AUTH_REG = /realm="(.+)",service="(.+)"(?:,scope="(.+)")?/;

export const REPOSITORY_REG = /^repository:((?:([^/]+)\/)?([^/:]+))(:(.+))?$/;
