'use client';

import React from 'react';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	SSRMultipartLink,
	NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
	const httpLink = new HttpLink({
		uri: 'https://levinriegner.com/graphql',
	});

	// Auth token
	// const authLink = setContext((_, { headers }) => {
	// 	const token = 'H1jWFo1zh_9oNJsvmzuf20sFZCeh3yPK';

	// 	return {
	// 		headers: {
	// 			...headers,
	// 			authorization: token ? `Bearer ${token}` : '',
	// 		},
	// 	};
	// });

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
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
