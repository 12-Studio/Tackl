'use client';

// Imports
// ------------
import '@parts/AnimationPlugins';
import Contexts from '@parts/Contexts';
import CookieBar from '@parts/CookieBar';
import GridExposer from '@parts/GridExposer';
import { GlobalStyle, theme } from '@theme';
import StyledComponentsRegistry from '@utils/registry';
import { ThemeProvider } from 'styled-components';

// Component
// ------------
// NOTE • Client-side providers only — the document shell (html/body) and all
// site chrome live in app/layout.tsx, so page content stays server-rendered.
const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<StyledComponentsRegistry>
			<ThemeProvider theme={theme}>
				<GlobalStyle />

				{/* GridExposer only rendered in development environment */}
				{process.env.NODE_ENV === 'development' && <GridExposer />}

				{/* CookieBar only rendered in production environment */}
				{process.env.NODE_ENV === 'production' && <CookieBar />}

				<Contexts>{children}</Contexts>
			</ThemeProvider>
		</StyledComponentsRegistry>
	);
};

// Exports
// ------------
Providers.displayName = 'Providers';
export default Providers;
