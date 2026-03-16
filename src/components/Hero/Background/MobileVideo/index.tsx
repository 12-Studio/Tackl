'use client';

// Imports
// ------------
import { useRef, useEffect, useCallback } from 'react';
import { VideoPlayer } from 'react-datocms';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const MobileVideo = ({ data, src, onReady, isModalOpen }: I.MobileVideoProps) => {
	// Refs
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleLoadedData = useCallback(() => onReady(), [onReady]);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		if (video.readyState >= 2) {
			onReady();
		} else {
			video.addEventListener('loadeddata', onReady, { once: true });
		}

		return () => {
			video.removeEventListener('loadeddata', onReady);
		};
	}, [onReady]);

	// When modal opens, pause the video; when it closes, play
	useEffect(() => {
		let timer: NodeJS.Timeout | null = null;

		if (isModalOpen) {
			timer = setTimeout(() => {
				const nativeEl = videoRef.current;
				if (nativeEl) {
					nativeEl.pause();
				}
			}, 1100);
		} else {
			const nativeEl = videoRef.current;
			if (nativeEl) {
				nativeEl.play();
			}
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [isModalOpen]);

	// Use VideoPlayer when we have DatoCMS/Mux data
	if (data?.muxPlaybackId) {
		return (
			<S.Jacket>
				<VideoPlayer
					data={data}
					theme='minimal'
					autoPlay={!isModalOpen}
					loop
					muted
					playsInline
					paused={isModalOpen}
					onLoadedData={handleLoadedData}
					minResolution='720p'
					renditionOrder='desc'
					style={
						{
							'--controls': 'none',
							'--media-object-fit': 'cover',
							'--media-object-position': 'center',
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
						} as React.CSSProperties & Record<`--${string}`, string>
					}
					aria-label='Background video'
				/>
			</S.Jacket>
		);
	}

	// Fallback to native video when no Mux data
	if (!src) return null;

	return (
		<S.Jacket>
			<video
				ref={videoRef}
				src={src}
				autoPlay
				loop
				muted
				playsInline
				aria-label='Background video'
			>
				<track kind='captions' src='/captions-empty.vtt' srcLang='en' label='English' />
			</video>
		</S.Jacket>
	);
};

// Exports
// ------------
MobileVideo.displayName = 'MobileVideo';
export default MobileVideo;
