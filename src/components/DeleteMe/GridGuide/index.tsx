// Imports
// ------------
import Grid, { Col } from '@waffl';
import Demo, { Cell } from '../Demo';
import GridPlayground from '../GridPlayground';
import Section from '../Section';
import Example from './Example';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • One labelled cell per column of the widest (12-column) grid
const COLUMNS = Array.from({ length: 12 }, (_, index) => index + 1);

// Component
// ------------
const GridGuide = () => (
	<Section
		index='03'
		id='grid'
		eyebrow='The grid'
		title='A 12-column grid on CSS grid'
		intro={
			<>
				<p>
					Tackl's grid renders one plain tag, styled by static CSS — no client code. Columns, gutters and
					breakpoints come from the tokens, and every example below is the real thing, drawn over a live
					overlay of the columns.
				</p>
				<p className={s.viewport}>
					<span className={s.breakpoint} data-bp='s'>
						You're viewing the <code>s</code> grid: 2 columns, 2.4rem gutters.
					</span>
					<span className={s.breakpoint} data-bp='m'>
						You're viewing the <code>m</code> grid: 6 columns, 2.4rem gutters.
					</span>
					<span className={s.breakpoint} data-bp='l'>
						You're viewing the <code>l</code> grid: 12 columns, 3.6rem gutters.
					</span>{' '}
					Resize the window to watch every demo reflow.
				</p>
			</>
		}
	>
		<Grid $isFixed className={s.playground}>
			<Col $m='1/6' $l='1/7' className={s.playgroundCopy}>
				<h3 className={s.playgroundTitle}>Try it</h3>
				<p>
					Pick a device, click a block and move it. The preview uses the real column counts and gutters,
					blocks without their own value inherit from the breakpoint below (dashed), and the code is yours to
					copy.
				</p>
			</Col>
			<GridPlayground />
		</Grid>

		<Example
			id='grid-columns'
			title='2, 6, 12'
			demo={
				<Demo>
					<Grid $isFixed>
						{COLUMNS.map(column => (
							<Cell key={column} label={`${column}`} $s='span 1' />
						))}
					</Grid>
				</Demo>
			}
			code={`
// src/theme/grid/index.ts
columns: { s: 2, m: 6, l: 12 },
gutter: { s: '2.4rem', m: '2.4rem', l: '3.6rem' },
breakpoints: { s: '320px', sm: '390px', m: '700px', l: '1024px', xl: '1200px', … },`}
			label='Grid tokens'
		>
			<p>
				Mobile-first: 2 columns on phones, 6 on tablets, 12 from 1024px. Change the counts, gutters or
				breakpoints in the grid tokens and every grid follows.
			</p>
		</Example>

		<Example
			id='grid-full-width'
			title='Full width by default'
			demo={
				<Demo>
					<Grid $isFixed>
						<figure className={s.plain}>A plain &lt;figure&gt; — no props, no component</figure>
					</Grid>
				</Demo>
			}
			code={`
import Grid from '@waffl';

<Grid $isFixed>
  <figure>A plain <figure> — no props, no component</figure>
</Grid>`}
		>
			<p>
				Every direct child of a <code>Grid</code> spans the full width — plain tags and Server Components
				included. You only reach for <code>Col</code> when something needs to be narrower.
			</p>
		</Example>

		<Example
			id='grid-spans'
			title='Spans'
			demo={
				<Demo>
					<Grid $isFixed>
						<Cell label="$m='1/4' $l='1/7'" $m='1/4' $l='1/7' />
						<Cell label="$m='4/7' $l='7/13'" $m='4/7' $l='7/13' />
					</Grid>
					<Grid $isFixed>
						<Cell label="$l='1/5'" $m='1/3' $l='1/5' />
						<Cell label="$l='5/9'" $m='3/5' $l='5/9' />
						<Cell label="$l='9/13'" $m='5/7' $l='9/13' />
					</Grid>
					<Grid $isFixed>
						<Cell label="$l='span 3'" $m='span 2' $l='span 3' tone='soft' />
						<Cell label="$l='span 9'" $m='span 4' $l='span 9' tone='soft' />
					</Grid>
				</Demo>
			}
			code={`
import Grid, { Col } from '@waffl';

<Grid $isFixed>
  <Col $m='1/4' $l='1/7'>Half</Col>
  <Col $m='4/7' $l='7/13'>Half</Col>
</Grid>

<Grid $isFixed>
  <Col $l='span 3'>Sidebar</Col>
  <Col $l='span 9'>Content</Col>
</Grid>`}
		>
			<p>
				A span is any <code>grid-column</code> value: start and end lines (<code>'1/7'</code>), a span (
				<code>'span 3'</code>) or <code>'1/-1'</code> for everything. Lines count from 1, so a 12-column grid
				ends on line 13.
			</p>
		</Example>

		<Example
			id='grid-responsive'
			title='Responsive spans'
			demo={
				<Demo>
					<Grid $isFixed>
						<Cell label="$s='1/-1' $m='1/3' $l='1/4'" $s='1/-1' $m='1/3' $l='1/4' />
						<Cell label="$s='1/-1' $m='3/7' $l='4/13'" $s='1/-1' $m='3/7' $l='4/13' tone='soft' />
					</Grid>
				</Demo>
			}
			code={`
<Grid $isFixed>
  <Col $s='1/-1' $m='1/3' $l='1/4'>Aside</Col>
  <Col $s='1/-1' $m='3/7' $l='4/13'>Main</Col>
</Grid>

// $s $sm $m $l $xl $xxl $huge $uber — one prop per breakpoint token`}
		>
			<p>
				One prop per breakpoint: <code>$s</code>, <code>$sm</code>, <code>$m</code>, <code>$l</code>,{' '}
				<code>$xl</code>, <code>$xxl</code>, <code>$huge</code>, <code>$uber</code>. Each falls back to the one
				below it, so <code>$l</code> on its own still spans fully on mobile.
			</p>
		</Example>

		<Example
			id='grid-nesting'
			title='Nesting'
			demo={
				<Demo>
					<Grid $isFixed>
						<Grid $m='1/5' $l='1/9' $noMargin className={s.nested}>
							<Cell label="$l='span 6'" $m='span 2' $l='span 6' tone='soft' />
							<Cell label="$l='span 6'" $m='span 2' $l='span 6' tone='soft' />
						</Grid>
						<Cell label="$m='5/7' $l='9/13'" $m='5/7' $l='9/13' />
					</Grid>
				</Demo>
			}
			code={`
<Grid $isFixed>
  <Grid $m='1/5' $l='1/9' $noMargin>
    <Col $l='span 6'>Nested</Col>
    <Col $l='span 6'>Nested</Col>
  </Grid>
  <Col $m='5/7' $l='9/13'>Beside it</Col>
</Grid>`}
		>
			<p>
				A <code>Grid</code> takes span props too, so it can sit inside another grid as a column. Inside, it's a
				fresh grid with its own columns — spans never leak from the parent into a nested grid.
			</p>
		</Example>

		<Example
			id='grid-switches'
			title='Switches'
			demo={
				<Demo hasOverlay={false}>
					<Grid $isFixed $noGutter>
						<Cell label='$noGutter' $m='span 2' $l='span 4' />
						<Cell label='$noGutter' $m='span 2' $l='span 4' tone='soft' />
						<Cell label='$noGutter' $m='span 2' $l='span 4' />
					</Grid>
				</Demo>
			}
			code={`
<Grid $isFixed>      // max-width 1440px, centred
<Grid $noGutter>     // no space between columns
<Grid $noMargin>     // no outer margin
<Grid $isCenter>     // centre items both ways
<Grid $isFullscreen> // full height

// They render as data attributes: <waffl-grid data-fixed data-no-gutter>`}
		>
			<p>
				Layout switches are boolean props that become data attributes, styled in the grid layer of{' '}
				<code>global.scss</code>. Without <code>$isFixed</code> a grid runs edge to edge.
			</p>
		</Example>
	</Section>
);

// Exports
// ------------
GridGuide.displayName = 'GridGuide';
export default GridGuide;
