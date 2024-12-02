# Apollo Client Wrapper Documentation

## Overview

The `apollo-wrapper.js` utility provides a configured Apollo Client instance for GraphQL operations in a Next.js application. It handles both client-side and server-side rendering (SSR) scenarios with optimized caching and performance settings.

## GraphQL Endpoint

The GraphQL endpoint is configured in `src/utils/apollo-wrapper.js`. To change the endpoint:

1. Locate the `GRAPHQL_ENDPOINT` constant at the top of the file:

```javascript
const GRAPHQL_ENDPOINT = 'https://your-endpoint.com/graphql';
```

## Authentication

Enable authentication by uncommenting and configuring the auth section:

```javascript
import { setContext } from '@apollo/client/link/context';

function makeClient() {
    const httpLink = new HttpLink({
        uri: GRAPHQL_ENDPOINT,
    });

    // Add authentication
    const authLink = setContext((_, { headers }) => {
        // Get your token from wherever you store it (localStorage, cookies, etc.)
        const token = 'YOUR_AUTH_TOKEN';

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
                // Add any other headers you need
            },
        };
    });

    return new ApolloClient({
        // ... other config
        link: authLink.concat(httpLink), // Connect auth with http link
    });
}
```

Thats all folks!
