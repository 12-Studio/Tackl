// Imports
// ------
import { breakpointUp as bp } from '@/theme/tackl/breakpoints';
import { theme } from '@theme';
import { css, type RuleSet } from 'styled-components';

const baseHeadingStyles: RuleSet = css`
	font-family: ${theme.font.family.heading};
	line-height: 1.16;
	text-box: trim-both cap alphabetic;
`;

// SECTION • Heading styles
export const displayL: RuleSet = css`
	${baseHeadingStyles}

	font-weight: ${theme.font.weight.thin};
	font-size: 12rem;
	letter-spacing: -0.5rem;

	${bp.xl`
		font-size: 24rem;
	`}
`;

export const displayS: RuleSet = css`
	${baseHeadingStyles}

	font-weight: ${theme.font.weight.thin};
	font-size: 5.6rem;

	${bp.sm` font-size: 6.4rem; `}
	${bp.l` font-size: 10.8rem; `}
`;

export const headlineL: RuleSet = css`
	${baseHeadingStyles}

	font-weight: ${theme.font.weight.light};
	font-size: 5rem;
	line-height: 1.1;
	letter-spacing: -0.5px;

	${bp.xl`
		font-size: 8rem;
	`}
`;

export const headlineS: RuleSet = css`
	${baseHeadingStyles}

	font-weight: ${theme.font.weight.light};
	font-size: 3.2rem;

	${bp.xl`
		font-size: 6.4rem;
	`}
`;

export const titleL: RuleSet = css`
	${baseHeadingStyles}

	font-weight: ${theme.font.weight.regular};
	font-size: 2.4rem;
	letter-spacing: 0.05rem;

	${bp.xl`
		font-size: 4rem;
	`}
`;

export const titleS: RuleSet = css`
	${baseHeadingStyles}

	font-weight: ${theme.font.weight.regular};
	font-size: 2rem;
	letter-spacing: 0.05rem;

	${bp.xl`
		font-size: 3.2rem;
	`}
`;

// Body styles with memoized shared styles
const baseBodyStyles: RuleSet = css`
	font-family: ${theme.font.family.body};
	line-height: 1.32;
	letter-spacing: 0.05rem;
	text-box: trim-both cap alphabetic;
`;

export const bodyL: RuleSet = css`
	${baseBodyStyles}

	font-weight: ${theme.font.weight.light};
	font-size: 1.8rem;

	${bp.xl`
		font-size: 2.4rem;
	`}
`;

export const bodyM: RuleSet = css`
	${baseBodyStyles}

	font-weight: ${theme.font.weight.regular};
	font-size: 1.4rem;

	${bp.xl`
		font-size: 1.8rem;
	`}
`;

export const bodyS: RuleSet = css`
	${baseBodyStyles}

	font-weight: ${theme.font.weight.regular};
	font-size: 1.2rem;

	${bp.xl`
		font-size: 1.4rem;
	`}
`;

export const captionL: RuleSet = css`
	font: normal ${theme.font.weight.regular} 1rem ${theme.font.family.mono};
	line-height: 1.24;
	letter-spacing: 0.05rem;
	text-transform: uppercase;
	text-box: trim-both cap alphabetic;

	${bp.xl` font-size: 1.2rem; `}
`;
