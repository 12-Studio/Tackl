// Time Types / Interfaces
// ------------
import type { timeValues } from './index';

// SECTION • Time
// NOTE — Transition/animation durations; pair with an easing curve from @theme/easing.
// Derived from timeValues, so adding a duration there updates this automatically
export type Time = { [K in keyof typeof timeValues]: string };
