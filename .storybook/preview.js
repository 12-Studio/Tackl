/** @type { import('@storybook/react').Preview } */

import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from 'styled-components';
import { theme } from '@theme';

const customViewports = {
    mobile: {
        name: 'Phone',
        styles: {
            width: '390px',
            height: '640px',
        },
    },
    tablet: {
        name: 'Tablet',
        styles: {
            width: '768px',
            height: '1024px',
        },
    },
    notebook: {
        name: 'Notebook',
        styles: {
            width: '1200px',
            height: '768px',
        },
    },
    laptop: {
        name: 'Laptop',
        styles: {
            width: '1440px',
            height: '800px',
        },
    },
    desktop: {
        name: 'Desktop',
        styles: {
            width: '1600px',
            height: '1200px',
        },
    },
};

// Create a theme decorator that wraps MDX content
const withTheme = StoryFn => (
    <ThemeProvider theme={theme}>
        <StoryFn />
    </ThemeProvider>
);

export const decorators = [
    withTheme,
    withThemeFromJSXProvider({
        themes: {
            light: theme,
        },
        defaultTheme: 'light',
        Provider: ThemeProvider,
    }),
];

const preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        viewport: {
            viewports: customViewports, // newViewports would be an ViewportMap. (see below for examples)
            defaultViewport: 'Desktop',
        },
    },
};

export default preview;
