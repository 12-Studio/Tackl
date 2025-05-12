// Imports
// ------------
import React from 'react';
import DeleteMe from '@parts/DeleteMe';

// Component
// ------------
const Page = () => {
    return (
        <>
            <DeleteMe />
        </>
    );
};

// SEO Metadata
// ------------
export const metadata = {
    metadataBase: new URL('please_change_this'),

    // Basic Metadata
    title: 'please_change_this',
    description: 'please_change_this',
    keywords: 'keyword1, keyword2, keyword3',
    robots: 'index, follow',

    // Open Graph
    openGraph: {
        type: 'website', // Missing: website, article, product, etc.
        title: 'please_change_this',
        description: 'please_change_this',
        url: 'please_change_this',
        siteName: 'please_change_this', // Missing: website name
        locale: 'en_US', // Missing: locale
        images: [
            {
                url: 'please_change_this',
                width: 1200,
                height: 630,
                alt: 'please_change_this',
                type: 'image/jpeg', // Missing: image type
            },
        ],
    },

    // Twitter
    twitter: {
        card: 'summary_large_image', // Corrected from twitterCard
        site: '@username', // Missing: Twitter @username
        creator: '@username', // Missing: content creator's Twitter
        title: 'please_change_this',
        description: 'please_change_this',
        image: 'please_change_this',
    },

    // Schema.org
    schema: {
        '@context': 'https://schema.org', // Missing: context
        '@type': 'please_change_this', // Corrected from schemaType
        name: 'please_change_this',
        description: 'please_change_this',
        url: 'please_change_this',
        image: 'please_change_this',
        author: {
            // Missing: author information
            '@type': 'Person',
            name: 'Author Name',
        },
        datePublished: 'YYYY-MM-DD', // Missing: publication date
        dateModified: 'YYYY-MM-DD', // Missing: modification date
    },

    // Additional Options
    alternates: {
        // Missing: alternative versions
        canonical: 'https://example.com/page',
        languages: {
            'en-US': 'https://example.com/en/page',
            'es-ES': 'https://example.com/es/page',
        },
    },

    // Verification
    verification: {
        // Missing: site verification
        google: 'google-site-verification-code',
        yandex: 'yandex-verification-code',
        other: {
            me: ['your-social-profile-url'],
        },
    },
};

// Exports
// ------------
export default Page;
