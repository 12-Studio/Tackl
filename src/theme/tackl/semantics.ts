// Imports
// ------
import { css } from 'styled-components';
import type { RuleSet } from 'styled-components/dist/types';
import { breakpointUp } from './breakpoints';
import { theme } from '..';

// Types
// ------
export interface SemanticProps {
    $marBottom?: boolean;
    $marTop?: boolean;
    $mar?: boolean;
    $mpad?: boolean;
    $padBottom?: boolean;
    $padTop?: boolean;
    $pad?: boolean;
    [key: string]: any; // For dynamic grid props
}

// Exports
// --------------
// 1. Margin
// --------------
const marginStyles = (props: SemanticProps): RuleSet<object> => {
    const s = theme.space.s;
    const m = theme.space.m;
    const l = theme.space.l;

    return css`
        ${props.$marBottom &&
        css`
            margin-bottom: ${s};
            ${breakpointUp.m`margin-bottom: ${m};`}
            ${breakpointUp.l`margin-bottom: ${l};`}
        `}

        ${props.$marTop &&
        css`
            margin-top: ${s};
            ${breakpointUp.m`margin-top: ${m};`}
            ${breakpointUp.l`margin-top: ${l};`}
        `}
        
        ${props.$mar &&
        css`
            margin-block: ${s};
            ${breakpointUp.m` margin-block: ${m}; `}
            ${breakpointUp.l` margin-block: ${l}; `}
        `}
    `;
};

// --------------
// 2. Padding
// --------------
const paddingStyles = (props: SemanticProps): RuleSet<object> => {
    const s = theme.space.s;
    const m = theme.space.m;
    const l = theme.space.l;
    const mpad = theme.space.mpad;

    return css`
        ${props.$mpad &&
        css`
            padding-inline: ${mpad};
            ${breakpointUp.l` padding-inline: 0; `}
        `}

        ${props.$padBottom &&
        css`
            padding-block: ${s};
            ${breakpointUp.m`padding-block: ${m};`}
            ${breakpointUp.l`padding-block: ${l};`}
        `}

        ${props.$padTop &&
        css`
            padding-block: ${s};
            ${breakpointUp.m` padding-block: ${m};`}
            ${breakpointUp.l` padding-block: ${l};`}
        `}
        
        ${props.$pad &&
        css`
            padding-block: ${s};
            ${breakpointUp.m` padding-block: ${m}; `}
            ${breakpointUp.l` padding-block: ${l}; `}
        `}
    `;
};

// --------------
// 3. Container Styles
// --------------
export const semantics = css`
    ${paddingStyles}
    ${marginStyles}
`;

// --------------
// 4. Grid Semantics
// --------------
const breakpointKeys = Object.keys(theme.grid.breakpoints) as (keyof typeof theme.grid.breakpoints)[];

export const gridSemantics = (props: SemanticProps): RuleSet<object> => css`
    ${breakpointKeys.map(
        key =>
            props[`$${key}`] &&
            css`
                ${breakpointUp[key]`
                    grid-column: ${props[`$${key}`]};
                `}
            `
    )}
`;