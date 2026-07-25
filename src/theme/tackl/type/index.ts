// Imports
// ------

import { theme } from '@theme';
import { css, type RuleSet } from 'styled-components';
import { breakpointUp as bp } from '@/theme/tackl/breakpoints';

// SECTION • Raw Type Scale
// NOTE • Single source of truth for the type styles below — mobile-first:
// `size` is the base, `sizeM`/`sizeXl` layer up at bp.m/bp.xl. `family` picks
// a stack from @theme/fonts (--font-*). Optional keys (letterSpacing,
// letterSpacingM, sizeXl, letterSpacingXl) can be omitted per style.
export type TypeScaleFamily = 'heading' | 'body' | 'mono' | 'script';

export type TypeScaleEntry = {
	family: TypeScaleFamily;
	size: string;
	sizeM: string;
	lineHeight: string;
	letterSpacing?: string;
	letterSpacingM?: string;
	sizeXl?: string;
	letterSpacingXl?: string;
};

export const typeScale = {
	displayL: {
		family: 'heading',
		size: '4.8rem',
		sizeM: '9.6rem',
		lineHeight: '1.1',
		letterSpacing: '-1px',
		letterSpacingM: '-2px',
		sizeXl: 'clamp(9.6rem, 8.333vw, 12rem)',
		letterSpacingXl: '-2px',
	},

	displayS: {
		family: 'heading',
		size: '4rem',
		sizeM: '7.2rem',
		lineHeight: '1.1',
		letterSpacing: '-1px',
		letterSpacingM: '-2px',
	},

	headlineL: {
		family: 'heading',
		size: '3.6rem',
		sizeM: '6rem',
		lineHeight: '1.15',
		letterSpacingM: '-0.2rem',
	},

	headlineS: {
		family: 'heading',
		size: '3rem',
		sizeM: '4.8rem',
		lineHeight: '1.2',
		letterSpacingM: '-0.1rem',
	},

	titleL: {
		family: 'heading',
		size: '2.6rem',
		sizeM: '3.6rem',
		lineHeight: '1.2',
	},

	titleS: {
		family: 'heading',
		size: '2.2rem',
		sizeM: '2.8rem',
		lineHeight: '1.25',
	},

	bodyL: {
		family: 'body',
		size: '2rem',
		sizeM: '2.4rem',
		lineHeight: '1.4',
	},

	bodyS: {
		family: 'body',
		size: '1.6rem',
		sizeM: '1.8rem',
		lineHeight: '1.4',
	},

	captionL: {
		family: 'body',
		size: '1.4rem',
		sizeM: '1.6rem',
		lineHeight: '1.5',
	},

	captionS: {
		family: 'body',
		size: '1.2rem',
		sizeM: '1.3rem',
		lineHeight: '1.5',
	},
} satisfies Record<string, TypeScaleEntry>;

// ANCHOR • Font + responsive size rules for one type-scale entry
const scaleStyles = (entry: TypeScaleEntry): RuleSet => css`
	font-family: ${theme.font.family[entry.family]};
	font-weight: ${theme.font.weight.regular};
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

// SECTION • Display styles
export const displayL: RuleSet = css`
	${scaleStyles(typeScale.displayL)}
`;

export const displayS: RuleSet = css`
	${scaleStyles(typeScale.displayS)}
`;

// SECTION • Headline styles
export const headlineL: RuleSet = css`
	${scaleStyles(typeScale.headlineL)}
`;

export const headlineS: RuleSet = css`
	${scaleStyles(typeScale.headlineS)}
`;

// SECTION • Title styles
export const titleL: RuleSet = css`
	${scaleStyles(typeScale.titleL)}
`;

export const titleS: RuleSet = css`
	${scaleStyles(typeScale.titleS)}
`;

// SECTION • Body styles
export const bodyL: RuleSet = css`
	${scaleStyles(typeScale.bodyL)}
`;

export const bodyS: RuleSet = css`
	${scaleStyles(typeScale.bodyS)}
`;

// SECTION • Caption styles
export const captionL: RuleSet = css`
	${scaleStyles(typeScale.captionL)}
`;

export const captionS: RuleSet = css`
	${scaleStyles(typeScale.captionS)}
`;
