import { eslint } from '@jiangweiye/eslint-config';

export default eslint(
    {
        typescript: true,
        type: 'lib',
        rules: {
            'no-console': 'off'
        }
    },
    {
        ignores: ['pages/*']
    }
);
