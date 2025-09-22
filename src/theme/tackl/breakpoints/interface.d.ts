// Breakpoints Types / Interfaces
// ------------
import { theme } from '@theme';
import { css } from 'styled-components';
import type { RuleSet } from 'styled-components/dist/types';


// SECTION • Breakpoints
// NOTE — The main breakpoints object structure
export type Sizes = typeof theme.grid.breakpoints;
export type BreakpointKey = keyof Sizes;
export type MediaQueries = Record<BreakpointKey, string>;
export type BreakpointFunction = (...args: Parameters<typeof css>) => RuleSet<object>;
export type BreakpointMap = Record<BreakpointKey, BreakpointFunction>;