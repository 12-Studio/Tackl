// Theme Configuration Documentation
// ===============================
// This file exports the theme object — the design tokens for use in JS
// (GSAP, inline styles, logic that needs a token).
//
// How it works:
// - Raw token values (colors, space, gap, radii, easing, time, fonts) live in
//   their token files and are generated ONCE into src/css/tokens.css as CSS
//   custom properties on :root (scripts/build-styles.ts — `bun run styles`).
// - The theme object exposes var() references to those properties, so JS and
//   SCSS read the same tokens, and any of them can be overridden at runtime
//   (e.g. html[data-theme='dark']) without touching JS.
// - Breakpoints and grid values stay literal: media queries can't read CSS
//   variables, so they are build-time tokens (see @theme/grid). SCSS gets them
//   as generated mixins (bp / bpd); JS gets them from @tackl (breakpoints, mq).
//
// Usage: theme.colors.brand.c1 → 'var(--brand-c1)'

// Imports
// -------
import { borderRadius } from './borderRadius';
import { colors } from './colors';
import { easing } from './easing';
import { fonts } from './fonts';
import { gap } from './gap';
import { grid } from './grid';
import type { Theme } from './interface';
import { space } from './space';
import { time } from './time';

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

// NOTE • Runtime theme overrides belong in CSS — redefine any token per theme
// and every consumer (SCSS and JS) follows automatically:
//
//   html[data-theme='dark'] {
//       --global-white: #000000;
//       --global-black: #ffffff;
//       --brand-c1: #9b30ff;
//   }
