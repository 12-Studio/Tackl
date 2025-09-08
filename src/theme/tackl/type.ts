// Imports
// ------
import { css } from 'styled-components';
import type { RuleSet } from 'styled-components/dist/types';
import { breakpointUp as bp } from './breakpoints';
import { semantics, gridSemantics } from './semantics';
import { theme } from '..';

// Types
// ------
interface FontTheme {
    font: {
        weight: {
            light: 300;
            regular: 400;
            medium: 500;
            semi: 600;
            bold: 700;
        };
        family: {
            heading: string;
            mono: string;
            hand: string;
            body: string;
        };
    };
}

// Pre-compute commonly used values
const {
    font: {
        weight: { regular, semi, medium },
        family: { heading, body },
    },
} = theme as FontTheme;

// Shared styles as constants to avoid recalculation
const baseHeadingStyles: RuleSet<object> = css`
    font-weight: ${regular};
    font-family: ${heading};
`;

const baseBodyStyles: RuleSet<object> = css`
    font-family: ${body};
    font-weight: ${regular};
`;

// Rest of your styles...
export const h0Styles: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 6rem;
    line-height: 1.2;

    ${bp.l`font-size: 16.8rem;`}
`;


export const headingXXL: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 5.8rem;
    line-height: 1.2;

    ${bp.l`
        font-size: 14.4rem;
        line-height: 1;
    `}
`;

export const headingXL: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 4.8rem;
    line-height: 1.2;

    ${bp.l`font-size: 9rem;`}
`;

export const headingL: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 4rem;
    line-height: 1.32;

    ${bp.l`font-size: 6rem;`}
`;

export const headingM: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 3rem;
    line-height: 1.32;

    ${bp.l`font-size: 4.8rem;`}
`;

export const headingSM: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 2.4rem;
    line-height: 1.32;

    ${bp.l`font-size: 4rem;`}
`;

export const headingS: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 1.2rem;
    line-height: 1.32;
    font-weight: ${semi};
    text-transform: uppercase;

    ${bp.l`font-size: 1.4rem;`}
`;

// Body styles with memoized shared styles
export const bodyM: RuleSet<object> = css`
    ${baseBodyStyles}
    font-size: 1.6rem;
    line-height: 1.44;
    
    ${bp.l`font-size: 2.2rem;`}
`;