// Imports
// ------------
import type { SpanProps } from '@waffl';
import type { CSSProperties } from 'react';

// Exports
// ------------
export interface DemoProps {
	// NOTE • The demo's own <Grid> (or any markup) — drawn over the overlay
	children: React.ReactNode;
	// NOTE • Hide the column overlay, e.g. for a gutterless grid it can't match
	hasOverlay?: boolean;
	caption?: string;
	className?: string;
	style?: CSSProperties;
}

export interface CellProps extends SpanProps {
	label: string;
	// NOTE • The tag to render — any element, like <Col as='…'>
	as?: 'div' | 'article' | 'aside' | 'section' | 'figure' | 'header' | 'li';
	tone?: 'brand' | 'soft';
	className?: string;
}
