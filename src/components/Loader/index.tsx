'use client';

// Imports
// ------------
import Logo from '@parts/Logo';
import gsap from 'gsap';
import { use, useEffect, useRef } from 'react';
import { GlobalContext } from '@parts/Contexts';
import { useAnimation } from '@utils/useAnimation';

// Styles + Interfaces
// ------------
// import type * as I from './interface';
import * as S from './styles';

// Constants
// ------------
const PULSE_SETTINGS = {
	STAGGER: 0.15,
	EASE: 'sine.inOut',
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

// Component
// ------------
const Loader = () => {
	// Contexts
	const { isLoaderFinished, setIsLoaderFinished, pageLoaded } = use(GlobalContext);

	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const logoRef = useRef<SVGSVGElement>(null);
	const pulseTimelineRef = useRef<gsap.core.Timeline | null>(null);

	// Intro Animation — create once
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

			pulseTimelineRef.current = tl;
		},
		{ scope: jacketRef }
	);

	// Stop pulse after minimum 3 iterations when page is loaded
	useEffect(() => {
		if (!pageLoaded || !pulseTimelineRef.current) return;

		const tl = pulseTimelineRef.current;
		const currentIteration = tl.iteration();
		const remaining = Math.max(3 - currentIteration, 0);

		tl.repeat(remaining);
		tl.eventCallback('onComplete', () => setIsLoaderFinished(true));
	}, [pageLoaded, setIsLoaderFinished]);

	// Outro Animation
	useAnimation(
		() => {
			if (isLoaderFinished && logoRef.current) {
				gsap.to(jacketRef.current, {
					autoAlpha: 0,
					duration: 0.5,
					ease: 'power2.inOut',
				});
			}
		},
		{
			scope: jacketRef,
			dependencies: [isLoaderFinished],
		}
	);
	return (
		<S.Jacket ref={jacketRef}>
			<Logo ref={logoRef} />
		</S.Jacket>
	);
};

// Exports
// ------------
Loader.displayName = 'Loader';
export default Loader;
