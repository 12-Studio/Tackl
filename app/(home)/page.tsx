// Imports
// ------------
import Hero from '@parts/Hero';
import { performRequest } from '@utils/datocms';
import { EVERYTHING } from './query';
import Activation from '@parts/Activation';
import DataSupply from '@parts/DataSupply';
import About from '@parts/About';
import Contact from '@parts/Contact';

// Lazy Load Modals

// Data fetching at build time
// ------------
async function getAllData() {
	try {
		const data = await performRequest(EVERYTHING);
		return data;
	} catch (error) {
		console.error('Failed to fetch data from DatoCMS:', error);
		// Return fallback data or null to prevent app crash
		return null;
	}
}

// Component
// ------------
const Page = async () => {
	// Fetch data
	const { home, activation, dataSupply, about, cta, contactDetails, contact } =
		await getAllData();

	// Create menu items array
	const menuItemsArray = [
		{ label: activation.title, icon: 'activation' },
		{ label: dataSupply.title, icon: 'dataSupply' },
		{ label: about.title, icon: 'about' },
		{ label: contact.title, icon: 'contact' },
	];

	// Shared CTA props
	const sharedCtaProps = {
		ctaHeading: cta.heading,
		ctaButtonLabel: cta.buttonLabel,
		email: contactDetails?.email,
		linkedin: contactDetails?.linkedin,
		twitter: contactDetails?.twitter,
	};

	return (
		<main>
			<Hero
				menuItems={menuItemsArray}
				title={home.title}
				description={home.desc}
				logos={home.partnerLogos}
				unicornId={home.unicornId}
				video='/stone-desktop.mp4'
			/>

			<Activation
				{...sharedCtaProps}
				title={activation.title}
				heading={activation.heading}
				desc={activation.desc}
				logoMarquee={activation.logoMarquee}
				pageBuilder={activation.pageBuilder}
				isCtaOverridden={activation.isCtaOverridden}
				ctaOverrideHeading={activation.overrideHeading}
				ctaOverrideButtonLabel={activation.overrideButtonLabel}
				contactTitle={contact.title}
			/>

			<DataSupply
				{...sharedCtaProps}
				title={dataSupply.title}
				heading={dataSupply.heading}
				desc={dataSupply.desc}
				usaCoverage={dataSupply.usaCoverage}
				pageBuilder={dataSupply.pageBuilder}
				isCtaOverridden={dataSupply.isCtaOverridden}
				ctaOverrideHeading={dataSupply.overrideHeading}
				ctaOverrideButtonLabel={dataSupply.overrideButtonLabel}
				contactTitle={contact.title}
			/>

			<About
				{...sharedCtaProps}
				title={about.title}
				heading={about.heading}
				desc={about.desc}
				featuredImage={about.featuredImage}
				pageBuilder={about.pageBuilder}
				isCtaOverridden={about.isCtaOverridden}
				ctaOverrideHeading={about.overrideHeading}
				ctaOverrideButtonLabel={about.overrideButtonLabel}
				contactTitle={contact.title}
			/>

			<Contact
				{...sharedCtaProps}
				title={contact.title}
				heading={contact.heading}
				desc={contact.desc}
			/>
		</main>
	);
};

// Exports
// ------------
export default Page;
