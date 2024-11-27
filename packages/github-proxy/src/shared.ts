export function convertToRawUrl(url: string): string {
    try {
        // 如果包含完整的 https:// URL，直接提取它
        if (url.includes('https://')) {
            const matches = url.match(/(https:\/\/.*)/);
            if (matches) {
                return matches[1];
            }
        }

        // 移除 /github/ 前缀
        let githubPath = url.startsWith('/github/') ? url.substring(8) : url;

        // 如果以 github.com 开头，处理为 raw 链接
        if (githubPath.startsWith('github.com/')) {
            githubPath = githubPath.substring('github.com/'.length);

            // 处理 blob 链接
            if (githubPath.includes('/blob/')) {
                return `https://raw.githubusercontent.com/${githubPath.replace('/blob/', '/')}`;
            }

            return `https://raw.githubusercontent.com/${githubPath}`;
        }

        // 如果已经是 raw.githubusercontent.com 的链接，直接返回
        if (githubPath.startsWith('raw.githubusercontent.com/')) {
            return `https://${githubPath}`;
        }

        // 处理不同的 GitHub URL 格式
        if (githubPath.includes('/blob/')) {
            return `https://raw.githubusercontent.com/${githubPath.replace('/blob/', '/')}`;
        }

        if (githubPath.includes('/releases/download/')) {
            return `https://github.com/${githubPath}`;
        }

        if (githubPath.includes('/archive/')) {
            return `https://github.com/${githubPath}`;
        }

        // 默认假设为原始路径
        return `https://raw.githubusercontent.com/${githubPath}`;
    } catch (error: any) {
        throw new Error(`Invalid GitHub URL format: ${error.message}`);
    }
}
