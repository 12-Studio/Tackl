'use client';

// Imports
// ------------
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import UnicornScene from 'unicornstudio-react/next';
import LogoMarquee from './LogoMarquee';
import Frame from '@parts/Frame';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ title, description, logos, unicornId }: I.HeroProps) => {
	// Contexts
	const { setPageLoaded, isLoaderFinished } = use(GlobalContext);

	const handleLoad = () => {
		console.log('Scene loaded successfully!');
		setPageLoaded(true);
	};

	const handleError = (error: Error) => {
		console.error('Scene loading failed:', error);
		setPageLoaded(false);
	};

	return (
		<S.Jacket>
			<S.Scaler $isLoaderFinished={isLoaderFinished}>
				<UnicornScene
					className='unicorn'
					projectId={unicornId}
					width='100%'
					height='100%'
					onLoad={handleLoad}
					onError={handleError}
					production={true}
					fps={120}
				/>

				<S.FullFrame>
					<Frame isLight className='top' />
					<Frame isLight className='bottom' />
				</S.FullFrame>

				<S.Content>
					<h1>{title}</h1>
					<p>{description}</p>
				</S.Content>

				<LogoMarquee logos={logos} />
			</S.Scaler>
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
