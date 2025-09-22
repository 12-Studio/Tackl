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

			<div style={{ height: 2000, background: 'red' }} />
			<div style={{ height: 2000, background: 'blue' }} />
			<div style={{ height: 2000, background: 'green' }} />
		</>
	);
};

// Exports
// ------------
Content.displayName = 'Page Content';
export default Content;
