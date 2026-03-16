'use client';

// Imports
// ------------
import Hero from './Hero';
import { use, useEffect } from 'react';
import { GlobalContext } from '@parts/Contexts';
import dynamic from 'next/dynamic';

// Lazy Load Modals
// ------------
const Modal = dynamic(() => import('@parts/Modal'), {
	ssr: false,
});

const PageBuilder = dynamic(() => import('@parts/PageBuilder'), {
	ssr: false,
});

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const Legal = ({ title, heading, desc, lastUpdated, pageBuilder }: I.LegalProps) => {
	// Contexts
	const { setAreModalsReady } = use(GlobalContext);

	// Set Modal ready on mount
	useEffect(() => {
		setAreModalsReady(prev => ({ ...prev, legal: true }));
	}, [setAreModalsReady]);

	return (
		<Modal title={title} isDark>
			<Hero title={title} heading={heading} desc={desc} lastUpdated={lastUpdated} />

			{pageBuilder && <PageBuilder pageBuilder={pageBuilder} />}
		</Modal>
	);
};

// Exports
// ------------
Legal.displayName = 'Legal';
export default Legal;
