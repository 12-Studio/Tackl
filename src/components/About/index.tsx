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
}: I.AboutProps) => (
	<Modal title={title}>
		<Hero title={title} heading={heading} desc={desc} featuredImage={featuredImage} />

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
About.displayName = 'About';
export default About;
