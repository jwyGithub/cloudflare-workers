// utils/index.ts - 常用的工具类函数
export const isValidJson = (str: string): boolean => {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
};

export const parseUrl = (url: string): URL | null => {
    try {
        return new URL(url);
    } catch {
        return null;
    }
};
