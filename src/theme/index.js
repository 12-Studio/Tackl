// Imports
// -------
import { css, createGlobalStyle } from 'styled-components';
import Color from 'color';

// Brand Colors
// -------------
const brandColors = {
	bc1: '#8000FF', // Primary Purple
	bc2: '#380377', // Dark Purple
	bc3: '#121212', // Near Black
	bc4: '#F7F7F7', // Off White
	bc5: '#838383', // Gray
};

// Generate Alpha Shades (0.0 to 1.0 opacity)
// ------------
const generateAlphaShades = (baseColor) => {
	const color = Color(baseColor);
	const shades = {};

	for (let i = 0; i < 10; i++) {
		shades[`o${i * 10}`] = color
			.alpha(i / 10)
			.rgb()
			.string();
	}

	return shades;
};

// Cache commonly used alpha shades
const whiteAlphas = generateAlphaShades('#ffffff');
const blackAlphas = generateAlphaShades('#000000');

// Generate brand color variations including transparency
const brandColorVariations = Object.entries(brandColors).reduce(
	(acc, [key, value]) => {
		const color = Color(value);
		return {
			...acc,
			[key]: value,
			[`${key}trans`]: color.alpha(0).rgb().string(),
			...Object.entries(generateAlphaShades(value)).reduce(
				(shades, [shadeKey, shadeValue]) => ({
					...shades,
					[`${key}${shadeKey}`]: shadeValue,
				}),
				{}
			),
		};
	},
	{}
);

// Theme Configuration
// ------------
export const theme = {
	colors: {
		global: {
			white: '#ffffff',
			black: '#000000',
			...whiteAlphas,
			...blackAlphas,
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

		brand: brandColorVariations,
	},

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

	easing: {
		bezzy: 'cubic-bezier(0.8, 0, 0, 1)',
		bezzy2: 'cubic-bezier(0.430, 0.195, 0.020, 1.000)',
		ease: '0.3s ease-in-out',
	},

	noscrollbars: css`
		scrollbar-width: none;
		-ms-overflow-style: none;
		&::-webkit-scrollbar {
			width: 0;
			height: 0;
			background: transparent;
		}
	`,
};

// Global Styles
// ------------
export const GlobalStyle = createGlobalStyle`
	body { background: ${theme.colors.brand.bc3}; }
	* { color: ${theme.colors.brand.bc4}; }
`;
