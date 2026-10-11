// Imports
// ------------
import Grid from '@waffl';
import ConsentDemo from '../ConsentDemo';
import Section from '../Section';
import Tile from '../Tile';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const FEATURES = [
	{
		title: 'Page transitions',
		text: "React's built-in <ViewTransition>: pages crossfade, and links slide forwards or back with transitionTypes. No custom router.",
		where: '@parts/PageTransition',
	},
	{
		title: 'Cookie consent',
		text: 'A real consent manager — Accept All, Accept Necessary or per category. ConsentGate loads scripts only once they’re allowed.',
		where: '@parts/CookieBar',
	},
	{
		title: 'CMS, your choice',
		text: 'DatoCMS, Sanity with an embedded Studio, or none. One fetchContent seam that never throws, plus draft-mode preview.',
		where: '@cms',
	},
	{
		title: 'Motion, wired in',
		text: 'GSAP and Lenis share one ticker. useAnimation cleans up after itself, and reduced-motion users skip smooth scrolling entirely.',
		where: '@utils/useAnimation',
	},
	{
		title: 'Security headers',
		text: 'A Content-Security-Policy, HSTS and friends on every route — tuned so pages stay statically rendered.',
		where: 'next.config.js',
	},
	{
		title: 'SEO and sharing',
		text: 'Metadata, a sitemap, robots that block preview deploys, a generated share image for every page, and an llms.txt.',
		where: 'app/',
	},
	{
		title: 'A Lighthouse gate',
		text: 'CI audits every PR: Performance 80+, Best Practices 90+, SEO 100 and every Agentic Browsing check, or the build fails.',
		where: 'lighthouserc.js',
	},
	{
		title: '404s and errors',
		text: 'Styled not-found and error pages for every case — a missing page, an unmatched URL, or a crash in the layout itself.',
		where: '@parts/StatusPage',
	},
	{
		title: 'Analytics, consent-first',
		text: 'Set NEXT_PUBLIC_GA_ID and GA4 loads only after consent. Unset, it costs nothing.',
		where: '@parts/Analytics',
	},
	{
		title: 'Agent-ready',
		text: 'AGENTS.md and a library of skills teach Claude, Cursor and Copilot the kit’s conventions before they write a line.',
		where: 'AGENTS.md · skills/',
	},
	{
		title: 'Quality checks',
		text: 'Strict TypeScript 7, Biome and Stylelint (which catches token typos), Playwright specs and a pre-commit hook.',
		where: 'bun run lint · test',
	},
	{
		title: 'Grid overlay',
		text: 'Press Ctrl + G in development to lay the grid over any page — the overlay never ships to production.',
		where: '@parts/GridExposer',
	},
];

// Component
// ------------
const Features = () => (
	<Section
		id='features'
		eyebrow='Batteries included'
		title='Batteries included.'
		intro={
			<p>
				The unglamorous parts every production site needs, done properly and documented, so you don't rebuild
				them per project.
			</p>
		}
	>
		<Grid $isFixed className={s.list}>
			{FEATURES.map(({ title, text, where }) => (
				<Tile key={title} $m='span 3' $l='span 4'>
					<h3 className={s.title}>{title}</h3>
					<p className={s.text}>{text}</p>
					<code className={s.where}>{where}</code>
				</Tile>
			))}
		</Grid>

		<Grid $isFixed className={s.demo}>
			<Tile tone='glow' className={s.demoTile}>
				<div className={s.demoCopy}>
					<h3 className={s.demoTitle}>Try the consent manager.</h3>
					<p>
						This is the real cookie banner. Open the settings, change your choice, and watch the state and
						the gated box update — no reload.
					</p>
				</div>
				<ConsentDemo />
			</Tile>
		</Grid>
	</Section>
);

// Exports
// ------------
Features.displayName = 'Features';
export default Features;
