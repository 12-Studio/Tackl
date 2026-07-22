// Property Documentation
// ------------

// NOTE • This file exports the gap object, the gap object is used to store all the gap values for the application.

// REVIEW — Usage: ${getGap('s')}

// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';
import type { Gap } from './interface';

// SECTION • Raw Gap Values
// NOTE • Emitted as --gap-{key} on :root by GlobalStyle (@theme)
export const gapValues = {
	xxs: '0.3rem',
	xs: '0.4rem',
	s: '0.8rem',
	sm: '1.2rem',
	m: '1.6rem',
	l: '2.4rem',
	xl: '3.2rem',
	xxl: '4rem',
	huge: '4.8rem',
	uber: '6.4rem',
};

// Exports
// ------------
export const gap: Gap = toVarRefs('gap', gapValues);
