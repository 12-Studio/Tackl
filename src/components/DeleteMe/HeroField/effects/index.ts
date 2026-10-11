// Imports
// ------------
import type { HeroEffect } from '../interface';
import { curtains } from './curtains';
import { equalizer } from './equalizer';
import { glass } from './glass';
import { halftone } from './halftone';
import { pillars } from './pillars';
import { rain } from './rain';
import { slats } from './slats';
import { sparks } from './sparks';
import { spotlight } from './spotlight';
import { strata } from './strata';

// Exports
// ------------
// NOTE • The hero effects on trial — pick one, delete the rest
export const EFFECTS: HeroEffect[] = [
	pillars,
	glass,
	equalizer,
	rain,
	curtains,
	halftone,
	slats,
	spotlight,
	strata,
	sparks,
];

export const DEFAULT_EFFECT = pillars.id;
