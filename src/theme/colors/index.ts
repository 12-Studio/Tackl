// Property Documentation
// ------------

// NOTE • This file exports the colors object, the colors object is used to store all the colors for the application.

// REVIEW — Usage: ${props => props.theme.colors.brand.bc1[50]}

// Imports
// ------------
import { generateColorVariants } from './generateColorVariants';
import { Colors } from './interface';

// Exports
// ------------
// SECTION • Core Brand Colors
// NOTE • These colors serve as the base for all color variations
export const colors: Colors = {
	brand: {
		bc1: generateColorVariants('#150A32'),
		bc2: generateColorVariants('#3843EB'),
		bc3: generateColorVariants('#8001FF'),
		bc4: generateColorVariants('#99F1E5'),
		bc5: generateColorVariants('#EFEFEF'),
	},

	global: {
		white: generateColorVariants('#ffffff'),
		black: generateColorVariants('#000000'),
	},

	social: {
		facebook: generateColorVariants('#1877f2'),
		twitter: generateColorVariants('#1da1f2'),
		creativeMarket: generateColorVariants('#8ba753'),
		slack: generateColorVariants('#e01563'),
		instagram: generateColorVariants('#405de6'),
		dribbble: generateColorVariants('#ea4c89'),
		linkedin: generateColorVariants('#0a66c2'),
	},

	feedback: {
		positive: generateColorVariants('#3adb76'),
		negative: generateColorVariants('#cc4b37'),
		warning: generateColorVariants('#face10'),
	},
};
