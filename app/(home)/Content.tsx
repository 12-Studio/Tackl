'use client';

// Imports
// ------------
import DeleteMe from '@parts/DeleteMe';

// Interfaces
// ------------
import { HomeProps } from '@/types/home';

// Component
// ------------
const Content = ({ data }: HomeProps) => {
	return (
		<>
			<DeleteMe />
		</>
	);
};

// Exports
// ------------
Content.displayName = 'Page Content';
export default Content;
