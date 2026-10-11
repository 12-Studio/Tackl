// Imports
// ------------
import Grid from '@waffl';
import Demo, { Cell } from '../Demo';
import GridPlayground from '../GridPlayground';
import Section from '../Section';
import Tile from '../Tile';
import ColumnCount from './ColumnCount';
import Example from './Example';
import Switches from './Switches';

// Styles
// ------------
import s from './styles.module.scss';

// Component
// ------------
const GridGuide = () => (
	<Section
		id='grid'
		eyebrow='The grid'
		title='A grid that thinks in columns.'
		intro={
			<>
				<p>
					Tackl's grid renders one plain tag, styled by static CSS — no client code. Columns, gutters and
					breakpoints come from the tokens: 2, 6 and 12 columns out of the box, but any count you like. Every
					example below is the real thing, drawn over a live overlay of the columns.
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
			<Tile tone='glow'>
				<div className={s.playgroundCopy}>
					<h3 className={s.playgroundTitle}>Try it.</h3>
					<p>
						Pick a device, tap a block and move it. The preview uses the real column counts and gutters,
						blocks without their own value inherit from the breakpoint below, and the code is yours to copy.
					</p>
				</div>
				<GridPlayground />
			</Tile>
		</Grid>

		<Example id='grid-columns' title='Any number of columns' demo={<ColumnCount />}>
			<p>
				12 is just the default. The column count is a token per breakpoint — 2 on phones, 6 on tablets, 12 from
				1024px — so a 5, 8 or 16-column grid is one number away. Step the counts and every grid on the site
				would follow; gutters and breakpoints are tokens too.
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
			id='grid-col'
			title='Col — any element'
			demo={
				<Demo>
					<Grid $isFixed>
						<Cell as='article' label="<article> $m='1/4' $l='1/7'" $m='1/4' $l='1/7' />
						<Cell as='aside' label="<aside> $m='4/7' $l='7/13'" $m='4/7' $l='7/13' />
						<Cell as='header' label="<header> $l='span 3'" $m='span 2' $l='span 3' tone='soft' />
						<Cell as='section' label="<section> $l='span 9'" $m='span 4' $l='span 9' tone='soft' />
					</Grid>
				</Demo>
			}
			code={`
import Grid, { Col } from '@waffl';

<Grid $isFixed>
  <Col as='article' $m='1/4' $l='1/7'>Story</Col>
  <Col as='aside' $m='4/7' $l='7/13'>Related</Col>
  <Col as='header' $l='span 3'>Sidebar</Col>
  <Col as='section' $l='span 9'>Content</Col>
</Grid>

// as='a' takes an anchor's props — href, target… — fully typed
<Col as='a' href='/work' $l='span 4'>Our work</Col>`}
		>
			<p>
				<code>Col</code> isn't a wrapper — it <em>is</em> the element. It renders a <code>div</code> by default;{' '}
				<code>as</code> makes it any tag (<code>article</code>, <code>section</code>, <code>li</code>,{' '}
				<code>a</code>, <code>figure</code>…), and it takes that tag's own props, fully typed. All it adds is
				where the element sits on the grid.
			</p>
			<p>
				That's what the <code>$s</code>, <code>$m</code>, <code>$l</code>… props set: the element's{' '}
				<code>grid-column</code> at each breakpoint. Start and end lines (<code>'1/7'</code>), a span (
				<code>'span 3'</code>) or <code>'1/-1'</code> for everything. Lines count from 1, so a 12-column grid
				ends on line 13.
			</p>
		</Example>

		<Example
			id='grid-responsive'
			title='One prop per breakpoint'
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
  <Col as='aside' $s='1/-1' $m='1/3' $l='1/4'>Aside</Col>
  <Col as='main' $s='1/-1' $m='3/7' $l='4/13'>Main</Col>
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
				fresh grid with its own columns — placement never leaks from the parent into a nested grid.
			</p>
		</Example>

		<Example id='grid-switches' title='Switches' demo={<Switches />}>
			<p>
				Layout switches are boolean props on <code>Grid</code>. Each becomes a data attribute (
				<code>&lt;waffl-grid data-fixed data-no-gutter&gt;</code>), styled in the grid layer of{' '}
				<code>global.scss</code>. Toggle them to see what each does — without <code>$isFixed</code> a grid runs
				edge to edge.
			</p>
		</Example>
	</Section>
);

// Exports
// ------------
GridGuide.displayName = 'GridGuide';
export default GridGuide;
