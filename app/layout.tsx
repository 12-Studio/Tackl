// Imports
// ------------
import '@waffl/WebComponent';
import Client from './Client';
import Server from './Server';

// Styles
// ------------
import '@css/global.css';

// Component
// ------------
const RootLayout = ({ children }) => {
    return (
        <Server>
            <Client>{children}</Client>
        </Server>
    );
};

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';
export default RootLayout;
