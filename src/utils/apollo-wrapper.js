'use client';

import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

function makeClient() {
    const httpLink = new HttpLink({
        uri: 'https://graphql.datocms.com/',
        headers: {
            Authorization: `Bearer change_me`,
        },
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
        ssrMode: typeof window === 'undefined',
    });
}

export const ApolloWrapper = ({ children }) => {
    const client = makeClient();
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
