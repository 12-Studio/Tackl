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
const MobileVideo = ({ src, onReady }: I.MobileVideoProps) => {
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

	return (
		<S.Jacket>
			<video ref={videoRef} src={src} autoPlay loop muted playsInline />
		</S.Jacket>
	);
};

// Exports
// ------------
MobileVideo.displayName = 'MobileVideo';
export default MobileVideo;
