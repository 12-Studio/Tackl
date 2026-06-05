'use client';

// Imports
// ------------
import { GlobalContext } from '@parts/Contexts';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';
import { use, useEffect } from 'react';

// Styles + Interfaces
// ------------
import 'lenis/dist/lenis.css';
import type * as I from './interface';

// GSAP Register
gsap.registerPlugin(ScrollTrigger);

/**
 * Wires Lenis + GSAP after the Lenis instance exists (created in ReactLenis useEffect).
 * Rendered after page children so its useEffect runs after deeper useGSAP hooks schedule work.
 */
const LenisGsapBridge = () => {
	const lenis = useLenis();

	useEffect(() => {
		if (!lenis) return;

		const wrapper = lenis.rootElement;

		ScrollTrigger.scrollerProxy(wrapper, {
			scrollTop(value?: number) {
				if (value !== undefined) {
					lenis.scrollTo(value, { immediate: true });
				}
				return lenis.scroll;
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: wrapper.clientWidth,
					height: wrapper.clientHeight,
				};
			},
			pinType: 'transform',
		});

		ScrollTrigger.defaults({ scroller: wrapper });
		lenis.on('scroll', ScrollTrigger.update);

		const update = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(update);
		ScrollTrigger.refresh();

		return () => {
			lenis.off('scroll', ScrollTrigger.update);
			gsap.ticker.remove(update);
			ScrollTrigger.defaults({ scroller: window });
			ScrollTrigger.scrollerProxy(wrapper, {});
		};
	}, [lenis]);

	return null;
};

// Component
// ------------
const SmoothScroll = ({ children }: I.SmoothScrollProps) => {
	const { lenisRef } = use(GlobalContext);

	return (
		<ReactLenis ref={lenisRef} options={{ autoRaf: false }}>
			{children}
			<LenisGsapBridge />
		</ReactLenis>
	);
};

// Export
// ------------
SmoothScroll.displayName = 'SmoothScroll';
export default SmoothScroll;
