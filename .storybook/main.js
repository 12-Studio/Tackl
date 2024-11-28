import path from 'path';

const config = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-viewport',
        '@storybook/addon-themes',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    webpackFinal: async config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@/*': path.resolve(__dirname, '../src/*'),
            '@parts': path.resolve(__dirname, '../src/parts/'),
            '@icon': path.resolve(__dirname, '../src/parts/Icon'),
            '@contexts': path.resolve(__dirname, '../src/parts/Contexts'),
            '@waffl': path.resolve(__dirname, '../src/theme/waffl'),
            '@theme': path.resolve(__dirname, '../src/theme/'),
            '@tackl': path.resolve(__dirname, '../src/theme/tackl/'),
            '@utils': path.resolve(__dirname, '../src/utils/'),
            '@public': path.resolve(__dirname, '../public/'),
        };

        // Add this section to handle the Color package
        config.resolve.fallback = {
            ...config.resolve.fallback,
            util: require.resolve('util/'),
        };

        return config;
    },
};

export default config;
