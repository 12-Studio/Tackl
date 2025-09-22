'use client';

// Imports
// ------------
import HomeHero from '@parts/HomeHero';
import Introduction from '@parts/Introduction';
import WhatWeDo from '@parts/WhatWeDo';

// Interfaces
// ------------
import { HomeProps } from '@/types/home';

// Component
// ------------
const Content = ({ data }: HomeProps) => {
	const {
		pageTitle,
		subtext,
		ethosText,
		strategyTitle,
		strategyText,
		insightsTitle,
		insightsText,
		evaluateTitle,
		evaluateText,
	} = data.page;

	return (
		<>
			<HomeHero pageTitle={pageTitle} subtext={subtext} />

			<Introduction text={ethosText} />

			<WhatWeDo
				strategyTitle={strategyTitle}
				strategyText={strategyText}
				insightsTitle={insightsTitle}
				insightsText={insightsText}
				evaluateTitle={evaluateTitle}
				evaluateText={evaluateText}
			/>

			<div
				style={{
					height: '200vh',
					background: 'red',
					position: 'relative',
					zIndex: 999,
				}}
			/>
		</>
	);
};

// Exports
// ------------
Content.displayName = 'Page Content';
export default Content;
