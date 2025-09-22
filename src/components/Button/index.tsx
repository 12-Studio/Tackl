'use client';

// Imports
// ------------
import Icon from '@parts/Icon';

// Styles
// ------------
import { Jacket } from './styles';

// Interfaces
// ------------
import { ButtonProps } from './interface';

// Component
// ------------
const Button = ({ to, label, aria, icon }: ButtonProps) => {
	return (
		<Jacket href={to} aria-label={aria}>
			{icon && <Icon type={icon} />}
			<span data-text={label}>{label}</span>
		</Jacket>
	);
};

// Exports
// ------------
Button.displayName = 'Button';
export default Button;
