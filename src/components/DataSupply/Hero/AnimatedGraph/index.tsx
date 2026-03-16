'use client';

// Imports
// ------------
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';
import { useRef } from 'react';
import { bezzy3 } from '@parts/AnimationPlugins/Curves';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const BAR_COUNT = 20;

const AnimatedGraph = ({ isReady, usaCoverage }: I.AnimatedGraphProps) => {
	// Active Count Calculator
	const activeCount = Math.round((usaCoverage / 100) * BAR_COUNT);

	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);

	useAnimation(
		() => {
			if (!jacketRef.current) return;

			const bars = jacketRef.current.querySelectorAll('[data-animate="bar"]');
			if (!bars.length) return;

			const getTargetScale = (index: number) => (index + 1) * 0.05;

			if (isReady) {
				gsap.fromTo(
					bars,
					{ scaleY: 0 },
					{
						scaleY: (index: number) => getTargetScale(index),
						duration: 1,
						delay: 0.25,
						stagger: 0.03,
						ease: bezzy3,
					}
				);
			} else {
				gsap.to(bars, {
					scaleY: 0,
					duration: 0.4,
					stagger: { each: 0.02, from: 'start' },
					ease: bezzy3,
				});
			}
		},
		{
			scope: jacketRef,
			dependencies: [isReady],
		}
	);

	return (
		<S.Jacket ref={jacketRef}>
			<S.Graph>
				{[...Array(BAR_COUNT)].map((_, index) => (
					<S.Bar
						key={`bar-${index}`}
						data-animate='bar'
						$isActive={index < activeCount}
					/>
				))}
			</S.Graph>

			<S.Labels>
				<span>{usaCoverage}%</span>
				<hr />
				<span>U.S. Coverage</span>
			</S.Labels>
		</S.Jacket>
	);
};

// Exports
// ------------
AnimatedGraph.displayName = 'AnimatedGraph';
export default AnimatedGraph;
