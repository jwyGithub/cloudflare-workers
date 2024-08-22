import init, { compress_image, convert_to_base64, convert_to_svg } from './dist/wasm_image';

async function fileToBase64(file: File): Promise<{
    url: string;
    base64: string;
}> {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    return new Promise((resolve, reject) => {
        try {
            const base64 = convert_to_base64(bytes);
            const base64DataUrl = `data:${file.type};base64,${base64}`;
            resolve({
                url: base64DataUrl,
                base64
            });
        } catch (error) {
            reject(error);
        }
    });
}

async function compressImage(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    return new Promise((resolve, reject) => {
        try {
            const compressed = compress_image(bytes, 30);
            const base64 = convert_to_base64(compressed);
            const base64DataUrl = `data:${file.type};base64,${base64}`;
            resolve(base64DataUrl);
        } catch (error) {
            reject(error);
        }
    });
}

export default {
    async fetch(request, _env, _ctx): Promise<Response> {
        await init();
        const { pathname } = new URL(request.url);
        switch (pathname) {
            case `/zip`: {
                const file = (await request.formData()).get('file');

                if (!file) {
                    return new Response('No file', {
                        status: 400,
                        headers: {
                            'content-type': 'text/plain'
                        }
                    });
                }

                const base64 = await compressImage(file as File);
                return new Response(base64, {
                    status: 404,
                    headers: {
                        'content-type': 'text/plain',
                        'content-length': base64.length.toString()
                    }
                });
            }

            case '/base64': {
                const file = (await request.formData()).get('file');

                if (!file) {
                    return new Response('No file', {
                        status: 400,
                        headers: {
                            'content-type': 'text/plain'
                        }
                    });
                }

                const { base64 } = await fileToBase64(file as File);
                return new Response(base64, {
                    status: 404,
                    headers: {
                        'content-type': 'text/plain',
                        'content-length': base64.length.toString()
                    }
                });
            }

            case '/svg': {
                const file = (await request.formData()).get('file');

                if (!file) {
                    return new Response('No file', {
                        status: 400,
                        headers: {
                            'content-type': 'text/plain'
                        }
                    });
                }

                const arrayBuffer = await (file as File).arrayBuffer();
                const bytes = new Uint8Array(arrayBuffer);

                const svg = convert_to_svg(bytes);
                return new Response(svg, {
                    status: 200,
                    headers: {
                        'content-type': 'text/plain'
                    }
                });
            }

            case '/': {
                /// @ts-expect-error
                const page = await import('./index.html').then(mod => mod.default);
                return new Response(page, {
                    status: 200,
                    headers: {
                        'content-type': 'text/html'
                    }
                });
            }

            default:
                break;
        }

        return new Response('Not Found', {
            status: 404,
            headers: {
                'content-type': 'text/plain'
            }
        });
    }
} satisfies ExportedHandler<Env>;
