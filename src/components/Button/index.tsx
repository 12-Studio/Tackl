'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Button = ({ label, onClick, ariaLabel, className, onLight }: I.ButtonProps) => {
	return (
		<S.Jacket
			className={className}
			onClick={onClick}
			aria-label={ariaLabel}
			$onLight={onLight}
			data-hover
		>
			{label}
		</S.Jacket>
	);
};

// Exports
// ------------
Button.displayName = 'Button';
export default Button;
