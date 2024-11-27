'use client';

// Imports
// ------------
import React from 'react';
import StyledComponentsRegistry from '@utils/registry';
import Contexts from '@parts/Contexts/Contexts';
import SmoothScroll from '@parts/SmoothScroll';
import GridExposer from '@parts/GridExposer';
import { ApolloWrapper } from '@utils/apollo-wrapper';
import { ThemeProvider } from 'styled-components';
import { theme } from '@theme';
// import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

// Styles
// ------------
import '@/css/global.css';

// Fonts
// ------------
const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--inter',
});

// Component
// ------------
const RootLayout = ({ children }) => {
	// NOTE • Font Classes
	const classes = `${inter.variable}`;

	return (
		<html lang="en">
			<body className={classes}>
				<StyledComponentsRegistry>
					<ApolloWrapper>
						<ThemeProvider theme={theme} key="themeprovider">
							{process.env.NODE_ENV === 'development' && <GridExposer />}
							<Contexts>
								<SmoothScroll>{children}</SmoothScroll>
							</Contexts>
						</ThemeProvider>
					</ApolloWrapper>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
};

export default RootLayout;
