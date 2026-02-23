// Theme Configuration Documentation
// ===============================
// This file exports a theme object and global styles for use with styled-components.
// The theme provides consistent styling tokens across the application.
// Access theme values in styled-components via props.theme:

// Imports
// -------
import { createGlobalStyle, css } from 'styled-components';
import { borderRadius } from './borderRadius';
import { colors } from './colors';
import { easing } from './easing';
import { fonts } from './fonts';
import { gap } from './gap';
import { grid } from './grid';
import type { Theme } from './interface';
import { space } from './space';

// Theme Configuration
// ------------
export const theme: Theme = {
	// SECTION • Colors (Brand, Global, Social, Feedback)
	colors: colors,
	// SECTION • Space (Section Spacing)
	space: space,
	// SECTION • Gap (All Gap Values)
	gap: gap,
	// SECTION • Border Radius Values
	br: borderRadius,
	// SECTION • Fonts (All Font Values + Font Setup)
	font: fonts,
	// SECTION • Grid (All Grid Values)
	grid: grid,
	// SECTION • Easing (All Easing Values)
	easing: easing,
	// SECTION • Utility Functions
	utils: {
		noscrollbars: css`
			scrollbar-width: none;
			-ms-overflow-style: none;
			&::-webkit-scrollbar {
				width: 0;
				height: 0;
				background: transparent;
			}
		`,
	},
};

// Global Style
// ------------
// NOTE • This is the global style applied to the body and all elements.
export const GlobalStyle = createGlobalStyle`
	/* In the event we need to use our theme values in the CSS */
	html {
		--black: ${theme.colors.global.black[100]};
		--white: ${theme.colors.global.white[100]};
		--bezzy: ${theme.easing.bezzy};
		--bezzy2: ${theme.easing.bezzy2};
		--bezzy3: ${theme.easing.bezzy3};
	}

	body { background: var(--black); }
	* { color: var(--white); }
`;
