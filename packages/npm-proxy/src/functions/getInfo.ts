export const onRequest: PagesFunction<Env> = async _ => {
    return new Response('Hello, world!');
};
