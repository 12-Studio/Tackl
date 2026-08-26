'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import * as S from './styles';

// Component
// ------------
// NOTE • Placeholder landing screen — delete this component (and its usage
// in app/(home)/page.tsx) when you start building.
const DeleteMe = () => {
	return (
		<>
			<S.Jacket>
				<S.Title>Tackl</S.Title>
				<S.Hint>You’re all set — delete this component and start building.</S.Hint>
			</S.Jacket>

			{/* Scroll room so the smooth-scroll setup is feelable out of the box */}
			<S.Spacer aria-hidden />
		</>
	);
};

// Exports
// ------------
export default DeleteMe;
