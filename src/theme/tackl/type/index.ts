// Imports
// ------

import { theme } from '@theme';
import { css, type RuleSet } from 'styled-components';
import { breakpointUp as bp } from '@/theme/tackl/breakpoints';

// SECTION • Raw Type Scale
// NOTE • Single source of truth for the type styles below — mobile-first:
// `base` always applies and `xl` layers overrides from bp.xl up (an optional
// `m` block is supported for hand-tuning). Every property is optional per
// breakpoint (omitted = inherited); family/weight resolve through the theme
// getters, so tokens stay the single source.
export type TypeScaleFamily = 'heading' | 'body' | 'mono' | 'script';
export type TypeScaleWeight = 'light' | 'regular' | 'medium' | 'semi' | 'bold' | 'heavy' | 'black';

export type TypeScaleBreakpoint = {
	family?: TypeScaleFamily;
	weight?: TypeScaleWeight;
	size?: string;
	lineHeight?: string;
	letterSpacing?: string;
	textTransform?: string;
};

export type TypeScaleEntry = {
	base: TypeScaleBreakpoint;
	m?: TypeScaleBreakpoint;
	xl?: TypeScaleBreakpoint;
};

export const typeScale = {
	displayL: {
		base: { family: 'heading', weight: 'regular', size: '4.8rem', lineHeight: '1.1', letterSpacing: '-1px' },
		xl: { size: 'clamp(9.6rem, 8.333vw, 12rem)', letterSpacing: '-2px' },
	},

	displayS: {
		base: { family: 'heading', weight: 'regular', size: '4rem', lineHeight: '1.1', letterSpacing: '-1px' },
		xl: { size: '7.2rem', letterSpacing: '-2px' },
	},

	headlineL: {
		base: { family: 'heading', weight: 'regular', size: '3.6rem', lineHeight: '1.15' },
		xl: { size: '6rem', letterSpacing: '-0.2rem' },
	},

	headlineS: {
		base: { family: 'heading', weight: 'regular', size: '3rem', lineHeight: '1.2' },
		xl: { size: '4.8rem', letterSpacing: '-0.1rem' },
	},

	titleL: {
		base: { family: 'heading', weight: 'regular', size: '2.6rem', lineHeight: '1.2' },
		xl: { size: '3.6rem' },
	},

	titleS: {
		base: { family: 'heading', weight: 'regular', size: '2.2rem', lineHeight: '1.25' },
		xl: { size: '2.8rem' },
	},

	bodyL: {
		base: { family: 'body', weight: 'regular', size: '2rem', lineHeight: '1.4' },
		xl: { size: '2.4rem' },
	},

	bodyS: {
		base: { family: 'body', weight: 'regular', size: '1.6rem', lineHeight: '1.4' },
		xl: { size: '1.8rem' },
	},

	captionL: {
		base: { family: 'body', weight: 'regular', size: '1.4rem', lineHeight: '1.5' },
		xl: { size: '1.6rem' },
	},

	captionS: {
		base: { family: 'body', weight: 'regular', size: '1.2rem', lineHeight: '1.5' },
		xl: { size: '1.3rem' },
	},
} satisfies Record<string, TypeScaleEntry>;

// ANCHOR • Declarations for one breakpoint block — only set what's defined
const breakpointStyles = (block: TypeScaleBreakpoint): RuleSet => css`
	${block.family ? css`font-family: ${theme.font.family[block.family]};` : ''}
	${block.weight ? css`font-weight: ${theme.font.weight[block.weight]};` : ''}
	${block.size ? `font-size: ${block.size};` : ''}
	${block.lineHeight ? `line-height: ${block.lineHeight};` : ''}
	${block.letterSpacing ? `letter-spacing: ${block.letterSpacing};` : ''}
	${block.textTransform ? `text-transform: ${block.textTransform};` : ''}
`;

const scaleStyles = (entry: TypeScaleEntry): RuleSet => css`
	${breakpointStyles(entry.base)}
	${entry.m ? bp.m`${breakpointStyles(entry.m)}` : ''}
	${entry.xl ? bp.xl`${breakpointStyles(entry.xl)}` : ''}
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
