'use client';

/**
 * SmoothScroll Component
 *
 * This component implements smooth scrolling functionality using the Lenis library.
 * It wraps the entire application content and provides a butter-smooth scroll experience.
 *
 * Key features:
 * - Smooth scroll behavior with configurable lerp (linear interpolation)
 * - GSAP integration for animation timing
 * - Automatic cleanup on unmount
 */

// Imports
// ------------
import { GlobalContext } from '@parts/Contexts';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { useContext, useLayoutEffect } from 'react';

// Constants
// ------------
const SCROLL_LERP = 0.1; // Lower = smoother but slower, higher = faster but less smooth

// Component
// ------------
const SmoothScroll = ({ children }) => {
	// Get lenis instance from global context
	const { lenis } = useContext(GlobalContext);

	useLayoutEffect(() => {
		// Initialize Lenis with optimized settings
		lenis.current = new Lenis({
			lerp: SCROLL_LERP,
			// Uncomment to adjust scroll duration if needed
			// duration: 1.2,
		});

		// Set up GSAP ticker for smooth animation frame updates
		const gsapTickerCallback = time => {
			lenis.current.raf(time * 1000);
		};

		gsap.ticker.add(gsapTickerCallback);
		gsap.ticker.lagSmoothing(0); // Disable lag smoothing for more accurate scrolling

		// Reset scroll position on mount
		lenis.current.scrollTo(0, { immediate: true });

		// Add performance monitoring
		lenis.current.on('scroll', ({ velocity }) => {
			if (Math.abs(velocity) > 50) {
				document.body.classList.add('fast-scroll');
			} else {
				document.body.classList.remove('fast-scroll');
			}
		});

		// Cleanup function
		return () => {
			if (!lenis.current) return;
			lenis.current.off('scroll');
			gsap.ticker.remove(gsapTickerCallback);
			lenis.current.destroy();
			lenis.current = null;
		};
	}, [lenis]); // Only re-run if lenis context changes

	return children;
};

// Add display name for debugging
SmoothScroll.displayName = 'SmoothScroll';

// Export
// ------------
export default SmoothScroll;

/*
 * Note: Alternative implementation with ScrollTrigger support is commented out below.
 * Uncomment and modify if GSAP ScrollTrigger integration is needed.
 */

// // Alternative implementation with ScrollTrigger
// // --------------------------------------------
// import React from 'react';
// import Lenis from '@studio-freight/lenis';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { GlobalContext } from '@parts/Contexts';

// const SmoothScroll = ({ children }) => {
//     const lenis = React.useRef();
//     const contentRef = React.useRef();
//     const { scrollProxy } = React.useContext(GlobalContext);

//     React.useLayoutEffect(() => {
//         gsap.registerPlugin(ScrollTrigger);

//         lenis.current = new Lenis({
//             lerp: 0.1,
//             wrapper: scrollProxy.current,
//             content: contentRef.current,
//         });

//         const gsapTickerCallback = (time) => {
//             lenis.current.raf(time * 1000);
//         };

//         gsap.ticker.add(gsapTickerCallback);

//         ScrollTrigger.scrollerProxy(scrollProxy.current, {
//             scrollTop(value) {
//                 if (arguments.length) {
//                     lenis.current.scrollTo(value, { immediate: true });
//                 }
//                 return lenis.current.scroll;
//             },
//             getBoundingClientRect() {
//                 return {
//                     top: 0,
//                     left: 0,
//                     width: window.innerWidth,
//                     height: window.innerHeight,
//                 };
//             },
//         });

//         return () => {
//             gsap.ticker.remove(gsapTickerCallback);
//             lenis.current.destroy();
//         };
//     }, []);

//     return (
//         <div ref={scrollProxy} className="lenis-wrapper">
//             <div ref={contentRef} className="lenis-content">
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default SmoothScroll;
