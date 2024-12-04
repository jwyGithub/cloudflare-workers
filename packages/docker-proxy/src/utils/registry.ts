import { registryConfigs } from '../constants/registry';
import { cacheResponse, getCacheResponse } from './cache';

/**
 * @description 判断是否是 Docker Hub
 * @param {string} hostname
 * @returns  {boolean} 是否是 Docker Hub
 */
export function isDockerHub(hostname: string): boolean {
    const firstDot = hostname.indexOf('.');
    const registryKey = hostname.slice(0, firstDot);
    return registryConfigs[registryKey] === registryConfigs.docker;
}

/**
 * @description 获取上游地址
 * @param {string} hostname
 * @returns {string | null} 上游地址
 */
export function getUpstream(hostname: string): string | null {
    const keys = Object.keys(registryConfigs);
    const key = keys.find(k => hostname.startsWith(k));
    if (key) {
        return registryConfigs[key];
    }

    return null;
}

/**
 * @description 获取 token
 * @param {string} wwwAuthenticate
 * @param {string | null} scope
 * @param {string | null} authorization
 * @returns {Promise<Response>} 返回请求结果
 */
export async function fetchToken(
    wwwAuthenticate: { realm: string; service: string },
    scope: string | null,
    authorization: string | null
): Promise<Response> {
    const url = new URL(wwwAuthenticate.realm);
    if (wwwAuthenticate.service.length) {
        url.searchParams.set('service', wwwAuthenticate.service);
    }
    if (scope) {
        url.searchParams.set('scope', scope);
    }
    const headers = new Headers();
    if (authorization) {
        headers.set('Authorization', authorization);
    }

    const cache = await getCacheResponse(url.toString());
    if (cache) {
        return cache;
    }

    const resp = await fetch(url, { method: 'GET', headers });
    await cacheResponse(url.toString(), resp.clone());
    return resp;
}

export function parseAuthenticate(authenticateStr: string): { realm: string; service: string } {
    const re = /(?<==")(?:\\.|[^"\\])*(?=")/g;
    const matches = authenticateStr.match(re);
    if (matches == null || matches.length < 2) {
        throw new Error(`invalid Www-Authenticate Header: ${authenticateStr}`);
    }
    return {
        realm: decodeURIComponent(matches[0]),
        service: decodeURIComponent(matches[1])
    };
}
