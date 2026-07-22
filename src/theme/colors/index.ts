// Property Documentation
// ------------

// NOTE • This file exports the colors object, the colors object is used to store all the colors for the application.

// REVIEW — Usage: ${props => props.theme.colors.brand.bc1[50]}

// Imports
// ------------
import { generateColorVariants } from './generateColorVariants';
import type { AlphaShades, Colors } from './interface';

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
		warning: '#face10',
	},
};

// SECTION • Variant Generation
// NOTE • Maps each raw color to alpha shades that reference its CSS variable
const variantsFor = <T extends Record<string, string>>(group: string, values: T): { [K in keyof T]: AlphaShades } =>
	Object.fromEntries(Object.keys(values).map(name => [name, generateColorVariants(`--${group}-${name}`)])) as {
		[K in keyof T]: AlphaShades;
	};

// Exports
// ------------
// SECTION • Core Brand Colors
// NOTE • Every value is a var()/color-mix() reference — resolved by the
// browser, so these are safe to use from statically imported styles too
export const colors: Colors = {
	brand: variantsFor('brand', baseColors.brand),
	global: variantsFor('global', baseColors.global),
	social: variantsFor('social', baseColors.social),
	feedback: variantsFor('feedback', baseColors.feedback),
};
