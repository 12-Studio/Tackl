// Imports
// ------------
import Grid from '@waffl';
import Section from '../Section';
import Tile from '../Tile';

// Styles
// ------------
import s from './styles.module.scss';

// Component
// ------------
const Why = () => (
	<Section
		id='why'
		eyebrow='Why Tackl'
		title='Everything you need. Nothing you don’t.'
		intro={
			<p>
				Years of building marketing sites at 12 Studio, distilled into one starter kit. The grid, the type, the
				motion, the CMS and every production default — done once, done properly.
			</p>
		}
	>
		<Grid $isFixed>
			<Tile $m='1/7' $l='1/9' tone='glow' className={s.hero}>
				<p className={s.kicker}>Performance</p>
				<p className={s.stat}>100</p>
				<h3 className={s.title}>Lighthouse. Out of the box.</h3>
				<p className={s.text}>
					Static CSS, Server Components and Partial Prerendering. And CI fails the build if a real site slips
					below the floor.
				</p>
			</Tile>

			<Tile $m='1/4' $l='9/13'>
				<p className={s.kicker}>Styling runtime</p>
				<p className={s.stat}>0 KB</p>
				<p className={s.text}>SCSS modules, compiled at build time. No CSS-in-JS in the browser.</p>
			</Tile>

			<Tile $m='4/7' $l='1/5'>
				<p className={s.kicker}>Grid</p>
				<p className={s.stat}>∞</p>
				<p className={s.text}>Columns, on CSS grid — any count per breakpoint. 2, 6 and 12 out of the box.</p>
			</Tile>

			<Tile $m='1/4' $l='5/9'>
				<p className={s.kicker}>CMS</p>
				<p className={s.stat}>3</p>
				<p className={s.text}>DatoCMS, Sanity with an embedded Studio, or none — picked at scaffold.</p>
			</Tile>

			<Tile $m='4/7' $l='9/13'>
				<h3 className={s.title}>Built for motion.</h3>
				<p className={s.text}>
					GSAP and Lenis on one shared ticker, and page transitions on React’s own &lt;ViewTransition&gt;.
				</p>
			</Tile>

			<Tile $m='1/7' $l='1/7'>
				<h3 className={s.title}>Day one is for design.</h3>
				<p className={s.text}>
					A grid, breakpoints, type, cookie consent, SEO and error pages are already here. You start on the
					first page, not the plumbing.
				</p>
			</Tile>

			<Tile $m='1/7' $l='7/13'>
				<h3 className={s.title}>Ready for agents.</h3>
				<p className={s.text}>
					AGENTS.md and a library of skills teach Claude, Cursor and Copilot the conventions — and the site
					passes Lighthouse’s Agentic Browsing checks.
				</p>
			</Tile>
		</Grid>
	</Section>
);

// Exports
// ------------
Why.displayName = 'Why';
export default Why;
