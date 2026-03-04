'use client';

// Imports
// ------------
import Logo from '@parts/Logo';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import * as S from './styles';

// Component
// ------------
const Home = () => {
	// Contexts
	const { isModalOpen, setIsModalOpen, setModalActive } = use(GlobalContext);

	// Handle Click
	const handleClick = (label: string) => {
		setIsModalOpen(false);
		setModalActive(label);
	};
	return (
		<S.Jacket
			data-hover
			$isModalOpen={isModalOpen}
			onClick={() => handleClick('home')}
			type='button'
			aria-label='Go Home'
		>
			<Logo />
		</S.Jacket>
	);
};

// Exports
// ------------
Home.displayName = 'Home';
export default Home;
