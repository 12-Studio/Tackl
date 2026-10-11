// Imports
// ------------
import { baseColors } from '@theme/colors';
import Grid, { Col } from '@waffl';
import Code from '../Code';
import Section from '../Section';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • Mirrors $type-styles in src/css/tackl/_type.scss
const TYPE_STYLES = [
	'displayS',
	'headlineL',
	'headlineS',
	'titleL',
	'titleS',
	'bodyL',
	'bodyS',
	'captionL',
	'captionS',
];

const SWATCHES = Object.entries(baseColors).flatMap(([group, colors]) =>
	Object.entries(colors).map(([name, value]) => ({ token: `--${group}-${name}`, value }))
);

// Component
// ------------
const Styling = () => (
	<Section
		id='styling'
		eyebrow='Styling'
		title='Tokens, type and spacing'
		intro={
			<p>
				Everything below is rendered live from the kit's own tokens and utilities — change a value in{' '}
				<code>src/theme</code> and this page changes with it.
			</p>
		}
	>
		<Grid $isFixed className={s.blocks}>
			<Col $l='1/7' className={s.block}>
				<h3 className={s.title}>Colour tokens</h3>
				<ul className={s.swatches}>
					{SWATCHES.map(({ token, value }) => (
						<li key={token} className={s.swatch} style={{ '--swatch': `var(${token})` }}>
							<span className={s.chip} />
							<code className={s.token}>{token}</code>
							<span className={s.value}>{value}</span>
						</li>
					))}
				</ul>
				<Code
					label='styles.module.scss'
					code={`
.card {
  color: var(--brand-c1);
  background: alpha(--brand-c1, 20); // 20% opacity
  border-radius: var(--br-m);
}`}
				/>
			</Col>

			<Col $l='7/13' className={s.block}>
				<h3 className={s.title}>Type styles</h3>
				<ul className={s.types}>
					{TYPE_STYLES.map(name => (
						<li key={name} className={s.type}>
							<code className={s.token}>{name}</code>
							<span className={`t-${name} ${s.sample}`}>Built for motion</span>
						</li>
					))}
				</ul>
				<Code
					label='Three ways to use a type style'
					code={`
// a mixin, in a module
.title { @include headlineL; }

// a class, or a data attribute, in JSX
<h2 className='t-headlineL'>…</h2>
<p data-type='captionL'>…</p>`}
				/>
			</Col>

			<Col $l='1/7' className={s.block}>
				<h3 className={s.title}>Breakpoints</h3>
				<p className={s.text}>
					Mobile-first <code>min-width</code> queries from the grid tokens — in SCSS with <code>bp()</code>,
					and in JavaScript (for GSAP's <code>matchMedia</code>) with <code>mq</code>.
				</p>
				<Code
					label='SCSS + JS'
					code={`
.nav {
  display: none;

  @include bp(l) {
    display: flex;
  }
}

// gsap.matchMedia / useAnimation
import { mq } from '@tackl';
mq.up.l; // '(min-width: 1024px)'`}
				/>
			</Col>

			<Col $l='7/13' className={s.block}>
				<h3 className={s.title}>Section spacing</h3>
				<p className={s.text}>
					Vertical rhythm on the <code>--space-*</code> scale, stepping up at <code>m</code> and{' '}
					<code>l</code> — applied from the HTML with data attributes, or in a module with mixins.
				</p>
				<Code
					label='HTML or SCSS'
					code={`
<section data-pad>…</section>          // top + bottom
<section data-pad='top'>…</section>
<div data-mar='top bottom'>…</div>

.hero { @include pad(top); }`}
				/>
			</Col>
		</Grid>
	</Section>
);

// Exports
// ------------
Styling.displayName = 'Styling';
export default Styling;
