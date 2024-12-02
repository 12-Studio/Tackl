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
    ${gridSemantics}
    ${semantics}
`;

const baseBodyStyles: RuleSet<object> = css`
    font-family: ${body};
    font-weight: ${regular};
    ${gridSemantics}
    ${semantics}
`;

// Rest of your styles...
export const h0Styles: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 6rem;
    line-height: 1.2;
    ${bp.smedium`font-size: 6.8rem;`}
    ${bp.xlarge`font-size: 16.8rem;`}
`;


export const h1Styles: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 5.8rem;
    line-height: 1.2;
    ${bp.xlarge`
        font-size: 14.4rem;
        line-height: 1;
    `}
`;

export const h2Styles: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 4.8rem;
    line-height: 1.2;
    ${bp.xlarge`font-size: 9rem;`}
`;

export const h3Styles: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 4rem;
    line-height: 1.32;
    ${bp.xlarge`font-size: 6rem;`}
`;

export const h4Styles: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 3rem;
    line-height: 1.32;
    ${bp.large`font-size: 4.8rem;`}
`;

export const h5Styles: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 2.4rem;
    line-height: 1.32;
    ${bp.large`font-size: 4rem;`}
`;

export const h6Styles: RuleSet<object> = css`
    ${baseHeadingStyles}
    font-size: 1.2rem;
    line-height: 1.32;
    font-weight: ${semi};
    text-transform: uppercase;
    ${bp.large`font-size: 1.4rem;`}
`;

// Body styles with memoized shared styles
export const pStyles: RuleSet<object> = css`
    ${baseBodyStyles}
    font-size: 1.6rem;
    line-height: 1.44;
    ${bp.xlarge`font-size: 2.2rem;`}
`;

export const spanStyles: RuleSet<object> = css`
    ${baseBodyStyles}
    font-size: 1.4rem;
    line-height: 1.32;
    ${bp.xlarge`font-size: 1.8rem;`}
`;

export const emStyles: RuleSet<object> = css`
    ${baseBodyStyles}
    display: inline-block;
    font-style: normal;
    font-weight: ${medium};
    font-size: 1rem;
    line-height: 1.32;
    ${bp.xlarge`font-size: 1.2rem;`}
`;