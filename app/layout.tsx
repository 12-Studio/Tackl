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
