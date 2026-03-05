// Imports
// ------------
import '@/theme/tackl/waffl/WebComponent';
import { draftMode } from 'next/headers';
import Client from './Client';
import Server from './Server';

// Styles
// ------------
import '@css/global.css';

// Component
// ------------
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	// Read draft mode on the server so we can conditionally mount preview-only
	// tooling (eg. Content Link) in the client tree.
	const { isEnabled: isDraftModeEnabled } = await draftMode();

	return (
		<Client isDraftModeEnabled={isDraftModeEnabled}>
			<Server>{children}</Server>
		</Client>
	);
};

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';
export default RootLayout;
