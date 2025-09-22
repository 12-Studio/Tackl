'use client';

// Imports
// ------------
import { forwardRef, useEffect, useRef } from 'react';

// Interfaces
// ------------
import { VideoProps } from './interface';

// Constants
// ------------
const FADE_DURATION = 1000; // ms

// Component
// ------------
const Video = forwardRef<HTMLVideoElement, VideoProps>(({ url }, ref) => {
	const localRef = useRef<HTMLVideoElement>(null);
	const videoRef = ref || localRef;

	useEffect(() => {
		const video = typeof videoRef === 'function' ? null : videoRef?.current;
		if (!video) return;

		// Start with opacity 0
		video.style.opacity = '0';

		const handleCanPlay = () => {
			// Fade in when video can play
			video.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
			video.style.opacity = '1';
		};

		const handleTimeUpdate = () => {
			if (!video.duration || isNaN(video.duration)) return;

			const timeLeft = video.duration - video.currentTime;

			// Fade out when 1 second remaining
			if (timeLeft <= 1) {
				video.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
				video.style.opacity = '0';
			}
		};

		const handleEnded = () => {
			// Reset opacity for loop
			video.style.opacity = '0';
		};

		video.addEventListener('canplay', handleCanPlay);
		video.addEventListener('timeupdate', handleTimeUpdate);
		video.addEventListener('ended', handleEnded);

		// Clean up
		return () => {
			video.removeEventListener('canplay', handleCanPlay);
			video.removeEventListener('timeupdate', handleTimeUpdate);
			video.removeEventListener('ended', handleEnded);
		};
	}, [url, videoRef]);

	return (
		<video
			ref={videoRef}
			src={url}
			autoPlay
			loop
			muted
			playsInline
			controls
			style={{
				opacity: 0,
				transition: `opacity ${FADE_DURATION}ms ease-in-out`,
			}}
		/>
	);
});

// Exports
// ------------
Video.displayName = 'Video';
export default Video;
