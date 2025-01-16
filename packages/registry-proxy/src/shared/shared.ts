/**
 * 添加 CORS 头
 * @param response 响应
 * @returns 添加 CORS 头后的响应
 */
export function cors(response: Response): Response {
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return new Response(response.body, {
        status: response.status,
        headers
    });
}
