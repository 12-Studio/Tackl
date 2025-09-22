// Imports
// ------
import { breakpointUp as bp } from '@/theme/tackl/breakpoints';
import { theme } from '@theme';
import { css, RuleSet } from 'styled-components';

// REVIEW • Shared styles as constants to avoid recalculation
const baseHeadingStyles: RuleSet = css`
	font-weight: ${theme.font.weight.regular};
	font-family: ${theme.font.family.heading};
`;

// SECTION • Heading styles
export const headingXXL: RuleSet = css`
	${baseHeadingStyles}
	font-size: 5.8rem;
	line-height: 1.2;

	${bp.l`
        font-size: 14.4rem;
        line-height: 1;
    `}
`;

export const headingXL: RuleSet = css`
	${baseHeadingStyles}
	font-size: 4.8rem;
	line-height: 1.2;

	${bp.l`font-size: 9rem;`}
`;

export const headingL: RuleSet = css`
	${baseHeadingStyles}
	font-size: 4rem;
	line-height: 1.32;

	${bp.l`font-size: 6rem;`}
`;

export const headingM: RuleSet = css`
	${baseHeadingStyles}
	font-size: 3rem;
	line-height: 1.32;

	${bp.l`font-size: 4.8rem;`}
`;

export const headingSM: RuleSet = css`
	${baseHeadingStyles}
	font-size: 2.4rem;
	line-height: 1.32;

	${bp.l`font-size: 4rem;`}
`;

export const headingS: RuleSet = css`
	${baseHeadingStyles}
	font-size: 1.2rem;
	line-height: 1.32;
	text-transform: uppercase;

	${bp.l`font-size: 1.4rem;`}
`;

// REVIEW Shared styles as constants to avoid recalculation
const baseBodyStyles: RuleSet = css`
	font-family: ${theme.font.family.body};
	font-weight: ${theme.font.weight.regular};
`;

// SECTION • Body styles
export const bodyM: RuleSet = css`
	${baseBodyStyles}
	font-size: 1.6rem;
	line-height: 1.44;

	${bp.l`font-size: 2.2rem;`}
`;
