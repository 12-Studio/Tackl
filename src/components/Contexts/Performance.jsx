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
            isReducedMotion:
                typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,

            // Detects if device is in low-power mode
            // Can be used to disable heavy animations or effects
            isLowPowerMode: typeof window !== 'undefined' ? navigator?.userAgent.includes('Low-Power') : false,

            // Gets screen pixel density
            // Useful for serving appropriate image resolutions
            devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
        }),
        []
    );

    return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
};

// For documentation, see `docs/PerformanceContext.md`
