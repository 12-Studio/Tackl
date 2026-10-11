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
// NOTE • Grouped by the job they do, one tile per group
const GROUPS = [
	{
		title: 'For launch',
		features: [
			{
				title: 'Page transitions',
				text: "Built on React's <ViewTransition>. No custom router.",
				where: '@parts/PageTransition',
			},
			{
				title: 'Motion, wired in',
				text: 'GSAP and Lenis on one ticker, cleaned up for you.',
				where: '@utils/useAnimation',
			},
			{
				title: 'CMS, your choice',
				text: 'DatoCMS, Sanity or none, behind one fetch.',
				where: '@cms',
			},
			{
				title: 'SEO and sharing',
				text: 'Metadata, sitemap, share images and llms.txt.',
				where: 'app/',
			},
			{
				title: '404s and errors',
				text: 'Styled pages for every kind of failure.',
				where: '@parts/StatusPage',
			},
		],
	},
	{
		title: 'Privacy and security',
		features: [
			{
				title: 'Cookie consent',
				text: 'A real consent manager that gates scripts.',
				where: '@parts/CookieBar',
			},
			{
				title: 'Analytics, consent-first',
				text: 'GA4 loads only after consent.',
				where: '@parts/Analytics',
			},
			{
				title: 'Security headers',
				text: 'CSP and HSTS, without losing static pages.',
				where: 'next.config.js',
			},
		],
	},
	{
		title: 'Code quality',
		features: [
			{
				title: 'A Lighthouse gate',
				text: 'CI fails the build if scores drop.',
				where: 'lighthouserc.js',
			},
			{
				title: 'Quality checks',
				text: 'TypeScript 7, Biome, Stylelint and Playwright.',
				where: 'bun run lint · test',
			},
			{
				title: 'Agent-ready',
				text: 'AGENTS.md and skills for Claude, Cursor and Copilot.',
				where: 'AGENTS.md · skills/',
			},
			{
				title: 'Grid overlay',
				text: 'Ctrl + G shows the grid in development.',
				where: '@parts/GridExposer',
			},
		],
	},
];

// Component
// ------------
const Features = () => (
	<Section id='features' title='Batteries included.' intro={<p>The unglamorous parts, done properly.</p>}>
		<Grid $isFixed>
			{GROUPS.map(({ title, features }) => (
				<Tile key={title} $m='1/7' $l='span 4' className={s.group}>
					<h3 className={s.groupTitle}>{title}</h3>
					<ul className={s.list}>
						{features.map(feature => (
							<li key={feature.title} className={s.item}>
								<h4 className={s.title}>{feature.title}</h4>
								<p className={s.text}>{feature.text}</p>
								<code className={s.where}>{feature.where}</code>
							</li>
						))}
					</ul>
				</Tile>
			))}
		</Grid>

		<Grid $isFixed className={s.demo}>
			<Tile tone='glow' className={s.demoTile}>
				<div className={s.demoCopy}>
					<h3 className={s.demoTitle}>Try the consent manager.</h3>
					<p>Change your choice and watch the gate update.</p>
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
