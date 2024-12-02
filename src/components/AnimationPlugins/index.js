'use client';

/**
 * AnimationPlugins Component
 * =========================
 * A utility component that handles registration of GSAP animation plugins.
 * This component doesn't render anything visible but sets up necessary animation
 * functionality for the application.
 *
 * Features:
 * - Registers GSAP ScrollTrigger plugin for scroll-based animations
 * - Only registers plugins once on initial client-side load
 * - Safely handles server-side rendering by checking for window object
 *
 * @component
 * @example
 * <AnimationPlugins />
 */

// Imports
// ------------
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { memo, useLayoutEffect } from 'react';

// Component
// ------------
const AnimationPlugins = memo(() => {
    useLayoutEffect(() => {
        // Register GSAP plugins only on client-side
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    return null;
});

// DisplayName for debugging
AnimationPlugins.displayName = 'AnimationPlugins';

// Exports
// ------------
export default AnimationPlugins;
