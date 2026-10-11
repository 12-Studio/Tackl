// Imports
// ------------
import Grid from '@waffl';
import Code from '../Code';
import Section from '../Section';
import Tile from '../Tile';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const STEPS = [
	{
		title: 'Tokens live in TypeScript.',
		text: 'Colours, spacing, motion, fonts and breakpoints — one source of truth for CSS and JS alike.',
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
		title: 'They become CSS variables.',
		text: 'Generated for you before dev, build and Storybook. CI fails if they ever drift.',
		label: 'src/css/tokens.css — generated',
		code: `
:root {
  --brand-c1: #8000FF;
  --gap-l: 2.4rem;
  --time-m: 0.3s;
}`,
	},
	{
		title: 'SCSS with nothing to import.',
		text: 'Breakpoints, type and spacing mixins, vw() and alpha() — injected into every file, compiled away.',
		label: 'Card/styles.module.scss',
		code: `
.jacket {
  padding: var(--gap-l);
  background: alpha(--brand-c1, 20);

  @include bp(l) {
    padding: var(--gap-xl);
  }
}`,
	},
	{
		title: 'Components stay plain JSX.',
		text: 'Real tags, a CSS module and the grid. Server Components by default — no provider, no runtime.',
		label: 'Card/index.tsx',
		code: `
<section data-pad>
  <Grid $isFixed>
    <Col $m='2/6' $l='3/11' className={s.jacket}>
      <h2 className='t-headlineL'>Hello</h2>
    </Col>
  </Grid>
</section>`,
	},
];

// Component
// ------------
const HowItWorks = () => (
	<Section
		id='how'
		eyebrow='How it works'
		title='Tokens in. Static CSS out.'
		intro={<p>Styling is SCSS CSS Modules, compiled at build time. A Server Component can be styled directly.</p>}
	>
		<Grid $isFixed className={s.bento}>
			{STEPS.map(({ title, text, label, code }, index) => (
				<Tile key={title} $l={index % 2 ? '7/13' : '1/7'}>
					<p className={s.index}>Step {index + 1}</p>
					<h3 className={s.title}>{title}</h3>
					<p className={s.text}>{text}</p>
					<Code label={label} code={code} className={s.code} />
				</Tile>
			))}
		</Grid>
	</Section>
);

// Exports
// ------------
HowItWorks.displayName = 'HowItWorks';
export default HowItWorks;
