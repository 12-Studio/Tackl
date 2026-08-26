// Grid Types / Interfaces
// ------------
import type { grid } from './index';

// SECTION • Grid
// NOTE — Derived from the grid values object, so adding a breakpoint or
// column count there updates every dependent type (responsive props, bp/bpd)
// automatically
export type Grid = typeof grid;

export type Columns = Grid['columns'];
export type Breakpoints = Grid['breakpoints'];
export type Gutter = Grid['gutter'];
export type DesignWidths = Grid['design'];
