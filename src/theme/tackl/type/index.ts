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

// SECTION • Role Descriptions
// NOTE • When to reach for each role — shown in the setup wizard and the
// Storybook theme overview, and worth keeping in mind when styling
export const typeRoles = {
	display:
		'The largest and most prominent type style. Used for hero headlines, landing page banners, or key marketing moments where typography needs to make an impact. Typically reserved for one or two instances per page to avoid visual noise.',
	headline:
		'Primary section titles and major UI headings. Use to break up page content and establish hierarchy. Great for page headers, feature sections, or card headers when you want clear emphasis but less dominance than Display.',
	title: 'Component-level titles: card titles, form section labels, modal titles, button text (when larger than body), navigation items. This is a versatile style used throughout the interface to label or name elements.',
	body: 'The main paragraph and content text style. Use for all long-form content, descriptions, and supporting copy. Small (S) is helpful for secondary or supporting text, Large (L) for primary reading text.',
	caption:
		'The smallest text style. Use for meta information, image captions, legal disclaimers, timestamps, overlines, and other supporting microcopy. Avoid using below 12px for accessibility where possible.',
} as const;

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
