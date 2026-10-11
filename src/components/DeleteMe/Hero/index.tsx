// Imports
// ------------
import Grid, { Col } from '@waffl';
import CopyButton from '../CopyButton';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const MAX_COLUMNS = 12;
const REPO_URL = 'https://github.com/12-Studio/Tackl';

const STATS = [
	{ value: '100', label: 'Lighthouse, out of the box' },
	{ value: '0 KB', label: 'styling runtime' },
	{ value: '12', label: 'column grid' },
	{ value: '3', label: 'CMS options' },
];

// Component
// ------------
const Hero = () => (
	<header className={s.jacket}>
		{/* NOTE • The real grid, drawn as the backdrop — 2, 6 or 12 columns as the viewport grows */}
		<div className={s.backdrop} aria-hidden='true'>
			<Grid $isFixed>
				{Array.from({ length: MAX_COLUMNS }, (_, index) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: a fixed, static list of identical columns
						key={index}
						className={s.column}
						style={{ '--index': index }}
					/>
				))}
			</Grid>
		</div>

		<Grid $isFixed className={s.content}>
			<Col $m='1/7' $l='1/13'>
				<p className={s.eyebrow}>The Next.js starter kit by 12 Studio</p>
				<h1 className={s.title}>Tackl</h1>
				<p className={s.tagline}>
					An animation-first foundation for marketing sites. Next.js 16, React 19, SCSS modules, a 12-column
					grid and every production default already done — so day one is spent on the design, not the setup.
				</p>

				<div className={s.actions}>
					<CopyButton text='bunx tackl' />
					<a className={s.link} href={REPO_URL}>
						View on GitHub
					</a>
				</div>
			</Col>

			{/* NOTE • Each stat is a column on the same grid as the backdrop: 2 per row, then 4 across from l */}
			{STATS.map(({ value, label }) => (
				<Col key={label} $s='span 1' $m='span 3' $l='span 3' className={s.stat}>
					<span className={s.value}>{value}</span>
					<span className={s.label}>{label}</span>
				</Col>
			))}
		</Grid>
	</header>
);

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
