import { tryUrlEncode } from '@jiangweiye/worker-shared';

// async function getConfig(vps: string[]): Promise<{ urls: Set<string>; vpsMap: Map<string, Vless | Vmess | Trojan | SS> }> {
//     const urls = new Set<string>();
//     const vpsMap = new Map<string, Vless | Vmess | Trojan | SS>();

//     async function _parse(vps: string[]): Promise<void> {
//         for await (const v of vps) {
//             if (v.startsWith('vless:')) {
//                 const vless = new Vless(v);
//                 urls.add(vless.confuseLink);
//                 vpsMap.set(vless.confusePs, vless);
//             }
//             if (v.startsWith('vmess:')) {
//                 const vmess = new Vmess(v);
//                 urls.add(vmess.confuseLink);
//                 vpsMap.set(vmess.confusePs, vmess);
//             }
//             if (v.startsWith('trojan://')) {
//                 const trojan = new Trojan(v);
//                 urls.add(trojan.confuseLink);
//                 vpsMap.set(trojan.confusePs, trojan);
//             }
//             if (v.startsWith('ss://')) {
//                 const ss = new SS(v);
//                 urls.add(ss.confuseLink);
//                 vpsMap.set(ss.confusePs, ss);
//             }

//             if (v.startsWith('https://')) {
//                 const subContent = await fetchWithRetry(tryUrlDecode(v), { retries: 3 }).then(r => r.data.text());
//                 const subType = getSubType(subContent);
//                 if (subType === 'base64') {
//                     await _parse(processBase64(subContent));
//                 }
//             }
//         }
//     }
//     await _parse(vps);

//     return { urls, vpsMap };
// }

// export async function getConfuseUrl(
//     url: Request['url'],
//     backend: string
// ): Promise<{
//     confuseUrl: string;
//     vpsMap: Map<string, Vless | Vmess | Trojan | SS>;
// }> {
//     const { searchParams, origin } = new URL(url);
//     const vpsUrl = searchParams.get('url');

//     const vps = vpsUrl!.split(/\||\n/).filter(Boolean);

//     const { urls, vpsMap } = await getConfig(vps);

//     const subPath = `${origin}/${SERVICE_GET_SUB}`;

//     const response = new Response(base64Encode(Array.from(urls).join('\n')), {
//         headers: new Headers({ 'Content-Type': 'text/plain; charset=UTF-8' })
//     });

//     await caches.default.put(subPath, response.clone());

//     searchParams.set('url', subPath);

//     const confuseUrl = new URL(`${backend}/sub`);
//     confuseUrl.search = searchParams.toString();

//     return {
//         confuseUrl: confuseUrl.toString(),
//         vpsMap
//     };
// }

/**
 * @description 获取转换的完整链接
 * @returns {string} 转换的完整链接
 */
export function getConvertUrl(url: Request['url'], backend: string): string {
    const { searchParams, origin } = new URL(url);
    const vpsUrl = searchParams.get('url');
    const vps = vpsUrl!.split(/\||\n/).filter(Boolean);
    searchParams.set('url', tryUrlEncode(`${origin}/getSub?links=${vps.join('|')}`));
    const convertUrl = new URL(`${backend}/sub`);
    convertUrl.search = searchParams.toString();

    return convertUrl.toString();
}
