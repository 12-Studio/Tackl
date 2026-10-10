// Imports
// ------------

// import localFont from 'next/font/local';
import { toVarRefs } from '@theme/cssVariables';
import { Inter } from 'next/font/google';
import { fontFamilies, fontWeights } from './values';

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

// SECTION • Raw Values
// NOTE • Re-exported so existing @theme/fonts imports keep working
export { fontFamilies, fontVariables, fontWeights } from './values';

// Exports
// ------------
export const fonts = {
	family: toVarRefs('font', fontFamilies),
	weight: fontWeights,
};
