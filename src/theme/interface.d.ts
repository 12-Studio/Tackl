// Theme Types / Interfaces
// ------------

import { BorderRadius } from './borderRadius/interface';
// Imports
// ------------
import { Colors } from './colors/interface';
import { Easing } from './easing/interface';
import { Fonts } from './fonts/interface';
import { Gap } from './gap/interface';
import { Grid } from './grid/interface';
import { Space } from './space/interface';
import { Time } from './time/interface';

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
	utils: {
		noscrollbars: object;
	};
}
