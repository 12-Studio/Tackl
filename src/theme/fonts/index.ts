// Imports
// ------------

// import localFont from 'next/font/local';
import { toVarRefs } from '@theme/cssVariables';
import { Inter } from 'next/font/google';
import type { Fonts } from './interface';

// SECTION • Inter font configuration optimized with swap display for better loading performance
export const inter = Inter({
	subsets: ['latin'],
	display: 'swap', // Uses fallback font until Inter loads
	weight: ['400', '500', '700'],
	variable: '--inter',
	preload: true,
});

// SECTION • Local font configuration
// export const heebo = localFont({
// 	src: [
// 		{
// 			path: './heebo/Heebo-Light.woff2',
// 			weight: '300',
// 			style: 'normal',
// 		},
// 		{
// 			path: './heebo/Heebo-Regular.woff2',
// 			weight: '400',
// 			style: 'normal',
// 		},
// 		{
// 			path: './heebo/Heebo-Medium.woff2',
// 			weight: '500',
// 			style: 'normal',
// 		},
// 	],
// 	display: 'swap',
// 	variable: '--heebo',
// 	preload: true,
// });

// SECTION • Raw Font Stacks
// NOTE • Emitted as --font-{key} on :root by GlobalStyle (@theme).
// --inter is set on <html> by next/font (see app/layout.tsx)
export const fontFamilies = {
	heading: `var(--inter), Arial, sans-serif`,
	body: `var(--inter), Arial, sans-serif`,
	mono: `var(--inter), Arial, sans-serif`,
	script: `var(--inter), Arial, sans-serif`,
};

// Exports
// ------------
// NOTE • Weights stay literal numbers — they're not runtime-themeable
export const fonts: Fonts = {
	family: toVarRefs('font', fontFamilies),
	weight: {
		light: 300,
		regular: 400,
		medium: 500,
		semi: 600,
		bold: 700,
		heavy: 800,
		black: 900,
	},
};
