export type RegistryType = 'docker' | 'quay' | 'gcr' | 'k8s-gcr' | 'k8s' | 'ghcr' | 'cloudsmith';

export type RegistryConfig = Record<RegistryType, string>;
