// Property Documentation
// ------------

// NOTE • This file exports the space object, the space object is used primarily for margin/padding values between sections. The data-pad / data-mar attributes (and the pad / mar mixins) apply it responsively.

// REVIEW — Usage: padding-top: var(--space-m);  or  <section data-pad>

// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';

// SECTION • Raw Space Values
// NOTE • Emitted as --space-{key} on :root in the generated src/css/tokens.css
export const spaceValues = {
	s: '4.8rem',
	m: '6rem',
	l: '10rem',
	xl: '12rem',
	col: 'calc(8.333vw + 1.8rem)',
};

// Exports
// ------------
export const space = toVarRefs('space', spaceValues);
