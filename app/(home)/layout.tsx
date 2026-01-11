// Imports
// ------------
// import { Metadata } from 'next';

// SEO
// ------------

// SEO Metadata
// ------------
// export async function generateMetadata(): Promise<Metadata> {
//     const data = await getHomeData();

//     return {
//         title: data?.title || 'CHANGE ME',
//         metadataBase: new URL('https://changeme.com'),

//         // Basic Metadata
//         description: 'please_change_this',
//         keywords: 'keyword1, keyword2, keyword3',
//         robots: 'index, follow',

//         // Open Graph
//         openGraph: {
//             type: 'website', // Missing: website, article, product, etc.
//             title: 'please_change_this',
//             description: 'please_change_this',
//             url: 'please_change_this',
//             siteName: 'please_change_this', // Missing: website name
//             locale: 'en_US', // Missing: locale
//             images: [
//                 {
//                     url: 'please_change_this',
//                     width: 1200,
//                     height: 630,
//                     alt: 'please_change_this',
//                     type: 'image/jpeg', // Missing: image type
//                 },
//             ],
//         },

//         // Twitter
//         twitter: {
//             card: 'summary_large_image', // Corrected from twitterCard
//             site: '@username', // Missing: Twitter @username
//             creator: '@username', // Missing: content creator's Twitter
//             title: 'please_change_this',
//             description: 'please_change_this',
//             images: [
//                 {
//                     url: 'please_change_this',
//                     width: 1200,
//                     height: 630,
//                     alt: 'please_change_this',
//                 },
//             ],
//         },

//         // Schema.org (handled via other metadata properties)
//         // Note: Next.js generates structured data from other metadata properties

//         // Additional Options
//         alternates: {
//             // Missing: alternative versions
//             canonical: 'https://example.com/page',
//             languages: {
//                 'en-US': 'https://example.com/en/page',
//                 'es-ES': 'https://example.com/es/page',
//             },
//         },

//         // Verification
//         verification: {
//             // Missing: site verification
//             google: 'google-site-verification-code',
//             yandex: 'yandex-verification-code',
//             other: {
//                 me: ['your-social-profile-url'],
//             },
//         },
//     };
// }

// Component
// ------------
const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};

// Exports
// ------------
Layout.displayName = 'Layout';
export default Layout;
