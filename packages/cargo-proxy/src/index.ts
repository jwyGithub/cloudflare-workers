const CARGO_MIRROR = 'https://github.com/rust-lang/crates.io-index';

export default {
    async fetch(request: Request): Promise<Response> {
        // 获取原始请求的URL
        const url = new URL(request.url);

        // 构造新的URL,将请求转发到Cargo镜像源
        const newUrl = new URL(`${CARGO_MIRROR}${url.pathname}${url.search}`);

        // 创建新的请求,保留原始请求的方法和头部信息
        const newRequest = new Request(newUrl.toString(), {
            method: request.method,
            headers: request.headers,
            body: request.body
        });

        // 发送请求到Cargo镜像源并返回响应
        return fetch(newRequest);
    }
};
