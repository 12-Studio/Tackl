/**
 * useThrottle is a custom React hook that returns a throttled version of a callback function.
 * The throttled function will only invoke the original callback at most once per `limit` milliseconds,
 * making it ideal for performance optimization of high-frequency events (e.g., scroll, resize).
 *
 * @template TArgs
 * @param {(…args: TArgs) => void} fn - The function to throttle.
 * @param {number} limit - The minimum time (in milliseconds) that must pass between function calls.
 * @returns {(…args: TArgs) => void} A throttled version of the input function.
 *
 * @example
 * // Throttle a scroll handler to fire at most once every 100ms
 * const throttledScroll = useThrottle((event: Event) => {
 *   // Handle scroll event
 * }, 100);
 *
 * useEffect(() => {
 *   window.addEventListener('scroll', throttledScroll);
 *   return () => window.removeEventListener('scroll', throttledScroll);
 * }, [throttledScroll]);
 *
 * @remarks
 * - The throttle's internal cooldown timer is cleared on unmount to prevent memory leaks.
 */
import { useCallback, useEffect, useRef } from 'react';

export function useThrottle<TArgs extends any[]>(
	fn: (...args: TArgs) => void,
	limit: number
): (...args: TArgs) => void {
	const inThrottleRef = useRef(false);
	const lastTimeRef = useRef(0);
	const throttleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (throttleTimerRef.current) {
				clearTimeout(throttleTimerRef.current);
				throttleTimerRef.current = null;
			}
		};
	}, []);

	return useCallback(
		(...args: TArgs) => {
			const now = Date.now();

			if (!inThrottleRef.current && now - lastTimeRef.current >= limit) {
				fn(...args);
				lastTimeRef.current = now;
				inThrottleRef.current = true;

				if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
				throttleTimerRef.current = setTimeout(() => {
					inThrottleRef.current = false;
					throttleTimerRef.current = null;
				}, limit);
			}
		},
		[fn, limit]
	);
}
