'use client';

// Imports
// ------------
import Lenis from 'lenis';
import { createContext, useMemo, useRef, useState } from 'react';
import { PerformanceProvider } from './Performance';

// Interface
// ------------
import * as I from './interface';

// Context Definition
// ------------
export const GlobalContext = createContext({
	lenis: { current: null } as React.RefObject<Lenis | null>,

	menuOpen: false,
	setMenuOpen: (value: boolean) => {},
});

// Component
// ------------
const Contexts = ({ children }: I.ContextsProps) => {
	// Refs
	const lenis = useRef<Lenis | null>(null);

	// States
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	// Context Values
	const contextValue = useMemo(
		() => ({
			lenis,
			menuOpen,
			setMenuOpen,
		}),
		[menuOpen]
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
