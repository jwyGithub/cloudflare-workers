import type { ShortUrl } from '../types';

export class UrlService {
    constructor(private db: D1Database) {}

    async add(long_url: string, baseUrl: string): Promise<ShortUrl> {
        const code = this.generateShortCode();
        const short_url = `${baseUrl}/${code}`;

        const result = await this.db
            .prepare('INSERT INTO short_url (short_code, short_url, long_url) VALUES (?, ?, ?) RETURNING id')
            .bind(code, short_url, long_url)
            .first<{ id: number }>();

        if (!result?.id) {
            throw new Error('Failed to create short URL');
        }

        return { id: result.id, short_code: code, short_url, long_url };
    }

    async delete(id: number): Promise<void> {
        await this.db.prepare('DELETE FROM short_url WHERE id = ?').bind(id).run();
    }

    async getById(id: number): Promise<ShortUrl | null> {
        return await this.db.prepare('SELECT id, short_url, long_url FROM short_url WHERE id = ?').bind(id).first<ShortUrl>();
    }

    async getList(page = 1, pageSize = 10): Promise<{ total: number; items: ShortUrl[] }> {
        const offset = (page - 1) * pageSize;
        const [total, items] = await Promise.all([
            this.db.prepare('SELECT COUNT(*) as count FROM short_url').first<{ count: number }>(),
            this.db
                .prepare('SELECT id, short_code, short_url, long_url FROM short_url LIMIT ? OFFSET ?')
                .bind(pageSize, offset)
                .all<ShortUrl>()
        ]);

        return {
            total: total?.count || 0,
            items: items?.results || []
        };
    }

    async getByShortUrl(short_url: string): Promise<ShortUrl | null> {
        return await this.db
            .prepare('SELECT id, short_code, short_url, long_url FROM short_url WHERE short_url = ?')
            .bind(short_url)
            .first<ShortUrl>();
    }

    async getByCode(code: string): Promise<ShortUrl | null> {
        return await this.db
            .prepare('SELECT id, short_code, short_url, long_url FROM short_url WHERE short_code = ?')
            .bind(code)
            .first<ShortUrl>();
    }

    async deleteByCode(code: string): Promise<void> {
        await this.db
            .prepare('DELETE FROM short_url WHERE short_code = ?')
            .bind(code)
            .run();
    }

    private generateShortCode(): string {
        return crypto.randomUUID().substring(0, 8);
    }
}
