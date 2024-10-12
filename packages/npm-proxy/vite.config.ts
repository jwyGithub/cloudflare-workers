import path from 'node:path';
import fs from 'node:fs';
import { defineConfig } from 'vite';

const functions_root = path.resolve(__dirname, './src/functions');

const functions_entry = fs.readdirSync(functions_root).reduce<string[]>((acc, file) => {
    acc.push(path.resolve(functions_root, file));
    return acc;
}, []);

export default defineConfig({
    build: {
        lib: {
            entry: ['src/index.ts', ...functions_entry],
            formats: ['es'],
            fileName: (_, filename) => {
                return filename === 'index' ? '_worker.js' : `functions/${filename}.js`;
            }
        },
        minify: true,
        outDir: 'pages'
    }
});
