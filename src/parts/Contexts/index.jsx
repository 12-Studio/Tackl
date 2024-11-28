'use client';

// Imports
// ------------
import React, { useRef, useMemo, createContext } from 'react';

// Context Definition
// ------------
export const GlobalContext = createContext({});

// Component
// ------------
/**
 * Global context provider component that manages shared application state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the context
 */
const Contexts = ({ children }) => {
	// Create a stable reference for the lenis smooth scroll instance
	const lenis = useRef(null);

	// Memoize the context value to prevent unnecessary re-renders
	const contextValue = useMemo(
		() => ({
			lenis, // Smooth scroll reference available globally
		}),
		[] // Empty dependency array since ref is stable
	);

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	);
};

// Exports
// ------------
export default Contexts;
