// Theme Configuration Documentation
// ===============================
// This file exports a theme object and global styles for use with styled-components.
// The theme provides consistent styling tokens across the application.
// Access theme values in styled-components via props.theme:
// ${props => props.theme.colors.brand.bc1[50]} (50% opacity)
// ${props => props.theme.colors.brand.bc1.solid} (solid color or you could use 100)
//
// Theme Structure
// --------------
// colors:
//   - global: Common colors like white/black with alpha variations
//   - social: Social media platform colors
//   - feedback: Colors for success/error/warning states
//   - brand: Core brand colors with alpha variations
//
// space:
//   Consistent spacing tokens for margins/padding
//   mpad: Mobile-specific padding
//   small-xlarge: Responsive spacing scales
//
// font:
//   Typography configuration
//   family: Font families for different text styles
//   weight: Standard font weights from light to bold
//
// grid:
//   Layout system configuration
//   columns: Responsive column counts
//   breakpoints: Screen size breakpoints
//   gutter: Space between grid columns
//   maxSize: Maximum content width
//
// easing:
//   Animation timing functions
//   bezzy/bezzy2: Custom cubic-bezier curves
//   ease: Standard easing
//
// noscrollbars:
//   Utility to hide scrollbars across browsers

// Imports
// -------
import { css, createGlobalStyle } from 'styled-components';
import Color from 'color';

// Types
// ------
type BrandColors = {
    bc1: string;
    bc2: string;
    bc3: string;
    bc4: string;
    bc5: string;
}

type AlphaShades = {
    [key: number]: string;
    solid: string;
}

type BrandColorVariations = {
    [K in keyof BrandColors]: AlphaShades;
}

export type Theme = {
    colors: {
        global: {
            white: AlphaShades;
            black: AlphaShades;
        };
        social: {
            facebook: string;
            twitter: string;
            creativeMarket: string;
            slack: string;
            instagram: string;
            dribbble: string;
            linkedin: string;
        };
        feedback: {
            positive: string;
            negative: string;
            warning: string;
        };
        brand: BrandColorVariations;
    };
    space: {
        mpad: string;
        s: string;
        m: string;
        l: string;
        xl: string;
        col: string;
        colx2: string;
    };
    gap: {
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
        xxl: string;
        huge: string;
        uber: string;
    },
    font: {
        family: {
            heading: string;
            mono: string;
            hand: string;
            body: string;
        };
        weight: {
            light: number;
            regular: number;
            medium: number;
            semi: number;
            bold: number;
        };
    };
    grid: {
        columns: {
            mobile: number;
            tablet: number;
            desktop: number;
        };
        breakpoints: {
            s: string;
            sm: string;
            m: string;
            l: string;
            xl: string;
            xxl: string;
            huge: string;
            uber: string;
        };
        gutter: {
            s: string;
            m: string;
            l: string;
        };
        maxSize: string;
    };
    easing: {
        bezzy: string;
        bezzy2: string;
        bezzy3: string;
        ease: string;
    };
    noscrollbars: ReturnType<typeof css>;
}

// Brand Colors
// -------------
// Core brand colors that serve as the base for all color variations
const brandColors: BrandColors = {
    bc1: '#8000FF', // Primary Purple
    bc2: '#380377', // Dark Purple
    bc3: '#210048', // Near Black
    bc4: '#F7F7F7', // Off White
    bc5: '#838383', // Gray
};

// Generate Alpha Shades (0.0 to 1.0 opacity)
// ------------
// Creates opacity variations from 0.0 to 1.0 for any color
// Usage: ${props => props.theme.colors.brand.bc1[50]} (50% opacity)
const generateAlphaShades = (baseColor: string): Omit<AlphaShades, 'solid'> => {
    const color = Color(baseColor);
    const shades: { [key: number]: string } = {};

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
const brandColorVariations: BrandColorVariations = Object.entries(brandColors).reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]: {
            ...generateAlphaShades(value),
            solid: value,
        },
    };
}, {} as BrandColorVariations);

// Theme Configuration
// ------------
// Usage in styled-components:
// ${props => props.theme.colors.brand.bc1[50]} (50% opacity)
// ${props => props.theme.space.medium}
// ${props => props.theme.font.family.heading}
export const theme: Theme = {
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
        mpad: '1.2rem', // Mobile Padding
        s: '4.8rem',
        m: '6rem',
        l: '8.4rem',
        xl: '12rem',
        col: 'clamp(8.333vh, 8.333vw, 100vw)',
        colx2: 'clamp(6.666vh, 16.666vw, 100vw)',
        
    },

    // Gap Tokens
    // Usage: ${props => props.theme.gap.s}
    gap: {
        xs: '0.4rem',
        s: '0.8rem',
        m: '1.6rem',
        l: '2.4rem',
        xl: '3.2rem',
        xxl: '4rem',
        huge: '4.8rem',
        uber: '6.4rem',
    },

    // Typography Tokens
    // Usage: ${props => props.theme.font.family.heading}
    // Usage: ${props => props.theme.font.weight.bold}
    font: {
        family: {
            heading: `var(--inter), 'Times', Arial, sans-serif`,
            mono: `var(--inter) 'Times', Arial, sans-serif`,
            hand: `var(--inter)', 'Times', Arial, sans-serif`,
            body: `var(--inter), 'Times', Arial, sans-serif`,
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
            s: '0px',
            sm: '390px',
            m: '700px',
            l: '1024px',
            xl: '1200px',
            xxl: '1400px',
            huge: '1600px',
            uber: '1800px',
        },
        gutter: {
            s: '2.4rem',
            m: '2.4rem',
            l: '3.6rem',
        },
        maxSize: '1440px',
    },

    // Animation Tokens
    // Usage: ${props => `transition: all ${props.theme.easing.ease}`}
    easing: {
        bezzy: 'cubic-bezier(0.8, 0, 0, 1)',
        bezzy2: 'cubic-bezier(0.430, 0.195, 0.020, 1)',
        bezzy3: 'cubic-bezier(0.5, 0, 0, 1)',
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
// Sets default background and text colors
export const GlobalStyle = createGlobalStyle`
	body { background: ${theme.colors.brand.bc3[100]}; }
	* { color: ${theme.colors.brand.bc4[100]}; }
`;
