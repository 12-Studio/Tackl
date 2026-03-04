'use client';

// Imports
// ------------
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Navigation = ({ menuItems }: I.NavigationProps) => {
	// COntexts
	const { setIsModalOpen, isModalOpen, setModalActive } = use(GlobalContext);

	// Handle Click
	const handleClick = (label: string) => {
		setIsModalOpen(true);
		setModalActive(label);
	};

	return (
		<S.Jacket $isModalOpen={isModalOpen}>
			{menuItems.map(({ label }) => (
				<button
					key={label}
					data-hover
					type='button'
					aria-label={`Open ${label}`}
					onClick={() => handleClick(label)}
				>
					{label}
				</button>
			))}
		</S.Jacket>
	);
};

// Exports
// ------------
Navigation.displayName = 'Navigation';
export default Navigation;
