'use client';

// Imports
// ------------
import { gql, useSuspenseQuery } from '@apollo/client';

// Dynamic Caching
// ------------
export const dynamic = 'force-dynamic';

// Query
// ------------
const query = gql`
    query {
        home {
            title
        }
    }
`;

// Export Hook
// ------------
export const useData = () => {
    const { data } = useSuspenseQuery(query, {
        suspense: true,
    });

    return data;
};
