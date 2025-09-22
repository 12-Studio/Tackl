import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        ignores: [
            'node_modules/',
            '.next/',
            'out/',
            'build/',
            'dist/',
            'storybook-static/',
            '*.d.ts',
            'package-lock.json',
            'yarn.lock',
            'pnpm-lock.yaml',
        ],
    },
];
