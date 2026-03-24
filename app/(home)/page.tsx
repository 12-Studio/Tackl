// Imports
// ------------
// import { performRequest } from '@utils/datocms';
// import { GET_HOME } from '../queries/getHome';
import DeleteMe from '@parts/DeleteMe';

// Data fetching at build time
// ------------
// async function getHomeData() {
// 	try {
// 		const data = await performRequest(GET_HOME);
// 		return data;
// 	} catch (error) {
// 		console.error('Failed to fetch data from DatoCMS:', error);
// 		// Return fallback data or null to prevent app crash
// 		return null;
// 	}
// }

// Component
// ------------
const Page = async () => {
	// const data = await getHomeData();

	return (
		<>
			<DeleteMe />
			<div style={{ height: '1000px' }}></div>
		</>
	);
};

// Exports
// ------------
export default Page;
