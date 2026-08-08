// Imports
// ------------
// import { fetchContent, GET_HOME } from '@cms';
import DeleteMe from '@parts/DeleteMe';

// Data fetching at build time
// ------------
// NOTE • fetchContent returns null (never throws) when the CMS is missing
// or unconfigured, so wiring this up can't crash the route
// async function getHomeData() {
// 	return await fetchContent(GET_HOME);
// }

// Component
// ------------
const Page = async () => {
	// const data = await getHomeData();

	return <DeleteMe />;
};

// Exports
// ------------
export default Page;
