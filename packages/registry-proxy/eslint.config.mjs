import { eslint } from '@jiangweiye/eslint-config';

export default eslint(
    {
        typescript: true,
        type: 'lib'
    },
    {
        ignores: ['pages/*']
    }
);
