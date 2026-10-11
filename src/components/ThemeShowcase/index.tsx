// Imports
// ------------
import { borderRadiusValues } from '@theme/borderRadius';
import { baseColors } from '@theme/colors';
import { easingValues } from '@theme/easing';
import { fontFamilies, fontVariables } from '@theme/fonts';
import { gapValues } from '@theme/gap';
import { spaceValues } from '@theme/space';
import { timeValues } from '@theme/time';

// Styles + Interfaces
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const SPECIMEN = 'The quick brown fox jumps over the lazy dog';

// NOTE • Type styles grouped by role, each with a note on when to reach for
// it. Names match the mixins in src/css/tackl/_type.scss — each specimen
// renders with its global .t-* class, so it always shows the real style.
const TYPE_ROLES = [
	{
		role: 'display',
		note: 'The largest and most prominent type style. Used for hero headlines, landing page banners, or key marketing moments where typography needs to make an impact. Typically reserved for one or two instances per page to avoid visual noise.',
		styles: ['displayL', 'displayS'],
	},
	{
		role: 'headline',
		note: 'Primary section titles and major UI headings. Use to break up page content and establish hierarchy. Great for page headers, feature sections, or card headers when you want clear emphasis but less dominance than Display.',
		styles: ['headlineL', 'headlineS'],
	},
	{
		role: 'title',
		note: 'Component-level titles: card titles, form section labels, modal titles, button text (when larger than body), navigation items. This is a versatile style used throughout the interface to label or name elements.',
		styles: ['titleL', 'titleS'],
	},
	{
		role: 'body',
		note: 'The main paragraph and content text style. Use for all long-form content, descriptions, and supporting copy. Small (S) is helpful for secondary or supporting text, Large (L) for primary reading text.',
		styles: ['bodyL', 'bodyS'],
	},
	{
		role: 'caption',
		note: 'The smallest text style. Use for meta information, image captions, legal disclaimers, timestamps, overlines, and other supporting microcopy. Avoid using below 12px for accessibility where possible.',
		styles: ['captionL', 'captionS'],
	},
];

// Component
// ------------
// NOTE • A live view of every theme token — it reads the token objects in
// src/theme directly, so it always shows the current theme in action.
const ThemeShowcase = () => {
	// Render
	return (
		<main className={s.jacket}>
			<section className={s.block}>
				<h2 className={s.blockTitle}>Colours</h2>
				{Object.entries(baseColors).map(([group, colours]) => (
					<div className={s.swatchGroup} key={group}>
						<h3 className={s.groupLabel}>{group}</h3>
						<div className={s.row}>
							{Object.entries(colours).map(([name, value]) => (
								<div className={s.swatchCard} key={name}>
									<div className={s.swatchChip} style={{ background: `var(--${group}-${name})` }} />
									<p className={s.tokenName}>{name}</p>
									<p className={s.tokenValue}>{value}</p>
								</div>
							))}
						</div>
					</div>
				))}
			</section>

			<section className={s.block}>
				<h2 className={s.blockTitle}>Fonts</h2>
				<div className={s.swatchGroup}>
					<h3 className={s.groupLabel}>Registered</h3>
					{Object.entries(fontVariables).map(([name, cssVariable]) => (
						<div className={s.specimenRow} key={name}>
							<p className={s.tokenValue}>
								{name} · var({cssVariable})
							</p>
							<p className={s.fontRow} style={{ fontFamily: `var(${cssVariable})` }}>
								Aa Bb Cc 0123456789 — {SPECIMEN}
							</p>
						</div>
					))}
				</div>
				<div className={s.swatchGroup}>
					<h3 className={s.groupLabel}>Roles</h3>
					{Object.entries(fontFamilies).map(([role, stack]) => (
						<div className={s.specimenRow} key={role}>
							<p className={s.tokenValue}>
								{role} · {stack}
							</p>
							<p className={s.fontRow} style={{ fontFamily: stack }}>
								Aa Bb Cc — {SPECIMEN}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className={s.block}>
				<h2 className={s.blockTitle}>Type scale</h2>
				{TYPE_ROLES.map(({ role, note, styles }) => (
					<div className={s.swatchGroup} key={role}>
						<h3 className={s.groupLabel}>{role}</h3>
						<p className={s.roleNote}>{note}</p>
						{styles.map(name => (
							<div className={s.specimenRow} key={name}>
								<p className={s.tokenValue}>
									{name} · .t-{name} · @include {name}
								</p>
								<p className={`t-${name}`}>{SPECIMEN}</p>
							</div>
						))}
					</div>
				))}
			</section>

			<section className={s.block}>
				<h2 className={s.blockTitle}>Spacing</h2>
				{Object.entries(spaceValues).map(([name, value]) => (
					<div className={s.barRow} key={name}>
						<p className={s.tokenName}>{name}</p>
						<div className={s.bar} style={{ width: value }} />
						<p className={s.tokenValue}>{value}</p>
					</div>
				))}
			</section>

			<section className={s.block}>
				<h2 className={s.blockTitle}>Gaps</h2>
				{Object.entries(gapValues).map(([name, value]) => (
					<div className={s.barRow} key={name}>
						<p className={s.tokenName}>{name}</p>
						<div className={s.bar} style={{ width: value }} />
						<p className={s.tokenValue}>{value}</p>
					</div>
				))}
			</section>

			<section className={s.block}>
				<h2 className={s.blockTitle}>Radius</h2>
				<div className={s.row}>
					{Object.entries(borderRadiusValues).map(([name, value]) => (
						<div className={s.swatchCard} key={name}>
							<div className={s.radiusBox} style={{ borderRadius: `var(--br-${name})` }} />
							<p className={s.tokenName}>{name}</p>
							<p className={s.tokenValue}>{value}</p>
						</div>
					))}
				</div>
			</section>

			<section className={s.block}>
				<h2 className={s.blockTitle}>Motion</h2>
				<div className={s.swatchGroup}>
					<h3 className={s.groupLabel}>Timing — hover to play (with bezzy)</h3>
					<div className={s.row}>
						{Object.entries(timeValues).map(([name, value]) => (
							<div className={s.motionChip} key={name}>
								<span
									style={{
										transitionDuration: value,
										transitionTimingFunction: 'var(--easing-bezzy)',
									}}
								/>
								<p className={s.tokenName}>{name}</p>
								<p className={s.tokenValue}>{value}</p>
							</div>
						))}
					</div>
				</div>
				<div className={s.swatchGroup}>
					<h3 className={s.groupLabel}>Easing — hover to play (at --time-m)</h3>
					<div className={s.row}>
						{Object.entries(easingValues).map(([name, value]) => (
							<div className={s.motionChip} key={name}>
								<span
									style={{
										transitionDuration: 'var(--time-m)' as string,
										transitionTimingFunction: value,
									}}
								/>
								<p className={s.tokenName}>{name}</p>
								<p className={s.tokenValue}>{value}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

// Exports
// ------------
ThemeShowcase.displayName = 'ThemeShowcase';
export default ThemeShowcase;
