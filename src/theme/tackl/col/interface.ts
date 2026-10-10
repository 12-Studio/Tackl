// Col Types / Interfaces
// ------------
import type { Breakpoints } from '@theme/grid/interface';
import type { ComponentProps, ElementType } from 'react';

// SECTION • Spans
// NOTE — One optional grid-column value per breakpoint ($s, $m, $l…),
// derived from the grid tokens so a new breakpoint adds a prop automatically
export type SpanProps = {
	[K in keyof Breakpoints as `$${K}`]?: string;
};

// SECTION • Col
// NOTE — Polymorphic: `as` picks the tag, and that tag's own props (ref,
// className, aria-*, data-*…) are typed accordingly
export type ColProps<T extends ElementType = 'div'> = SpanProps & {
	as?: T;
} & Omit<ComponentProps<T>, keyof SpanProps | 'as'>;
