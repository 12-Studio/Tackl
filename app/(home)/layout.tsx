// Imports
// ------------
import { performRequest } from '@utils/datocms';
import { EVERYTHING } from './query';
import type { Metadata } from 'next';

// Data fetching at build time
// ------------
async function getAllData() {
	try {
		const data = await performRequest(EVERYTHING);
		return data;
	} catch (error) {
		console.error('Failed to fetch data from DatoCMS:', error);
		// Return fallback data or null to prevent app crash
		return null;
	}
}

// SEO Metadata
// ------------
export async function generateMetadata(): Promise<Metadata> {
	const { seo } = await getAllData();

	const FALLBACK = {
		title: 'ONYX',
		desc: 'Unlock premium data + inventory across CTV, Video, and Display with supply-side targeting that drives lower CPAs and higher win rates.',
		image: '/og.jpg',
		twitterCard: 'summary_large_image',
	};

	return {
		title: seo?.meta?.title ?? FALLBACK.title,
		metadataBase: new URL('https://onyxproject.com'),

		// Basic Metadata
		description: seo?.meta?.desc ?? FALLBACK.desc,
		keywords:
			'ONYX, data, inventory, CTV, Video, Display, supply-side targeting, lower CPAs, higher win rates',
		robots: 'index, follow',

		// Open Graph
		openGraph: {
			type: 'website',
			title: seo?.meta?.title ?? FALLBACK.title,
			description: seo?.meta?.desc ?? FALLBACK.desc,
			url: 'https://onyxproject.com',
			siteName: 'ONYX',
			locale: 'en_US',
			images: [
				{
					url: seo?.meta?.image?.url ?? FALLBACK.image,
					width: 1200,
					height: 630,
					alt: 'ONYX OpenGraph Image',
					type: 'image/jpeg', // Missing: image type
				},
			],
		},

		// Twitter
		twitter: {
			card: seo?.meta?.twitterCard ?? FALLBACK.twitterCard,
			// site: '@username', // Missing: Twitter @username
			// creator: '@username', // Missing: content creator's Twitter
			title: seo?.meta?.title ?? FALLBACK.title,
			description: seo?.meta?.desc ?? FALLBACK.desc,
			images: [
				{
					url: seo?.meta?.image?.url ?? FALLBACK.image,
					width: 1200,
					height: 630,
					alt: 'ONYX OpenGraph Image',
				},
			],
		},

		// Verification
		// verification: {
		// 	// Missing: site verification
		// 	google: 'google-site-verification-code',
		// 	yandex: 'yandex-verification-code',
		// 	other: {
		// 		me: ['your-social-profile-url'],
		// 	},
		// },
	};
}

// Component
// ------------
const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};

// Exports
// ------------
Layout.displayName = 'Layout';
export default Layout;
