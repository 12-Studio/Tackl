// Imports
// ------------
import React from 'react';
import PropTypes from 'prop-types';
import { performRequest } from '@utils/datocms';
import { GET_HOME } from '../queries/getHome';

// Component
// ------------
const Layout = async ({ children }) => {
    const { yourQuery } = await performRequest(GET_HOME);

    return children;
};

// SEO Metadata
// ------------
const title = 'Your Meta Title';
const desc = `Your Meta Description`;

export const metadata = {
    // metadataBase: new URL('https://www.pocketchange.us'),
    metadataBase: new URL('https://12-pocketchange.netlify.app'),

    // Basic Metadata
    title: title,
    description: desc,
    keywords:
        'values-driven shopping, ethical business, conscious consumerism, sustainable choices, social impact, local business support, mindful spending, purpose-driven commerce, community impact, responsible shopping, value alignment, ethical marketplace, conscious choices, business discovery, sustainable business, social responsibility, ethical consumption, mission-driven business, purposeful shopping, meaningful purchases',
    robots: 'index, follow',

    // Open Graph
    openGraph: {
        type: 'website',
        title: title,
        description: desc,
        // url: 'https://www.pocketchange.us',
        url: 'https://12-pocketchange.netlify.app',
        siteName: 'Pocketchange',
        locale: 'en_US',
        images: [
            {
                url: '/opengraph.jpg',
                width: 1200,
                height: 630,
                alt: title,
                type: 'image/jpeg',
            },
        ],
    },

    // Twitter
    twitter: {
        card: 'summary_large_image',
        site: '@pocketchange',
        creator: '@pocketchange',
        title: title,
        description: desc,
        image: 'please_change_this',
    },

    // Schema.org
    schema: {
        '@context': 'https://schema.org',
        '@type': 'please_change_this',
        name: 'please_change_this',
        description: desc,
        url: 'please_change_this',
        image: 'please_change_this',
        author: {
            '@type': 'Person',
            name: 'Author Name',
        },
        datePublished: 'YYYY-MM-DD',
        dateModified: 'YYYY-MM-DD',
    },

    // Additional Options
    alternates: {
        canonical: 'https://pocketchange.us/',
        languages: {
            'en-US': 'https://pocketchange.us/',
        },
    },

    // Verification
    verification: {
        google: 'google-site-verification-code',
        yandex: 'yandex-verification-code',
        other: {
            me: ['your-social-profile-url'],
        },
    },
};

// PropTypes
// ------------
Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exports
// ------------
Layout.displayName = 'Layout';
export default Layout;
