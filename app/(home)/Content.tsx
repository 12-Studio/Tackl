'use client';

// Imports
// ------------
import HomeHero from '@/components/HomeHero';

// Interfaces
// ------------
import { HomeProps } from '@/types/home';

// Component
// ------------
const Content = ({ data }: HomeProps) => {
	const { pageTitle, subtext } = data.page;

	return (
		<>
			<HomeHero pageTitle={pageTitle} subtext={subtext} />

			<div style={{ height: '200vh', background: 'red', position: 'relative', zIndex: 999 }} />
		</>
	);
};

// Exports
// ------------
Content.displayName = 'Page Content';
export default Content;
