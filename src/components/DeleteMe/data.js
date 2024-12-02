'use client';

// Imports
// ------------
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

// Dynamic Caching
// ------------
export const dynamic = 'force-dynamic';

// Query
// ------------
const query = gql`
    query {
        example {
            changeme
        }
    }
`;

// Export Hook
// ------------
export const useData = () => {
    const { data } = useQuery(query, {
        suspense: true,
    });
    return data;
};
