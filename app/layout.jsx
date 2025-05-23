'use client';

// Imports
// ------------
import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import StyledComponentsRegistry from '@utils/registry';
import Contexts from '@parts/Contexts';
import CookieBar from '@parts/CookieBar';
import AnimationPlugins from '@parts/AnimationPlugins';
import { useScrollPerformance } from '@utils/useScrollPerformance';
import { ApolloWrapper } from '@utils/apollo-wrapper';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '@theme';
import { inter } from '@theme/fonts';

// Styles
// ------------
import '@/css/global.css';

// Dynamic imports
// ------------
// Lazy load SmoothScroll component since it's not needed for initial render
// Disabled SSR to avoid hydration issues with scroll behavior
const SmoothScroll = dynamic(() => import('@parts/SmoothScroll'), {
    ssr: false,
});

// Lazy load GridExposer since it's only used in development
// Disabled SSR as it's not critical for server rendering
const GridExposer = dynamic(() => import('@parts/GridExposer'), {
    ssr: false,
});

// Component
// ------------
// Using memo to prevent unnecessary re-renders of the root layout
// This is especially important since this component wraps the entire application
const RootLayout = memo(({ children }) => {
    // NOTE • Font Classes
    const classes = `${inter.variable}`;

    // NOTE • Scroll Performance
    useScrollPerformance();

    return (
        <html lang="en">
            <body className={classes}>
                <StyledComponentsRegistry>
                    <ApolloWrapper>
                        {/* ThemeProvider with explicit key to help React's reconciliation process */}
                        <ThemeProvider theme={theme} key="themeprovider">
                            <GlobalStyle />

                            {/* GridExposer only rendered in development environment */}
                            {process.env.NODE_ENV === 'development' && <GridExposer />}

                            {/* CookieBar only rendered in production environment */}
                            {process.env.NODE_ENV === 'production' && <CookieBar />}

                            <Contexts>
                                <AnimationPlugins />
                                <SmoothScroll>{children}</SmoothScroll>
                            </Contexts>
                        </ThemeProvider>
                    </ApolloWrapper>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
});

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';

export default RootLayout;
