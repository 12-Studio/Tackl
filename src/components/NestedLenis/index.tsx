'use client';

// Imports
// ------------
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useLayoutEffect, useEffect, createContext, useState } from 'react';

// Styles
// ------------
import type * as I from './interface';
import 'lenis/dist/lenis.css';
import * as S from './styles';

// Scroll Context
// ------------
export const NestedLenisContext = createContext({
	lenisInstance: { current: null } as React.RefObject<Lenis | null>,
	scrollWrapper: { current: null } as React.RefObject<HTMLDivElement | null>,
	scrollContent: { current: null } as React.RefObject<HTMLDivElement | null>,
	lenisReady: false,
});

// Component
// ------------
const NestedLenis = ({ children, isOpen }: I.NestedLenisProps) => {
	// Refs
	const scrollWrapper = useRef<HTMLDivElement>(null);
	const scrollContent = useRef<HTMLDivElement>(null);
	const lenisInstance = useRef<Lenis>(null);

	// States
	const [lenisReady, setLenisReady] = useState(false);

	// Setup
	useLayoutEffect(() => {
		// Create Shortcuts
		const wrapper = scrollWrapper.current;
		const content = scrollContent.current;

		// Check if the wrapper and content are defined
		if (!wrapper || !content) return;

		// 1) Create Lenis instance for the modal container
		// eventsTarget: wrapper so touch/wheel on the modal are captured here (not the main window) — critical for iOS
		// syncTouch: true so Lenis handles touch scroll on mobile (required for iOS Safari)
		const lenis = new Lenis({
			wrapper,
			content,
			allowNestedScroll: true,
		});

		// Set the lenis instance in state for use in the context
		lenisInstance.current = lenis;

		// 2) Tell ScrollTrigger this modal wrapper is the scroller
		// Important: scrollerProxy wants a "scrollTop" getter/setter that mirrors the scroller
		ScrollTrigger.scrollerProxy(wrapper, {
			scrollTop(value) {
				// setter: ScrollTrigger wants to set scrollTop (for snapping, etc.)
				if (arguments.length) {
					lenis.scrollTo(value as number, { immediate: true });
				} else {
					// getter: ScrollTrigger wants current scrollTop
					// Lenis versions vary, this is the most compatible pattern:
					return lenis.scroll;
				}
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: wrapper.clientWidth,
					height: wrapper.clientHeight,
				};
			},

			// Lenis generally plays nicest with transform pinning
			pinType: 'transform',
		});

		// 3) Keep ScrollTrigger in sync with Lenis
		lenis.on('scroll', ScrollTrigger.update);

		// Create a variable to store the RAF ID
		let rafId: number;

		const raf = (time: number) => {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		};

		rafId = requestAnimationFrame(raf);

		// 5) Important: refresh after proxy is set
		ScrollTrigger.refresh();

		// 6) Set lenis ready
		setLenisReady(true);

		// Cleanup
		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			lenis.off('scroll', ScrollTrigger.update);
			ScrollTrigger.scrollerProxy(wrapper, {});
			lenis.destroy();
		};
	}, []);

	// When modal closes, reset scroll to top so it opens at top next time
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!isOpen) {
				lenisInstance.current?.scrollTo(0, {});
			}
		}, 1100);

		return () => clearTimeout(timeout);
	}, [isOpen]);

	return (
		<NestedLenisContext.Provider
			value={{
				lenisInstance,
				scrollWrapper,
				scrollContent,
				lenisReady,
			}}
		>
			<S.Jacket ref={scrollWrapper}>
				<S.Content ref={scrollContent}>{children}</S.Content>
			</S.Jacket>
		</NestedLenisContext.Provider>
	);
};

// Exports
// ------------
NestedLenis.displayName = 'NestedLenis';
export default NestedLenis;
