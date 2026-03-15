'use client';

// Imports
// ------------
import '@parts/AnimationPlugins';
import Contexts from '@parts/Contexts';
// import CookieBar from '@parts/CookieBar';
import Cursor from '@parts/Cursor';
import { GlobalStyle, theme } from '@theme';
import { neueHaas, pp } from '@theme/fonts';
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
	return (
		<ViewTransitions>
			<html
				lang='en'
				className={`${neueHaas.variable} ${pp.variable}`}
				suppressHydrationWarning
			>
				<body>
					<StyledComponentsRegistry>
						<ThemeProvider theme={theme} key='themeprovider'>
							<GlobalStyle />

							{/* GridExposer only rendered in development environment */}
							{process.env.NODE_ENV === 'development' && <GridExposer />}

							{/* CookieBar only rendered in production environment */}
							{/* {process.env.NODE_ENV === 'production' && <CookieBar />} */}

							<Contexts>
								<Cursor />
								{children}
							</Contexts>
						</ThemeProvider>
					</StyledComponentsRegistry>
				</body>
			</html>
		</ViewTransitions>
	);
};

// Exports
// ------------
Client.displayName = 'Client';
export default Client;
