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
	font-size: 4.8rem;
	line-height: 1.1;
	letter-spacing: -1px;

	${bp.m`
		font-size: 9.6rem;
		letter-spacing: -2px;
	`}

	${bp.xl`
		font-size: clamp(9.6rem, 8.333vw, 12rem);
		letter-spacing: -2px;
	`}
`;

export const headingXL: RuleSet = css`
	${baseHeadingStyles}
	font-size: 4.8rem;
	line-height: 1.1;
	letter-spacing: -1px;

	${bp.m`
		font-size: 10.8rem;
		letter-spacing: -2px;
	`}
`;

export const headingL: RuleSet = css`
	${baseHeadingStyles}
	font-size: 3.6rem;
	line-height: 1.1;
	letter-spacing: -0.1rem;

	${bp.m`
		font-size: 9.6rem;
		letter-spacing: -0.2rem;
	`}
`;

export const headingM: RuleSet = css`
	${baseHeadingStyles}
	font-size: 2.6rem;
	line-height: 1.2;

	${bp.m`
		font-size: 7.2rem;
		letter-spacing: -0.2rem;
	`}
`;

export const headingSM: RuleSet = css`
	${baseHeadingStyles}
	font-size: 2.4rem;
	line-height: 1.2;

	${bp.m`
		font-size: 6rem;
		letter-spacing: -0.2rem;
	`}
`;

export const headingS: RuleSet = css`
	${baseHeadingStyles}
	font-size: 2.2rem;
	line-height: 1.32;

	${bp.m`
		font-size: 4.8rem;
		letter-spacing: -1px;
	`}
`;

// Body styles with memoized shared styles
const baseBodyStyles: RuleSet = css`
	font-family: ${theme.font.family.body};
	font-weight: ${theme.font.weight.regular};
`;

export const bodyM: RuleSet = css`
	${baseBodyStyles}
	font-size: 2rem;
	line-height: 1.32;

	${bp.m`
		font-size: 3.6rem;
		letter-spacing: -0.5px;
	`}
`;

export const bodyS: RuleSet = css`
	${baseBodyStyles}
	display: block;
	font-size: 1.8rem;
	line-height: 1.32;

	${bp.m` font-size: 2.4rem; `}
`;

export const emphasis: RuleSet = css`
	${baseBodyStyles}
	display: block;
	font-style: normal;
	font-size: 1.4rem;
	line-height: 1.6;

	${bp.m` font-size: 1.8rem; `}
`;
