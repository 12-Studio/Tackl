// Imports
// ------------

// import localFont from 'next/font/local';
import { toVarRefs } from '@theme/cssVariables';
import { Inter } from 'next/font/google';

// SECTION • Inter font configuration optimized with swap display for better loading performance
// NOTE • No `weight` array — Inter is a variable font, so this loads ONE file
// covering every weight (100–900) instead of a request per static weight
export const inter = Inter({
	subsets: ['latin'],
	display: 'swap', // Uses fallback font until Inter loads
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

// SECTION • Font Registry
// NOTE • Every next/font instance is registered here — key is the font's
// name, value is the CSS variable it exposes on <html>. The setup wizard
// (and you) pick fonts by name from this registry; uploads append to it.
export const fontVariables = {
	inter: '--inter',
};

// SECTION • Raw Font Stacks
// NOTE • Emitted as --font-{key} on :root by GlobalStyle (@theme).
// --inter is set on <html> by next/font (see app/layout.tsx)
export const fontFamilies = {
	heading: `var(--inter), Arial, sans-serif`,
	body: `var(--inter), Arial, sans-serif`,
	mono: `var(--inter), Arial, sans-serif`,
	script: `var(--inter), Arial, sans-serif`,
};

// SECTION • Raw Font Weights
// NOTE • Literal numbers — they're not runtime-themeable
export const fontWeights = {
	light: 300,
	regular: 400,
	medium: 500,
	semi: 600,
	bold: 700,
	heavy: 800,
	black: 900,
};

// Exports
// ------------
export const fonts = {
	family: toVarRefs('font', fontFamilies),
	weight: fontWeights,
};
