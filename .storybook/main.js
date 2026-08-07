import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// NOTE • Aliases are generated from tsconfig.json's paths — one source of
// truth, nothing to keep in sync by hand. '@cms/*' and '@cms' both collapse
// to the same webpack alias, which is exactly what webpack expects.
const { paths } = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../tsconfig.json'), 'utf8')).compilerOptions;

const aliases = Object.fromEntries(
	Object.entries(paths).map(([key, [target]]) => [
		key.replace(/\/\*$/, ''),
		path.resolve(__dirname, '..', target.replace(/\/\*$/, '')),
	])
);

const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-themes', '@storybook/addon-docs'],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	webpackFinal: async config => {
		config.resolve.alias = {
			...config.resolve.alias,
			...aliases,
		};

		return config;
	},
};

export default config;
