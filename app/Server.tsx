// Imports
// ------------
import Header from '@parts/Header';
import { performRequest } from '@utils/datocms';
import { EVERYTHING } from './(home)/query';

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
const Server = async ({ children }: { children: React.ReactNode }) => {
	// Fetch data
	const { activation, dataSupply, about } = await getAllData();

	// Create menu items array
	const menuItemsArray = [
		{ label: activation.title },
		{ label: dataSupply.title },
		{ label: about.title },
	];

	return (
		<>
			<Header menuItems={menuItemsArray} />
			{children}
			{/* <Footer /> */}
		</>
	);
};

// Exports
// ------------
Server.displayName = 'Server';
export default Server;
