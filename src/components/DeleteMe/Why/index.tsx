// Imports
// ------------
import Grid, { Col } from '@waffl';
import Section from '../Section';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const REASONS = [
	{
		title: 'Day one is for design',
		text: 'Every agency build used to start with the same week: a grid, breakpoints, type, a CMS, cookie consent, SEO, error pages. Tackl is that week, done once and done properly.',
	},
	{
		title: 'Fast by default',
		text: 'Static CSS with no styling runtime, server components by default and Partial Prerendering. A fresh site scores 100 on Lighthouse, and CI fails the build if a real one slips below the floor.',
	},
	{
		title: 'Built for motion',
		text: 'GSAP and Lenis are wired in from the start, with page transitions on React’s own <ViewTransition>. Animation is the point of the sites we build, so it isn’t an afterthought here.',
	},
	{
		title: 'Ready for agents',
		text: 'AGENTS.md and a library of skills teach AI coding agents the conventions, so Claude, Cursor or Copilot write code that looks like yours — and the site itself passes Lighthouse’s Agentic Browsing checks.',
	},
];

// Component
// ------------
const Why = () => (
	<Section
		index='01'
		id='why'
		eyebrow='Why Tackl'
		title='Why it exists'
		intro={
			<p>
				Tackl grew out of years of building marketing sites at 12 Studio — the conventions, tooling and defaults
				we kept rebuilding, gathered into one starter kit for modern Next.js.
			</p>
		}
	>
		<Grid $isFixed className={s.list}>
			{REASONS.map(({ title, text }, index) => (
				<Col
					key={title}
					$m={index % 2 ? '4/7' : '1/4'}
					$l={`${(index % 4) * 3 + 1}/span 3`}
					className={s.reason}
				>
					<span className={s.index}>0{index + 1}</span>
					<h3 className={s.title}>{title}</h3>
					<p className={s.text}>{text}</p>
				</Col>
			))}
		</Grid>
	</Section>
);

// Exports
// ------------
Why.displayName = 'Why';
export default Why;
