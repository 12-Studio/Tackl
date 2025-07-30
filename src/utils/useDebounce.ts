/**
 * React hook to create a debounced version of a callback function.
 *
 * This hook returns a memoized function that delays invoking the provided callback
 * until after a specified delay (in milliseconds) has elapsed since the last time it was called.
 * Useful for optimizing performance in scenarios like search input, window resizing, or scroll events.
 *
 * @template T
 * @param {T} fn - The function to debounce. Can accept any arguments.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {(...args: Parameters<T>) => void} A debounced version of the input function.
 *
 * @example
 * // Debounce a search function to avoid firing on every keystroke
 * const debouncedSearch = useDebounce((query: string) => {
 *   // Perform search logic here
 * }, 300);
 *
 * // Usage in an input handler
 * <input onChange={e => debouncedSearch(e.target.value)} />
 *
 * @remarks
 * - The debounced function is stable (memoized) and will only change if `fn` or `delay` changes.
 * - Only the last call within the delay period will trigger the function.
 * - The timer is cleared and restarted on each call.
 * - The function is not called on unmount.
 */
import { useCallback, useRef } from 'react';

export function useDebounce(fn, delay) {
    const timerRef = useRef(null);

    return useCallback(
        (...args) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => {
                fn(...args);
                timerRef.current = null;
            }, delay);
        },
        [fn, delay]
    );
}
