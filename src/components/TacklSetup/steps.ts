// Property Documentation
// ------------

// NOTE • Step + field definitions for the first-run setup wizard. Defaults are
// read straight from the theme token files, so the wizard always opens with
// the current values and fields never drift from the token keys.

// Imports
// ------------
import { typeScale } from '@tackl/type';
import { borderRadiusValues } from '@theme/borderRadius';
import { baseColors } from '@theme/colors';
import { easingValues } from '@theme/easing';
import { fontFamilies } from '@theme/fonts';
import { gapValues } from '@theme/gap';
import { spaceValues } from '@theme/space';
import { timeValues } from '@theme/time';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Conversions
// ------------
// NOTE • The theme stores rem (html base = 10px), the wizard edits px
export const remToPx = (rem: string): string => {
	const value = Number.parseFloat(rem);
	return Number.isFinite(value) ? String(Math.round(value * 100) / 10) : '';
};

export const pxToRem = (px: string): string => {
	const value = Number.parseFloat(px);
	return Number.isFinite(value) ? `${Math.round(value * 10) / 100}rem` : px;
};

// Defaults
// ------------
// NOTE • Type-scale entries have optional keys — drop the absent ones so
// every group is a plain Record<string, string>
const compact = (values: Record<string, string | undefined>): Record<string, string> =>
	Object.fromEntries(Object.entries(values).filter(([, value]) => value !== undefined)) as Record<string, string>;

// NOTE • Wizard state holds the sizes in px; they go back to rem on submit
const typeDefaults = (entry: Record<string, string | undefined>): Record<string, string> => {
	const values = compact(entry);
	return { ...values, size: remToPx(values.size), sizeM: remToPx(values.sizeM) };
};

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

// NOTE • The type-scale steps surface the everyday knobs — sizes in px
// (written to the theme as rem via px ÷ 10), the font family, and line-height.
// Letter-spacing and bp.xl overrides stay in src/theme/tackl/type and survive
// setup untouched. One section per style keeps the labels short.
export const FONT_FAMILY_OPTIONS = Object.keys(fontFamilies);

const typeScaleSections = (groups: I.TokenGroup[]): I.SectionDef[] =>
	groups.map(group => ({
		title: group,
		columns: 4,
		fields: [
			{ group, key: 'family', label: 'Family', kind: 'select' as const, options: FONT_FAMILY_OPTIONS },
			{ group, key: 'size', label: 'Mobile size (px)', kind: 'px' as const },
			{ group, key: 'sizeM', label: 'Desktop size (px)', kind: 'px' as const },
			{ group, key: 'lineHeight', label: 'Line height' },
		],
	}));

export const stepFields = (step: I.StepDef): I.FieldDef[] => step.sections.flatMap(section => section.fields);

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
	{
		id: 'system',
		title: 'Global & feedback',
		intro: 'Base white/black, plus the colours for success, error and warning states.',
		kind: 'color',
		sections: [
			{ title: 'Global', fields: fieldsFrom('global', baseColors.global) },
			{ title: 'Feedback', fields: fieldsFrom('feedback', baseColors.feedback) },
		],
	},
	{
		id: 'type',
		title: 'Typography',
		intro: 'Font stacks emitted as --font-* variables. Upload a font file below to add it to the theme — it becomes a var(--…) you can use in these stacks.',
		kind: 'text',
		sections: [{ title: 'Font stacks', fields: fieldsFrom('fonts', fontFamilies) }],
		hasFontUpload: true,
	},
	{
		id: 'display',
		title: 'Display & headline',
		intro: 'The biggest text on the page. Sizes are in px and written to the theme as rem (px ÷ 10).',
		kind: 'text',
		sections: typeScaleSections(['displayL', 'displayS', 'headlineL', 'headlineS']),
	},
	{
		id: 'title-body',
		title: 'Title & body',
		intro: 'Section titles and running copy, same px-based sizing.',
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
			{ title: 'Section spacing', fields: fieldsFrom('space', spaceValues) },
			{ title: 'Gaps', columns: 4, fields: fieldsFrom('gap', gapValues) },
		],
	},
	{
		id: 'motion',
		title: 'Shape & motion',
		intro: 'Corner radii (--br-*), durations (--time-*) and easing curves (--easing-*).',
		kind: 'text',
		sections: [
			{ title: 'Radius', columns: 5, fields: fieldsFrom('radius', borderRadiusValues) },
			{ title: 'Time', columns: 3, fields: fieldsFrom('time', timeValues) },
			{ title: 'Easing', fields: fieldsFrom('easing', easingValues) },
		],
	},
];

// Validation
// ------------
const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const PX_PATTERN = /^\d+(?:\.\d+)?$/;
const UNSAFE_PATTERN = /[`\\\r\n]|\$\{/;

export const validateField = (kind: I.FieldKind, value: string): string | null => {
	const trimmed = value.trim();
	if (!trimmed) return 'Required';
	if (kind === 'color' && !HEX_PATTERN.test(trimmed)) return 'Use a hex colour, e.g. #8000FF';
	if (kind === 'px' && (!PX_PATTERN.test(trimmed) || Number.parseFloat(trimmed) <= 0)) {
		return 'Use a positive number of px, e.g. 48';
	}
	if (UNSAFE_PATTERN.test(trimmed)) return 'Unsupported characters';
	return null;
};
