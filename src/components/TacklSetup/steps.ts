// Property Documentation
// ------------

// NOTE • Step + field definitions for the first-run setup wizard. Defaults are
// read straight from the theme token files, so the wizard always opens with
// the current values and fields never drift from the token keys.

// Imports
// ------------
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

// Defaults
// ------------
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
};

// Fields
// ------------
const fieldsFrom = (
	group: I.TokenGroup,
	values: Record<string, string>,
	options?: { labels?: Record<string, string>; prefix?: string }
): I.FieldDef[] =>
	Object.keys(values).map(key => ({
		group,
		key,
		label: options?.labels?.[key] ?? (options?.prefix ? `${options.prefix} ${key}` : key),
	}));

// Steps
// ------------
export const steps: I.StepDef[] = [
	{
		id: 'brand',
		title: 'Brand colours',
		intro: 'The five colours behind every getBrand() call and --brand-* variable.',
		kind: 'color',
		fields: fieldsFrom('brand', baseColors.brand, {
			labels: {
				bc1: 'bc1 — primary',
				bc2: 'bc2 — secondary',
				bc3: 'bc3 — tertiary',
				bc4: 'bc4 — light',
				bc5: 'bc5 — muted',
			},
		}),
	},
	{
		id: 'system',
		title: 'Global & feedback',
		intro: 'Base white/black, plus the colours for success, error and warning states.',
		kind: 'color',
		fields: [...fieldsFrom('global', baseColors.global), ...fieldsFrom('feedback', baseColors.feedback)],
	},
	{
		id: 'type',
		title: 'Typography',
		intro: 'Font stacks emitted as --font-* variables. Load the actual font files with next/font in src/theme/fonts.',
		kind: 'text',
		fields: fieldsFrom('fonts', fontFamilies),
	},
	{
		id: 'rhythm',
		title: 'Spacing & gaps',
		intro: 'Section spacing (--space-*) and the gap scale (--gap-*). Any CSS length works.',
		kind: 'text',
		fields: [
			...fieldsFrom('space', spaceValues, { prefix: 'space' }),
			...fieldsFrom('gap', gapValues, { prefix: 'gap' }),
		],
	},
	{
		id: 'motion',
		title: 'Shape & motion',
		intro: 'Corner radii (--br-*), durations (--time-*) and easing curves (--easing-*).',
		kind: 'text',
		fields: [
			...fieldsFrom('radius', borderRadiusValues, { prefix: 'radius' }),
			...fieldsFrom('time', timeValues, { prefix: 'time' }),
			...fieldsFrom('easing', easingValues),
		],
	},
];

// Validation
// ------------
const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const UNSAFE_PATTERN = /[`\\\r\n]|\$\{/;

export const validateField = (kind: I.FieldKind, value: string): string | null => {
	const trimmed = value.trim();
	if (!trimmed) return 'Required';
	if (kind === 'color' && !HEX_PATTERN.test(trimmed)) return 'Use a hex colour, e.g. #8000FF';
	if (UNSAFE_PATTERN.test(trimmed)) return 'Unsupported characters';
	return null;
};
