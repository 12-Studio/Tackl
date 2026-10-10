// Waffl Types / Interfaces
// ------------
import type { SpanProps } from '@tackl/col/interface';
import type { HTMLAttributes } from 'react';

// SECTION • Waffl
// NOTE — Layout switches become data attributes on <waffl-grid> (styled in
// src/css/global.scss). Span props let a grid sit inside another grid.
export interface GridProps extends SpanProps, HTMLAttributes<HTMLElement> {
	$noMargin?: boolean;
	$isFixed?: boolean;
	$isFullscreen?: boolean;
	$isCenter?: boolean;
	$noGutter?: boolean;
}
