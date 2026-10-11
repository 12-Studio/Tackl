'use client';

// Imports
// ------------
import '@parts/AnimationPlugins';
import Contexts from '@parts/Contexts';
import CookieBar from '@parts/CookieBar';
import GridExposer from '@parts/GridExposer';

// Component
// ------------
// NOTE • Client-side providers only — the document shell (html/body) and all
// site chrome live in app/(site)/layout.tsx, so page content stays
// server-rendered. Styles need no provider: they're static CSS.
const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* GridExposer only rendered in development environment */}
			{process.env.NODE_ENV === 'development' && <GridExposer />}

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
