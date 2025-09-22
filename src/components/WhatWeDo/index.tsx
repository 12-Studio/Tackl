'use client';

// Imports
// ------------
import { useAnimation } from '@utils/useAnimation';
import { gsap } from 'gsap';
import { useRef } from 'react';
import SingleDo from './SingleDo';

// Styles
// ------------
import { Jacket } from './styles';

// Interfaces
// ------------
import { WhatWeDoProps } from './interface';

// Component
// ------------
const WhatWeDo = ({
	strategyTitle,
	strategyText,
	insightsTitle,
	insightsText,
	evaluateTitle,
	evaluateText,
}: WhatWeDoProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);

	// Animation
	useAnimation(
		({ isDesktop }) => {
			if (jacketRef.current) {
				const clipTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: jacketRef.current,
						start: 'top 100%',
						end: 'top 0%',
						scrub: 0.5,
						markers: false,
					},
				});

				const roundness = isDesktop ? '3.6rem' : '2.4rem';

				const before = {
					clipPath: `inset(${roundness} round ${roundness})`,
				};

				const after = {
					clipPath: 'inset(0rem round 0rem)',
					ease: 'none',
				};

				// Set the initial state
				gsap.set(jacketRef.current, before);

				// Animate the trigger
				clipTimeline.fromTo(jacketRef.current, before, after);
			}
		},
		{ scope: jacketRef }
	);

	return (
		<Jacket ref={jacketRef} $pad>
			<SingleDo
				title={strategyTitle}
				text={strategyText}
				threeD='/video/strategy.mp4'
			/>
			<SingleDo
				alt
				title={insightsTitle}
				text={insightsText}
				threeD='/video/insights.mp4'
			/>
			<SingleDo
				title={evaluateTitle}
				text={evaluateText}
				threeD='/video/evaluate.mp4'
			/>
		</Jacket>
	);
};

// Exports
// ------------
WhatWeDo.displayName = 'WhatWeDo';
export default WhatWeDo;
