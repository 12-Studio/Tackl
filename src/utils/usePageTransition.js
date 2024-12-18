'use client';

/**
 * Custom hook for handling page transitions with animations
 *
 * This hook provides a memoized function that handles page transitions by:
 * 1. Adding a transition class to trigger animation
 * 2. Waiting for the animation to complete
 * 3. Performing the navigation
 * 4. Cleaning up after transition
 *
 * Performance optimizations:
 * - Caches body reference using useRef to avoid repeated DOM queries
 * - Uses RAF for smoother animations
 * - Memoizes transition handler with useCallback
 *
 * @param {Object} router - Next.js router instance
 * @returns {Function} Memoized transition handler that takes a URL string
 * @example
 * ```jsx
 * const router = useRouter();
 * const handleTransition = usePageTransition(router);
 *
 * // Usage
 * handleTransition('/some-path');
 * ```
 */

import { useCallback, useRef } from 'react';

const PAGE_TRANSITION_DURATION = 1000; // Duration of the entire transition
const TRANSITION_DURATION = PAGE_TRANSITION_DURATION / 2; // Duration in milliseconds
const CLEANUP_DELAY = TRANSITION_DURATION / 2;

const usePageTransition = router => {
    // Cache body reference
    const bodyRef = useRef(null);

    return useCallback(
        async to => {
            // Initialize body ref if not already set
            if (!bodyRef.current) {
                bodyRef.current = document.querySelector('body');
            }

            try {
                // Start transition
                bodyRef.current?.classList.add('page-transition');

                // Use requestAnimationFrame for smoother animation timing
                await new Promise(resolve =>
                    requestAnimationFrame(() => {
                        setTimeout(resolve, TRANSITION_DURATION);
                    })
                );

                // Navigate
                router.push(to);

                // Wait for exit animation
                await new Promise(resolve =>
                    requestAnimationFrame(() => {
                        setTimeout(resolve, CLEANUP_DELAY);
                    })
                );
            } finally {
                // Cleanup
                bodyRef.current?.classList.remove('page-transition');
            }
        },
        [router]
    );
};

export default usePageTransition;
