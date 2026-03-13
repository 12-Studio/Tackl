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
const IconButton = ({ icon, to }: I.IconButtonProps) => {
	return (
		<S.Jacket href={to} target='_blank' rel='noopener noreferrer' data-hover>
			<Icon type={icon} />
		</S.Jacket>
	);
};

// Exports
// ------------
IconButton.displayName = 'IconButton';
export default IconButton;
