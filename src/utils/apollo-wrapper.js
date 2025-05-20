'use client';

import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

function makeClient() {
    const httpLink = new HttpLink({
        uri: 'https://graphql.datocms.com/',
        headers: {
            Authorization: `Bearer 6115697da72921825459258d06bdc5`,
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
