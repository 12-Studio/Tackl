'use client';

// Imports
// ------------
import { useAnimation } from '@utils/useAnimation';
import Grid from '@waffl';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

// Lazy Load
// ------------
const WebglHeart = dynamic(() => import('./WebglHeart'), {
	ssr: false,
});

// Styles
// ------------
import { Content, Jacket } from './styles';

// Interfaces
// ------------
import { IntroductionProps } from './interface';

// Component
// ------------
const Introduction = ({ text }: IntroductionProps) => {
	// Refs
	const trigger = useRef<HTMLDivElement>(null);
	const target = useRef<HTMLDivElement>(null);

	useAnimation(
		({ isDesktop }) => {
			if (target.current) {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: trigger.current,
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
				gsap.set(trigger.current, before);

				// Animate the trigger
				tl.fromTo(trigger.current, before, after);
			}
		},
		{ scope: trigger }
	);

	return (
		<Jacket id='intro' ref={trigger}>
			<Grid $isCenter $isFullscreen>
				<Content $l='3/11' ref={target}>
					{text}
				</Content>
			</Grid>

			<WebglHeart />
		</Jacket>
	);
};

// Exports
// ------------
Introduction.displayName = 'Introduction';
export default Introduction;
