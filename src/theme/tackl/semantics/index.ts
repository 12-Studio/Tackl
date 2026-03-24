// Imports
// ------

import { theme } from '@theme';
import { css } from 'styled-components';
import { breakpointUp } from '../breakpoints';
import type { SemanticProps } from './interface';

// Exports
// --------------
// 1. Margin
// --------------
const marginStyles = (props: SemanticProps) => {
	const s = theme.space.s;
	const m = theme.space.m;
	const l = theme.space.l;

	return css`
        ${
			props.$marBottom &&
			css`
            margin-bottom: ${s};
            ${breakpointUp.m`margin-bottom: ${m};`}
            ${breakpointUp.l`margin-bottom: ${l};`}
        `
		}

        ${
			props.$marTop &&
			css`
            margin-top: ${s};
            ${breakpointUp.m`margin-top: ${m};`}
            ${breakpointUp.l`margin-top: ${l};`}
        `
		}
        
        ${
			props.$mar &&
			css`
            margin-block: ${s};
            ${breakpointUp.m` margin-block: ${m}; `}
            ${breakpointUp.l` margin-block: ${l}; `}
        `
		}
    `;
};

// --------------
// 2. Padding
// --------------
const paddingStyles = (props: SemanticProps) => {
	const s = theme.space.s;
	const m = theme.space.m;
	const l = theme.space.l;

	return css`

        ${
			props.$padBottom &&
			css`
            padding-bottom: ${s};
            ${breakpointUp.m`padding-bottom: ${m};`}
            ${breakpointUp.l`padding-bottom: ${l};`}
        `
		}

        ${
			props.$padTop &&
			css`
            padding-top: ${s};
            ${breakpointUp.m` padding-top: ${m};`}
            ${breakpointUp.l` padding-top: ${l};`}
        `
		}
        
        ${
			props.$pad &&
			css`
            padding-block: ${s};
            ${breakpointUp.m` padding-block: ${m}; `}
            ${breakpointUp.l` padding-block: ${l}; `}
        `
		}
    `;
};

// --------------
// 3. Container Styles
// --------------
export const semantics = (props: SemanticProps) => css`
    ${paddingStyles(props)}
    ${marginStyles(props)}
`;

// --------------
// 4. Grid Semantics
// --------------
const breakpointKeys = Object.keys(theme.grid.breakpoints) as (keyof typeof theme.grid.breakpoints)[];

export const gridSemantics = (props: SemanticProps) => css`
    grid-column: 1/-1;
    
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
