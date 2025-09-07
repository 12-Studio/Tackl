'use client';

// Imports
// ------------
import { createContext, useMemo, useEffect, useState } from 'react';

// Context Definition
// ------------
export const PerformanceContext = createContext({
    isReducedMotion: false,
    isLowPowerMode: false,
    devicePixelRatio: 1,
});

// Component
// ------------
export const PerformanceProvider = ({ children }: { children: React.ReactNode }) => {
    const [performanceState, setPerformanceState] = useState({
        isReducedMotion: false,
        isLowPowerMode: false,
        devicePixelRatio: 1,
    });

    useEffect(() => {
        setPerformanceState({
            isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            isLowPowerMode: navigator?.userAgent.includes('Low-Power'),
            devicePixelRatio: window.devicePixelRatio,
        });
    }, []);

    const value = useMemo(() => performanceState, [performanceState]);

    return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
};

// For documentation, see `docs/PerformanceContext.md`
