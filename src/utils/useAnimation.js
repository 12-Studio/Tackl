import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Custom hook that abstracts the common GSAP match media pattern
 * @param {Function} animationCallback - Function that receives context with conditions
 * @param {Object} options - Options for useGSAP
 * @param {Object} breakpoints - Breakpoint definitions for match media
 * @returns {void}
 */
export const useAnimation = (animationCallback, options = {}, breakpoints = {}) => {
    const defaultBreakpoints = {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
        ...breakpoints,
    };

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add(defaultBreakpoints, context => {
            animationCallback(context.conditions);
        });

        // Clean up matchMedia on unmount
        return () => mm.revert();
    }, options);
};

/**
 * Alternative function-based approach for non-hook usage
 * @param {Function} animationCallback - Function that receives context with conditions
 * @param {Object} breakpoints - Breakpoint definitions for match media
 * @returns {Function} Cleanup function
 */
export const createGSAPMatchMedia = (animationCallback, breakpoints = {}) => {
    const defaultBreakpoints = {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
        ...breakpoints,
    };

    const mm = gsap.matchMedia();
    mm.add(defaultBreakpoints, context => {
        animationCallback(context.conditions);
    });

    return () => mm.revert();
};

// Example usage:
//
// import { useRef } from 'react';
// import { useAnimation } from '@utils/useAnimation';
// import gsap from 'gsap';
//
// const MyComponent = () => {
//     const elementRef = useRef(null);
//
//     useAnimation(
//         ({ isDesktop, isMobile }) => {
//             gsap.from(elementRef.current, {
//                 y: isDesktop ? '2rem' : '1rem',
//                 scrollTrigger: {
//                     trigger: elementRef.current,
//                     start: 'top 100%',
//                     end: isDesktop ? 'bottom 50%' : 'bottom 80%',
//                     scrub: true,
//                 },
//             });
//         },
//         { scope: elementRef }
//     );
//
//     return <div ref={elementRef}>Content</div>;
// };
