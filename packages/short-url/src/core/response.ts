export class ResponseUtil {
    static json(data: any, status = 200): Response {
        return new Response(JSON.stringify(data), {
            status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });
    }

    static error(message: string, status = 400): Response {
        return this.json({ error: message }, status);
    }

    static success(data: any): Response {
        return this.json({ data });
    }

    static cors(response: Response): Response {
        const headers = new Headers(response.headers);
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Content-Type');

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers
        });
    }
}
