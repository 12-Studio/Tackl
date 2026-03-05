'use client';

// Imports
// ------------
import Icon from '@parts/Icon';
// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const MobileNav = ({ menuItems }: I.MobileNavProps) => {
	// Handle Click
	const handleClick = (label: string) => {
		// console.log('clicked', label);
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
