'use client';

// Imports
// ------------
import Image from 'next/image';
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import SectionTitle from '@parts/SectionTitle';
import AnimatedHeading from '@parts/AnimatedHeading';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Logo from '@parts/Logo';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ title, heading, desc, featuredImage }: I.HeroProps) => {
	// Context
	const { isModalOpen, modalActive } = use(GlobalContext);

	// Animation Checker
	const isReady = isModalOpen && modalActive === title;

	return (
		<S.Jacket>
			<SideFrame />
			<Frame className='top' />

			<S.Top $padTop>
				<Grid>
					<S.SectionTitlePosition>
						<SectionTitle text={title} />
					</S.SectionTitlePosition>

					<S.Heading>
						<AnimatedHeading isReady={isReady}>{heading}</AnimatedHeading>
					</S.Heading>

					<S.Desc $l='1/9'>{desc}</S.Desc>
				</Grid>
			</S.Top>

			<S.Bottom $padBottom>
				<Grid>
					<S.FeaturedImage $isModalOpen={isModalOpen}>
						<Image
							src={featuredImage?.url ?? '/about-fallback.jpeg'}
							alt={featuredImage?.alt ?? 'About Hero Image'}
							fill
							sizes='100vw, (min-width: 1024px) 66vw'
							placeholder='blur'
							blurDataURL={featuredImage?.blur}
						/>

						<Logo />
					</S.FeaturedImage>
				</Grid>
			</S.Bottom>

			<Frame className='bottom' />
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
