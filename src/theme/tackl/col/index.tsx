// Imports
// ------------
import { theme } from '@theme';
import type { CSSProperties, ElementType } from 'react';

// Interfaces
// ------------
import type * as I from './interface';

// Constants
// ------------
const BREAKPOINT_KEYS = Object.keys(theme.grid.breakpoints) as (keyof typeof theme.grid.breakpoints)[];

// Helpers
// ------------
// NOTE • Pulls the span props ($s, $m…) out of a props object and turns them
// into --col-* custom properties, which the waffl-grid rules in
// src/css/global.scss read. Shared with <Grid> so a nested grid can span too.
export const splitSpans = <P extends I.SpanProps>(props: P) => {
	const spans: CSSProperties = {};
	const rest: Record<string, unknown> = { ...props };

	for (const key of BREAKPOINT_KEYS) {
		const prop = `$${key}` as const;
		const value = props[prop];
		delete rest[prop];
		if (value) spans[`--col-${key}`] = value;
	}

	return { spans, rest: rest as Omit<P, keyof I.SpanProps> };
};

// Component
// ------------
// NOTE • A grid child with responsive spans. Pick the tag with `as`:
//   <Col as='article' $m='2/6' $l='3/9'>…</Col>
// Children without spans don't need Col at all — every direct child of a
// grid spans the full width by default.
const Col = <T extends ElementType = 'div'>({ as, style, ...props }: I.ColProps<T>) => {
	// Derived
	const Tag: ElementType = as ?? 'div';
	const { spans, rest } = splitSpans(props);

	// Render
	return <Tag style={{ ...spans, ...style }} {...rest} />;
};

// Exports
// ------------
Col.displayName = 'Col';
export default Col;
