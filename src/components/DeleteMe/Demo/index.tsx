// Imports
// ------------
import { theme } from '@theme';
import { cx } from '@utils/cx';
import Grid, { Col } from '@waffl';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • Enough cells for any column count a demo might show. The overlay
// grid keeps only its first row, so whatever the grid's columns at the
// current breakpoint, exactly that many cells are visible.
export const MAX_DEMO_COLUMNS = 24;
const OVERLAY_CELLS = Math.max(MAX_DEMO_COLUMNS, ...Object.values(theme.grid.columns));

// Component
// ------------
// NOTE • A live grid demo: the real <Grid> drawn over a column overlay that
// is itself a <Grid>, so both line up at every breakpoint
const Demo = ({ children, hasOverlay = true, caption, className, style }: I.DemoProps) => (
	<figure className={cx(s.jacket, className)} style={style}>
		{hasOverlay && (
			<div className={s.overlay} aria-hidden='true'>
				<Grid $isFixed>
					{Array.from({ length: OVERLAY_CELLS }, (_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: a fixed, static list of identical cells
						<span key={index} className={s.column} />
					))}
				</Grid>
			</div>
		)}

		<div className={s.stage}>{children}</div>

		{caption && (
			<Grid $isFixed>
				<figcaption className={s.caption}>{caption}</figcaption>
			</Grid>
		)}
	</figure>
);

// NOTE • A labelled block on the demo grid — a <Col>, so it takes the same
// `as` and span props as anything you'd build
export const Cell = ({ label, as = 'div', tone = 'brand', className, ...spans }: I.CellProps) => (
	<Col as={as} {...spans} className={cx(s.cell, className)} data-tone={tone}>
		{label}
	</Col>
);

// Exports
// ------------
Demo.displayName = 'Demo';
Cell.displayName = 'Cell';
export default Demo;
