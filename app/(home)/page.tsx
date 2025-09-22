// Imports
// ------------
import { performRequest } from '@utils/datocms';
import { GET_HOME } from '../queries/getHome';
import Content from './Content';

// Data fetching at build time
// ------------
async function getHomeData() {
	try {
		const data = await performRequest(GET_HOME);
		return data;
	} catch (error) {
		console.error('Failed to fetch data from DatoCMS:', error);
		// Return fallback data or null to prevent app crash
		return null;
	}
}

// Component
// ------------
const Page = async () => {
	const data = await getHomeData();

	return <Content data={data} />;
};

// SEO Metadata
// ------------
export const generateMetadata = async () => {
	const data = await getHomeData();

	return {
		metadataBase: new URL('https://sirio-strategies.com'),

		// Basic Metadata
		title: 'Sirio Strategies - Home',
		description: 'Welcome to Sirio Strategies - Your trusted partner for strategic solutions',
		keywords: 'strategy, consulting, business, solutions',
		robots: 'index, follow',

		// Open Graph
		openGraph: {
			type: 'website',
			title: 'Sirio Strategies - Home',
			description: 'Welcome to Sirio Strategies - Your trusted partner for strategic solutions',
			url: 'https://sirio-strategies.com',
			siteName: 'Sirio Strategies',
			locale: 'en_US',
			images: [
				{
					url: '/og-image.jpg',
					width: 1200,
					height: 630,
					alt: 'Sirio Strategies',
					type: 'image/jpeg',
				},
			],
		},

		// Twitter
		twitter: {
			card: 'summary_large_image',
			site: '@siriostrategies',
			creator: '@siriostrategies',
			title: 'Sirio Strategies - Home',
			description: 'Welcome to Sirio Strategies - Your trusted partner for strategic solutions',
			image: '/og-image.jpg',
		},

		// Schema.org
		schema: {
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Sirio Strategies',
			description: 'Your trusted partner for strategic solutions',
			url: 'https://sirio-strategies.com',
			image: '/og-image.jpg',
			author: {
				'@type': 'Person',
				name: 'Sirio Strategies Team',
			},
			datePublished: '2024-01-01',
			dateModified: '2024-01-01',
		},

		// Additional Options
		alternates: {
			canonical: 'https://sirio-strategies.com',
			languages: {
				'en-US': 'https://sirio-strategies.com',
			},
		},

		// Verification
		verification: {
			google: 'your-google-verification-code',
			yandex: 'your-yandex-verification-code',
		},
	};
};

// Exports
// ------------
export default Page;
