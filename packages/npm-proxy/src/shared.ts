export async function compressResponse(response: Response): Promise<Response> {
    const contentType = response.headers.get('content-type') || '';

    // 只压缩特定类型的响应
    if (!contentType.includes('text/') && !contentType.includes('application/json') && !contentType.includes('application/javascript')) {
        return response;
    }

    // 创建压缩流
    const compressStream = new CompressionStream('gzip');
    const compressedStream = response.body?.pipeThrough(compressStream);

    const headers = new Headers(response.headers);
    headers.set('content-encoding', 'gzip');

    return new Response(compressedStream, {
        status: response.status,
        statusText: response.statusText,
        headers
    });
}

export async function decompressRequest(request: Request): Promise<Request> {
    const contentEncoding = request.headers.get('content-encoding');
    if (contentEncoding !== 'gzip' || !request.body) {
        return request;
    }

    // 创建解压流
    const decompressStream = new DecompressionStream('gzip');
    const decompressedStream = request.body.pipeThrough(decompressStream);

    // 创建新的请求对象，但不包含content-encoding头
    const headers = new Headers(request.headers);
    headers.delete('content-encoding');

    return new Request(request.url, {
        method: request.method,
        headers,
        body: decompressedStream,
        redirect: request.redirect
    });
}
