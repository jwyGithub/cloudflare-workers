import type { ConvertTarget } from '../types';
import { base64Decode } from 'cloudflare-tools';

export * from './Confuse';
export * from './Origin';

export class Convert {
    /**
     * @description 处理base64订阅
     * @param {string} subs
     * @returns {string[]} content
     */
    static base64(subs: string): string[] {
        const content = base64Decode(subs);
        return content.split('\n').filter(Boolean);
    }

    /**
     * @description 获取转换类型
     * @param {string | URL} url
     * @returns {ConvertTarget | null} 转换类型
     */
    static getConvertType(url: string | URL): ConvertTarget | null {
        const { searchParams } = new URL(url);
        return searchParams.get('target');
    }
}
