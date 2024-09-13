// Imports
// ------------
import React from 'react';
import { theme } from '@theme';

// Component
// ------------
export const useBreakpoint = () => {
	const [bp, setBp] = React.useState({});

	React.useEffect(() => {
		const handleResize = () => {
			const windowWidth = window.innerWidth;
			const windowBp = Object.fromEntries(
				Object.entries(theme.grid.breakpoints).map(([key, value]) => [
					key,
					windowWidth >= parseInt(value),
				])
			);
			setBp(windowBp);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty dependency array ensures this effect runs only once on component mount

	return bp;
};
