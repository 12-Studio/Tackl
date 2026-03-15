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
}: I.DataSupplyProps) => (
	<Modal title={title}>
		<Hero title={title} heading={heading} desc={desc} usaCoverage={usaCoverage} />

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
DataSupply.displayName = 'DataSupply';
export default DataSupply;
