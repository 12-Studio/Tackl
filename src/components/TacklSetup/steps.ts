// Property Documentation
// ------------

// NOTE • Step + field definitions for the first-run setup wizard. Defaults are
// read straight from the theme token files, so the wizard always opens with
// the current values and fields never drift from the token keys.

// Imports
// ------------
import { type TypeScaleBreakpoint, type TypeScaleEntry, typeScale } from '@tackl/type';
import { borderRadiusValues } from '@theme/borderRadius';
import { baseColors } from '@theme/colors';
import { easingValues } from '@theme/easing';
import { fontFamilies, fontWeights } from '@theme/fonts';
import { gapValues } from '@theme/gap';
import { spaceValues } from '@theme/space';
import { timeValues } from '@theme/time';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Conversions
// ------------
// NOTE • The theme stores rem (html base = 10px); the wizard edits plain px
// numbers but passes other CSS sizes (clamp(), vw, …) through untouched
const REM_PATTERN = /^\d*\.?\d+rem$/;
const NUMBER_PATTERN = /^\d*\.?\d+$/;

export const remToInput = (value: string | undefined): string => {
	if (!value) return '';
	return REM_PATTERN.test(value) ? String(Math.round(Number.parseFloat(value) * 100) / 10) : value;
};

export const pxToRem = (value: string): string => {
	const trimmed = value.trim();
	return NUMBER_PATTERN.test(trimmed) ? `${Math.round(Number.parseFloat(trimmed) * 10) / 100}rem` : trimmed;
};

// Defaults
// ------------
// NOTE • Type-scale entries nest per breakpoint (base/m/xl) — the wizard works
// on a flat record with M/Xl suffixes; empty string = not set at that breakpoint
export const TYPE_BREAKPOINT_KEYS = [
	'family',
	'weight',
	'size',
	'lineHeight',
	'letterSpacing',
	'textTransform',
] as const;

const flattenBreakpoint = (block: TypeScaleBreakpoint | undefined, suffix: string): Record<string, string> =>
	Object.fromEntries(
		TYPE_BREAKPOINT_KEYS.map(key => [
			`${key}${suffix}`,
			key === 'size' ? remToInput(block?.size) : (block?.[key] ?? ''),
		])
	);

const typeDefaults = (entry: TypeScaleEntry): Record<string, string> => ({
	...flattenBreakpoint(entry.base, ''),
	...flattenBreakpoint(entry.m, 'M'),
	...flattenBreakpoint(entry.xl, 'Xl'),
});

export const defaultTokens: I.TokenValues = {
	brand: { ...baseColors.brand },
	global: { ...baseColors.global },
	feedback: { ...baseColors.feedback },
	fonts: { ...fontFamilies },
	space: { ...spaceValues },
	gap: { ...gapValues },
	radius: { ...borderRadiusValues },
	time: { ...timeValues },
	easing: { ...easingValues },
	displayL: typeDefaults(typeScale.displayL),
	displayS: typeDefaults(typeScale.displayS),
	headlineL: typeDefaults(typeScale.headlineL),
	headlineS: typeDefaults(typeScale.headlineS),
	titleL: typeDefaults(typeScale.titleL),
	titleS: typeDefaults(typeScale.titleS),
	bodyL: typeDefaults(typeScale.bodyL),
	bodyS: typeDefaults(typeScale.bodyS),
	captionL: typeDefaults(typeScale.captionL),
	captionS: typeDefaults(typeScale.captionS),
};

// Fields
// ------------
const fieldsFrom = (
	group: I.TokenGroup,
	values: Record<string, string>,
	labels?: Record<string, string>
): I.FieldDef[] => Object.keys(values).map(key => ({ group, key, label: labels?.[key] ?? key }));

// NOTE • One row per breakpoint, one card per style. Base is required
// (family/weight/size/line-height); bp.m and bp.xl are overrides where every
// empty field simply inherits. Values go through the theme getters —
// family/weight are token keys, never raw CSS.
export const FONT_FAMILY_OPTIONS = Object.keys(fontFamilies);
export const FONT_WEIGHT_OPTIONS = Object.keys(fontWeights);
export const TEXT_TRANSFORM_OPTIONS = ['', 'uppercase', 'lowercase', 'capitalize'];

const breakpointRow = (group: I.TokenGroup, label: string, suffix: '' | 'M' | 'Xl'): I.RowDef => {
	const isBase = suffix === '';
	const key = (name: string) => `${name}${suffix}`;

	return {
		label,
		fields: [
			{
				group,
				key: key('family'),
				label: 'Family',
				kind: 'select',
				options: isBase ? FONT_FAMILY_OPTIONS : ['', ...FONT_FAMILY_OPTIONS],
				optional: !isBase,
			},
			{
				group,
				key: key('weight'),
				label: 'Weight',
				kind: 'select',
				options: isBase ? FONT_WEIGHT_OPTIONS : ['', ...FONT_WEIGHT_OPTIONS],
				optional: !isBase,
			},
			{ group, key: key('size'), label: 'Size (px)', kind: 'px', optional: !isBase },
			{ group, key: key('lineHeight'), label: 'Line height', optional: !isBase },
			{ group, key: key('letterSpacing'), label: 'Letter spacing', optional: true },
			{
				group,
				key: key('textTransform'),
				label: 'Transform',
				kind: 'select',
				options: TEXT_TRANSFORM_OPTIONS,
				optional: true,
			},
		],
	};
};

const typeScaleSections = (groups: I.TokenGroup[]): I.SectionDef[] =>
	groups.map(group => ({
		title: group,
		columns: 3,
		rows: [
			breakpointRow(group, 'Base', ''),
			breakpointRow(group, 'From bp.m', 'M'),
			breakpointRow(group, 'From bp.xl', 'Xl'),
		],
	}));

export const stepFields = (step: I.StepDef): I.FieldDef[] =>
	step.sections.flatMap(section => section.rows.flatMap(row => row.fields));

// Steps
// ------------
export const steps: I.StepDef[] = [
	{
		id: 'brand',
		title: 'Brand colours',
		intro: 'The five colours behind every getBrand() call and --brand-* variable.',
		kind: 'color',
		sections: [
			{
				rows: [
					{
						fields: fieldsFrom('brand', baseColors.brand, {
							bc1: 'bc1 — primary',
							bc2: 'bc2 — secondary',
							bc3: 'bc3 — tertiary',
							bc4: 'bc4 — light',
							bc5: 'bc5 — muted',
						}),
					},
				],
			},
		],
	},
	{
		id: 'system',
		title: 'Global & feedback',
		intro: 'Base white/black, plus the colours for success, error and warning states.',
		kind: 'color',
		sections: [
			{ title: 'Global', rows: [{ fields: fieldsFrom('global', baseColors.global) }] },
			{ title: 'Feedback', rows: [{ fields: fieldsFrom('feedback', baseColors.feedback) }] },
		],
	},
	{
		id: 'type',
		title: 'Typography',
		intro: 'Font stacks emitted as --font-* variables. Upload a font file below to add it to the theme — it becomes a var(--…) you can use in these stacks.',
		kind: 'text',
		sections: [{ title: 'Font stacks', rows: [{ fields: fieldsFrom('fonts', fontFamilies) }] }],
		hasFontUpload: true,
	},
	{
		id: 'display',
		title: 'Display & headline',
		intro: 'The biggest text on the page. Sizes are in px (written as rem, px ÷ 10); empty override fields inherit from the breakpoint below.',
		kind: 'text',
		sections: typeScaleSections(['displayL', 'displayS', 'headlineL', 'headlineS']),
	},
	{
		id: 'title-body',
		title: 'Title & body',
		intro: 'Section titles and running copy, same px-based sizing and per-breakpoint overrides.',
		kind: 'text',
		sections: typeScaleSections(['titleL', 'titleS', 'bodyL', 'bodyS']),
	},
	{
		id: 'caption',
		title: 'Caption',
		intro: 'The smallest supporting text.',
		kind: 'text',
		sections: typeScaleSections(['captionL', 'captionS']),
	},
	{
		id: 'rhythm',
		title: 'Spacing & gaps',
		intro: 'Section spacing (--space-*) and the gap scale (--gap-*). Any CSS length works.',
		kind: 'text',
		sections: [
			{ title: 'Section spacing', rows: [{ fields: fieldsFrom('space', spaceValues) }] },
			{ title: 'Gaps', columns: 4, rows: [{ fields: fieldsFrom('gap', gapValues) }] },
		],
	},
	{
		id: 'motion',
		title: 'Shape & motion',
		intro: 'Corner radii (--br-*), durations (--time-*) and easing curves (--easing-*).',
		kind: 'text',
		sections: [
			{ title: 'Radius', columns: 5, rows: [{ fields: fieldsFrom('radius', borderRadiusValues) }] },
			{ title: 'Time', columns: 3, rows: [{ fields: fieldsFrom('time', timeValues) }] },
			{ title: 'Easing', rows: [{ fields: fieldsFrom('easing', easingValues) }] },
		],
	},
];

// Validation
// ------------
const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const CSS_SIZE_PATTERN = /^(?:(?:clamp|calc|min|max|var)\(.*\)|\d*\.?\d+(?:rem|em|px|vw|vh|%))$/;
const UNSAFE_PATTERN = /[`\\\r\n]|\$\{/;

export const validateField = (kind: I.FieldKind, value: string, optional?: boolean): string | null => {
	const trimmed = value.trim();
	if (!trimmed) return optional ? null : 'Required';
	if (kind === 'color' && !HEX_PATTERN.test(trimmed)) return 'Use a hex colour, e.g. #8000FF';
	if (kind === 'px' && !NUMBER_PATTERN.test(trimmed) && !CSS_SIZE_PATTERN.test(trimmed)) {
		return 'Use px (e.g. 48) or a CSS size';
	}
	if (UNSAFE_PATTERN.test(trimmed)) return 'Unsupported characters';
	return null;
};
