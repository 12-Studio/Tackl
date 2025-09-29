// Imports
// ------------
// import { performRequest } from '@utils/datocms';
// import { GET_HOME } from '../queries/getHome';
// import { Metadata } from 'next';
import Content from './Content';

// Data fetching at build time
// ------------
// async function getHomeData() {
// 	try {
// 		const data = await performRequest(GET_HOME);
// 		return data;
// 	} catch (error) {
// 		console.error('Failed to fetch data from DatoCMS:', error);
// 		// Return fallback data or null to prevent app crash
// 		return null;
// 	}
// }

// Component
// ------------
const Page = async () => {
	// const data = await getHomeData();

	return <Content data={{ page: null }} />;
};

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

// Exports
// ------------
export default Page;
