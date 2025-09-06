'use client';

// Imports
// ------------
import dynamic from 'next/dynamic';
import StyledComponentsRegistry from '@utils/registry';
import SmoothScroll from '@parts/SmoothScroll';
import CookieBar from '@parts/CookieBar';
import Contexts from '@parts/Contexts';
import AnimationPlugins from '@parts/AnimationPlugins';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '@theme';
import { inter } from '@theme/fonts';

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
        <html lang="en">
            <body className={classes}>
                <StyledComponentsRegistry>
                    {/* ThemeProvider with explicit key to help React's reconciliation process */}
                    <ThemeProvider theme={theme} key="themeprovider">
                        <GlobalStyle />

                        {/* GridExposer only rendered in development environment */}
                        {process.env.NODE_ENV === 'development' && <GridExposer />}

                        {/* CookieBar only rendered in production environment */}
                        {process.env.NODE_ENV === 'production' && (
                            <CookieBar />
                        )}

                        <Contexts>
                            <AnimationPlugins />
                            <SmoothScroll>{children}</SmoothScroll>
                        </Contexts>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
};

// Exports
// ------------
Client.displayName = 'Client';
export default Client;
