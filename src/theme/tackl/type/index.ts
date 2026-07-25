// Imports
// ------

import { theme } from '@theme';
import { css, type RuleSet } from 'styled-components';
import { breakpointUp as bp } from '@/theme/tackl/breakpoints';

// SECTION • Raw Type Scale
// NOTE • Single source of truth for the type styles below — mobile-first:
// `size` is the base, `sizeM`/`sizeXl` layer up at bp.m/bp.xl. Optional keys
// (letterSpacing, letterSpacingM, sizeXl, letterSpacingXl) can be omitted.
export type TypeScaleEntry = {
	size: string;
	sizeM: string;
	lineHeight: string;
	letterSpacing?: string;
	letterSpacingM?: string;
	sizeXl?: string;
	letterSpacingXl?: string;
};

export const typeScale = {
	headingXXL: {
		size: '4.8rem',
		sizeM: '9.6rem',
		lineHeight: '1.1',
		letterSpacing: '-1px',
		letterSpacingM: '-2px',
		sizeXl: 'clamp(9.6rem, 8.333vw, 12rem)',
		letterSpacingXl: '-2px',
	},

	headingXL: {
		size: '4.8rem',
		sizeM: '10.8rem',
		lineHeight: '1.1',
		letterSpacing: '-1px',
		letterSpacingM: '-2px',
	},

	headingL: {
		size: '3.6rem',
		sizeM: '9.6rem',
		lineHeight: '1.1',
		letterSpacing: '-0.1rem',
		letterSpacingM: '-0.2rem',
	},

	headingM: {
		size: '2.6rem',
		sizeM: '7.2rem',
		lineHeight: '1.2',
		letterSpacingM: '-0.2rem',
	},

	headingSM: {
		size: '2.4rem',
		sizeM: '6rem',
		lineHeight: '1.2',
		letterSpacingM: '-0.2rem',
	},

	headingS: {
		size: '2.2rem',
		sizeM: '4.8rem',
		lineHeight: '1.32',
		letterSpacingM: '-1px',
	},

	bodyM: {
		size: '2rem',
		sizeM: '3.6rem',
		lineHeight: '1.32',
		letterSpacingM: '-0.5px',
	},

	bodyS: {
		size: '1.8rem',
		sizeM: '2.4rem',
		lineHeight: '1.32',
	},

	emphasis: {
		size: '1.4rem',
		sizeM: '1.8rem',
		lineHeight: '1.6',
	},
} satisfies Record<string, TypeScaleEntry>;

// REVIEW • Shared styles as constants to avoid recalculation
const baseHeadingStyles: RuleSet = css`
	font-weight: ${theme.font.weight.regular};
	font-family: ${theme.font.family.heading};
`;

const baseBodyStyles: RuleSet = css`
	font-family: ${theme.font.family.body};
	font-weight: ${theme.font.weight.regular};
`;

// ANCHOR • Responsive size rules for one type-scale entry
const scaleStyles = (entry: TypeScaleEntry): RuleSet => css`
	font-size: ${entry.size};
	line-height: ${entry.lineHeight};
	${entry.letterSpacing ? `letter-spacing: ${entry.letterSpacing};` : ''}

	${bp.m`
		font-size: ${entry.sizeM};
		${entry.letterSpacingM ? `letter-spacing: ${entry.letterSpacingM};` : ''}
	`}

	${
		entry.sizeXl
			? bp.xl`
			font-size: ${entry.sizeXl};
			${entry.letterSpacingXl ? `letter-spacing: ${entry.letterSpacingXl};` : ''}
		`
			: ''
	}
`;

// SECTION • Heading styles
export const headingXXL: RuleSet = css`
	${baseHeadingStyles}
	${scaleStyles(typeScale.headingXXL)}
`;

export const headingXL: RuleSet = css`
	${baseHeadingStyles}
	${scaleStyles(typeScale.headingXL)}
`;

export const headingL: RuleSet = css`
	${baseHeadingStyles}
	${scaleStyles(typeScale.headingL)}
`;

export const headingM: RuleSet = css`
	${baseHeadingStyles}
	${scaleStyles(typeScale.headingM)}
`;

export const headingSM: RuleSet = css`
	${baseHeadingStyles}
	${scaleStyles(typeScale.headingSM)}
`;

export const headingS: RuleSet = css`
	${baseHeadingStyles}
	${scaleStyles(typeScale.headingS)}
`;

// SECTION • Body styles
export const bodyM: RuleSet = css`
	${baseBodyStyles}
	${scaleStyles(typeScale.bodyM)}
`;

export const bodyS: RuleSet = css`
	${baseBodyStyles}
	display: block;
	${scaleStyles(typeScale.bodyS)}
`;

export const emphasis: RuleSet = css`
	${baseBodyStyles}
	display: block;
	font-style: normal;
	${scaleStyles(typeScale.emphasis)}
`;
