'use client';

// Imports
// ------------
import dynamic from 'next/dynamic';
import { useResponsive } from '@utils/useResponsive';
import { use, useCallback } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Lazy load: only the rendered component's bundle is fetched
const UnicornScene = dynamic(() => import('unicornstudio-react/next'), { ssr: false });
const MobileVideo = dynamic(() => import('./MobileVideo'), { ssr: false });

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Background = ({ sceneId, video }: I.BackgroundProps) => {
	// Responsive Hook
	const { isDesktop, isMobile } = useResponsive();

	// Contexts
	const { setPageLoaded, isLoaderFinished, isModalOpen } = use(GlobalContext);

	// Event Handlers (stable ref to avoid MobileVideo effect churn)
	const handleLoad = useCallback(() => setPageLoaded(true), [setPageLoaded]);

	// Don't load either until we know the device (avoids loading both bundles)
	const isReady = isDesktop || isMobile;

	return (
		<S.Jacket $isLoaderFinished={isLoaderFinished} $isModalOpen={isModalOpen}>
			{!isReady ? null : isDesktop ? (
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
				<MobileVideo
					data={video}
					src={
						video?.streamingUrl ??
						video?.mp4High ??
						video?.mp4Med ??
						video?.mp4Low ??
						'/stone-desktop.mp4'
					}
					onReady={handleLoad}
					isModalOpen={isModalOpen}
				/>
			)}
		</S.Jacket>
	);
};

// Exports
// ------------
Background.displayName = 'Background';
export default Background;
