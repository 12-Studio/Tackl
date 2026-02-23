// Theme Types / Interfaces
// ------------


// Imports
// ------------
import { Colors } from './colors/interface';
import { Space } from './space/interface';
import { Gap } from './gap/interface';
import { BorderRadius } from './borderRadius/interface';
import { Fonts } from './fonts/interface';
import { Grid } from './grid/interface';
import { Easing } from './easing/interface';


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
    utils: {
        noscrollbars: object;
    }
}