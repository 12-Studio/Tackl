'use client';

// Imports
// ------------
import Background from './Background';
import LogoMarquee from './LogoMarquee';
import MobileNav from './MobileNav';
import Frame from '@parts/Frame';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ title, description, logos, unicornId, video }: I.HeroProps) => {
	return (
		<S.Jacket>
			<Background sceneId={unicornId} video={video} />

			<S.FullFrame>
				<Frame isLight className='top' />
				<Frame isLight className='bottom' />
			</S.FullFrame>

			<S.Content>
				<h1>{title}</h1>
				<p>{description}</p>
			</S.Content>

			<LogoMarquee logos={logos} />

			<MobileNav />
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
