/**
 * @description 分组URL
 * @param {string[]} urls
 * @param {number} chunkCount
 * @returns {string[]} urlGroup
 */
export function getUrlGroup(urls: string[], chunkCount: number = 10): string[] {
    const urlGroup: string[] = [];
    let urlChunk: string[] = [];
    urls.forEach((url, index) => {
        urlChunk.push(url);
        if ((index + 1) % chunkCount === 0) {
            urlGroup.push(urlChunk.join('|'));
            urlChunk = [];
        }
    });
    if (urlChunk.length > 0) {
        urlGroup.push(urlChunk.join('|'));
    }
    return urlGroup;
}
