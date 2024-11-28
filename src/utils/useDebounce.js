/**
 * A custom hook that creates a debounced version of a function.
 * Helps optimize performance by limiting the rate at which a function executes (e.g., for search or scroll events).
 * This hook is memoized for performance and prevents unnecessary re-renders.
 *
 * @param {Function} fn - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} A debounced version of the input function
 *
 * @example
 * const debouncedSearch = useDebounce((searchTerm) => {
 *   // Expensive search operation
 * }, 500);
 *
 * // Usage
 * debouncedSearch('search term');
 */

import { useCallback, useRef } from 'react';

export const useDebounce = (fn, delay) => {
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
};
