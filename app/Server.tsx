// Imports
// ------------
import Header from '@parts/Header';

// import { performRequest } from '@utils/datocms';
// import { GET_GLOBAL } from '@queries/getGlobal';

// Data fetching at build time
// ------------
// async function getGlobalData() {
//     try {
//         const data = await performRequest(GET_GLOBAL);
//         return data;
//     } catch (error) {
//         console.error('Failed to fetch data from DatoCMS:', error);
//         // Return fallback data or null to prevent app crash
//         return null;
//     }
// }

// Component
// ------------
const Server = async ({ children }: { children: React.ReactNode }) => {
	// const data = await getGlobalData();

	return (
		<>
			<Header />
			{children}
			{/* <Footer /> */}
		</>
	);
};

// Exports
// ------------
Server.displayName = 'Server';
export default Server;
