'use client';

// Imports
// ------------
import '@theme/tackl/waffl/WebComponent';
import '@parts/AnimationPlugins';
import Contexts from '@parts/Contexts';
import CookieBar from '@parts/CookieBar';
import GridExposer from '@parts/GridExposer';
import SmoothScroll from '@parts/SmoothScroll';
import { GlobalStyle, theme } from '@theme';
import { inter } from '@theme/fonts';
import StyledComponentsRegistry from '@utils/registry';
import { ViewTransitions } from '@utils/viewTransitions';
import { ThemeProvider } from 'styled-components';

// Component
// ------------
const Client = ({
	children,
	sanityLive,
}: {
	children: React.ReactNode;
	sanityLive?: React.ReactNode;
}) => {
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
					{sanityLive}
				</body>
			</html>
		</ViewTransitions>
	);
};

// Exports
// ------------
Client.displayName = 'Client';
export default Client;
