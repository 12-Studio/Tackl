// Imports
// ------------
import { executeQuery } from '@datocms/cda-client';

// Perform Request
// ------------
export const performRequest = async (query, options) => {
    const queryResponse = await executeQuery(query, {
        ...options,
        token: process.env.NEXT_DATOCMS_API_TOKEN,
        // environment: process.env.NODE_ENV,
    });

    return queryResponse;
};
