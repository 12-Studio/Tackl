// Gap Types / Interfaces
// ------------
import type { gapValues } from './index';

// SECTION • Gap
// NOTE — Derived from gapValues, so adding a token there updates this automatically
export type Gap = { [K in keyof typeof gapValues]: string };
