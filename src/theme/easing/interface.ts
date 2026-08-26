// Easing Types / Interfaces
// ------------
import type { easingValues } from './index';

// SECTION • Easing
// NOTE — Pure easing curves (durations live in @theme/time).
// Derived from easingValues, so adding a curve there updates this automatically
export type Easing = { [K in keyof typeof easingValues]: string };
