// Imports
// ------------
import '@waffl/WebComponent';
import Contexts from '@parts/Contexts';
import Client from './Client';
import Server from './Server';

// Styles
// ------------
import '@css/global.css';

// Component
// ------------
const RootLayout = ({ children }) => {
    return (
        <Contexts>
            <Server>
                <Client>{children}</Client>
            </Server>
        </Contexts>
    );
};

// DisplayName added for better debugging in React DevTools
RootLayout.displayName = 'RootLayout';
export default RootLayout;
