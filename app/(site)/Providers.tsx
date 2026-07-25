'use client';

// Imports
// ------------
import '@parts/AnimationPlugins';
import Contexts from '@parts/Contexts';
import CookieBar from '@parts/CookieBar';
import GridExposer from '@parts/GridExposer';
// tackl:setup-start — first-run theme wizard, removes itself when setup completes
import TacklSetup from '@parts/TacklSetup';
// tackl:setup-end
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

				{/* tackl:setup-start */}
				{/* First-run theme setup — deletes itself once the theme is saved */}
				{process.env.NODE_ENV === 'development' && <TacklSetup />}
				{/* tackl:setup-end */}

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
