'use client';

// Imports
// ------------
import Modal from '@parts/Modal';
import Hero from './Hero';
import { use, useEffect } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const Contact = ({ title, heading, desc, email, linkedin, twitter }: I.ContactProps) => {
	// Contexts
	const { setAreModalsReady } = use(GlobalContext);

	// Set Modal ready on mount
	useEffect(() => {
		setAreModalsReady(prev => ({ ...prev, contact: true }));
	}, [setAreModalsReady]);

	return (
		<Modal title={title}>
			<Hero title={title} heading={heading} desc={desc} />
		</Modal>
	);
};

// Exports
// ------------
Contact.displayName = 'Contact';
export default Contact;
