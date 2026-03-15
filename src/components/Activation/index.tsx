// Imports
// ------------
import Modal from '@parts/Modal';
import Hero from './Hero';
import PageBuilder from '@parts/PageBuilder';
import CallToAction from '@parts/CallToAction';

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
}: I.ActivationProps) => (
	<Modal title={title}>
		<Hero logoMarquee={logoMarquee} title={title} heading={heading} desc={desc} />

		{pageBuilder && <PageBuilder pageBuilder={pageBuilder} />}

		<CallToAction
			heading={ctaHeading}
			buttonLabel={ctaButtonLabel}
			isCtaOverridden={isCtaOverridden}
			overrideHeading={ctaOverrideHeading}
			overrideButtonLabel={ctaOverrideButtonLabel}
			email={email}
			linkedin={linkedin}
			twitter={twitter}
		/>
	</Modal>
);

// Exports
// ------------
Activation.displayName = 'Activation';
export default Activation;
