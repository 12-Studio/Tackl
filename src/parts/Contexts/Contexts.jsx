'use client';

// Imports
// ------------
import React, { useRef, useState, useMemo } from 'react';
import { GlobalContext } from './';

// Component
// ------------
const Contexts = ({ children }) => {
	// NOTE • Refs
	const lenis = useRef();

	const contextValue = useMemo(
		() => ({
			lenis,
		}),
		[]
	);

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	);
};

export default Contexts;
