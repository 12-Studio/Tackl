/**
 * React hooks for responsive design: detect if the viewport is mobile or desktop.
 *
 * @remarks
 * - Uses a single breakpoint (default: 1024px) to distinguish mobile from desktop.
 * - Debounces resize events for performance.
 * - SSR-safe: returns `false` for both `isMobile` and `isDesktop` until mounted.
 *
 * @example
 * // Use the main hook for both values:
 * const { isMobile, isDesktop } = useResponsive();
 * if (isDesktop) return <DesktopComponent />;
 *
 * @example
 * // Use the shortcut hooks:
 * const isMobile = useIsMobile();
 * const isDesktop = useIsDesktop();
 */

import { useCallback, useEffect, useRef, useState } from 'react';

const DESKTOP_BREAKPOINT = 1024;

/**
 * Object returned by {@link useResponsive}.
 */
export interface ResponsiveState {
	/** True if the viewport is less than the desktop breakpoint. */
	isMobile: boolean;
	/** True if the viewport is at least the desktop breakpoint. */
	isDesktop: boolean;
}

/**
 * React hook to determine if the viewport is mobile or desktop.
 *
 * @returns {ResponsiveState} An object with `isMobile` and `isDesktop` booleans.
 *
 * @example
 * const { isMobile, isDesktop } = useResponsive();
 * if (isMobile) return <MobileComponent />;
 */
export function useResponsive(): ResponsiveState {
	const [windowWidth, setWindowWidth] = useState<number>(0);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Debounced resize handler
	const handleResize = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			setWindowWidth(window.innerWidth);
		}, 100);
	}, []);

	useEffect(() => {
		// Mark as mounted and set initial width
		setIsMounted(true);
		setWindowWidth(window.innerWidth);

		window.addEventListener('resize', handleResize, { passive: true });

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	// Return safe defaults during SSR and before mount
	if (!isMounted) {
		return {
			isMobile: false,
			isDesktop: false,
		};
	}

	return {
		isMobile: windowWidth < DESKTOP_BREAKPOINT,
		isDesktop: windowWidth >= DESKTOP_BREAKPOINT,
	};
}

/**
 * React hook to determine if the viewport is mobile.
 *
 * @returns {boolean} True if the viewport is less than the desktop breakpoint.
 *
 * @example
 * const isMobile = useIsMobile();
 * if (isMobile) { ... }
 */
export function useIsMobile(): boolean {
	const { isMobile } = useResponsive();
	return isMobile;
}

/**
 * React hook to determine if the viewport is desktop.
 *
 * @returns {boolean} True if the viewport is at least the desktop breakpoint.
 *
 * @example
 * const isDesktop = useIsDesktop();
 * if (isDesktop) { ... }
 */
export function useIsDesktop(): boolean {
	const { isDesktop } = useResponsive();
	return isDesktop;
}
