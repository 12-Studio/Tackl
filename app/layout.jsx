'use client';

// Imports
// ------------
import React from 'react';
import ClientWrapper from './ClientWrapper';
import { inter } from '@theme/fonts';

// Styles
// ------------
import '@waffl/WebComponent';
import '@css/global.css';

// Component
// ------------
const RootLayout = ({ children }) => {
    // NOTE • Font Classes
    const classes = `${inter.variable}`;

    return (
        <html lang="en">
            <body className={classes}>
                <ClientWrapper>{children}</ClientWrapper>
            </body>
        </html>
    );
};

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';

export default RootLayout;
