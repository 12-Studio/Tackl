// Property Documentation
// ------------

// NOTE • This file exports the time object, the time object stores transition/animation durations for the application.

// REVIEW — Usage: transition: opacity var(--time-m) var(--easing-bezzy);

// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';

// SECTION • Raw Time Values
// NOTE • Emitted as --time-{key} on :root in the generated src/css/tokens.css
export const timeValues = {
	s: '0.15s',
	m: '0.3s',
	l: '0.6s',
};

// Exports
// ------------
export const time = toVarRefs('time', timeValues);
