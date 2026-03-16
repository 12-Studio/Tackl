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
const About = ({
	title,
	heading,
	desc,
	featuredImage,
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
}: I.AboutProps) => {
	// Contexts
	const { setAreModalsReady } = use(GlobalContext);

	// Set Modal ready on mount
	useEffect(() => {
		setAreModalsReady(prev => ({ ...prev, about: true }));
	}, [setAreModalsReady]);

	return (
		<Modal title={title}>
			<Hero title={title} heading={heading} desc={desc} featuredImage={featuredImage} />

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
About.displayName = 'About';
export default About;
