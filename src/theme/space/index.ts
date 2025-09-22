// Property Documentation
// ------------

// NOTE • This file exports the space object, the space object is used primarily for margin/padding values between sections. $pad and $mar are used to set the margin/padding values for the section automatically throughout the application.

// REVIEW — Usage: ${getSpace('m')}

// Imports
// ------------
import { Space } from './interface';

// Exports
// ------------
export const space: Space = {
	s: '4.8rem',
	m: '6rem',
	l: 'calc(8.333vw + 1.8rem)',
	xl: 'calc(8.333vw + 1.8rem)',
	col: 'calc(8.333vw + 1.8rem)',
};
