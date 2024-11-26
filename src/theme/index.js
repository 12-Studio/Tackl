// Imports
// -------
import { css, createGlobalStyle } from 'styled-components';
import Color from 'color';

// Brand Colours
// -------------
const brandColors = {
	bc1: '#8000FF',
	bc2: '#380377',
	bc3: '#121212',
	bc4: '#F7F7F7',
	bc5: '#838383',
};

// Generate Alpha Shades
// ------------
const generateAlphaShades = (baseColor) => {
	const color = Color(baseColor);
	return Array.from({ length: 10 }, (_, i) => ({
		[`o${i * 10}`]: color
			.rgb()
			.alpha(i / 10)
			.string(),
	})).reduce((acc, shade) => ({ ...acc, ...shade }), {});
};

// Theme
// ------------
export const theme = {
	// NOTE • 1 • Colours
	colors: {
		global: {
			white: '#ffffff',
			black: '#000000',
			...generateAlphaShades('#ffffff'), // Generate white alpha shades
			...generateAlphaShades('#000000'), // Generate black alpha shades
		},

		social: {
			facebook: '#1877f2',
			twitter: '#1da1f2',
			creativeMarket: '#8ba753',
			slack: '#e01563',
			instagram: '#405de6',
			dribbble: '#ea4c89',
			linkedin: '#0a66c2',
		},

		feedback: {
			positive: '#3adb76',
			negative: '#cc4b37',
			warning: '#ffae00',
		},

		brand: {
			...brandColors,
			...Object.fromEntries(
				Object.entries(brandColors).flatMap(([key, value]) => [
					[key, value],
					[`${key}trans`, Color(value).rgb().alpha(0).string()],
					...Object.entries(generateAlphaShades(value)).map(
						([shadeKey, shadeValue]) => [`${key}${shadeKey}`, shadeValue]
					),
				])
			),
		},
	},

	// NOTE • 2 • Spacing
	space: {
		mpad: '0.8rem', // Mobile Padding
		small: '4.8rem',
		medium: '5.6rem',
		large: '6.4rem',
		xlarge: '6.4rem',
	},

	font: {
		type: {
			heading: `'Change__me', 'Helvetica', Arial, sans-serif`,
			mono: `'Change__me', 'Helvetica', Arial, sans-serif`,
			hand: `'Change__me', 'Helvetica', Arial, sans-serif`,
			body: `'Change__me', 'Helvetica', Arial, sans-serif`,
		},
		weight: {
			light: 300,
			regular: 400,
			medium: 500,
			semi: 600,
			bold: 700,
		},
	},

	// NOTE • 3 • Shadows
	grid: {
		columns: {
			mobile: 2,
			tablet: 6,
			desktop: 12,
		},

		breakpoints: {
			small: '0px',
			smedium: '390px',
			medium: '700px',
			large: '1024px',
			xlarge: '1200px',
			xxlarge: '1400px',
			huge: '1600px',
			uber: '1800px',
		},

		gutter: {
			small: '2.4rem',
			medium: '2.4rem',
			large: '3.6rem',
		},

		maxSize: '1440px',
	},

	// NOTE • 3 • Shadows
	easing: {
		bezzy: 'cubic-bezier(0.8, 0, 0, 1)',
		bezzy2: 'cubic-bezier(0.430, 0.195, 0.020, 1.000)',
		ease: '0.3s ease-in-out',
	},

	// NOTE • 3 • Shadows
	noscrollbars: css`
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE 10+ */

		&::-webkit-scrollbar {
			width: 0px;
			height: 0px;
			background: transparent; /* Chrome/Safari/Webkit */
		}
	`,
};

// Exports
// ------------
export const GlobalStyle = createGlobalStyle`
    body {  background: ${theme.colors.brand.bc3} }
    * { color: ${theme.colors.brand.bc4} }
`;
