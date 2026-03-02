// Imports
// ------------
import localFont from 'next/font/local';
import type { Fonts } from './interface';

// SECTION • Local font configuration
export const neueHaas = localFont({
	src: [
		{
			path: './neueHaas/thin.woff2',
			weight: '200',
			style: 'normal',
		},
		{
			path: './neueHaas/light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: './neueHaas/roman.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--neue-haas',
	preload: true,
});

export const pp = localFont({
	src: [
		{
			path: './pp/regular.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--pp',
	preload: true,
});

// Exports
// ------------
export const fonts: Fonts = {
	family: {
		heading: `var(--neue-haas), Arial, sans-serif`,
		body: `var(--neue-haas), Arial, sans-serif`,
		mono: `var(--pp), Arial, sans-serif`,
		script: `var(--unused), Arial, sans-serif`,
	},
	weight: {
		thin: 200,
		light: 300,
		regular: 400,
		medium: 500,
		semi: 600,
		bold: 700,
		heavy: 800,
		black: 900,
	},
};
