'use client';

// Imports
// ------------
import Modal from '@parts/Modal';
import Hero from './Hero';
import PageBuilder from '@parts/PageBuilder';
import CallToAction from '@parts/CallToAction';
import { use, useEffect } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const DataSupply = ({
	title,
	heading,
	desc,
	usaCoverage,
	pageBuilder,
	isCtaOverridden,
	ctaOverrideHeading,
	ctaOverrideButtonLabel,
	ctaHeading,
	ctaButtonLabel,
	email,
	linkedin,
	twitter,
	contactTitle,
	legalTitle,
}: I.DataSupplyProps) => {
	// Contexts
	const { setAreModalsReady } = use(GlobalContext);

	// Set Modal ready on mount
	useEffect(() => {
		setAreModalsReady(prev => ({ ...prev, dataSupply: true }));
	}, [setAreModalsReady]);

	return (
		<Modal title={title}>
			<Hero title={title} heading={heading} desc={desc} usaCoverage={usaCoverage} />

			{pageBuilder && <PageBuilder pageBuilder={pageBuilder} contactTitle={contactTitle} />}

			<CallToAction
				heading={ctaHeading}
				buttonLabel={ctaButtonLabel}
				isCtaOverridden={isCtaOverridden}
				overrideHeading={ctaOverrideHeading}
				overrideButtonLabel={ctaOverrideButtonLabel}
				email={email}
				linkedin={linkedin}
				twitter={twitter}
				contactTitle={contactTitle}
				legalTitle={legalTitle}
			/>
		</Modal>
	);
};

// Exports
// ------------
DataSupply.displayName = 'DataSupply';
export default DataSupply;
