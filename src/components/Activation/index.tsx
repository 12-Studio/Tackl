// Imports
// ------------
import Modal from '@parts/Modal';
import Hero from './Hero';
import PageBuilder from '@parts/PageBuilder';
// import CallToAction from '@parts/CallToAction';

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
	isCtaOveridden,
	ctaHeading,
	ctaButtonLabel,
	ctaOverrideHeading,
	ctaOverrideButtonLabel,
}: I.ActivationProps) => (
	<Modal title={title}>
		<Hero logoMarquee={logoMarquee} title={title} heading={heading} desc={desc} />

		{pageBuilder && <PageBuilder pageBuilder={pageBuilder} />}

		{/* TODO • CTA */}
		{/* <CallToAction
				heading={isCtaOveridden ? ctaOverrideHeading : ctaHeading}
				buttonLabel={isCtaOveridden ? ctaOverrideButtonLabel : ctaButtonLabel}
			/> */}
	</Modal>
);

// Exports
// ------------
Activation.displayName = 'Activation';
export default Activation;
