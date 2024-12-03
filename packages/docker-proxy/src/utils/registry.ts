import type { RegistryConfig } from '../types';
import { registryConfigs } from '../constants/registry';

export const getRegistryConfig = (hostname: string): RegistryConfig | null => {
    const registry = Object.keys(registryConfigs).find(key => hostname.includes(key));
    return registry ? registryConfigs[registry] : null;
};

export function formatDockerHubPath(pathname: string): string {
    const pathParts = pathname.split('/');
    if (pathParts.length === 5) {
        pathParts.splice(2, 0, 'library');
        return pathParts.join('/');
    }
    return pathname;
}

export function parseAuthenticate(authenticateStr: string): { realm: string; service: string } {
    const re = /(?<==")[^"]*(?=")/g;
    const matches = authenticateStr.match(re);
    if (!matches || matches.length < 2) {
        throw new Error(`Invalid WWW-Authenticate Header: ${authenticateStr}`);
    }
    return {
        realm: decodeURIComponent(matches[0]),
        service: decodeURIComponent(matches[1])
    };
}

export function formatScope(scope: string, isDockerHub: boolean): string {
    if (isDockerHub && scope) {
        const scopeParts = scope.split(':');
        if (scopeParts.length === 3 && !scopeParts[1].includes('/')) {
            scopeParts[1] = `library/${scopeParts[1]}`;
            return scopeParts.join(':');
        }
    }
    return decodeURIComponent(scope);
}
