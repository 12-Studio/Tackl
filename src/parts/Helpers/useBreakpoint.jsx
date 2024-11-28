// Imports
// ------------
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { theme } from '@theme';

// Component
// ------------
export const useBreakpoint = () => {
	// Store breakpoint states
	const [bp, setBp] = useState({});

	// Memoize breakpoint values to avoid recalculating on every render
	const breakpoints = useMemo(() => theme.grid.breakpoints, []);

	// Memoize resize handler to maintain consistent reference
	const handleResize = useCallback(() => {
		const windowWidth = window.innerWidth;

		// Calculate which breakpoints are active based on window width
		const windowBp = Object.fromEntries(
			Object.entries(breakpoints).map(([key, value]) => [
				key,
				windowWidth >= parseInt(value),
			])
		);

		setBp(windowBp);
	}, [breakpoints]);

	// Set up resize listener and initial calculation
	useEffect(() => {
		// Calculate initial breakpoints
		handleResize();

		// Add debounced resize listener
		let timeoutId;
		const debouncedResize = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(handleResize, 100);
		};

		window.addEventListener('resize', debouncedResize);

		// Cleanup listener on unmount
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('resize', debouncedResize);
		};
	}, [handleResize]); // Only re-run if handleResize changes

	return bp;
};
