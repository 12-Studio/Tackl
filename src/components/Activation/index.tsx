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
const Activation = ({
	title,
	heading,
	desc,
	logoMarquee,
	pageBuilder,
	isCtaOverridden,
	ctaHeading,
	ctaButtonLabel,
	ctaOverrideHeading,
	ctaOverrideButtonLabel,
	email,
	linkedin,
	twitter,
	contactTitle,
	legalTitle,
}: I.ActivationProps) => {
	// Contexts
	const { setAreModalsReady } = use(GlobalContext);

	// Set Modal ready on mount
	useEffect(() => {
		setAreModalsReady(prev => ({ ...prev, activation: true }));
	}, [setAreModalsReady]);

	return (
		<Modal title={title}>
			<Hero logoMarquee={logoMarquee} title={title} heading={heading} desc={desc} />

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
Activation.displayName = 'Activation';
export default Activation;
