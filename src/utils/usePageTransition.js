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
 *
 * @remarks
 * - RAF and setTimeout IDs are stored and cleared on unmount to prevent memory leaks
 *   and DOM updates after the component unmounts during an in-flight transition.
 */

import { useCallback, useEffect, useRef } from 'react';

const PAGE_TRANSITION_DURATION = 1000; // Duration of the entire transition
const TRANSITION_DURATION = PAGE_TRANSITION_DURATION / 2; // Duration in milliseconds
const CLEANUP_DELAY = TRANSITION_DURATION / 2;

const usePageTransition = router => {
	const bodyRef = useRef(null);
	const rafIdRef = useRef(null);
	const timeoutIdRef = useRef(null);

	useEffect(() => {
		return () => {
			if (rafIdRef.current != null) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
			if (timeoutIdRef.current != null) {
				clearTimeout(timeoutIdRef.current);
				timeoutIdRef.current = null;
			}
		};
	}, []);

	return useCallback(
		async to => {
			if (!bodyRef.current) {
				bodyRef.current = document.querySelector('body');
			}

			try {
				bodyRef.current?.classList.add('page-transition');

				await new Promise(resolve => {
					rafIdRef.current = requestAnimationFrame(() => {
						rafIdRef.current = null;
						timeoutIdRef.current = setTimeout(() => {
							timeoutIdRef.current = null;
							resolve();
						}, TRANSITION_DURATION);
					});
				});

				router.push(to);

				await new Promise(resolve => {
					rafIdRef.current = requestAnimationFrame(() => {
						rafIdRef.current = null;
						timeoutIdRef.current = setTimeout(() => {
							timeoutIdRef.current = null;
							resolve();
						}, CLEANUP_DELAY);
					});
				});
			} finally {
				bodyRef.current?.classList.remove('page-transition');
			}
		},
		[router]
	);
};

export default usePageTransition;
