'use client';

// Imports
// ------------
import Grid from '@waffl';
import SectionTitle from '@parts/SectionTitle';
import LogoMarquee from './LogoMarquee';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import AnimatedHeading from '@parts/AnimatedHeading';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ logoMarquee, title, heading, desc }: I.HeroProps) => {
	// Context
	const { isModalOpen, modalActive } = use(GlobalContext);

	return (
		<S.Jacket>
			<SideFrame />
			<Frame className='top' />

			<S.Top $pad>
				<Grid>
					<S.Col $l='1/13'>
						<SectionTitle text={title} />
					</S.Col>

					<S.Heading $l='1/12'>
						<AnimatedHeading isReady={isModalOpen && modalActive === 'activation'}>
							{heading}
						</AnimatedHeading>
					</S.Heading>
					<S.Desc $l='1/9'>{desc}</S.Desc>
				</Grid>
			</S.Top>

			<S.Bottom>
				<Frame className='top' />
				<LogoMarquee logoMarquee={logoMarquee} />
				<Frame className='bottom' />
			</S.Bottom>
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
