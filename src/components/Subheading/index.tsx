'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Subheading = ({ children, className, isLight }: I.SubheadingProps) => {
	return (
		<S.Jacket className={className} $isLight={isLight}>
			<S.Flasher $isLight={isLight} />
			{children}
		</S.Jacket>
	);
};

// Exports
// ------------
Subheading.displayName = 'Subheading';
export default Subheading;
