// Waffl Types / Interfaces
// ------------
import { Theme } from '@theme/interface';


// SECTION • Waffl
// NOTE — The main waffl object structure
interface GridInterface {
	theme?: Theme;
	$noMargin?: boolean;
	$isFixed?: boolean;
	$isFullscreen?: boolean;
	$isFullscreenTop?: boolean;
	$isCenter?: boolean;
	$noGutter?: boolean;
	children?: React.ReactNode;
}