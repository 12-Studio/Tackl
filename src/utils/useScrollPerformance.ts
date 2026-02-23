/**
 * useScrollPerformance
 *
 * React hook to improve scroll performance by temporarily disabling hover effects on the <body>.
 *
 * ## Why use this hook?
 * - Hover effects (e.g., :hover CSS) can cause performance issues during rapid scrolling, especially on complex UIs.
 * - This hook disables hover effects while scrolling, then re-enables them shortly after scrolling stops.
 * - It helps maintain smooth scrolling and avoids unnecessary repaints/reflows caused by hover transitions.
 *
 * ## How it works
 * - Adds a 'disable-hover' class to <body> during scroll events.
 * - Removes the class after a short debounce (default: 50ms) once scrolling stops.
 * - Uses requestAnimationFrame for smooth class addition and debounced removal.
 * - Cleans up all listeners and timers on unmount.
 *
 * ## Usage
 * ```tsx
 * import { useScrollPerformance } from './useScrollPerformance';
 *
 * function App() {
 *   useScrollPerformance();
 *   return <YourComponent />;
 * }
 * ```
 *
 * ## CSS Example
 * ```css
 * body.disable-hover *:hover {
 *   pointer-events: none !important;
 * }
 * ```
 *
 * @returns {void} This hook does not return anything. It manages side effects only.
 */
import { useEffect } from 'react';

export const useScrollPerformance = (): void => {
	useEffect(() => {
		const body = document.body;
		const HOVER_DISABLE_CLASS = 'disable-hover';
		const DEBOUNCE_MS = 50;

		let rafId: number | undefined;
		let debounceTimer: number | undefined;

		const handleScroll = (): void => {
			if (rafId !== undefined) {
				cancelAnimationFrame(rafId);
			}
			if (debounceTimer !== undefined) {
				clearTimeout(debounceTimer);
			}

			rafId = window.requestAnimationFrame(() => {
				if (!body.classList.contains(HOVER_DISABLE_CLASS)) {
					body.classList.add(HOVER_DISABLE_CLASS);
				}
			});

			debounceTimer = window.setTimeout(() => {
				body.classList.remove(HOVER_DISABLE_CLASS);
			}, DEBOUNCE_MS);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (rafId !== undefined) {
				cancelAnimationFrame(rafId);
			}
			if (debounceTimer !== undefined) {
				clearTimeout(debounceTimer);
			}
		};
	}, []);

	// This hook does not render or return anything
};
