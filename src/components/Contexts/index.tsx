'use client';

// Imports
// ------------
import Lenis from 'lenis';
import { createContext, useRef, useState } from 'react';
import { PerformanceProvider } from './Performance';

// Context Definition
// ------------
export const GlobalContext = createContext({
	lenis: { current: null } as React.RefObject<Lenis | null>,
	headerSize: 0,
	setHeaderSize: (value: number) => {},
	menuOpen: false,
	setMenuOpen: (value: boolean) => {},
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
	const lenis = useRef<Lenis | null>(null);

	const [headerSize, setHeaderSize] = useState<number>(0);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const contextValue = {
		lenis,
		headerSize, // Header size state
		setHeaderSize, // Function to update header size
		menuOpen,
		setMenuOpen,
	};

	return (
		<GlobalContext.Provider value={contextValue}>
			<PerformanceProvider>{children}</PerformanceProvider>
		</GlobalContext.Provider>
	);
};

// Exports
// ------------
export default Contexts;
