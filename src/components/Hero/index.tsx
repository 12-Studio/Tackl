'use client';

// Imports
// ------------
import Background from './Background';
import LogoMarquee from './LogoMarquee';
import MobileNav from './MobileNav';
import Frame from '@parts/Frame';
import { useAnimation } from '@utils/useAnimation';
import { use, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { GlobalContext } from '@parts/Contexts';
import { bezzy3, bezzy4 } from '@parts/AnimationPlugins/Curves';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ menuItems, title, description, logos, unicornId, video }: I.HeroProps) => {
	// Contexts
	const { isLoaderFinished, isModalOpen } = use(GlobalContext);

	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const textTimelineRef = useRef<gsap.core.Timeline | null>(null);

	// Animations
	useAnimation(
		() => {
			// Only animate once the loader has finished and both elements are mounted
			if (!isLoaderFinished || !headingRef.current || !descRef.current) return;

			// Split heading into characters (for flicker) and lines (if needed later),
			// and split description into lines so we can stagger each line.
			const headingSplit = SplitText.create(headingRef.current, {
				type: 'lines,chars',
				linesClass: 'line',
				charsClass: 'char',
				aria: 'none',
			});
			const descSplit = SplitText.create(descRef.current, {
				type: 'lines',
				linesClass: 'line',
				aria: 'none',
			});

			const headingChars = headingSplit.chars as HTMLElement[];
			const descLines = descSplit.lines as HTMLElement[];

			// If either split failed, revert immediately and bail out
			if (!headingChars.length || !descLines.length) {
				descSplit.revert();
				return () => headingSplit.revert();
			}

			// Master timeline for heading + description (store for modal reverse/play)
			const tl = gsap.timeline();
			textTimelineRef.current = tl;

			// Start with everything hidden / offset
			gsap.set(headingChars, { autoAlpha: 0 });
			gsap.set(descLines, { autoAlpha: 0, y: 24 });

			// Heading: random character flicker in
			tl.to(headingChars, {
				autoAlpha: 1,
				duration: 0.75,
				stagger: { each: 0.02, from: 'random' },
				ease: bezzy4,
			});

			// Description: each line fades in + moves up, slightly overlapping the heading
			tl.to(
				descLines,
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.6,
					stagger: { each: 0.12, from: 'start' },
					ease: bezzy3,
				},
				'-=0.5'
			);

			// Clean up SplitText on unmount / dependency change
			return () => {
				textTimelineRef.current = null;
				headingSplit.revert();
				descSplit.revert();
			};
		},
		{ scope: jacketRef, dependencies: [isLoaderFinished] }
	);

	// Reverse text timeline when modal opens, play forward when it closes
	useEffect(() => {
		const tl = textTimelineRef.current;
		if (!tl) return;
		if (isModalOpen) {
			tl.reverse();
		} else {
			tl.play();
		}
	}, [isModalOpen]);

	return (
		<S.Jacket ref={jacketRef}>
			<Background sceneId={unicornId} video={video} />

			<S.FullFrame>
				<Frame isLight className='top' />
				<Frame isLight className='bottom' />
			</S.FullFrame>

			<S.Content>
				<h1 ref={headingRef}>{title}</h1>
				<p ref={descRef}>{description}</p>
			</S.Content>

			<LogoMarquee logos={logos} />

			<MobileNav menuItems={menuItems} />
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
