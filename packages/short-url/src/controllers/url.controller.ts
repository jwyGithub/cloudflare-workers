import type { UrlService } from '../services/url.service';
import { ResponseUtil } from '../core/response';

export class UrlController {
    constructor(private service: UrlService) {}

    async add(request: Request): Promise<Response> {
        try {
            const { long_url, serve } = await request.json<{ long_url: string; serve?: string }>();
            if (!long_url) {
                return ResponseUtil.error('Missing long_url');
            }

            const url = new URL(request.url);
            const baseUrl = serve || `${url.protocol}//${url.host}`;

            const result = await this.service.add(long_url, baseUrl);
            return ResponseUtil.success(result);
        } catch (error: any) {
            return ResponseUtil.error(error.message || 'Invalid request');
        }
    }

    async delete(request: Request): Promise<Response> {
        try {
            const url = new URL(request.url);
            const code = url.searchParams.get('code');

            if (!code) {
                return ResponseUtil.error('Missing code');
            }

            await this.service.deleteByCode(code);
            return ResponseUtil.success({ deleted: true });
        } catch (error: any) {
            return ResponseUtil.error(error.message || 'Invalid request');
        }
    }

    async queryByCode(request: Request): Promise<Response> {
        try {
            const url = new URL(request.url);
            const code = url.searchParams.get('code');

            if (!code) {
                return ResponseUtil.error('Missing code');
            }

            const result = await this.service.getByCode(code);
            return result ? ResponseUtil.success(result) : ResponseUtil.error('Not found', 404);
        } catch (error: any) {
            return ResponseUtil.error(error.message || 'Invalid request');
        }
    }

    async queryList(request: Request): Promise<Response> {
        try {
            const url = new URL(request.url);
            const page = Number.parseInt(url.searchParams.get('page') || '1');
            const pageSize = Number.parseInt(url.searchParams.get('pageSize') || '10');

            const result = await this.service.getList(page, pageSize);
            return ResponseUtil.success(result);
        } catch (error: any) {
            return ResponseUtil.error(error.message || 'Invalid request');
        }
    }

    async redirect(request: Request): Promise<Response> {
        try {
            const code = request.params?.code;
            if (!code) {
                return ResponseUtil.error('Invalid short URL');
            }

            const result = await this.service.getByCode(code);
            if (result) {
                return Response.redirect(result.long_url, 302);
            }
            return ResponseUtil.error('Not found', 404);
        } catch (error: any) {
            return ResponseUtil.error(error.message || 'Invalid request');
        }
    }
}
