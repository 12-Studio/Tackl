'use client';

// Imports
// ------------
import '@theme/tackl/waffl/WebComponent';
import '@parts/AnimationPlugins';
import Contexts from '@parts/Contexts';
import CookieBar from '@parts/CookieBar';
import SmoothScroll from '@parts/SmoothScroll';
import { GlobalStyle, theme } from '@theme';
import { inter } from '@theme/fonts';
import StyledComponentsRegistry from '@utils/registry';
import { ViewTransitions } from '@utils/viewTransitions';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'styled-components';

// Lazy load GridExposer since it's only used in development
// Disabled SSR as it's not critical for server rendering
const GridExposer = dynamic(() => import('@parts/GridExposer'), {
	ssr: false,
});

// Component
// ------------
const Client = ({ children }: { children: React.ReactNode }) => {
	// NOTE • Font Classes
	const classes = `${inter.variable}`;

	return (
		<ViewTransitions>
			<html lang='en' className={classes} suppressHydrationWarning>
				<body>
					<main id='page' style={{ viewTransitionName: 'page' }}>
						<StyledComponentsRegistry>
							<ThemeProvider theme={theme} key='themeprovider'>
								<GlobalStyle />

								{/* GridExposer only rendered in development environment */}
								{process.env.NODE_ENV === 'development' && <GridExposer />}

								{/* CookieBar only rendered in production environment */}
								{process.env.NODE_ENV === 'production' && <CookieBar />}

								<Contexts>
									<SmoothScroll>{children}</SmoothScroll>
								</Contexts>
							</ThemeProvider>
						</StyledComponentsRegistry>
					</main>
				</body>
			</html>
		</ViewTransitions>
	);
};

// Exports
// ------------
Client.displayName = 'Client';
export default Client;
