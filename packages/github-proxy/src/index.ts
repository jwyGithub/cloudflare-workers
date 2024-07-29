const GITHUB_SITE = 'https://github.com';

export default {
    async fetch(request): Promise<Response> {
        const { pathname } = new URL(request.url);

        const url = `${GITHUB_SITE}${pathname}`;

        const response = await fetch(url, {
            headers: request.headers,
            redirect: 'manual'
        });
        const headers = new Headers(response.headers);
        const raw_url = headers.get('location');
        if (raw_url) {
            const content = await fetch(raw_url);
            return new Response(content.body, {
                status: content.status,
                statusText: content.statusText,
                headers: content.headers
            });
        } else {
            return new Response('Not Found', { status: 404 });
        }
    }
} satisfies ExportedHandler<Env>;
