// Imports
// ------------
import Color from 'color';
import type { AlphaShades } from './interface';

// Exports
// ------------
// ANCHOR • Generate Alpha Shades for any color
// NOTE • Creates opacity variations from 0 to 100 for any color
// NOTE • Usage: generateColorVariants('#ff0000') or generateColorVariants(brandColors.bc1)
export const generateColorVariants = (baseColor: string): AlphaShades => {
	const color = Color(baseColor);
	const shades: { [key: number]: string } = {};

	for (let i = 0; i <= 100; i += 5) {
		shades[i] = color
			.alpha(i / 100)
			.rgb()
			.string();
	}

	return {
		...shades,
		solid: baseColor,
	};
};
