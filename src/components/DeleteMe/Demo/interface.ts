// Imports
// ------------
import type { SpanProps } from '@waffl';

// Exports
// ------------
export interface DemoProps {
	// NOTE • The demo's own <Grid> (or any markup) — drawn over the overlay
	children: React.ReactNode;
	// NOTE • Hide the column overlay, e.g. for a gutterless grid it can't match
	hasOverlay?: boolean;
	caption?: string;
}

export interface CellProps extends SpanProps {
	label: string;
	tone?: 'brand' | 'soft';
	className?: string;
}
