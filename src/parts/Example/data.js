'use client';

// Imports
// ------------
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { gql } from '@apollo/client';

// Dynamic Caching
// ------------
export const dynamic = 'force-dynamic';

// Query
// ------------
const query = gql`
	query {
		launchLatest {
			mission_name
		}
	}
`;

// Export Hook
// ------------
export const useData = () => {
	const { data } = useSuspenseQuery(query);
	return data;
};
