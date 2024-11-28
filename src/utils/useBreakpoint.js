/**
 * Custom hook for responsive breakpoint detection
 *
 * @returns {Object} Object containing boolean values for each breakpoint
 * @example
 * const bp = useBreakpoint();
 * if (bp.medium) {
 *   // Do something for medium screens and up
 * }
 *
 * @performance
 * - Breakpoint values are memoized to avoid recalculation
 * - Resize handler is debounced to limit calculations
 * - Uses RAF for smooth resize updates
 * - Cleanup on unmount prevents memory leaks
 */

// Imports
// ------------
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { theme } from '@theme';

// Constants
// ------------
const DEBOUNCE_DELAY = 100;

// Component
// ------------
export const useBreakpoint = () => {
    // Store breakpoint states
    const [bp, setBp] = useState({});

    // Refs for performance optimization
    const timeoutRef = useRef(null);
    const rafRef = useRef(null);

    // Memoize breakpoint values and parsed numbers
    const breakpointValues = useMemo(() => {
        const entries = Object.entries(theme.grid.breakpoints);
        return entries.map(([key, value]) => [key, parseInt(value, 10)]);
    }, []);

    // Memoize resize handler with RAF for smooth updates
    const handleResize = useCallback(() => {
        rafRef.current = requestAnimationFrame(() => {
            const windowWidth = window.innerWidth;

            // Use pre-parsed breakpoint values
            const windowBp = Object.fromEntries(breakpointValues.map(([key, value]) => [key, windowWidth >= value]));

            setBp(prevBp => {
                // Only update if values actually changed
                return JSON.stringify(prevBp) === JSON.stringify(windowBp) ? prevBp : windowBp;
            });
        });
    }, [breakpointValues]);

    // Set up resize listener and initial calculation
    useEffect(() => {
        // Calculate initial breakpoints
        handleResize();

        // Debounced resize handler
        const debouncedResize = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(handleResize, DEBOUNCE_DELAY);
        };

        window.addEventListener('resize', debouncedResize, { passive: true });

        // Cleanup
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', debouncedResize);
        };
    }, [handleResize]);

    return bp;
};
