'use client';

// Imports
// ------------
import Image from 'next/image';
import Frame from '@parts/Frame';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { use, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '@parts/Contexts';
import { useAnimation } from '@utils/useAnimation';
import { NestedLenisContext } from '@parts/NestedLenis';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const LogoMarquee = ({ logoMarquee }: I.LogoMarqueeProps) => {
	// Contexts
	const { isModalOpen, modalActive } = use(GlobalContext);
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// States
	const [isPlaying, setIsPlaying] = useState(true);
	const [isModalOpenForMarquee, setIsModalOpenForMarquee] = useState(false);

	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

	// Check if modal is actually open
	const isModalActuallyOpen = isModalOpen || modalActive === 'activation';

	// When modal closes, delay 1.1s before passing false to marquee (so close animation can finish)
	useEffect(() => {
		if (isModalActuallyOpen) {
			setIsModalOpenForMarquee(true);
			return;
		}
		const timeout = setTimeout(() => setIsModalOpenForMarquee(false), 1100);
		return () => clearTimeout(timeout);
	}, [isModalActuallyOpen]);

	// Split logos into thirds
	const third = Math.ceil(logoMarquee.length / 3);
	const logos1 = logoMarquee.slice(0, third);
	const logos2 = logoMarquee.slice(third, third * 2);
	const logos3 = logoMarquee.slice(third * 2);

	// DRY - Render logos
	const renderLogos = (data: I.Logo[], speed?: number, direction?: 'left' | 'right') => {
		const sharedImageProps = {
			width: 160,
			height: 48,
			loading: 'eager' as const,
			fetchPriority: 'high' as const,
		};

		return (
			<S.Row
				$speed={speed ?? 1}
				$direction={direction}
				$isModalOpen={isModalOpenForMarquee}
				$isPlaying={isPlaying}
			>
				<ul>
					{data.map(({ id, url, alt }) => (
						<li key={id}>
							<Image src={url} alt={alt} {...sharedImageProps} />
						</li>
					))}
				</ul>

				<ul aria-hidden='true'>
					{data.map(({ id, url, alt }) => (
						<li key={id}>
							<Image src={url} alt={alt} {...sharedImageProps} />
						</li>
					))}
				</ul>
			</S.Row>
		);
	};

	// ScrollTrigger for nested Lenis scroller: only after Lenis is ready and modal is open
	const isNestedScrollActive = lenisReady && (isModalOpen || modalActive === 'activation');

	useAnimation(
		() => {
			// Always kill existing trigger when callback runs (e.g. modal closed or deps changed)
			scrollTriggerRef.current?.kill();
			scrollTriggerRef.current = null;

			if (!jacketRef.current || !scrollWrapper.current || !lenisReady) return;

			// Only create when modal is open so the nested scroller has real dimensions
			if (!isModalOpen && modalActive !== 'activation') return;

			const trigger = ScrollTrigger.create({
				trigger: jacketRef.current,
				scroller: scrollWrapper.current,
				start: 'top bottom',
				end: 'bottom top',
				scrub: false,
				onLeave: () => setIsPlaying(false),
				onEnterBack: () => setIsPlaying(true),
			});
			scrollTriggerRef.current = trigger;
		},
		{ scope: jacketRef, dependencies: [lenisReady, isNestedScrollActive] }
	);

	// When modal opens: refresh ScrollTrigger and reset marquee to playing (so it runs after reopen)
	useEffect(() => {
		if (isNestedScrollActive) {
			setIsPlaying(true);
			ScrollTrigger.refresh();
		}
	}, [isNestedScrollActive]);

	// Clean up ScrollTrigger on unmount
	useEffect(() => {
		return () => {
			scrollTriggerRef.current?.kill();
			scrollTriggerRef.current = null;
		};
	}, []);

	return (
		<S.Jacket ref={jacketRef}>
			{renderLogos(logos1, 1, 'left')}
			{renderLogos(logos2, 1, 'right')}
			{renderLogos(logos3, 2, 'left')}
		</S.Jacket>
	);
};

// Exports
// ------------
LogoMarquee.displayName = 'LogoMarquee';
export default LogoMarquee;
