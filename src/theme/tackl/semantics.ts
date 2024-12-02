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
    $marX?: boolean;
    $marY?: boolean;
    $mpad?: boolean;
    $mpadLarge?: boolean;
    $padBottom?: boolean;
    $padBottomSmall?: boolean;
    $padTop?: boolean;
    $pad?: boolean;
    [key: string]: any; // For dynamic grid props
}

// Exports
// --------------
// 1. Margin
// --------------
const marginStyles = (props: StyleProps): RuleSet<object> => {
    const smallSpace = theme.space.small;
    const mediumSpace = theme.space.medium;
    const largeSpace = theme.space.large;

    return css`
        ${props.$marBottom &&
        css`
            margin-bottom: ${smallSpace};
            ${breakpointUp.medium`margin-bottom: ${mediumSpace};`}
            ${breakpointUp.large`margin-bottom: ${largeSpace};`}
        `}

        ${props.$marTop &&
        css`
            margin-top: ${smallSpace};
            ${breakpointUp.medium`margin-top: ${mediumSpace};`}
            ${breakpointUp.large`margin-top: ${largeSpace};`}
        `}
        
        ${props.$mar &&
        css`
            margin-top: ${smallSpace};
            margin-bottom: ${smallSpace};
            ${breakpointUp.medium`
                margin-top: ${mediumSpace};
                margin-bottom: ${mediumSpace};
            `}
            ${breakpointUp.large`
                margin-top: ${largeSpace};
                margin-bottom: ${largeSpace};
            `}
        `}

        ${props.$marX &&
        css`
            margin-left: ${smallSpace};
            margin-right: ${smallSpace};
            ${breakpointUp.medium`
                margin-left: ${mediumSpace};
                margin-right: ${mediumSpace};
            `}
            ${breakpointUp.large`
                margin-left: ${largeSpace};
                margin-right: ${largeSpace};
            `}
        `}

        ${props.$marY &&
        css`
            margin-top: ${smallSpace};
            margin-bottom: ${smallSpace};
            ${breakpointUp.medium`
                margin-top: ${mediumSpace};
                margin-bottom: ${mediumSpace};
            `}
            ${breakpointUp.large`
                margin-top: ${largeSpace};
                margin-bottom: ${largeSpace};
            `}
        `}
    `;
};

// --------------
// 2. Padding
// --------------
const paddingStyles = (props: StyleProps): RuleSet<object> => {
    const smallSpace = theme.space.small;
    const mediumSpace = theme.space.medium;
    const largeSpace = theme.space.large;
    const mpadSpace = theme.space.mpad;

    return css`
        ${props.$mpad &&
        css`
            padding-left: ${mpadSpace};
            padding-right: ${mpadSpace};
            ${breakpointUp.large`
                padding-left: 0;
                padding-right: 0;
            `}
        `}

        ${props.$mpadLarge &&
        css`
            padding-left: ${mpadSpace};
            padding-right: ${mpadSpace};
        `}

        ${props.$padBottom &&
        css`
            padding-bottom: ${smallSpace};
            ${breakpointUp.medium`padding-bottom: ${mediumSpace};`}
            ${breakpointUp.large`padding-bottom: ${largeSpace};`}
        `}

        ${props.$padBottomSmall &&
        css`
            padding-bottom: calc(${smallSpace} / 2);
            ${breakpointUp.medium`padding-bottom: calc(${mediumSpace} / 2);`}
            ${breakpointUp.large`padding-bottom: calc(${largeSpace} / 2);`}
        `}

        ${props.$padTop &&
        css`
            padding-top: ${smallSpace};
            ${breakpointUp.medium`padding-top: ${mediumSpace};`}
            ${breakpointUp.large`padding-top: ${largeSpace};`}
        `}
        
        ${props.$pad &&
        css`
            padding-top: ${smallSpace};
            padding-bottom: ${smallSpace};
            ${breakpointUp.medium`
                padding-top: ${mediumSpace};
                padding-bottom: ${mediumSpace};
            `}
            ${breakpointUp.large`
                padding-top: ${largeSpace};
                padding-bottom: ${largeSpace};
            `}
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