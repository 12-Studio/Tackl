// Imports
// ------------
import { theme } from '@theme';
import type { CSSProperties } from 'react';
import type { SpanProps } from './interface';

// Constants
// ------------
const BREAKPOINT_KEYS = Object.keys(theme.grid.breakpoints) as (keyof typeof theme.grid.breakpoints)[];

// Exports
// ------------
// NOTE • Pulls the span props ($s, $m…) out of a props object and turns them
// into the --col-* custom properties the waffl-grid rules in
// src/css/global.scss read. Internal to Grid and Col — spans are always set
// through those props, never by hand.
export const splitSpans = <P extends SpanProps>(props: P) => {
	const spans: CSSProperties = {};
	const rest: Record<string, unknown> = { ...props };

	for (const key of BREAKPOINT_KEYS) {
		const prop = `$${key}` as const;
		const value = props[prop];
		delete rest[prop];
		if (value) spans[`--col-${key}`] = value;
	}

	return { spans, rest: rest as Omit<P, keyof SpanProps> };
};
