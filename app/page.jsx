'use client';

// Imports
// ------------
import React from 'react';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { gql } from '@apollo/client';

// GraphQL
// ------------
// Tells the age how to cache content
export const dynamic = 'force-dynamic';

const query = gql`
	query {
		launchLatest {
			mission_name
		}
	}
`;

// Component
// ------------
const Page = () => {
	const { data } = useSuspenseQuery(query);

	console.log(data);

	return <div className="container">{data.launchLatest.mission_name}</div>;
};

export default Page;
