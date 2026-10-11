// Imports
// ------------
import Grid from '@waffl';
import AlphaPlayground from '../AlphaPlayground';
import BreakpointReadout from '../BreakpointReadout';
import Code from '../Code';
import Section from '../Section';
import Tile from '../Tile';
import TypeTester from '../TypeTester';

// Styles
// ------------
import s from './styles.module.scss';

// Component
// ------------
const Styling = () => (
	<Section
		id='styling'
		eyebrow='Styling'
		title='Design tokens. Zero runtime.'
		intro={
			<p>
				Every demo here runs on the kit's own tokens, classes and helpers. Change a value in{' '}
				<code>src/theme</code> and this page changes with it.
			</p>
		}
	>
		<Grid $isFixed className={s.blocks}>
			<Tile $l='1/7'>
				<h3 className={s.title}>Colour and opacity</h3>
				<p className={s.text}>
					Colours are CSS variables. <code>alpha()</code> makes any of them translucent — same name and
					arguments in SCSS and JavaScript.
				</p>
				<AlphaPlayground />
			</Tile>

			<Tile $l='7/13'>
				<h3 className={s.title}>Type styles</h3>
				<p className={s.text}>
					Hand-written from the Figma file in one SCSS file, then usable three ways. Sizes step up with the
					viewport — resize to see.
				</p>
				<TypeTester />
			</Tile>

			<Tile $l='1/7'>
				<h3 className={s.title}>Breakpoints</h3>
				<p className={s.text}>
					Mobile-first <code>min-width</code> queries from the grid tokens — <code>bp()</code> in SCSS,{' '}
					<code>mq</code> in JavaScript for GSAP's <code>matchMedia</code>. This readout is <code>mq</code>,
					live:
				</p>
				<BreakpointReadout />
				<Code
					label='SCSS + JS'
					code={`
.nav {
  display: none;

  @include bp(l) {
    display: flex;
  }
}

import { mq } from '@tackl';
mq.up.l; // '(min-width: 1024px)'`}
				/>
			</Tile>

			<Tile $l='7/13'>
				<h3 className={s.title}>Section spacing</h3>
				<p className={s.text}>
					Vertical rhythm on the <code>--space-*</code> scale, stepping up at <code>m</code> and{' '}
					<code>l</code> — from the HTML with data attributes, or in a module with mixins. Every section on
					this page uses <code>data-pad</code>.
				</p>
				<Code
					label='HTML or SCSS'
					code={`
<section data-pad>…</section>          // top + bottom
<section data-pad='top'>…</section>
<div data-mar='top bottom'>…</div>

.hero { @include pad(top); }`}
				/>
			</Tile>
		</Grid>
	</Section>
);

// Exports
// ------------
Styling.displayName = 'Styling';
export default Styling;
