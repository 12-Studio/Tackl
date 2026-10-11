// Imports
// ------------
import Grid, { Col } from '@waffl';
import Code from '../Code';
import Section from '../Section';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const STEPS = [
	{
		title: 'Tokens live in TypeScript',
		text: 'Colours, spacing, gaps, radii, motion, fonts and breakpoints are plain TS objects in src/theme — one source of truth for CSS and JS alike.',
		label: 'src/theme/colors/index.ts',
		code: `
export const baseColors = {
  brand: {
    c1: '#8000FF',
    c2: '#380377',
  },
};`,
	},
	{
		title: 'They become CSS variables',
		text: 'bun run styles (run for you before dev, build and Storybook) generates tokens.css plus the breakpoint and grid SCSS. CI fails if they drift.',
		label: 'src/css/tokens.css — generated',
		code: `
:root {
  --brand-c1: #8000FF;
  --gap-l: 2.4rem;
  --time-m: 0.3s;
  --easing-bezzy: cubic-bezier(0.8, 0, 0, 1);
}`,
	},
	{
		title: 'SCSS with nothing to import',
		text: 'Every .scss file gets the Tackl layer injected: breakpoints, type and spacing mixins, vw() and alpha(). It compiles away to plain, static CSS.',
		label: 'Card/styles.module.scss',
		code: `
.jacket {
  padding: var(--gap-l);
  background: alpha(--brand-c1, 20);
  transition: background var(--time-m) var(--easing-bezzy);

  @include bp(l) {
    padding: var(--gap-xl);
  }
}

.title {
  @include headlineS;
}`,
	},
	{
		title: 'Components stay plain JSX',
		text: 'Real HTML tags styled by a CSS module, the grid for layout, data attributes for spacing and type. Server Components by default — no provider, no runtime.',
		label: 'Card/index.tsx',
		code: `
import Grid, { Col } from '@waffl';
import s from './styles.module.scss';

const Card = () => (
  <section data-pad>
    <Grid $isFixed>
      <Col as='article' $m='2/6' $l='3/11' className={s.jacket}>
        <h2 className={s.title}>Hello</h2>
        <p className='t-bodyS'>Static CSS.</p>
      </Col>
    </Grid>
  </section>
);`,
	},
];

// Component
// ------------
const HowItWorks = () => (
	<Section
		id='how'
		eyebrow='How it works'
		title='Tokens in, static CSS out'
		intro={
			<p>
				Styling is SCSS CSS Modules, compiled at build time. There's no CSS-in-JS runtime in the browser and no
				provider to set up — a Server Component can be styled directly.
			</p>
		}
	>
		<Grid $isFixed className={s.steps}>
			{STEPS.map(({ title, text, label, code }, index) => (
				<Col as='article' key={title} $l={index % 2 ? '7/13' : '1/7'} className={s.step}>
					<div className={s.copy}>
						<span className={s.index}>Step {index + 1}</span>
						<h3 className={s.title}>{title}</h3>
						<p className={s.text}>{text}</p>
					</div>
					<Code label={label} code={code} className={s.code} />
				</Col>
			))}
		</Grid>
	</Section>
);

// Exports
// ------------
HowItWorks.displayName = 'HowItWorks';
export default HowItWorks;
