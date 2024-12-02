// Imports
// ------
import { theme } from '@theme';
import { css } from 'styled-components';
import type { RuleSet } from 'styled-components/dist/types';

// Types
// ------
type Sizes = typeof theme.grid.breakpoints;
type BreakpointKey = keyof Sizes;
type MediaQueries = Record<BreakpointKey, string>;
type BreakpointFunction = (...args: Parameters<typeof css>) => RuleSet<object>;
type BreakpointMap = Record<BreakpointKey, BreakpointFunction>;

// Exports
// ------
const sizes: Sizes = theme.grid.breakpoints;
const keys = Object.keys(sizes) as BreakpointKey[];

// Pre-compute media query strings for better performance
const upQueries: MediaQueries = keys.reduce((acc, label) => {
    acc[label] = `@media (min-width: ${sizes[label]})`;
    return acc;
}, {} as MediaQueries);

const downQueries: MediaQueries = keys.reduce((acc, label) => {
    acc[label] = `@media (max-width: ${sizes[label]})`;
    return acc;
}, {} as MediaQueries);

// Create breakpoint functions using pre-computed queries
export const breakpointUp: BreakpointMap = keys.reduce((acc, label) => {
    acc[label] = (...args) => css`
        ${upQueries[label]} {
            ${css(...args)}
        }
    `;
    return acc;
}, {} as BreakpointMap);

export const breakpointDown: BreakpointMap = keys.reduce((acc, label) => {
    acc[label] = (...args) => css`
        ${downQueries[label]} {
            ${css(...args)}
        }
    `;
    return acc;
}, {} as BreakpointMap);