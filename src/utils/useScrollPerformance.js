/**
 * Custom hook to improve scroll performance by temporarily disabling hover effects
 *
 * Why this hook exists:
 * - Hover effects can cause performance issues during rapid scrolling
 * - Temporarily disabling them improves scroll smoothness
 * - Re-enables hover effects shortly after scrolling stops
 *
 * Performance optimizations:
 * - Uses requestAnimationFrame for smooth animation frame timing
 * - Debounces class updates to minimize DOM operations
 * - Caches DOM references outside event handler
 * - Uses cleanup function to prevent memory leaks
 *
 * @returns {null} This hook handles effects internally and doesn't return a value
 */
import React from 'react';

export const useScrollPerformance = () => {
	React.useEffect(() => {
		// Cache DOM reference outside event handler
		const body = document.body;
		const HOVER_DISABLE_CLASS = 'disable-hover';
		const DEBOUNCE_MS = 50;

		let rafId;
		let debounceTimer;

		const handleScroll = () => {
			// Cancel any pending frame/timeout
			cancelAnimationFrame(rafId);
			clearTimeout(debounceTimer);

			// Use rAF for smooth class addition
			rafId = requestAnimationFrame(() => {
				if (!body.classList.contains(HOVER_DISABLE_CLASS)) {
					body.classList.add(HOVER_DISABLE_CLASS);
				}
			});

			// Debounce the re-enable of hover
			debounceTimer = setTimeout(() => {
				body.classList.remove(HOVER_DISABLE_CLASS);
			}, DEBOUNCE_MS);
		};

		// Passive listener for better scroll performance
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Cleanup function
		return () => {
			window.removeEventListener('scroll', handleScroll);
			cancelAnimationFrame(rafId);
			clearTimeout(debounceTimer);
		};
	}, []); // Empty deps array since we don't use any external values

	return null;
};
