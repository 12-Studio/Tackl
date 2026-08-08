// Border Radius Types / Interfaces
// ------------
import type { borderRadiusValues } from './index';

// SECTION • Border Radius
// NOTE — Derived from borderRadiusValues, so adding a token there updates this automatically
export type BorderRadius = { [K in keyof typeof borderRadiusValues]: string };
