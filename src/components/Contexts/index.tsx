'use client';

// Imports
// ------------
import type { LenisRef } from 'lenis/react';
import { createContext, useMemo, useRef, useState } from 'react';
// Interface
// ------------
import type * as I from './interface';
import { PerformanceProvider } from './Performance';

// Context Definition
// ------------
export const GlobalContext = createContext({
	lenisRef: { current: null } as React.RefObject<LenisRef | null>,

	menuOpen: false,
	setMenuOpen: (value: boolean) => {},
});

// Component
// ------------
const Contexts = ({ children }: I.ContextsProps) => {
	// Refs
	const lenisRef = useRef<LenisRef | null>(null);

	// States
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	// Context Values
	const contextValue = useMemo(
		() => ({
			lenisRef,
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
