// Imports
// ------------
import Grid, { Col } from '@waffl';
import Code from '../Code';
import CopyButton from '../CopyButton';
import Section from '../Section';
import Tile from '../Tile';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const DOCS_URL = 'https://github.com/12-Studio/Tackl#readme';

const STEPS = [
	{
		title: 'Scaffold',
		text: 'Run the CLI in an empty folder. Pick a CMS.',
		label: 'Terminal',
		code: `
mkdir my-site && cd my-site
bunx tackl          # or: bunx tackl --cms sanity`,
	},
	{
		title: 'Set your design',
		text: 'Add your Figma values to the tokens.',
		label: 'src/theme · src/css/tackl/_type.scss',
		code: `
// src/theme/colors/index.ts
brand: { c1: '#8000FF', … }

// src/css/tackl/_type.scss
@mixin headlineL {
  font-size: 3.6rem;
  @include bp(xl) { font-size: 6rem; }
}`,
	},
	{
		title: 'Build',
		text: 'Start the dev server and delete this page.',
		label: 'Terminal',
		code: `
bun run dev

# then delete the landing page, and its usage
# in app/(site)/(home)/page.tsx
rm -r src/components/DeleteMe`,
	},
];

// Component
// ------------
const GetStarted = () => (
	<Section
		id='start'
		title='Up and running in three steps.'
		intro={
			<p>
				All you need is <a href='https://bun.sh'>Bun</a>.
			</p>
		}
	>
		<Grid $isFixed>
			{STEPS.map(({ title, text, label, code }, index) => (
				<Tile key={title} $l={`${index * 4 + 1}/span 4`}>
					<span className={s.index}>{index + 1}</span>
					<h3 className={s.title}>{title}</h3>
					<p className={s.text}>{text}</p>
					<Code label={label} code={code} className={s.code} />
				</Tile>
			))}
		</Grid>

		<Grid $isFixed className={s.cta}>
			<Col className={s.ctaInner}>
				<CopyButton text='bunx tackl' />
				<a className={s.link} href={DOCS_URL}>
					Read the docs
				</a>
			</Col>
		</Grid>
	</Section>
);

// Exports
// ------------
GetStarted.displayName = 'GetStarted';
export default GetStarted;
