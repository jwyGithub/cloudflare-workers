export type RegistryType = 'docker' | 'quay' | 'gcr' | 'k8s-gcr' | 'k8s' | 'ghcr' | 'cloudsmith' | 'npm';

export type RegistryConfig = Record<RegistryType, string>;

export interface AuthConfig {
    realm?: string;
    service?: string;
    scope?: string;
}
