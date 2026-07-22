// Imports
// ------------
import type { AlphaShades } from './interface';

// Exports
// ------------
// ANCHOR • Generate Alpha Shades for a color token's CSS variable
// NOTE • Creates opacity variations from 0 to 100 via color-mix — no colour
// maths happens in JS, the browser resolves the variable at paint time, so
// runtime theme overrides (e.g. html[data-theme='dark']) apply everywhere
// NOTE • Usage: generateColorVariants('--brand-bc1')
export const generateColorVariants = (cssVariable: string): AlphaShades => {
	const shades: { [key: number]: string } = {};

	for (let i = 0; i <= 100; i += 5) {
		shades[i] = i === 100 ? `var(${cssVariable})` : `color-mix(in srgb, var(${cssVariable}) ${i}%, transparent)`;
	}

	return {
		...shades,
		solid: `var(${cssVariable})`,
	};
};
