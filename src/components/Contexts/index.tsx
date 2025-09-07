'use client';

// Imports
// ------------
import React, { useRef, useMemo, createContext } from 'react';
import { PerformanceProvider } from './Performance';

// Context Definition
// ------------
export const GlobalContext = createContext({
    lenis: { current: null } as React.RefObject<HTMLDivElement | null>
});

// Component
// ------------
/**
 * Global context provider component that manages shared application state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the context
 */
const Contexts = ({ children }: { children: React.ReactNode }) => {
    // Create a stable reference for the lenis smooth scroll instance
    const lenis = useRef<HTMLDivElement>(null);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            lenis,
        }),
        [] 
    );

    return (
        <GlobalContext.Provider value={contextValue}>
            <PerformanceProvider>{children}</PerformanceProvider>
        </GlobalContext.Provider>
    );
};

// Exports
// ------------
export default Contexts;
