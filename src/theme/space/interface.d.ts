// Space Types / Interfaces
// ------------
import type { spaceValues } from './index';

// SECTION • Space
// NOTE — Derived from spaceValues, so adding a token there updates this automatically
export type Space = { [K in keyof typeof spaceValues]: string };
