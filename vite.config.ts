import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: `_worker`
        },
        minify: true,
        outDir: 'pages'
    }
});
