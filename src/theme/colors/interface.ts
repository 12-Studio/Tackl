// Color Types / Interfaces
// ------------
import type { baseColors } from './index';

// SECTION • Colors
// NOTE — Every color token is a var() reference string; opacity is applied
// at the point of use (getters, alpha(), or color-mix in CSS).
// Derived from baseColors, so adding a color there updates this automatically
export type Colors = { [G in keyof typeof baseColors]: ColorGroup<(typeof baseColors)[G]> };

export type ColorGroup<T> = { [K in keyof T]: string };

export type BrandColors = Colors['brand'];
export type GlobalColors = Colors['global'];
export type FeedbackColors = Colors['feedback'];
