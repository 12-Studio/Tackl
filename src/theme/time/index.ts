// Property Documentation
// ------------

// NOTE • This file exports the time object, the time object stores transition/animation durations for the application.

// REVIEW — Usage: transition: opacity ${getTime('m')} ${getEase('bezzy')};

// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';

// SECTION • Raw Time Values
// NOTE • Emitted as --time-{key} on :root by GlobalStyle (@theme)
export const timeValues = {
	s: '0.15s',
	m: '0.3s',
	l: '0.6s',
};

// Exports
// ------------
export const time = toVarRefs('time', timeValues);
