'use client';

// Imports
// ------------
import React, { useState, useRef, useMemo } from 'react';
import { GlobalContext } from './';

// Component
// ------------
const Contexts = ({ children }) => {
	// NOTE • States
	const [isLoaded, setIsLoaded] = useState(false);
	
	// NOTE • Refs
	const scrollProxy = useRef();
	
	// NOTE • Memoized context value
	const contextValue = useMemo(
		() => ({
			scrollProxy,
			isLoaded,
			setIsLoaded,
		}),
		[isLoaded]
	);
	
	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	);
};

export default Contexts;
