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
	<Section id='styling' title='Design tokens. Zero runtime.' intro={<p>Every demo runs on the kit's own tokens.</p>}>
		<Grid $isFixed>
			<Tile $l='1/7'>
				<h3 className={s.title}>Colour and opacity</h3>
				<p className={s.text}>
					<code>alpha()</code> makes any colour translucent, in SCSS or JS.
				</p>
				<AlphaPlayground />
			</Tile>

			<Tile $l='7/13'>
				<h3 className={s.title}>Type styles</h3>
				<p className={s.text}>Written once, used three ways. Resize to see it scale.</p>
				<TypeTester />
			</Tile>

			<Tile $l='1/7'>
				<h3 className={s.title}>Breakpoints</h3>
				<p className={s.text}>
					Mobile-first: <code>bp()</code> in SCSS, <code>mq</code> in JS. Live:
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
				<p className={s.text}>One vertical rhythm, from a data attribute or a mixin.</p>
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
