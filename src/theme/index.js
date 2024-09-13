// Imports
// -------
import { css, createGlobalStyle } from 'styled-components';
import Color from 'color';

// *** Theme Styling *** //
// ------
// 1. NOTE • Colours [Global, Social, Feedback, Brand]
// ------
// 2. NOTE • Spacing [Padding & Margin]
// ------
// 3. NOTE • Fonts [Type, Weight]
// ------
// 4. NOTE Grid [Breakpoints, Gutter, Max Grid Size]
// ------
// 5. NOTE • Easings [Bezzy, Global Ease]
// ------
// 6. NOTE • Magic Verticals
// ------
// 7. NOTE • No ScrollBars
// ------
// 8. NOTE • Alignments
// ------

// Exports
// ------
const brandColors = {
	primary: '#8000FF',
	secondary: '#212121',
	tertiary: '#121212',
	quaternary: '#F7F7F7',
	quinary: '#838383',
};

export const theme = {
	// 1. ANCHOR Colours
	// ------
	colors: {
		global: {
			white: '#ffffff',
			whiteTrans: Color('#ffffff').rgb().alpha(0).toString(),
			white10: Color('#ffffff').rgb().alpha(0.1).toString(),
			white20: Color('#ffffff').rgb().alpha(0.2).toString(),
			white30: Color('#ffffff').rgb().alpha(0.3).toString(),
			white40: Color('#ffffff').rgb().alpha(0.4).toString(),
			white50: Color('#ffffff').rgb().alpha(0.5).toString(),
			white60: Color('#ffffff').rgb().alpha(0.6).toString(),
			white70: Color('#ffffff').rgb().alpha(0.7).toString(),
			white80: Color('#ffffff').rgb().alpha(0.8).toString(),
			white90: Color('#ffffff').rgb().alpha(0.9).toString(),
			black: '#000000',
			blackTrans: Color('#000000').rgb().alpha(0).toString(),
			black10: Color('#000000').rgb().alpha(0.1).toString(),
			black20: Color('#000000').rgb().alpha(0.2).toString(),
			black30: Color('#000000').rgb().alpha(0.3).toString(),
			black40: Color('#000000').rgb().alpha(0.4).toString(),
			black50: Color('#000000').rgb().alpha(0.5).toString(),
			black60: Color('#000000').rgb().alpha(0.6).toString(),
			black70: Color('#000000').rgb().alpha(0.7).toString(),
			black80: Color('#000000').rgb().alpha(0.8).toString(),
			black90: Color('#000000').rgb().alpha(0.9).toString(),
		},

		social: {
			facebook: '#1877f2',
			twitter: '#1da1f2',
			creativeMarket: '#8ba753',
			slack: '#e01563',
			skype: '#00aff0',
			instagram: '#405de6',
			dribbble: '#ea4c89',
			behance: '#1769ff',
			linkedin: '#0a66c2',
			tiktok: '#FE2C55',
		},

		feedback: {
			positive: '#3adb76',
			negative: '#cc4b37',
			warning: '#ffae00',
		},

		brand: {
			bc1: brandColors.primary,
			bc1trans: Color(brandColors.primary).rgb().alpha(0).string(),
			bc1o10: Color(brandColors.primary).rgb().alpha(0.1).string(),
			bc1o20: Color(brandColors.primary).rgb().alpha(0.2).string(),
			bc1o30: Color(brandColors.primary).rgb().alpha(0.3).string(),
			bc1o40: Color(brandColors.primary).rgb().alpha(0.4).string(),
			bc1o50: Color(brandColors.primary).rgb().alpha(0.5).string(),
			bc1o60: Color(brandColors.primary).rgb().alpha(0.6).string(),
			bc1o70: Color(brandColors.primary).rgb().alpha(0.7).string(),
			bc1o80: Color(brandColors.primary).rgb().alpha(0.8).string(),
			bc1o90: Color(brandColors.primary).rgb().alpha(0.9).string(),

			bc2: brandColors.secondary,
			bc2trans: Color(brandColors.secondary).rgb().alpha(0).string(),
			bc2o10: Color(brandColors.secondary).rgb().alpha(0.1).string(),
			bc2o20: Color(brandColors.secondary).rgb().alpha(0.2).string(),
			bc2o30: Color(brandColors.secondary).rgb().alpha(0.3).string(),
			bc2o40: Color(brandColors.secondary).rgb().alpha(0.4).string(),
			bc2o50: Color(brandColors.secondary).rgb().alpha(0.5).string(),
			bc2o60: Color(brandColors.secondary).rgb().alpha(0.6).string(),
			bc2o70: Color(brandColors.secondary).rgb().alpha(0.7).string(),
			bc2o80: Color(brandColors.secondary).rgb().alpha(0.8).string(),
			bc2o90: Color(brandColors.secondary).rgb().alpha(0.9).string(),

			bc3: brandColors.tertiary,
			bc3trans: Color(brandColors.tertiary).rgb().alpha(0).string(),
			bc3o10: Color(brandColors.tertiary).rgb().alpha(0.1).string(),
			bc3o20: Color(brandColors.tertiary).rgb().alpha(0.2).string(),
			bc3o30: Color(brandColors.tertiary).rgb().alpha(0.3).string(),
			bc3o40: Color(brandColors.tertiary).rgb().alpha(0.4).string(),
			bc3o50: Color(brandColors.tertiary).rgb().alpha(0.5).string(),
			bc3o60: Color(brandColors.tertiary).rgb().alpha(0.6).string(),
			bc3o70: Color(brandColors.tertiary).rgb().alpha(0.7).string(),
			bc3o80: Color(brandColors.tertiary).rgb().alpha(0.8).string(),
			bc3o90: Color(brandColors.tertiary).rgb().alpha(0.9).string(),

			bc4: brandColors.quaternary,
			bc4trans: Color(brandColors.quaternary).rgb().alpha(0).string(),
			bc4o10: Color(brandColors.quaternary).rgb().alpha(0.1).string(),
			bc4o20: Color(brandColors.quaternary).rgb().alpha(0.2).string(),
			bc4o30: Color(brandColors.quaternary).rgb().alpha(0.3).string(),
			bc4o40: Color(brandColors.quaternary).rgb().alpha(0.4).string(),
			bc4o50: Color(brandColors.quaternary).rgb().alpha(0.5).string(),
			bc4o60: Color(brandColors.quaternary).rgb().alpha(0.6).string(),
			bc4o70: Color(brandColors.quaternary).rgb().alpha(0.7).string(),
			bc4o80: Color(brandColors.quaternary).rgb().alpha(0.8).string(),
			bc4o90: Color(brandColors.quaternary).rgb().alpha(0.9).string(),

			bc5: brandColors.quinary,
		},
	},

	// 2. ANCHOR • Padding & Margin
	// ------
	space: {
		mpad: '0.8rem', // Mobile Padding
		small: '4.8', // Small
		medium: '5.6', // Medium
		large: '6.4rem', // Large
		xlarge: '6.4rem', // XLarge
	},

	// 3. ANCHOR • Fonts
	// ------
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

	// 4. ANCHOR • Breakpoints
	// ------
	grid: {
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
			small: '1.6rem',
			smedium: '1.6rem',
			large: '1.6rem',
		},

		maxSize: '1440px',
	},

	// 5. ANCHOR • Easings
	// ------
	easing: {
		bezzy: 'cubic-bezier(0.8, 0, 0, 1)',
		bezzy2: 'cubic-bezier(0.430, 0.195, 0.020, 1.000)',
		ease: '0.3s ease-in-out',
	},

	// 6. ANCHOR • Magic Verticals
	// ------
	vh: css`
		height: 100vh;
		height: calc(var(--vh, 1vh) * 100);
	`,

	vhs: css`
		height: 100vh;
		height: calc(var(--vhs, 1vh) * 100);
	`,

	vhc: (value) => css`
		height: ${value}vh;
		height: calc(var(--vh, 1vh) * ${value});
	`,

	// 7. ANCHOR • No ScrollBars
	// ------
	noscrollbars: css`
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE 10+ */

		&::-webkit-scrollbar {
			width: 0px;
			height: 0px;
			background: transparent; /* Chrome/Safari/Webkit */
		}
	`,

	// 8. ANCHOR • Alignments
	// ------
	valign: css`
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	`,

	valignReset: css`
		position: relative;
		top: auto;
		transform: none;
	`,

	talign: css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	`,

	talignReset: css`
		position: relative;
		top: auto;
		left: auto;
		transform: none;
	`,
};

export const GlobalStyle = createGlobalStyle`
    body {  background: ${theme.colors.brand.bc3} }
    * { color: ${theme.colors.brand.bc4} }
`;
