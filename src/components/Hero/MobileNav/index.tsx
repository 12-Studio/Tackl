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
		console.log('clicked', label);
	};

	// Handle camel case conversion
	const camelCasePls = (label: string) => {
		return label
			.replace(/[ +]/g, ' ')
			.split(' ')
			.map((word, i) =>
				i === 0
					? word.toLowerCase()
					: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
			)
			.join('');
	};

	return (
		<S.Jacket>
			{menuItems.map(({ label }) => (
				<li key={label}>
					<button
						onClick={() => handleClick(label)}
						type='button'
						aria-label={`Open ${label}`}
					>
						<Icon type={camelCasePls(label)} />
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
