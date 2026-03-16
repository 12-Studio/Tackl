'use client';

// Imports
// ------------
import { useRef, useEffect } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const MobileVideo = ({ src, onReady, isModalOpen }: I.MobileVideoProps) => {
	// Refs
	const videoRef = useRef<HTMLVideoElement>(null);

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

	// When modal opens, pause the video
	useEffect(() => {
		let timer: NodeJS.Timeout | null = null;

		if (isModalOpen) {
			timer = setTimeout(() => {
				videoRef.current?.pause();
			}, 1100);
		} else {
			videoRef.current?.play();
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [isModalOpen]);

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
