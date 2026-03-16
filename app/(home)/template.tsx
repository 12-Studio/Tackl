'use client';

// Imports
// ------------
import Loader from '@parts/Loader';
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

	return (
		<>
			<Loader />
			{children}
		</>
	);
};

// Exports
// ------------
export default Template;
