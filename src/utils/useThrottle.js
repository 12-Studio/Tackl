/**
 * A custom hook that creates a throttled version of a function.
 * Throttling ensures the function is called at most once in a specified time period,
 * making it ideal for performance optimization of frequent events (e.g., scroll, resize).
 * This implementation uses useCallback and useRef for optimal performance and to prevent memory leaks.
 *
 * @param {Function} fn - The function to throttle
 * @param {number} limit - The minimum time (in milliseconds) that must pass between function calls
 * @returns {Function} A throttled version of the input function
 *
 * @example
 * const throttledScroll = useThrottle((event) => {
 *   // Handle scroll event
 * }, 100);
 *
 * // Usage
 * window.addEventListener('scroll', throttledScroll);
 */

import { useCallback, useRef } from 'react';

export const useThrottle = (fn, limit) => {
    const inThrottleRef = useRef(false);
    const lastTimeRef = useRef(0);

    return useCallback(
        (...args) => {
            const now = Date.now();

            if (!inThrottleRef.current && now - lastTimeRef.current >= limit) {
                fn(...args);
                lastTimeRef.current = now;
                inThrottleRef.current = true;

                setTimeout(() => {
                    inThrottleRef.current = false;
                }, limit);
            }
        },
        [fn, limit]
    );
};
