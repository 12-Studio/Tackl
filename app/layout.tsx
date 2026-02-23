// Imports
// ------------
import '@/theme/tackl/waffl/WebComponent';
import Client from './Client';
import Server from './Server';

// Styles
// ------------
import '@css/global.css';

// Component
// ------------
const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Client>
			<Server>{children}</Server>
		</Client>
	);
};

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';
export default RootLayout;
