// Imports
// ------------
import Grid from '@waffl';
import agentsImage from '../images/agents.webp';
import designImage from '../images/design.webp';
import motionImage from '../images/motion.webp';
import performanceImage from '../images/performance.webp';
import runtimeImage from '../images/runtime.webp';
import Odometer from '../Odometer';
import ScrollReveal from '../ScrollReveal';
import Section from '../Section';
import Tile from '../Tile';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • Tile widths for each image's srcset: two thirds, a third or half
// of the 1440px grid on desktop, full width below
const SIZES = {
	twoThirds: '(min-width: 1024px) min(66vw, 960px), 100vw',
	third: '(min-width: 1024px) min(33vw, 480px), (min-width: 700px) 50vw, 100vw',
	half: '(min-width: 1024px) min(50vw, 720px), 100vw',
};

// Component
// ------------
const Why = () => (
	<Section
		id='why'
		isPinned
		title='Everything you need. Nothing you don’t.'
		intro={<p>Every production default, done once and done properly.</p>}
	>
		<Grid $isFixed>
			<ScrollReveal />
			<Tile $m='1/7' $l='1/9' image={performanceImage} imageSizes={SIZES.twoThirds} className={s.hero}>
				<p className={s.kicker}>Performance</p>
				<p className={s.stat}>
					<Odometer value='100' />
				</p>
				<h3 className={s.title}>Lighthouse. Out of the box.</h3>
				<p className={s.text}>Static by default. CI fails the build if it slips.</p>
			</Tile>

			<Tile $m='1/4' $l='9/13' image={runtimeImage} imageSizes={SIZES.third} className={s.photo}>
				<p className={s.kicker}>Styling runtime</p>
				<p className={s.stat}>
					<Odometer value='0 KB' />
				</p>
				<p className={s.text}>SCSS modules, compiled away.</p>
			</Tile>

			<Tile $m='4/7' $l='1/5'>
				<p className={s.kicker}>Grid</p>
				<p className={s.stat}>
					<Odometer value='∞' />
				</p>
				<p className={s.text}>Any column count, per breakpoint.</p>
			</Tile>

			<Tile $m='1/4' $l='5/9'>
				<p className={s.kicker}>CMS</p>
				<p className={s.stat}>
					<Odometer value='3' />
				</p>
				<p className={s.text}>DatoCMS, Sanity or none.</p>
			</Tile>

			<Tile $m='4/7' $l='9/13' image={motionImage} imageSizes={SIZES.third} className={s.photo}>
				<h3 className={s.title}>Built for motion.</h3>
				<p className={s.text}>GSAP and Lenis on one ticker.</p>
			</Tile>

			<Tile $m='1/7' $l='1/7' image={designImage} imageSizes={SIZES.half} className={s.wide}>
				<h3 className={s.title}>Day one is for design.</h3>
				<p className={s.text}>The plumbing is done. Start on page one.</p>
			</Tile>

			<Tile $m='1/7' $l='7/13' image={agentsImage} imageSizes={SIZES.half} className={s.wide}>
				<h3 className={s.title}>Ready for agents.</h3>
				<p className={s.text}>AGENTS.md and skills teach your AI the conventions.</p>
			</Tile>
		</Grid>
	</Section>
);

// Exports
// ------------
Why.displayName = 'Why';
export default Why;
