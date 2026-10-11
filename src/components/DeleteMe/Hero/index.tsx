// Imports
// ------------
import Grid, { Col } from '@waffl';
import CopyButton from '../CopyButton';
import HeroBackdrop from '../HeroBackdrop';
import HeroTweaks from '../HeroTweaks';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const REPO_URL = 'https://github.com/12-Studio/Tackl';

// Component
// ------------
const Hero = () => (
	<header className={s.jacket}>
		<HeroBackdrop />
		<HeroTweaks />

		<Grid $isFixed className={s.content}>
			<Col $m='2/6' $l='3/11' className={s.inner}>
				<p className={s.eyebrow}>Introducing</p>
				<h1 className={s.title}>Tackl</h1>
				<p className={s.tagline}>The Next.js starter kit. Built for motion. Fast by default.</p>

				<div className={s.actions}>
					<CopyButton text='bunx tackl' />
					<a className={s.link} href={REPO_URL}>
						View on GitHub
					</a>
				</div>
			</Col>
		</Grid>
	</header>
);

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
