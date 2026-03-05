// Imports
// ------------
import type { Metadata } from 'next';
import '@/theme/tackl/waffl/WebComponent';
import Client from './Client';
import Server from './Server';

// Styles
// ------------
import '@css/global.css';

// Metadata
// ------------
export const metadata: Metadata = {
	other: {
		'apple-mobile-web-app-title': 'ONYX',
	},
};

// Component
// ------------
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<Client>
			<Server>{children}</Server>
		</Client>
	);
};

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';
export default RootLayout;
