'use client';

// Imports
// ------------
import { GlobalContext } from '@parts/Contexts';
import { use, useEffect } from 'react';

// Component
// ------------
const Template = ({ children }: { children: React.ReactNode }) => {
	const { setIsFontsLoaded } = use(GlobalContext);

	useEffect(() => {
		document.fonts.ready.then(() => {
			setIsFontsLoaded(true);
		});
	}, [setIsFontsLoaded]);

	return <>{children}</>;
};

// Exports
// ------------
export default Template;
