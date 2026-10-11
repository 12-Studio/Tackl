// Imports
// ------------
import Grid, { Col } from '@waffl';
import CopyButton from '../CopyButton';
import HeroBackdrop from '../HeroBackdrop';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const REPO_URL = 'https://github.com/12-Studio/Tackl';

const STATS = [
	{ value: '100', label: 'Lighthouse, out of the box' },
	{ value: '0 KB', label: 'Styling runtime' },
	{ value: '12', label: 'Column grid' },
	{ value: '3', label: 'CMS options' },
];

// Component
// ------------
const Hero = () => (
	<header className={s.jacket}>
		<HeroBackdrop />

		<Grid $isFixed className={s.content}>
			<Col $m='1/4' $l='1/4' className={s.meta}>
				The Next.js starter kit
			</Col>
			<Col $m='4/7' $l='4/10' className={s.meta}>
				Animation-first, built on a grid
			</Col>
			<Col $l='10/13' className={s.metaEnd}>
				By 12 Studio
			</Col>

			<h1 className={s.title}>Tackl</h1>

			<Col $m='1/5' $l='1/8' className={s.tagline}>
				An animation-first foundation for marketing sites. Next.js 16, React 19, SCSS modules and a 12-column
				grid, with every production default already done.
			</Col>

			<Col $m='5/7' $l='10/13' className={s.actions}>
				<CopyButton text='bunx tackl' />
				<a className={s.link} href={REPO_URL}>
					View on GitHub →
				</a>
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
