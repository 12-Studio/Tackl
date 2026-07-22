import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-themes', '@storybook/addon-docs'],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	webpackFinal: async config => {
		// Mirror the path aliases from tsconfig.json — keep the two in sync
		config.resolve.alias = {
			...config.resolve.alias,
			'@parts': path.resolve(__dirname, '../src/components'),
			'@css': path.resolve(__dirname, '../src/css'),
			'@queries': path.resolve(__dirname, '../app/queries'),
			'@tackl': path.resolve(__dirname, '../src/theme/tackl'),
			'@waffl': path.resolve(__dirname, '../src/theme/tackl/waffl'),
			'@theme': path.resolve(__dirname, '../src/theme'),
			'@utils': path.resolve(__dirname, '../src/utils'),
			'@public': path.resolve(__dirname, '../public'),
			'@': path.resolve(__dirname, '../src'),
		};

		return config;
	},
};

export default config;
