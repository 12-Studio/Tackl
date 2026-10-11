// Imports
// ------------
import { cx } from '@utils/cx';
import Grid, { Col } from '@waffl';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • Enough cells for the widest grid — CSS shows 2, 6 or 12 of them to
// match the columns at the current breakpoint
const MAX_COLUMNS = 12;

// Component
// ------------
// NOTE • A live grid demo: the real <Grid> drawn over a column overlay that
// is itself a <Grid>, so both line up at every breakpoint
const Demo = ({ children, hasOverlay = true, caption }: I.DemoProps) => (
	<figure className={s.jacket}>
		{hasOverlay && (
			<div className={s.overlay} aria-hidden='true'>
				<Grid $isFixed>
					{Array.from({ length: MAX_COLUMNS }, (_, index) => (
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
// span props as anything you'd build
export const Cell = ({ label, tone = 'brand', className, ...spans }: I.CellProps) => (
	<Col {...spans} className={cx(s.cell, className)} data-tone={tone}>
		{label}
	</Col>
);

// Exports
// ------------
Demo.displayName = 'Demo';
Cell.displayName = 'Cell';
export default Demo;
