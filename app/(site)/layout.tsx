// Imports
// ------------

import Analytics from '@parts/Analytics';
import { consentScript } from '@parts/CookieBar/consent';
import Header from '@parts/Header';
import SmoothScroll from '@parts/SmoothScroll';
import { inter } from '@theme/fonts';
import type { Metadata, Viewport } from 'next';
import { isSiteUrlConfigured, siteUrl } from '@/config';
import Providers from './Providers';

// Styles
// ------------
import '@css/tokens.css';
import '@css/global.scss';

// SEO
// ------------
// NOTE • Site-wide defaults — override per route with `metadata` or `generateMetadata`
export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: 'Tackl',
		template: '%s — Tackl',
	},
	description: 'The ultimate Next.js starter kit',
	// NOTE • Indexing is gated on a real site URL — a deploy that forgot
	// NEXT_PUBLIC_SITE_URL can't be indexed under the tackl.netlify.app fallback
	robots: {
		index: isSiteUrlConfigured,
		follow: isSiteUrlConfigured,
	},
	// NOTE • The default share image is public/og.jpg (1200 × 630). A page
	// can swap it with its own `metadata`, or generate one with an
	// opengraph-image.tsx beside its page.tsx (see src/utils/ogImage.tsx)
	openGraph: {
		type: 'website',
		siteName: 'Tackl',
		images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Tackl — The ultimate Next.js starter kit' }],
	},
	twitter: {
		card: 'summary_large_image',
		images: ['/og.jpg'],
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#000000',
};

// Component
// ------------
const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' className={inter.variable} suppressHydrationWarning>
			<head>
				{/* NOTE • Marks returning visitors' cookie choice before first paint, so the server-rendered CookieBar never flashes (src/components/CookieBar/consent.ts) */}
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static inline script built from constants — no user input */}
				<script dangerouslySetInnerHTML={{ __html: consentScript }} />
			</head>
			<body>
				<Providers>
					<Header />

					<main id='page'>
						<SmoothScroll>{children}</SmoothScroll>
					</main>

					<Analytics />

					{/* NOTE • A non-fixed Footer belongs inside the scrolled content — render it at the end of your page, inside SmoothScroll */}
				</Providers>
			</body>
		</html>
	);
};

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';
export default RootLayout;
