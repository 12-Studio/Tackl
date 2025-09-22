'use client';

// Imports
// ------------
import Icon from '@parts/Icon';
import ScrollButton from '@parts/ScrollButton';
import Grid from '@waffl';
import { useRef } from 'react';
import Video from './Video';

// Styles
// ------------
import { Content, FakeJacket, Jacket, Media, ScrollButtonPos, SubContent, SubText, Title } from './styles';

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

	return (
		<>
			<Jacket ref={target}>
				<Grid $isCenter $isFullscreen>
					<Content $s='1/3' $m='1/7' $l='2/12'>
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
