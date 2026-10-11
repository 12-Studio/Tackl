// Imports
// ------------
import Grid, { Col } from '@waffl';
import Code from '../Code';
import CopyButton from '../CopyButton';
import Section from '../Section';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const DOCS_URL = 'https://github.com/12-Studio/Tackl#readme';

const STEPS = [
	{
		title: 'Scaffold',
		text: 'In an empty folder (or a freshly cloned, empty repo), run the CLI. It downloads the latest release, asks which CMS you want and installs everything.',
		label: 'Terminal',
		code: `
mkdir my-site && cd my-site
bunx tackl          # or: bunx tackl --cms sanity`,
	},
	{
		title: 'Set your design',
		text: 'Put the Figma values into the tokens in src/theme and write the type styles in src/css/tackl/_type.scss. The CSS variables regenerate on the next dev run.',
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
		text: 'Start the dev server, delete this landing page, and build your first page on the grid.',
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
		index='06'
		id='start'
		eyebrow='Get started'
		title='Three steps to a new site'
		intro={
			<p>
				You need <a href='https://bun.sh'>Bun</a> and an empty folder. Everything else — dependencies, git, the
				CMS of your choice — the CLI sets up for you.
			</p>
		}
	>
		<Grid $isFixed className={s.steps}>
			{STEPS.map(({ title, text, label, code }, index) => (
				<Col as='article' key={title} $l={`${index * 4 + 1}/span 4`} className={s.step}>
					<span className={s.index}>{index + 1}</span>
					<h3 className={s.title}>{title}</h3>
					<p className={s.text}>{text}</p>
					<Code label={label} code={code} className={s.code} />
				</Col>
			))}
		</Grid>

		<Grid $isFixed className={s.cta}>
			<Col $m='1/7' $l='1/13' className={s.ctaInner}>
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
