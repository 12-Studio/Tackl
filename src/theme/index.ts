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
		/* Globals */
		--black: ${theme.colors.global.black[100]};
		--white: ${theme.colors.global.white[100]};

		/* Brand Colors */
		--bc1: ${theme.colors.brand.bc1[100]};
		--bc2: ${theme.colors.brand.bc2[100]};
		--bc3: ${theme.colors.brand.bc3[100]};
		--bc4: ${theme.colors.brand.bc4[100]};
		--bc5: ${theme.colors.brand.bc5[100]};

		/* Easing */
		--bezzy: ${theme.easing.bezzy};
		--bezzy2: ${theme.easing.bezzy2};
		--bezzy3: ${theme.easing.bezzy3};
		
		/* Grid Lines*/
		--line-mobile-dist: 1.2rem;
		--line-desktop-dist: 1.6rem;
	}

	body {
		background: var(--black);
		font-family: ${theme.font.family.body};
		font-weight: ${theme.font.weight.regular};
	}
	
	* { color: var(--white); }

	::selection {
		background: ${theme.colors.brand.bc3[100]};
	}
`;
