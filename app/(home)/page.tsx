// Imports
// ------------

import Hero from '@parts/Hero';
import { performRequest } from '@utils/datocms';
import { HOME } from './query';

async function getHomeData() {
	try {
		const data = await performRequest(HOME);
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
	const { home, activation, dataSupply, about } = await getHomeData();

	// Create menu items array
	const menuItemsArray = [
		{ label: activation.title },
		{ label: dataSupply.title },
		{ label: about.title },
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
		</main>
	);
};

// Exports
// ------------
export default Page;
