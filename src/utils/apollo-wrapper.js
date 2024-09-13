'use client';

import React from 'react';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
	ApolloNextAppProvider,
	SSRMultipartLink,
	ApolloClient,
	InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

function makeClient() {
	const httpLink = new HttpLink({
		uri: 'https://graphql.datocms.com/',
		headers: {
			Authorization: `Bearer a4c6fe59e2ab3be824f5c4c5a29c70`,
		},
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link:
			typeof window === 'undefined'
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
					])
				: httpLink,
	});
}

export const ApolloWrapper = ({ children }) => {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
};
