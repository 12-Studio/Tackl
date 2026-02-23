import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type Breakpoints = Record<string, string>;

type MatchMediaConditions = Record<string, boolean>;

/**
 * A callback function that receives the current match media conditions.
 *
 * @param conditions - An object mapping each breakpoint key to a boolean indicating if that media query currently matches.
 */
type AnimationCallback = (conditions: MatchMediaConditions) => void;

const DEFAULT_BREAKPOINTS: Breakpoints = {
    isDesktop: '(min-width: 1024px)',
    isMobile: '(max-width: 699px)',
    isTablet: '(min-width: 700px) and (max-width: 1023px)',
};

/**
 * React hook for running GSAP animations with responsive match media conditions.
 *
 * This hook abstracts the GSAP `matchMedia` pattern, allowing you to define animations that respond to custom breakpoints.
 * It automatically sets up and cleans up GSAP's matchMedia context.
 *
 * @template TScope
 * @param animationCallback - A function that receives an object with boolean keys for each breakpoint (e.g., `{ isDesktop, isMobile, isTablet }`).
 *   Use these booleans to conditionally run different GSAP animations for each breakpoint.
 * @param options - (Optional) Options to pass to `useGSAP` (e.g., `{ scope: ref }`).
 *   See: https://gsap.com/docs/v3/Plugins/React/#useGSAP
 * @param breakpoints - (Optional) Custom breakpoint definitions. Each key is a name, and each value is a valid CSS media query string.
 *   These are merged with the defaults: `isDesktop`, `isMobile`, `isTablet`.
 *
 * @example
 * ```tsx
 * import { useRef } from 'react';
 * import { useAnimation } from '@utils/useAnimation';
 * import gsap from 'gsap';
 *
 * const MyComponent = () => {
 *   const elementRef = useRef<HTMLDivElement>(null);
 *
 *   useAnimation(
 *     ({ isDesktop, isMobile }) => {
 *       gsap.from(elementRef.current, {
 *         y: isDesktop ? '2rem' : '1rem',
 *         scrollTrigger: {
 *           trigger: elementRef.current,
 *           start: 'top 100%',
 *           end: isDesktop ? 'bottom 50%' : 'bottom 80%',
 *           scrub: true,
 *         },
 *       });
 *     },
 *     { scope: elementRef }
 *   );
 *
 *   return <div ref={elementRef}>Content</div>;
 * };
 * ```
 */
export function useAnimation(
    animationCallback: AnimationCallback,
    options: Record<string, any> = {},
    breakpoints: Breakpoints = {}
): void {
    const mergedBreakpoints: Breakpoints = { ...DEFAULT_BREAKPOINTS, ...breakpoints };

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add(mergedBreakpoints, (context: { conditions?: MatchMediaConditions }) => {
            // context.conditions is optional, so provide a fallback
            animationCallback(context.conditions ?? {});
        });

        // Clean up matchMedia on unmount
        return () => mm.revert();
    }, options);
}
