// Imports
// ------------
// Interfaces
// ------------
import type * as I from './interface';
import { splitSpans } from './spans';

// Component
// ------------
// NOTE • Renders a plain <waffl-grid> tag — no JS custom element, no
// client code. All styling lives in src/css/global.scss (the grid layer);
// the boolean props become data attributes:
//   <Grid $isFixed $noGutter> → <waffl-grid data-fixed data-no-gutter>
// Direct children span the full grid by default; narrow them with <Col>,
// exported alongside: import Grid, { Col } from '@waffl'
const Grid = ({ $noMargin, $isFixed, $isFullscreen, $isCenter, $noGutter, style, ...props }: I.GridProps) => {
	// Derived
	const { spans, rest } = splitSpans(props);

	// Render
	return (
		<waffl-grid
			data-no-margin={$noMargin || undefined}
			data-fixed={$isFixed || undefined}
			data-fullscreen={$isFullscreen || undefined}
			data-center={$isCenter || undefined}
			data-no-gutter={$noGutter || undefined}
			style={{ ...spans, ...style }}
			{...rest}
		/>
	);
};

// Exports
// ------------
Grid.displayName = 'Grid';
export default Grid;
export { default as Col } from './Col';
export type { ColProps, GridProps, SpanProps } from './interface';
