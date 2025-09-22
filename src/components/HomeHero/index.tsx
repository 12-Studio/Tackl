'use client';

// Imports
// ------------
import Icon from '@parts/Icon';
import ScrollButton from '@parts/ScrollButton';
import { useAnimation } from '@utils/useAnimation';
import Grid from '@waffl';
import { gsap } from 'gsap';
import { useRef } from 'react';
import Video from './Video';

// Styles
// ------------
import {
	Content,
	FakeJacket,
	Jacket,
	Media,
	ScrollButtonPos,
	SubContent,
	SubText,
	Title,
} from './styles';

// Interfaces
// ------------
import { HeroProps } from './interface';

// Component
// ------------
const Hero = ({ pageTitle, subtext }: HeroProps) => {
	// Create Refs
	const target = useRef<HTMLDivElement>(null);
	const trigger = useRef<HTMLDivElement>(null);
	const video = useRef<HTMLVideoElement>(null);

	// Use Animation
	useAnimation(
		({ isDesktop }) => {
			if (target.current) {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: target.current,
						start: 'top 0%',
						end: 'bottom 0%',
						scrub: 0.5,
						markers: false,
					},
				});

				const before = {
					yPercent: 0,
				};

				const after = {
					yPercent: -50,
					ease: 'none',
				};

				// Set the initial state
				gsap.set(target.current, before);

				// Animate the trigger
				tl.fromTo(target.current, before, after);
			}
		},
		{ scope: target }
	);

	return (
		<>
			<Jacket>
				<Grid $isCenter $isFullscreen>
					<Content $l='2/12' ref={target}>
						<Title>{pageTitle}</Title>

						<SubContent>
							<Icon type='partnership' />
							<SubText>{subtext}</SubText>
						</SubContent>

						<ScrollButtonPos>
							<ScrollButton isDown hash='intro' />
						</ScrollButtonPos>
					</Content>
				</Grid>

				<Media>
					<Video url='/video/hero-home.mp4' ref={video} />
				</Media>
			</Jacket>

			<FakeJacket ref={trigger} />
		</>
	);
};

export default Hero;
