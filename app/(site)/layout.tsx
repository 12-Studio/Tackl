// Imports
// ------------
import Header from '@parts/Header';
import SmoothScroll from '@parts/SmoothScroll';
import { inter } from '@theme/fonts';
import { ViewTransitions } from '@utils/viewTransitions';
import type { Metadata, Viewport } from 'next';
import { isSiteUrlConfigured, siteUrl } from '@/config';
import Providers from './Providers';

// Styles
// ------------
import '@css/global.css';

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
	// NEXT_PUBLIC_SITE_URL can't be indexed under the changeme.com fallback
	robots: {
		index: isSiteUrlConfigured,
		follow: isSiteUrlConfigured,
	},
	openGraph: {
		type: 'website',
		siteName: 'Tackl',
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
		<ViewTransitions>
			<html lang='en' className={inter.variable} suppressHydrationWarning>
				<body>
					<Providers>
						<Header />

						<main id='page'>
							<SmoothScroll>{children}</SmoothScroll>
						</main>

						{/* NOTE • A non-fixed Footer belongs inside the scrolled content — render it at the end of your page, inside SmoothScroll */}
					</Providers>
				</body>
			</html>
		</ViewTransitions>
	);
};

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';
export default RootLayout;
