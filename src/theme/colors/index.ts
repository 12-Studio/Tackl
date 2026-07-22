// Property Documentation
// ------------

// NOTE • This file exports the colors object, the colors object is used to store all the colors for the application.

// REVIEW — Usage: ${props => props.theme.colors.brand.bc1} or ${getBrand('bc1', 50)} for opacity

// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';
import type { Colors } from './interface';

// SECTION • Raw Color Values
// NOTE • The single source of truth — emitted as CSS custom properties on
// :root by GlobalStyle (@theme), named --{group}-{name} (e.g. --brand-bc1).
// Override any of them at runtime (e.g. html[data-theme='dark']) to retheme.
export const baseColors = {
	brand: {
		bc1: '#8000FF',
		bc2: '#380377',
		bc3: '#210048',
		bc4: '#F7F7F7',
		bc5: '#838383',
	},

	global: {
		white: '#ffffff',
		black: '#000000',
	},

	feedback: {
		positive: '#3adb76',
		negative: '#cc4b37',
		warning: '#face10',
	},
};

// Exports
// ------------
// SECTION • Color Tokens
// NOTE • Each color is a plain var() reference resolved by the browser.
// Need opacity? Use the getters — getBrand('bc1', 50) — or color-mix
// directly in CSS: color-mix(in srgb, var(--brand-bc1) 50%, transparent)
export const colors: Colors = {
	brand: toVarRefs('brand', baseColors.brand),
	global: toVarRefs('global', baseColors.global),
	feedback: toVarRefs('feedback', baseColors.feedback),
};
