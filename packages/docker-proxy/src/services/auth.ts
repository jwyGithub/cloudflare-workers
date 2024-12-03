// auth.ts - 处理认证头和获取 token
// export function parseAuthenticate(authenticateStr: string): { realm: string; service: string; scope: string } {
//     const re = /(?<==")(?:\\.|[^"\\])*(?=")/g;
//     const matches = authenticateStr.match(re);
//     if (matches == null || matches.length < 3) {
//         throw new Error(`Invalid WWW-Authenticate Header: ${authenticateStr}`);
//     }
//     return {
//         realm: matches[0],
//         service: matches[1],
//         scope: matches[2]
//     };
// }

// // 获取认证 token
// export async function fetchToken(
//     wwwAuthenticate: { realm: string; service: string; scope: string },
//     scope: string | null,
//     authorization: string | null
// ): Promise<string> {
//     const url = new URL(wwwAuthenticate.realm);
//     if (wwwAuthenticate.service.length) {
//         url.searchParams.set('service', wwwAuthenticate.service);
//     }

//     if (scope) {
//         url.searchParams.set('scope', scope);
//     }

//     const headers = new Headers();
//     if (authorization) {
//         headers.set('Authorization', authorization);
//     }

//     const response = await fetch(url.toString(), { method: 'GET', headers });
//     if (!response.ok) {
//         throw new Error(`Failed to fetch token from ${url.toString()}`);
//     }

//     const data = (await response.json()) as { token: string };
//     return data.token;
// }

export async function fetchToken(authUrl: string, scope: string | null, authorization: string | null): Promise<string> {
    const url = new URL(authUrl);
    url.searchParams.set('scope', scope || '');
    const headers = new Headers();
    if (authorization) {
        headers.set('Authorization', authorization);
    }

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.status}`);
    }

    const data = (await response.json()) as { token: string };
    return data.token;
}
