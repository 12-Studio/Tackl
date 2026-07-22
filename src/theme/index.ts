// Theme Configuration Documentation
// ===============================
// This file exports a theme object and global styles for use with styled-components.
// The theme provides consistent styling tokens across the application.
//
// How it works:
// - Raw token values (colors, space, gap, radii, easing, font stacks) live in
//   their token files and are emitted ONCE as CSS custom properties on :root
//   by GlobalStyle below.
// - The theme object exposes var() references to those properties, so the
//   same tokens work in styled-components (via props.theme or static import),
//   plain CSS and Server Components — and can be overridden at runtime
//   (e.g. html[data-theme='dark']) without touching JS.
// - Breakpoints and grid values stay literal: media queries can't read CSS
//   variables, so they are build-time tokens (see @theme/grid).
//
// Access theme values in styled-components via props.theme:

// Imports
// -------
import { createGlobalStyle } from 'styled-components';
import { borderRadius, borderRadiusValues } from './borderRadius';
import { baseColors, colors } from './colors';
import { toVarDeclarations } from './cssVariables';
import { easing, easingValues } from './easing';
import { fontFamilies, fonts } from './fonts';
import { gap, gapValues } from './gap';
import { grid } from './grid';
import type { Theme } from './interface';
import { space, spaceValues } from './space';
import { time, timeValues } from './time';

// Theme Configuration
// ------------
export const theme: Theme = {
	// SECTION • Colors (Brand, Global, Social, Feedback)
	colors: colors,
	// SECTION • Space (Section Spacing)
	space: space,
	// SECTION • Gap (All Gap Values)
	gap: gap,
	// SECTION • Border Radius Values
	br: borderRadius,
	// SECTION • Fonts (All Font Values + Font Setup)
	font: fonts,
	// SECTION • Grid (All Grid Values)
	grid: grid,
	// SECTION • Easing (All Easing Curves)
	easing: easing,
	// SECTION • Time (Transition/Animation Durations)
	time: time,
};

// CSS Custom Properties
// ------------
// NOTE • Generated from the raw token values — add a token to its token file
// and it lands here automatically. Names follow --{section}-{key}.
const cssVariables = [
	...Object.entries(baseColors).map(([group, values]) => toVarDeclarations(group, values)),
	toVarDeclarations('space', spaceValues),
	toVarDeclarations('gap', gapValues),
	toVarDeclarations('br', borderRadiusValues),
	toVarDeclarations('easing', easingValues),
	toVarDeclarations('time', timeValues),
	toVarDeclarations('font', fontFamilies),
].join('\n');

// Global Style
// ------------
export const GlobalStyle = createGlobalStyle`
	:root {
		${cssVariables}
	}

	/* SECTION • Runtime theme overrides
	   Redefine any token per theme — every consumer follows automatically:

	   html[data-theme='dark'] {
	       --global-white: #000000;
	       --global-black: #ffffff;
	       --brand-bc1: #9b30ff;
	   }
	*/

	body {
		background: ${theme.colors.global.black};
		color: ${theme.colors.global.white};
	}
`;
