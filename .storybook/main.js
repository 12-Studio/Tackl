/** @type { import('@storybook/nextjs').StorybookConfig } */
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
	staticDirs: ['../public'],
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async (config) => {
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
		return config;
	},
};

export default config;
