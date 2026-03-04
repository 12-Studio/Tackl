'use client';

// Imports
// ------------
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useIsDesktop } from '@utils/useResponsive';

// Styles + Interfaces
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Cursor = () => {
	// State to ensure client-side only rendering
	const [isMounted, setIsMounted] = useState(false);

	// NOTE • Configuration
	const CURSOR_SPEED = 0.25; // Lower = faster (0.1 = very fast, 1.0 = slow)
	const STRETCH_SENSITIVITY = 400; // Higher = less sensitive to movement
	const MAX_STRETCH = 0.25; // Maximum stretch amount (0.1 = subtle, 0.5 = dramatic)
	const HOVER_SCALE = 1.5; // Scale multiplier when hovering over data-hover elements
	const NORMAL_OPACITY = 1;
	const HOVER_OPACITY = 0; // Fade out on hover

	// NOTE • Refs
	const jellyRef = useRef<HTMLDivElement>(null);
	const pos = useRef({ x: 0, y: 0 });
	const vel = useRef({ x: 0, y: 0 });
	const animationRef = useRef<gsap.core.Tween | null>(null);
	const isHoveringRef = useRef(false);
	const hoverScaleRef = useRef({ value: 1 });
	const scaleAnimationRef = useRef<gsap.core.Tween | null>(null);
	const opacityAnimationRef = useRef<gsap.core.Tween | null>(null);

	// NOTE • Window Size
	const isDesktop = useIsDesktop();

	// Mark as mounted on client side only
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// NOTE • Animate Jelly Blob
	useEffect(() => {
		if (!isDesktop) return;

		const getAngle = (diffX: number, diffY: number) =>
			(Math.atan2(diffY, diffX) * 180) / Math.PI;

		const getScale = (diffX: number, diffY: number) => {
			const distance = Math.sqrt(diffX * diffX + diffY * diffY);
			return Math.min(distance / STRETCH_SENSITIVITY, MAX_STRETCH);
		};

		const updateJellyBlob = () => {
			if (!jellyRef.current) return;

			const rotation = getAngle(vel.current.x, vel.current.y);
			const stretchScale = getScale(vel.current.x, vel.current.y);
			const baseScale = hoverScaleRef.current.value;

			gsap.set(jellyRef.current, {
				x: pos.current.x,
				y: pos.current.y,
				rotate: rotation,
				scaleX: baseScale * (1 + stretchScale),
				scaleY: baseScale * (1 - stretchScale),
				// Opacity handled via dedicated animation, don't set here
			});
		};

		// Handle hover over elements with data-hover attribute
		const handleHoverEnter = () => {
			if (isHoveringRef.current) return; // Already hovering
			isHoveringRef.current = true;
			// Kill any existing scale/opacity animation
			if (scaleAnimationRef.current) {
				scaleAnimationRef.current.kill();
			}
			if (opacityAnimationRef.current) {
				opacityAnimationRef.current.kill();
			}
			// Animate scale up
			scaleAnimationRef.current = gsap.to(hoverScaleRef.current, {
				value: HOVER_SCALE,
				duration: 0.3,
				ease: 'power2.out',
				onUpdate: updateJellyBlob,
			});
			// Animate fade out
			if (jellyRef.current) {
				opacityAnimationRef.current = gsap.to(jellyRef.current, {
					opacity: HOVER_OPACITY,
					duration: 0.2,
					ease: 'power2.out',
				});
			}
		};

		const handleHoverLeave = () => {
			if (!isHoveringRef.current) return; // Already not hovering
			isHoveringRef.current = false;
			// Kill any existing scale/opacity animation
			if (scaleAnimationRef.current) {
				scaleAnimationRef.current.kill();
			}
			if (opacityAnimationRef.current) {
				opacityAnimationRef.current.kill();
			}
			// Animate scale down
			scaleAnimationRef.current = gsap.to(hoverScaleRef.current, {
				value: 1,
				duration: 0.3,
				ease: 'power2.out',
				onUpdate: updateJellyBlob,
			});
			// Animate fade in
			if (jellyRef.current) {
				opacityAnimationRef.current = gsap.to(jellyRef.current, {
					opacity: NORMAL_OPACITY,
					duration: 0.2,
					ease: 'power2.out',
				});
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			const newX = e.clientX;
			const newY = e.clientY;

			// Kill previous animation to prevent buildup
			if (animationRef.current) {
				animationRef.current.kill();
			}

			const updateVelocity = () => {
				vel.current.x = newX - pos.current.x;
				vel.current.y = newY - pos.current.y;
				updateJellyBlob();
			};

			animationRef.current = gsap.to(pos.current, {
				x: newX,
				y: newY,
				duration: CURSOR_SPEED,
				ease: 'power3.out',
				onUpdate: updateVelocity,
			});

			// Check hover state using event delegation for dynamically added elements
			const target = e.target as HTMLElement;
			const hoverElement = target.closest('[data-hover]');

			if (hoverElement && !isHoveringRef.current) {
				handleHoverEnter();
			} else if (!hoverElement && isHoveringRef.current) {
				handleHoverLeave();
			}
		};

		window.addEventListener('mousemove', handleMouseMove, {
			passive: true,
		});

		// On mount, set initial opacity
		if (jellyRef.current) {
			gsap.set(jellyRef.current, { opacity: NORMAL_OPACITY });
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			// Kill any running animations on cleanup
			if (animationRef.current) {
				animationRef.current.kill();
			}
			if (scaleAnimationRef.current) {
				scaleAnimationRef.current.kill();
			}
			if (opacityAnimationRef.current) {
				opacityAnimationRef.current.kill();
			}
		};
	}, [isDesktop]);

	// Don't render on mobile/tablet or during SSR
	if (!isMounted || !isDesktop) return null;

	return <Jacket ref={jellyRef} aria-hidden='true' />;
};

// Exports
// ------------
Cursor.displayName = 'Cursor';
export default Cursor;
