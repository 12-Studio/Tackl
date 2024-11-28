'use client';

// Imports
// ------------
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { memo } from 'react';

// Register GSAP plugins
// Only register once on initial load
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Component
// ------------
const AnimationPlugins = memo(() => {
    return null;
});

// DisplayName for debugging
AnimationPlugins.displayName = 'AnimationPlugins';

// Exports
// ------------
export default AnimationPlugins;
