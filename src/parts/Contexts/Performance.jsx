'use client';

// Imports
// ------------
import { createContext, useMemo } from 'react';

// Context Definition
// ------------
export const PerformanceContext = createContext({});

// Component
// ------------
export const PerformanceProvider = ({ children }) => {
	const value = useMemo(
		() => ({
			// Checks if user has requested reduced motion
			// Useful for disabling/reducing animations for accessibility
			isReducedMotion: window?.matchMedia('(prefers-reduced-motion: reduce)')
				.matches,

			// Detects if device is in low-power mode
			// Can be used to disable heavy animations or effects
			isLowPowerMode: navigator?.userAgent.includes('Low-Power'),

			// Gets screen pixel density
			// Useful for serving appropriate image resolutions
			devicePixelRatio: window?.devicePixelRatio || 1,
		}),
		[]
	);

	return (
		<PerformanceContext.Provider value={value}>
			{children}
		</PerformanceContext.Provider>
	);
};

// For documentation, see `docs/PerformanceContext.md`
