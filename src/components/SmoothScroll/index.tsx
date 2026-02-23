'use client';

// Imports
// ------------
import { GlobalContext } from '@parts/Contexts';
import { gsap } from 'gsap';
import { ReactLenis } from 'lenis/react';
import { use, useEffect } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const SmoothScroll = ({ children }: I.SmoothScrollProps) => {
	// Contexts
	const { lenisRef } = use(GlobalContext);

	// const lenis = useLenis(lenis => {
	// 	// called every scroll
	// 	console.log(lenis);
	// });

	// GSAP Setup
	useEffect(() => {
		function update(time: number) {
			lenisRef.current?.lenis?.raf(time * 1000);
		}

		gsap.ticker.add(update);

		return () => gsap.ticker.remove(update);
	}, [lenisRef]);

	return (
		<>
			<ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
			{children}
		</>
	);
};

// Export
// ------------
SmoothScroll.displayName = 'SmoothScroll';
export default SmoothScroll;
