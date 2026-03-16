'use client';

// Imports
// ------------
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Home from './Home';
import Contact from './Contact';
import Navigation from './Navigation';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Header = ({ menuItems, contactTitle }: I.HeaderProps) => {
	// Contexts
	const { isLoaderFinished, isModalOpen } = use(GlobalContext);

	return (
		<S.Jacket $isLoaderFinished={isLoaderFinished} $isModalOpen={isModalOpen}>
			<Home />
			<Navigation menuItems={menuItems} />
			<Contact contactTitle={contactTitle} />
		</S.Jacket>
	);
};

// Exports
// ------------
Header.displayName = 'Header';
export default Header;
