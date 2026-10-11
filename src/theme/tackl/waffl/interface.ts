// Waffl Types / Interfaces
// ------------
import type { Breakpoints } from '@theme/grid/interface';
import type { ComponentProps, ElementType, HTMLAttributes } from 'react';

// SECTION • Spans
// NOTE — One optional grid-column value per breakpoint ($s, $m, $l…),
// derived from the grid tokens so a new breakpoint adds a prop automatically
export type SpanProps = {
	[K in keyof Breakpoints as `$${K}`]?: string;
};

// SECTION • Grid
// NOTE — Layout switches become data attributes on <waffl-grid> (styled in
// src/css/global.scss). Span props let a grid sit inside another grid.
export interface GridProps extends SpanProps, HTMLAttributes<HTMLElement> {
	$noMargin?: boolean;
	$isFixed?: boolean;
	$isFullscreen?: boolean;
	$isCenter?: boolean;
	$noGutter?: boolean;
}

// SECTION • Col
// NOTE — Polymorphic: `as` picks the tag, and that tag's own props (ref,
// className, aria-*, data-*…) are typed accordingly
export type ColProps<T extends ElementType = 'div'> = SpanProps & {
	as?: T;
} & Omit<ComponentProps<T>, keyof SpanProps | 'as'>;
