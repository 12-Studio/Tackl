'use client';

// Imports
// ------------
import Grid from '@waffl';
import Image from 'next/image';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import { use, useRef } from 'react';
import { NestedLenisContext } from '@parts/NestedLenis';
import gsap from 'gsap';
import { useAnimation } from '@utils/useAnimation';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Section = ({ heading, desc, image }: I.SectionProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const backgroundRef = useRef<HTMLImageElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// Check if all refs are ready
	const aniCheck =
		!jacketRef.current || !backgroundRef.current || !scrollWrapper.current || !lenisReady;

	// Animations
	useAnimation(
		({ isDesktop }) => {
			if (aniCheck) return;

			const amount = isDesktop ? 50 : 25;

			gsap.set(backgroundRef.current, {
				yPercent: -amount,
			});

			gsap.to(backgroundRef.current, {
				yPercent: amount,
				ease: 'none',
				scrollTrigger: {
					trigger: jacketRef.current,
					scroller: scrollWrapper.current,
					start: 'top 100%',
					end: 'bottom 0%',
					scrub: true,
				},
			});
		},
		{ scope: jacketRef, dependencies: [lenisReady] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<S.Background ref={backgroundRef}>
				<Image
					src={image.url}
					alt={image.alt ?? `${heading} Background`}
					fill
					sizes='100vw, (min-width: 1024px) 66vw'
				/>
			</S.Background>

			<S.Content>
				<Grid>
					<S.Heading $l='1/11'>{heading}</S.Heading>
					<S.Desc $l='1/11'>{desc}</S.Desc>
				</Grid>
			</S.Content>

			<SideFrame isLight />
			<Frame className='top' isLight />
			<Frame className='bottom' isLight />
		</S.Jacket>
	);
};

// Exports
// ------------
Section.displayName = 'Section';
export default Section;
