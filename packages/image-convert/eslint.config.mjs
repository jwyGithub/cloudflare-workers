import eslint from '@jiangweiye/eslint-config';

export default eslint({
    typescript: true,
    rules: {
        'ts/ban-ts-comment': 'off'
    },
    ignores: ['./src/wasm/*']
});
