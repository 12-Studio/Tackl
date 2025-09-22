'use client';

// Imports
// ------------
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

// Interfaces
// ------------
import { VideoProps } from './interface';

// Constants
// ------------
const FADE_DURATION = 1000; // ms

// Component
// ------------
const Video = forwardRef<any, VideoProps>(({ url }, ref) => {
	// NOTE • State
	const [ready, setReady] = useState(false);
	const [isFading, setIsFading] = useState(false);

	// NOTE • Refs
	const playerRef = useRef<any>(null);
	const mounted = useRef(false);
	const fadeTimer = useRef<NodeJS.Timeout | null>(null);

	// NOTE • Functions
	const handleReady = useCallback(() => {
		console.log('Video ready');
		if (mounted.current) {
			setReady(true);
		}
	}, []);

	// NOTE • Handle video end with fade transition
	const handleEnded = useCallback(() => {
		if (mounted.current && playerRef.current) {
			setIsFading(true);

			// Fade out over 1 second
			fadeTimer.current = setTimeout(() => {
				if (mounted.current) {
					// Try different methods to seek back to start
					try {
						if (typeof playerRef.current.seekTo === 'function') {
							playerRef.current.seekTo(0, 'seconds');
						} else if (
							typeof playerRef.current.seekTo === 'function'
						) {
							playerRef.current.seekTo(0);
						} else {
							console.log(
								'Available methods:',
								Object.keys(playerRef.current)
							);
							// Fallback: restart by setting playing to false then true
							setReady(false);
							setTimeout(() => setReady(true), 100);
						}
					} catch (error) {
						console.error('Error seeking:', error);
						// Fallback: restart by setting playing to false then true
						setReady(false);
						setTimeout(() => setReady(true), 100);
					}
					setIsFading(false);
				}
			}, FADE_DURATION);
		}
	}, []);

	// NOTE • Cleanup function
	const cleanup = useCallback(() => {
		// Clear fade timer
		if (fadeTimer.current) {
			clearTimeout(fadeTimer.current);
			fadeTimer.current = null;
		}
	}, []);

	// NOTE • Initialize
	useEffect(() => {
		mounted.current = true;

		return () => {
			mounted.current = false;
			cleanup();
		};
	}, [cleanup]);

	// NOTE • Forward ref to player
	useEffect(() => {
		if (ref) {
			if (typeof ref === 'function') {
				ref(playerRef.current);
			} else {
				ref.current = playerRef.current;
			}
		}
	}, [ref]);

	return (
		<ReactPlayer
			ref={playerRef}
			src={url}
			onReady={handleReady}
			onEnded={handleEnded}
			playing={!isFading}
			muted
			autoPlay
			loop={false}
			playsInline
			width='100%'
			height='100%'
			controls={false}
			style={{
				opacity: isFading ? 0 : 1,
				transition: `opacity ${FADE_DURATION}ms ease-in-out`,
			}}
		/>
	);
});

// Exports
// ------------
Video.displayName = 'Video';
export default Video;
