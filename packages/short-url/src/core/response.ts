export class ResponseUtil {
    static json(data: any, status = 200): Response {
        return new Response(JSON.stringify(data), {
            status,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static error(message: string, status = 400): Response {
        return this.json({ error: message }, status);
    }

    static success(data: any): Response {
        return this.json({ data });
    }
}
