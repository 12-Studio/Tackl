'use client';

// Imports
// ------------
import UnicornScene from 'unicornstudio-react/next';
import { useResponsive } from '@utils/useResponsive';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import MobileVideo from './MobileVideo';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Background = ({ sceneId, video }: I.BackgroundProps) => {
	// Responsive Hook
	const { isDesktop } = useResponsive();

	// Contexts
	const { setPageLoaded, isLoaderFinished, isModalOpen } = use(GlobalContext);

	// Event Handlers
	const handleLoad = () => setPageLoaded(true);

	return (
		<S.Jacket $isLoaderFinished={isLoaderFinished} $isModalOpen={isModalOpen}>
			{isDesktop ? (
				<UnicornScene
					className='unicorn'
					projectId={sceneId}
					width='100%'
					height='100%'
					onLoad={handleLoad}
					lazyLoad={true}
					production={true}
					dpi={1.5}
					fps={120}
				/>
			) : (
				<MobileVideo src={video} onReady={handleLoad} isModalOpen={isModalOpen} />
			)}
		</S.Jacket>
	);
};

// Exports
// ------------
Background.displayName = 'Background';
export default Background;
