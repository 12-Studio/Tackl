'use client';

// Imports
// ------------
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Icon from '@parts/Icon';
// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const MobileNav = ({ menuItems }: I.MobileNavProps) => {
	// Contexts
	const { setIsModalOpen, setModalActive } = use(GlobalContext);

	// Handle Click
	const handleClick = (label: string) => {
		setIsModalOpen(true);
		setModalActive(label);
	};

	return (
		<S.Jacket>
			{menuItems.map(({ label, icon }) => (
				<li key={label}>
					<button
						onClick={() => handleClick(label)}
						type='button'
						aria-label={`Open ${label}`}
					>
						<Icon type={icon} />
						<span>{label}</span>
					</button>
				</li>
			))}
		</S.Jacket>
	);
};

// Exports
// ------------
MobileNav.displayName = 'MobileNav';
export default MobileNav;
