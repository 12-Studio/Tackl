'use client';

// Imports
// ------------
import { useAnimation } from '@utils/useAnimation';
import Grid, { Col } from '@waffl';
import gsap from 'gsap';
import { useRef } from 'react';
import CopyButton from '../CopyButton';
import HeroBackdrop from '../HeroBackdrop';
import { heroScroll } from '../HeroField/store';
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
const ZOOM_END = 0.5;
const ZOOM_SCALE = 60;

// NOTE • The letter to fly through, and how far across its box the empty
// counter sits (a "c" opens to the right, so a touch past centre)
const COUNTER_LETTER = 'c';
const COUNTER_X = 0.56;

// Helpers
// ------------
// NOTE • The centre of the letter's counter, relative to the title's box:
// x from the glyph's box, y half an x-height above the baseline (the
// glyph's box is the font's full ascent/descent, not the letter's)
const findCounter = (title: HTMLElement) => {
	const text = title.firstChild;
	const index = text instanceof Text ? text.data.indexOf(COUNTER_LETTER) : -1;
	const context = document.createElement('canvas').getContext('2d');
	if (!(text instanceof Text) || index < 0 || !context) return null;

	const range = document.createRange();
	range.setStart(text, index);
	range.setEnd(text, index + 1);
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

// Component
// ------------
// NOTE • The hero stays pinned (position: sticky) behind the whole page.
// Scrolling first flies through the "c" of the headline — it zooms in on
// the letter's counter until the counter fills the screen — then the
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
			const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			// NOTE • Paused, and driven by hand from the scroll below
			const timeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
			if (isReducedMotion) {
				timeline.to(inner, { autoAlpha: 0, duration: ZOOM_END });
			} else {
				timeline
					// The rest of the hero fades out in place
					.to(others, { autoAlpha: 0, duration: 0.12 }, 0)
					// Accelerating, like flying in; gone once the counter fills the screen
					.to(title, { scale: ZOOM_SCALE, ease: 'power4.in', duration: ZOOM_END }, 0)
					.to(title, { autoAlpha: 0, duration: 0.04 }, ZOOM_END - 0.04);
			}
			timeline.set({}, {}, 1);

			// NOTE • The zoom origin must be measured unscaled, so rewind, measure,
			// then return — again whenever the title's size changes (resize, the
			// web font arriving)
			const placeOrigin = () => {
				const progress = timeline.progress();
				timeline.progress(0);
				const counter = findCounter(title);
				if (counter) gsap.set(title, { transformOrigin: `${counter.x}px ${counter.y}px` });
				timeline.progress(progress);
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
				const progress = gsap.utils.clamp(0, 1, 1 - cover.getBoundingClientRect().top / distance);
				if (progress === last) return;
				last = progress;
				timeline.progress(progress);
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
						<h1 ref={titleRef} className={s.title}>
							Tackl
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
