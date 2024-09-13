// Imports
// ------
import React from 'react';
import { useWindowSize } from 'react-use';

// Component
// ------
export const useHeightFix = () => {
	// NOTE • Window Size Checker
	const { width } = useWindowSize();

	// NOTE • OnLoad: 100vh Fix
	React.useEffect(() => {
		let vh = document.documentElement.clientHeight * 0.01;

		const setHeightVar = () => {
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		document.documentElement.style.setProperty('--vhs', `${vh}px`);

		// Init
		setHeightVar();

		const resizeChecker = () => {
			if (width > 768) {
				setHeightVar();
			}
		};

		// Initialize resize
		window.addEventListener('resize', resizeChecker);

		return () => {
			window.removeEventListener('resize', resizeChecker);
		};
	}, []);

	return null;
};
