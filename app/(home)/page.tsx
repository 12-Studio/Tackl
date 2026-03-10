// Imports
// ------------

import Hero from '@parts/Hero';
import { performRequest } from '@utils/datocms';
import { EVERYTHING } from './query';
import Activation from '@parts/Activation';

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
	const { home, activation, dataSupply, about } = await getAllData();

	// Create menu items array
	const menuItemsArray = [
		{ label: activation.title, icon: 'activation' },
		{ label: dataSupply.title, icon: 'dataSupply' },
		{ label: about.title, icon: 'about' },
	];

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
				title={activation.title}
				heading={activation.heading}
				desc={activation.desc}
				logoMarquee={activation.logoMarquee}
				pageBuilder={activation.pageBuilder}
				isCtaOverriden={activation?.isCtaOverriden}
				ctaHeading={activation?.ctaHeading}
				ctaButtonLabel={activation?.ctaButtonLabel}
			/>
		</main>
	);
};

// Exports
// ------------
export default Page;
