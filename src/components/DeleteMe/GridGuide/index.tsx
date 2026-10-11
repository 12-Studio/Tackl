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
		title='A grid that thinks in columns.'
		intro={
			<>
				<p>One plain tag, static CSS, no client code.</p>
				<p className={s.viewport}>
					<span className={s.breakpoint} data-bp='s'>
						Now: <code>s</code>, 2 columns
					</span>
					<span className={s.breakpoint} data-bp='m'>
						Now: <code>m</code>, 6 columns
					</span>
					<span className={s.breakpoint} data-bp='l'>
						Now: <code>l</code>, 12 columns
					</span>
				</p>
			</>
		}
	>
		<Grid $isFixed className={s.playground}>
			<Tile tone='glow'>
				<div className={s.playgroundCopy}>
					<h3 className={s.playgroundTitle}>Try it.</h3>
					<p>Move the blocks. Copy the code.</p>
				</div>
				<GridPlayground />
			</Tile>
		</Grid>

		<Example id='grid-columns' title='Any number of columns' demo={<ColumnCount />}>
			<p>12 is just the default. Set any count, per breakpoint.</p>
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
				Direct children span the grid. Use <code>Col</code> only to go narrower.
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
				<code>Col</code> is the element itself — any tag via <code>as</code>, fully typed.
			</p>
			<p>
				Span props set its <code>grid-column</code> at each breakpoint.
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
				<code>$s</code> to <code>$uber</code>. Each falls back to the one below.
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
				A <code>Grid</code> takes spans too, so grids nest cleanly.
			</p>
		</Example>

		<Example id='grid-switches' title='Switches' demo={<Switches />}>
			<p>Boolean props, rendered as data attributes. Try them.</p>
		</Example>
	</Section>
);

// Exports
// ------------
GridGuide.displayName = 'GridGuide';
export default GridGuide;
