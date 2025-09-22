// Imports
// ------------
// import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Fonts } from './interface';

// SECTION • Inter font configuration optimized with swap display for better loading performance
// export const inter = Inter({
// 	subsets: ['latin'],
// 	display: 'swap', // Uses fallback font until Inter loads
// 	weight: ['400', '500', '700'],
// 	variable: '--inter',
// 	preload: true,
// });

// SECTION • Local font configuration
export const heebo = localFont({
	src: [
		{
			path: './heebo/Heebo-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: './heebo/Heebo-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: './heebo/Heebo-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--heebo',
	preload: true,
});

// Exports
// ------------
export const fonts: Fonts = {
	family: {
		heading: `var(--heebo), Arial, sans-serif`,
		body: `var(--heebo), Arial, sans-serif`,
		mono: `var(--heebo), Arial, sans-serif`,
		script: `var(--heebo), Arial, sans-serif`,
	},
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
