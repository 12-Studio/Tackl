'use client';

// Imports
// ------------
import UnicornScene from 'unicornstudio-react/next';
import LogoMarquee from './LogoMarquee';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ title, description, logos, unicornId }: I.HeroProps) => {
	const handleLoad = () => {
		console.log('Scene loaded successfully!');
	};

	const handleError = (error: Error) => {
		console.error('Scene loading failed:', error);
	};

	return (
		<S.Jacket>
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

			<h1>{title}</h1>
			<p>{description}</p>

			<LogoMarquee logos={logos} />
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
