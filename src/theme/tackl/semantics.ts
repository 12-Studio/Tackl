// Imports
// ------
import { css } from 'styled-components';
import type { RuleSet } from 'styled-components/dist/types';
import { breakpointUp } from './breakpoints';
import { theme } from '..';

// Types
// ------
interface StyleProps {
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
const marginStyles = (props: StyleProps): RuleSet<object> => {
    const s = theme.space.small;
    const m = theme.space.medium;
    const l = theme.space.large;

    return css`
        ${props.$marBottom &&
        css`
            margin-bottom: ${s};
            ${breakpointUp.medium`margin-bottom: ${m};`}
            ${breakpointUp.large`margin-bottom: ${l};`}
        `}

        ${props.$marTop &&
        css`
            margin-top: ${s};
            ${breakpointUp.medium`margin-top: ${m};`}
            ${breakpointUp.large`margin-top: ${l};`}
        `}
        
        ${props.$mar &&
        css`
            margin-block: ${s};
            ${breakpointUp.medium` margin-block: ${m}; `}
            ${breakpointUp.large` margin-block: ${l}; `}
        `}
    `;
};

// --------------
// 2. Padding
// --------------
const paddingStyles = (props: StyleProps): RuleSet<object> => {
    const s = theme.space.small;
    const m = theme.space.medium;
    const l = theme.space.large;
    const mpad = theme.space.mpad;

    return css`
        ${props.$mpad &&
        css`
            padding-inline: ${mpad};
            ${breakpointUp.large` padding-inline: 0; `}
        `}

        ${props.$padBottom &&
        css`
            padding-block: ${s};
            ${breakpointUp.medium`padding-block: ${m};`}
            ${breakpointUp.large`padding-block: ${l};`}
        `}

        ${props.$padTop &&
        css`
            padding-block: ${s};
            ${breakpointUp.medium` padding-block: ${m};`}
            ${breakpointUp.large` padding-block: ${l};`}
        `}
        
        ${props.$pad &&
        css`
            padding-block: ${s};
            ${breakpointUp.medium` padding-block: ${m}; `}
            ${breakpointUp.large` padding-block: ${l}; `}
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
const breakpointKeys = Object.keys(theme.grid.breakpoints);

export const gridSemantics = (props: StyleProps): RuleSet<object> => css`
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