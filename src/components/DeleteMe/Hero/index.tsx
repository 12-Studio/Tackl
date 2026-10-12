'use client';

// Imports
// ------------
import { useAnimation } from '@utils/useAnimation';
import Grid, { Col } from '@waffl';
import gsap from 'gsap';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import HeroBackdrop from '../HeroBackdrop';
import { HERO_ZOOM_END, heroScroll } from '../HeroField/store';
import HeroTweaks from '../HeroTweaks';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const REPO_URL = 'https://github.com/12-Studio/Tackl';

// NOTE • The scroll is two viewports long: the first zooms the headline
// through the counter of its "c", the second brings the page up over the
// hero while the WebGL torch rises out. Durations below are fractions of it.
const SCROLL_VIEWPORTS = 2;
const ZOOM_END = HERO_ZOOM_END;
const ZOOM_SCALE = 60;

// NOTE • The first section's headline fades in and grows from
// HEADLINE_SCALE, starting HEADLINE_LEAD before the zoom ends (as the "c"
// leaves) and taking HEADLINE_REVEAL of the scroll. It's pinned centre
// screen from the zoom's end, and its stage holds it until the fade is done:
// (0.18 - 0.05) of two viewports = 26svh, --stage-scroll in
// PinnedStage/styles.module.scss — keep the two in step.
const HEADLINE_LEAD = 0.05;
const HEADLINE_REVEAL = 0.18;
const HEADLINE_SCALE = 0.5;

const TITLE = 'Tackl';

// NOTE • The letter to fly through, and how far across its box the empty
// counter sits (a "c" opens to the right, so a touch past centre)
const COUNTER_LETTER = 'c';
const COUNTER_X = 0.56;

// NOTE • Letters sit at different depths, by how far they are from the
// counter: everything comes towards you, but the outer letters faster —
// "a" and "k" outpace the "c", "T" and "l" more so — while the "c" keeps
// its pace so the camera still flies through its counter. Each reaches
// ZOOM_SCALE ** depth, and finishes LEAD sooner per step out.
const DEPTHS = [1, 1.18, 1.36];
const LEAD = 0.06;

// Helpers
// ------------
// NOTE • The centre of the counter letter's counter, relative to the
// title's box: x from the glyph's box, y half an x-height above the
// baseline (the glyph's box is the font's full ascent/descent, not the
// letter's)
const findCounter = (title: HTMLElement, letter: HTMLElement) => {
	const text = letter.firstChild;
	const context = document.createElement('canvas').getContext('2d');
	if (!(text instanceof Text) || !context) return null;

	const range = document.createRange();
	range.selectNodeContents(text);
	const glyph = range.getBoundingClientRect();
	const box = title.getBoundingClientRect();

	const style = getComputedStyle(title);
	context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
	const metrics = context.measureText(COUNTER_LETTER);
	const baseline = glyph.top + metrics.fontBoundingBoxAscent;

	return {
		x: glyph.left - box.left + glyph.width * COUNTER_X,
		y: baseline - metrics.actualBoundingBoxAscent / 2 - box.top,
	};
};

// NOTE • Splitting the word into separate letters loses the font's
// kerning (the "a" tucked under the "T"), so each pair's kerning is measured
// with a canvas — the pair's width less each letter's — and put back as a
// margin on the second letter
const kern = (title: HTMLElement, letters: HTMLElement[]) => {
	const context = document.createElement('canvas').getContext('2d');
	if (!context) return;
	const style = getComputedStyle(title);
	context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
	const width = (text: string) => context.measureText(text).width;

	letters.forEach((letter, index) => {
		const previous = letters[index - 1]?.textContent ?? '';
		const current = letter.textContent ?? '';
		const pair = previous ? width(previous + current) - width(previous) - width(current) : 0;
		letter.style.marginLeft = `calc(var(--paint-x) * -1 + ${pair}px)`;
	});
};

// Component
// ------------
// NOTE • The hero stays pinned (position: sticky) behind the whole page.
// Scrolling first flies through the "c" of the headline — every letter
// zooms in on the c's counter, each at its own depth, until the counter
// fills the screen — then the
// (transparent) page rises over the hero while the WebGL torch lifts out,
// so the field carries on as the page's backdrop.
const Hero = () => {
	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);

	// Animations
	useAnimation(
		() => {
			const jacket = jacketRef.current;
			const inner = innerRef.current;
			const title = titleRef.current;
			// NOTE • Timed on the content that covers the hero, not the hero
			// itself — a stuck element can't be measured mid-scroll
			const cover = jacket?.nextElementSibling;
			if (!jacket || !inner || !title || !cover) return;

			const others = [...inner.children].filter(child => child !== title);
			const headline = cover.querySelector<HTMLElement>('[data-section-header]');
			const letters = [...title.querySelectorAll<HTMLElement>('[data-letter]')];
			const counterIndex = TITLE.indexOf(COUNTER_LETTER);
			const counterLetter = letters[counterIndex];
			if (!counterLetter) return;
			// NOTE • Nearer letters paint in front — the outer ones, furthest
			// from the "c", are nearest the camera
			letters.forEach((letter, index) => {
				gsap.set(letter, { position: 'relative', zIndex: Math.abs(index - counterIndex) });
			});
			const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			// NOTE • Paused, and driven by hand from the scroll below
			const timeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
			if (isReducedMotion) {
				timeline.to(inner, { autoAlpha: 0, duration: ZOOM_END });
			} else {
				timeline
					// The rest of the hero fades out in place
					.to(others, { autoAlpha: 0, duration: 0.12 }, 0)
					// No fades — every letter stays solid, and all of them vanish at
					// once as the c's counter fills the screen
					.set(letters, { autoAlpha: 0 }, ZOOM_END);

				// Accelerating, like flying in — each letter at its own depth
				letters.forEach((letter, index) => {
					const steps = Math.min(Math.abs(index - counterIndex), DEPTHS.length - 1);
					timeline.to(
						letter,
						{ scale: ZOOM_SCALE ** DEPTHS[steps], ease: 'power4.in', duration: ZOOM_END - steps * LEAD },
						0
					);
				});
			}
			// NOTE • Then the next section's headline fades in and grows, pinned
			// centre screen
			if (headline) {
				timeline.fromTo(
					headline,
					{ autoAlpha: 0, scale: isReducedMotion ? 1 : HEADLINE_SCALE },
					{ autoAlpha: 1, scale: 1, ease: 'power2.out', duration: HEADLINE_REVEAL },
					ZOOM_END - HEADLINE_LEAD
				);
			}
			timeline.set({}, {}, 1);

			// NOTE • Each letter's left and right edges at rest, as offsets from
			// the counter — the point every letter scales about
			let edges: { left: number; right: number }[] = [];

			// NOTE • Tracking opens up only where the zoom would make letters touch:
			// working outward from the "c", each letter is pushed just far enough
			// to keep its resting gap from its inner neighbour, scaled with that
			// neighbour. At rest that's no push at all.
			const track = () => {
				if (isReducedMotion || !edges.length) return;
				const scaleOf = (index: number) => Number(gsap.getProperty(letters[index], 'scaleX'));

				for (const side of [1, -1]) {
					let previous = counterIndex;
					let previousShift = 0;
					for (let index = counterIndex + side; index >= 0 && index < letters.length; index += side) {
						const scale = scaleOf(index);
						const previousScale = scaleOf(previous);
						const [inner, outer] = side > 0 ? (['left', 'right'] as const) : (['right', 'left'] as const);
						const previousOuter = edges[previous][outer] * previousScale + previousShift;
						const gap = (edges[index][inner] - edges[previous][outer]) * previousScale;
						const needed = previousOuter + gap - edges[index][inner] * scale;
						const shift = side > 0 ? Math.max(0, needed) : Math.min(0, needed);
						gsap.set(letters[index], { x: shift });
						previous = index;
						previousShift = shift;
					}
				}
			};

			// NOTE • Every letter zooms about the same point — the counter — so
			// each gets that point as its own transform origin. Measured unscaled
			// and untracked: rewind, measure, then return — again whenever the
			// title's size changes (resize, the web font arriving)
			const placeOrigin = () => {
				const progress = timeline.progress();
				timeline.progress(0);
				gsap.set(letters, { x: 0 });
				kern(title, letters);
				const counter = findCounter(title, counterLetter);
				const box = title.getBoundingClientRect();
				if (counter) {
					edges = letters.map(letter => {
						const { left, right, top } = letter.getBoundingClientRect();
						const x = counter.x - (left - box.left);
						const y = counter.y - (top - box.top);
						gsap.set(letter, { transformOrigin: `${x}px ${y}px` });
						return { left: -x, right: right - left - x };
					});
				}
				timeline.progress(progress);
				track();
			};
			const resizeObserver = new ResizeObserver(placeOrigin);
			resizeObserver.observe(title);
			document.fonts.ready.then(placeOrigin);

			// NOTE • Progress is read straight from where the cover sits in the
			// viewport (0 at the start, 1 once it reaches the top) rather than a
			// ScrollTrigger — that works with Lenis's scroller or the window
			// alike, without depending on which one is registered when this runs
			let last = -1;
			const update = () => {
				const distance = SCROLL_VIEWPORTS * window.innerHeight;
				// NOTE • The cover rests one viewport down (right after the hero's
				// screen), so this runs 0 → 1 over the first two viewports of scroll
				const scrolled = window.innerHeight - cover.getBoundingClientRect().top;
				const progress = gsap.utils.clamp(0, 1, scrolled / distance);
				if (progress === last) return;
				last = progress;
				timeline.progress(progress);
				track();
				heroScroll.set(progress);
			};
			gsap.ticker.add(update);
			update();

			// NOTE • Neither is a tween, so the context can't revert them
			return () => {
				gsap.ticker.remove(update);
				resizeObserver.disconnect();
			};
		},
		{ scope: jacketRef }
	);

	// Render
	return (
		<header ref={jacketRef} className={s.jacket}>
			<HeroBackdrop />
			<HeroTweaks />

			<Grid $isFixed className={s.content}>
				<Col $m='2/6' $l='3/11'>
					<div ref={innerRef} className={s.inner}>
						<p className={s.eyebrow}>Introducing</p>
						<h1 ref={titleRef} className={s.title} aria-label={TITLE}>
							{[...TITLE].map((letter, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: letters are positional
								<span key={index} className={s.letter} data-letter aria-hidden='true'>
									{letter}
								</span>
							))}
						</h1>
						<p className={s.tagline}>The Next.js starter kit. Built for motion. Fast by default.</p>

						<div className={s.actions}>
							<CopyButton text='bunx tackl' />
							<a className={s.link} href={REPO_URL}>
								View on GitHub
							</a>
						</div>
					</div>
				</Col>
			</Grid>
		</header>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
