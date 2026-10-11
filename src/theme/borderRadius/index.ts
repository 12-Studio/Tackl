// Property Documentation
// ------------

// NOTE • This file exports the borderRadius object, the borderRadius object is used to store all the borderRadius values for the application.

// REVIEW — Usage: border-radius: var(--br-s);

// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';

// SECTION • Raw Border Radius Values
// NOTE • Emitted as --br-{key} on :root in the generated src/css/tokens.css
export const borderRadiusValues = {
	xs: '0.3rem',
	s: '0.6rem',
	m: '1.2rem',
	l: '1.8rem',
	round: '999rem',
};

// Exports
// ------------
export const borderRadius = toVarRefs('br', borderRadiusValues);
