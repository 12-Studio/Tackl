// Fonts Types / Interfaces
// ------------
import type { fontFamilies, fontWeights } from './index';

// SECTION • Fonts
// NOTE — Derived from fontFamilies/fontWeights, so adding a stack or weight
// there updates this automatically
export interface Fonts {
	family: { [K in keyof typeof fontFamilies]: string };
	weight: { [K in keyof typeof fontWeights]: number };
}
