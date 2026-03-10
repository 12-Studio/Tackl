'use client';

// Imports
// ------------
import { useEffect, useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { bezzy3, bezzy4 } from '@parts/AnimationPlugins/Curves';

// Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const AnimatedHeading = ({
	children,
	className,
	isReady = false,
	trigger = true,
}: I.AnimatedHeadingProps) => {
	// Refs
	const containerRef = useRef<HTMLDivElement>(null);

	// Animations
	useAnimation(
		() => {
			const container = containerRef.current;
			if (!container) return;

			// Split container content into lines and chars
			const split = SplitText.create(container, {
				type: 'lines,chars',
				linesClass: 'line',
				charsClass: 'char',
			});

			const chars = split.chars as HTMLElement[];

			// If either split failed, bail and clean up immediately
			if (!chars.length) {
				split.revert();
				return;
			}

			// Only run when both the upstream condition and the trigger are true
			if (!isReady) return;

			// Start with everything hidden / offset
			gsap.set(chars, { autoAlpha: 0 });

			// Heading: random character flicker in
			gsap.to(chars, {
				autoAlpha: 1,
				duration: 0.75,
				stagger: { each: 0.02, from: 'random' },
				ease: bezzy4,
			});

			// Cleanup on unmount / dependency change
			return () => {
				split.revert();
			};
		},
		{
			scope: containerRef,
			dependencies: [isReady],
		}
	);

	return (
		<S.Jacket ref={containerRef} className={className}>
			{children}
		</S.Jacket>
	);
};

// Exports
// ------------
AnimatedHeading.displayName = 'AnimatedHeading';
export default AnimatedHeading;
