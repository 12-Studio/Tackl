'use client';

// Imports
// ------------
import Loader from '@parts/Loader';

// Component
// ------------
const Template = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Loader />
			{children}
		</>
	);
};

// Exports
// ------------
export default Template;
