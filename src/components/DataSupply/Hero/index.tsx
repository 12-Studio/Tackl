'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import SectionTitle from '@parts/SectionTitle';
import AnimatedHeading from '@parts/AnimatedHeading';
import AnimatedGraph from './AnimatedGraph';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ title, heading, desc, usaCoverage }: I.HeroProps) => {
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
					<S.SectionTitlePosition $l='1/13'>
						<SectionTitle text={title} />
					</S.SectionTitlePosition>

					<S.Heading $l='1/12'>
						<AnimatedHeading isReady={isReady}>{heading}</AnimatedHeading>
					</S.Heading>

					<S.Desc $l='1/9'>{desc}</S.Desc>
				</Grid>
			</S.Top>

			<S.Bottom $padBottom>
				<Grid>
					<S.Graph $l='1/13'>
						<AnimatedGraph isReady={isReady} usaCoverage={usaCoverage} />
					</S.Graph>
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
