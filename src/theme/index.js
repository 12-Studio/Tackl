// Theme Configuration Documentation
// ===============================
// This file exports a theme object and global styles for use with styled-components.
// The theme provides consistent styling tokens across the application.
// Access theme values in styled-components via props.theme:
// ${props => props.theme.colors.brand.bc1[50]} (50% opacity)
// ${props => props.theme.colors.brand.bc1.solid} (solid color or you could use 100)

// Imports
// -------
import { css, createGlobalStyle } from 'styled-components';
import Color from 'color';

// Brand Colors
// -------------
// Core brand colors that serve as the base for all color variations
const brandColors = {
    bc1: '#8000FF', // Primary Purple
    bc2: '#380377', // Dark Purple
    bc3: '#121212', // Near Black
    bc4: '#F7F7F7', // Off White
    bc5: '#838383', // Gray
};

// Generate Alpha Shades (0.0 to 1.0 opacity)
// ------------
// Creates opacity variations from 0.0 to 1.0 for any color
// Usage: ${props => props.theme.colors.brand.bc1[50]} (50% opacity)
const generateAlphaShades = baseColor => {
    const color = Color(baseColor);
    const shades = {};

    for (let i = 0; i <= 100; i += 5) {
        shades[i] = color
            .alpha(i / 100)
            .rgb()
            .string();
    }

    return shades;
};

// Cache commonly used alpha shades
const whiteAlphas = generateAlphaShades('#ffffff');
const blackAlphas = generateAlphaShades('#000000');

// Generate brand color variations including transparency
// Usage: ${props => props.theme.colors.brand.bc1[0]} (fully transparent)
// Usage: ${props => props.theme.colors.brand.bc1[80]} (80% opacity)
// Usage: ${props => props.theme.colors.brand.bc1.solid} (solid color)
const brandColorVariations = Object.entries(brandColors).reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]: {
            ...generateAlphaShades(value),
            solid: value,
        },
    };
}, {});

// Theme Configuration
// ------------
// Usage in styled-components:
// ${props => props.theme.colors.brand.bc1[50]} (50% opacity)
// ${props => props.theme.space.medium}
// ${props => props.theme.font.family.heading}
export const theme = {
    // Color Tokens
    // Usage: ${props => props.theme.colors.global.white[50]} (50% opacity)
    // Usage: ${props => props.theme.colors.global.white.solid}
    // Usage: ${props => props.theme.colors.social.facebook}
    // Usage: ${props => props.theme.colors.feedback.positive}
    colors: {
        global: {
            white: {
                ...whiteAlphas, // Usage: props.theme.colors.global.white[50]
                solid: '#ffffff',
            },
            black: {
                ...blackAlphas, // Usage: props.theme.colors.global.black[50]
                solid: '#000000',
            },
        },

        social: {
            facebook: '#1877f2',
            twitter: '#1da1f2',
            creativeMarket: '#8ba753',
            slack: '#e01563',
            instagram: '#405de6',
            dribbble: '#ea4c89',
            linkedin: '#0a66c2',
        },

        feedback: {
            positive: '#3adb76',
            negative: '#cc4b37',
            warning: '#ffae00',
        },

        brand: brandColorVariations,
    },

    // Spacing Tokens
    // Usage: ${props => props.theme.space.medium}
    space: {
        mpad: '0.8rem', // Mobile Padding
        small: '4.8rem',
        medium: '5.6rem',
        large: '6.4rem',
        xlarge: '6.4rem',
    },

    // Typography Tokens
    // Usage: ${props => props.theme.font.family.heading}
    // Usage: ${props => props.theme.font.weight.bold}
    font: {
        family: {
            heading: `'Change__me', 'Helvetica', Arial, sans-serif`,
            mono: `'Change__me', 'Helvetica', Arial, sans-serif`,
            hand: `'Change__me', 'Helvetica', Arial, sans-serif`,
            body: `'Change__me', 'Helvetica', Arial, sans-serif`,
        },
        weight: {
            light: 300,
            regular: 400,
            medium: 500,
            semi: 600,
            bold: 700,
        },
    },

    // Grid System Configuration
    // Used by the Grid component
    // See: src/theme/waffl/index.ts
    grid: {
        columns: {
            mobile: 2,
            tablet: 6,
            desktop: 12,
        },
        breakpoints: {
            small: '0px',
            smedium: '390px',
            medium: '700px',
            large: '1024px',
            xlarge: '1200px',
            xxlarge: '1400px',
            huge: '1600px',
            uber: '1800px',
        },
        gutter: {
            small: '2.4rem',
            medium: '2.4rem',
            large: '3.6rem',
        },
        maxSize: '1440px',
    },

    // Animation Tokens
    // Usage: ${props => `transition: all ${props.theme.easing.ease}`}
    easing: {
        bezzy: 'cubic-bezier(0.8, 0, 0, 1)',
        bezzy2: 'cubic-bezier(0.430, 0.195, 0.020, 1.000)',
        ease: '0.3s ease-in-out',
    },

    // Utility Styles
    // Usage: ${props => props.theme.noscrollbars}
    noscrollbars: css`
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
            background: transparent;
        }
    `,
};

// Global Styles
// ------------
// Automatically applied to the entire application
export const GlobalStyle = createGlobalStyle`
	body { background: ${theme.colors.brand.bc3[100]}; }
	* { color: ${theme.colors.brand.bc4[100]}; }
`;
