'use client';

// Imports
// ------------
import '@parts/AnimationPlugins';
import Contexts from '@parts/Contexts';
import CookieBar from '@parts/CookieBar';
import dynamic from 'next/dynamic';

// Dev Tools
// ------------
// NOTE • Loaded lazily and only in development, so neither the overlay's JS
// nor its CSS ships in production builds
const GridExposer = process.env.NODE_ENV === 'development' ? dynamic(() => import('@parts/GridExposer')) : null;

// Component
// ------------
// NOTE • Client-side providers only — the document shell (html/body) and all
// site chrome live in app/(site)/layout.tsx, so page content stays
// server-rendered. Styles need no provider: they're static CSS.
const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* GridExposer only rendered in development environment */}
			{GridExposer && <GridExposer />}

			{/* CookieBar only rendered in production environment */}
			{process.env.NODE_ENV === 'production' && <CookieBar />}

			<Contexts>{children}</Contexts>
		</>
	);
};

// Exports
// ------------
Providers.displayName = 'Providers';
export default Providers;
