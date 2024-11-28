'use client';

import React from 'react';
import { ApolloLink, HttpLink, ApolloProvider } from '@apollo/client';
import {
	ApolloClient,
	SSRMultipartLink,
	InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

// Configuration for Apollo Client
const GRAPHQL_ENDPOINT = 'https://levinriegner.com/graphql';

/**
 * Creates and configures the Apollo Client instance
 *
 * Features:
 * - SSR support with Next.js
 * - In-memory caching
 * - Multipart responses for better performance
 * - Easy auth token integration (see commented section)
 */
function makeClient() {
	// Basic HTTP connection to GraphQL endpoint
	const httpLink = new HttpLink({
		uri: GRAPHQL_ENDPOINT,
		// Optional performance settings
		fetchOptions: {
			cache: 'no-store', // Disable fetch cache for fresh data
		},
	});

	// Uncomment and configure to add authentication
	/* 
	const authLink = setContext((_, { headers }) => {
		const token = 'YOUR_AUTH_TOKEN';
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	});
	*/

	// Create optimized Apollo Client
	return new ApolloClient({
		// Configure cache
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						// Add field policies here for cache behavior
					},
				},
			},
		}),
		// Configure network layer based on environment
		link:
			typeof window === 'undefined'
				? ApolloLink.from([
						// Enable streaming responses in SSR
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
				  ])
				: httpLink,
		// Additional performance options
		defaultOptions: {
			watchQuery: {
				fetchPolicy: 'cache-first',
				nextFetchPolicy: 'cache-first',
			},
		},
	});
}

export const ApolloWrapper = ({ children }) => {
	const client = makeClient();
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
