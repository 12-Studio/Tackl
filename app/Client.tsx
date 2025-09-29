'use client';

// Imports
// ------------
import AnimationPlugins from '@parts/AnimationPlugins';
import Contexts from '@parts/Contexts';
import CookieBar from '@parts/CookieBar';
import { GlobalStyle, theme } from '@theme';
import { inter } from '@theme/fonts';
import StyledComponentsRegistry from '@utils/registry';
import { gsap } from 'gsap';
import type { LenisRef } from 'lenis/react';
import { ReactLenis } from 'lenis/react';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';

// Lazy load GridExposer since it's only used in development
// Disabled SSR as it's not critical for server rendering
const GridExposer = dynamic(() => import('@parts/GridExposer'), {
	ssr: false,
});

// Component
// ------------
const Client = ({ children }: { children: React.ReactNode }) => {
	// NOTE • Font Classes
	const classes = `${inter.variable}`;

	// NOTE • Lenis Setup
	const lenisRef = useRef<LenisRef>(null);

	// NOTE •   Lenis + GSAP
	useEffect(() => {
		function update(time: number) {
			lenisRef.current?.lenis?.raf(time * 1000);
		}

		gsap.ticker.add(update);

		return () => gsap.ticker.remove(update);
	}, []);

	return (
		<html lang='en' className={classes}>
			<body>
				<StyledComponentsRegistry>
					<ThemeProvider theme={theme} key='themeprovider'>
						<GlobalStyle />

						{/* GridExposer only rendered in development environment */}
						{process.env.NODE_ENV === 'development' && (
							<GridExposer />
						)}

						{/* CookieBar only rendered in production environment */}
						{process.env.NODE_ENV === 'production' && <CookieBar />}

						<Contexts>
							<ReactLenis
								root
								options={{ autoRaf: false }}
								ref={lenisRef}
							/>
							<AnimationPlugins />
							{children}
						</Contexts>
					</ThemeProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
};

// Exports
// ------------
Client.displayName = 'Client';
export default Client;
