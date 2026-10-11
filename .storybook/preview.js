/** @type { import('@storybook/nextjs').Preview } */

import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { inter } from '@theme/fonts';

// Styles
// ------------
// NOTE • Same order as app/(site)/layout.tsx — tokens first, then globals.
// Component modules bring their own CSS; no provider is needed.
import '@/css/tokens.css';
import '@/css/global.scss';

// NOTE • On <html>, like app/(site)/layout.tsx — the --font-* tokens on :root
// read --inter, so it has to be set at the root to resolve
document.documentElement.classList.add(inter.variable);

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

// NOTE • Runtime themes are CSS overrides on html[data-theme] — add a theme
// here once you define its token overrides (see src/theme/index.ts)
export const decorators = [
	withThemeByDataAttribute({
		themes: {
			default: 'default',
		},
		defaultTheme: 'default',
		attributeName: 'data-theme',
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
			viewports: customViewports,
			defaultViewport: 'Desktop',
		},
	},
};

export default preview;
