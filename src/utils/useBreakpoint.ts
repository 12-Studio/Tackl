/**
 * React hook for responsive breakpoint detection based on your theme's breakpoints.
 *
 * This hook returns an object with a boolean for each breakpoint defined in your theme,
 * indicating whether the current window width is at or above that breakpoint.
 *
 * @template BreakpointState
 * @returns {BreakpointState} An object mapping each breakpoint key to a boolean.
 *
 * @example
 * // Assuming your theme.grid.breakpoints = { small: '480', medium: '768', large: '1024' }
 * const bp = useBreakpoint();
 * if (bp.medium) {
 *   // The viewport is at least 768px wide
 * }
 * if (bp.large) {
 *   // The viewport is at least 1024px wide
 * }
 *
 * @remarks
 * - The returned object always contains all breakpoint keys from your theme, each as a boolean.
 * - The hook recalculates on window resize, debounced for performance.
 * - Uses requestAnimationFrame for smooth updates.
 * - Cleans up all listeners and timers on unmount.
 *
 * @performance
 * - Breakpoint values are memoized to avoid unnecessary recalculation.
 * - Resize handler is debounced (100ms) to limit update frequency.
 * - Uses requestAnimationFrame for efficient DOM reads.
 *
 * @note
 * - This hook is intended for client-side usage only. It will not run on the server.
 * - Breakpoint values are parsed as integers (pixels) from your theme.
 */
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { theme } from '@theme';

type Breakpoints = typeof theme.grid.breakpoints;
type BreakpointKeys = keyof Breakpoints;
type BreakpointState = Record<BreakpointKeys, boolean>;

const DEBOUNCE_DELAY = 100;

/**
 * Returns an object with a boolean for each breakpoint key, indicating if the window width is at or above that breakpoint.
 */
export const useBreakpoint = (): BreakpointState => {
    // Initialize all breakpoints as false
    const [bp, setBp] = useState<BreakpointState>(() => {
        const keys = Object.keys(theme.grid.breakpoints) as BreakpointKeys[];
        return keys.reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {} as BreakpointState);
    });

    // Refs for debouncing and animation frame
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rafRef = useRef<number | null>(null);

    // Memoize parsed breakpoint values for efficiency
    const breakpointValues = useMemo(() => {
        const entries = Object.entries(theme.grid.breakpoints) as [BreakpointKeys, string][];
        return entries.map(([key, value]) => [key, parseInt(value, 10)] as [BreakpointKeys, number]);
    }, []);

    // Resize handler: updates state if breakpoints change
    const handleResize = useCallback(() => {
        rafRef.current = window.requestAnimationFrame(() => {
            const windowWidth = window.innerWidth;
            const windowBp = Object.fromEntries(
                breakpointValues.map(([key, value]) => [key, windowWidth >= value])
            ) as BreakpointState;

            setBp(prevBp =>
                JSON.stringify(prevBp) === JSON.stringify(windowBp) ? prevBp : windowBp
            );
        });
    }, [breakpointValues]);

    // Set up resize listener and initial calculation
    useEffect(() => {
        handleResize();

        // Debounced resize handler
        const debouncedResize = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(handleResize, DEBOUNCE_DELAY);
        };

        window.addEventListener('resize', debouncedResize, { passive: true });

        // Cleanup on unmount
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', debouncedResize);
        };
    }, [handleResize]);

    return bp;
};
