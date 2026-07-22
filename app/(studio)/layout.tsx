// Imports
// ------------
import type { Metadata, Viewport } from 'next';

// SEO
// ------------
export const metadata: Metadata = {
	title: 'Sanity Studio',
	robots: { index: false, follow: false },
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

// Component
// ------------
// NOTE • Second root layout — a bare shell for the embedded Studio, so it
// renders without the site chrome (Lenis, theme providers, Header). The
// main site lives under app/(site).
const StudioLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
};

// Exports
// ------------
StudioLayout.displayName = 'StudioLayout';
export default StudioLayout;
