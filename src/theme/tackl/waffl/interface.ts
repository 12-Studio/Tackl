// Waffl Types / Interfaces
// ------------
import type { Breakpoints } from '@theme/grid/interface';
import type { Theme } from '@theme/interface';

// SECTION • Responsive Props
// NOTE — Props for responsive grid spans with $ prefix
type ResponsiveProps = {
	[K in keyof Breakpoints as `$${K}`]?: string;
};

// SECTION • Waffl
// NOTE — The main waffl object structure
export interface GridInterface extends ResponsiveProps {
	theme?: Theme;
	$noMargin?: boolean;
	$isFixed?: boolean;
	$isFullscreen?: boolean;
	$isFullscreenTop?: boolean;
	$isCenter?: boolean;
	$noGutter?: boolean;
	children?: React.ReactNode;
}
