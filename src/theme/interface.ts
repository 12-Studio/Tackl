// Theme Types / Interfaces
// ------------

import type { BorderRadius } from './borderRadius/interface';
// Imports
// ------------
import type { Colors } from './colors/interface';
import type { Easing } from './easing/interface';
import type { Fonts } from './fonts/interface';
import type { Gap } from './gap/interface';
import type { Grid } from './grid/interface';
import type { Space } from './space/interface';
import type { Time } from './time/interface';

// Exports
// ------------
export interface Theme {
	colors: Colors;
	space: Space;
	gap: Gap;
	br: BorderRadius;
	font: Fonts;
	grid: Grid;
	easing: Easing;
	time: Time;
}
