// Imports
// ------------
import PropTypes from 'prop-types';
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
const Server = async ({ children }) => {
    // const data = await getGlobalData();

    return (
        <>
            <Header data={null} />
            {children}
            {/* <Footer /> */}
        </>
    );
};

// PropTypes
// ------------
Server.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exports
// ------------
Server.displayName = 'Server';
export default Server;
