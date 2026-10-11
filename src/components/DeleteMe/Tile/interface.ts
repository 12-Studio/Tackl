// Imports
// ------------
import type { SpanProps } from '@waffl';

// Exports
// ------------
export interface TileProps extends SpanProps {
	children: React.ReactNode;
	as?: 'div' | 'article' | 'li';
	// NOTE • 'glow' adds the brand-colour bloom used on hero tiles
	tone?: 'default' | 'glow';
	className?: string;
	'aria-labelledby'?: string;
}
