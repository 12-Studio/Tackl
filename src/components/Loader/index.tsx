'use client';

// Imports
// ------------
import Logo from '@parts/Logo';
import gsap from 'gsap';
import Frame from '@parts/Frame';
import { use, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GlobalContext } from '@parts/Contexts';
import { useAnimation } from '@utils/useAnimation';
import { bezzy2, bezzy4, slow } from '@parts/AnimationPlugins/Curves';

// Styles + Interfaces
// ------------
import * as S from './styles';

// Constants
// ------------
const PULSE_SETTINGS = {
	STAGGER: 0.15,
	EASE: bezzy4,
	BEFORE: {
		SCALE: 0.75,
		OPACITY: 0,
		DURATION: 0.5,
	},
	AFTER: {
		SCALE: 1,
		OPACITY: 1,
		DURATION: 0.75,
	},
};

const LINE_SETTINGS = {
	DURATION: 2,
	DELAY: 1,
	EASE: bezzy2,
	BEFORE: {
		SCALE: 0,
	},
	AFTER: {
		SCALE: 1,
	},
};

// Component
// ------------
const Loader = () => {
	// Contexts
	const { isLoaderFinished, setIsLoaderFinished, pageLoaded, areModalsReady, isFontsLoaded } =
		use(GlobalContext);

	const allModalsReady =
		areModalsReady.activation &&
		areModalsReady.dataSupply &&
		areModalsReady.about &&
		areModalsReady.contact;

	// States
	const [shouldRender, setShouldRender] = useState(true);

	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const logoRef = useRef<SVGSVGElement>(null);
	const pulseRef = useRef<gsap.core.Timeline | null>(null);
	const topLineRef = useRef<HTMLDivElement>(null);
	const bottomLineRef = useRef<HTMLDivElement>(null);
	const leftVerticalRef = useRef<HTMLDivElement>(null);
	const rightVerticalRef = useRef<HTMLDivElement>(null);
	const topFirstPlusRef = useRef<HTMLSpanElement>(null);
	const topLastPlusRef = useRef<HTMLSpanElement>(null);
	const bottomFirstPlusRef = useRef<HTMLSpanElement>(null);
	const bottomLastPlusRef = useRef<HTMLSpanElement>(null);
	const frameRef = useRef<gsap.core.Timeline | null>(null);

	// Set logo initial state before paint to prevent flash/pop (useAnimation runs after paint)
	useLayoutEffect(() => {
		if (!logoRef.current) return;
		const paths = logoRef.current.querySelectorAll('path');
		gsap.set(paths, {
			autoAlpha: PULSE_SETTINGS.BEFORE.OPACITY,
			scale: PULSE_SETTINGS.BEFORE.SCALE,
			transformOrigin: 'center center',
		});
	}, []);

	// Pulse Animation
	useAnimation(
		() => {
			if (!logoRef.current) return;

			const paths = logoRef.current.querySelectorAll('path');

			gsap.set(paths, {
				autoAlpha: PULSE_SETTINGS.BEFORE.OPACITY,
				scale: PULSE_SETTINGS.BEFORE.SCALE,
				transformOrigin: 'center center',
			});

			const tl = gsap.timeline({ repeat: -1 });

			tl.to(paths, {
				autoAlpha: PULSE_SETTINGS.AFTER.OPACITY,
				scale: PULSE_SETTINGS.AFTER.SCALE,
				duration: PULSE_SETTINGS.AFTER.DURATION,
				stagger: PULSE_SETTINGS.STAGGER,
				ease: PULSE_SETTINGS.EASE,
			});

			tl.to(
				paths,
				{
					autoAlpha: PULSE_SETTINGS.BEFORE.OPACITY,
					scale: PULSE_SETTINGS.BEFORE.SCALE,
					duration: PULSE_SETTINGS.BEFORE.DURATION,
					stagger: PULSE_SETTINGS.STAGGER,
					ease: PULSE_SETTINGS.EASE,
				},
				'>-0.5'
			);

			pulseRef.current = tl;
		},
		{ scope: jacketRef }
	);

	// Frame Animation
	useAnimation(
		() => {
			const horizontalLines = [topLineRef.current, bottomLineRef.current];
			const verticalLines = [leftVerticalRef.current, rightVerticalRef.current];
			const pluses = [
				topFirstPlusRef.current,
				topLastPlusRef.current,
				bottomFirstPlusRef.current,
				bottomLastPlusRef.current,
			];

			if (
				horizontalLines.some(el => !el) ||
				verticalLines.some(el => !el) ||
				pluses.some(el => !el)
			)
				return;

			gsap.set(horizontalLines, { scaleX: LINE_SETTINGS.BEFORE.SCALE });
			gsap.set(verticalLines, { scaleY: LINE_SETTINGS.BEFORE.SCALE });
			gsap.set(pluses, { autoAlpha: 0 });

			if (!pageLoaded || !isFontsLoaded || !allModalsReady) return;

			const tl = gsap.timeline({ delay: LINE_SETTINGS.DELAY });

			tl.to(horizontalLines, {
				scaleX: LINE_SETTINGS.AFTER.SCALE,
				duration: LINE_SETTINGS.DURATION,
				ease: LINE_SETTINGS.EASE,
			});

			tl.to(
				verticalLines,
				{
					scaleY: LINE_SETTINGS.AFTER.SCALE,
					duration: LINE_SETTINGS.DURATION,
					ease: LINE_SETTINGS.EASE,
				},
				'<'
			);

			tl.fromTo(
				pluses,
				{ autoAlpha: 0 },
				{
					autoAlpha: 1,
					duration: 0.5,
					ease: LINE_SETTINGS.EASE,
				},
				'>-0.3'
			);

			frameRef.current = tl;
		},
		{ scope: jacketRef, dependencies: [pageLoaded, isFontsLoaded, allModalsReady] }
	);

	// Kill GSAP timelines on unmount to prevent memory leaks
	useEffect(
		() => () => {
			pulseRef.current?.kill();
			frameRef.current?.kill();
		},
		[]
	);

	// Stop pulse after minimum 3 iterations when page, fonts, and modals are ready
	useEffect(() => {
		if (!pageLoaded || !isFontsLoaded || !allModalsReady || !pulseRef.current) return;

		const tl = pulseRef.current;
		const currentIteration = tl.iteration();
		const remaining = Math.max(2 - currentIteration, 0);

		tl.repeat(remaining);
		tl.eventCallback('onComplete', () => setIsLoaderFinished(true));
	}, [pageLoaded, isFontsLoaded, allModalsReady, setIsLoaderFinished]);

	// Outro Animation — run immediately when loader is ready (don't wait for frame)
	useAnimation(
		() => {
			if (!isLoaderFinished || !jacketRef.current) return;

			gsap.to(jacketRef.current, {
				autoAlpha: 0,
				duration: 1,
				ease: 'sine.inOut',
				onComplete: () => setShouldRender(false),
			});
		},
		{
			scope: jacketRef,
			dependencies: [isLoaderFinished],
		}
	);

	if (!shouldRender) return null;

	return (
		<S.Jacket ref={jacketRef}>
			<S.Frame>
				<Frame
					isLight
					className='top'
					lineRef={topLineRef}
					firstPlusRef={topFirstPlusRef}
					lastPlusRef={topLastPlusRef}
				/>
				<Frame
					isLight
					className='bottom'
					lineRef={bottomLineRef}
					firstPlusRef={bottomFirstPlusRef}
					lastPlusRef={bottomLastPlusRef}
				/>
				<S.Vertical $isLeft ref={leftVerticalRef} />
				<S.Vertical ref={rightVerticalRef} />
			</S.Frame>

			<Logo ref={logoRef} />
		</S.Jacket>
	);
};

// Exports
// ------------
Loader.displayName = 'Loader';
export default Loader;
