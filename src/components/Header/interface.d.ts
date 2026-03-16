// Imports
// ------------
import type { NavItem } from './Navigation/interface';
import type { ContactProps } from './Contact/interface';

// Exports
// ------------
export interface HeaderProps extends ContactProps {
	menuItems: NavItem[];
}
