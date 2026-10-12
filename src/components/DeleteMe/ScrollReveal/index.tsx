'use client';

// Imports
// ------------
import { useEffect, useRef } from 'react';
import { HERO_ZOOM_END, heroScroll } from '../HeroField/store';

// Constants
// ------------
// NOTE • How much of a tile must be on screen before it rises in, and the
// gap between tiles that reveal together
const THRESHOLD = 0.15;
const STAGGER_MS = 110;

// Component
// ------------
// NOTE • Drop inside a <Grid> of Tiles: they wait hidden, then rise and fade
// in as they come into view — but not before the hero's zoom has finished,
// so nothing arrives while "Tackl" is still flying past. Renders an empty,
// hidden marker to find its siblings. Without JS, or with reduced motion,
// tiles simply show.
const ScrollReveal = () => {
	// Refs
	const markerRef = useRef<HTMLSpanElement>(null);

	// Effects
	useEffect(() => {
		const parent = markerRef.current?.parentElement;
		if (!parent || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const tiles = [...parent.querySelectorAll<HTMLElement>(':scope > [data-tile]')];
		for (const tile of tiles) tile.dataset.reveal = 'hidden';
		const waiting = new Set<HTMLElement>();

		// NOTE • Everything waiting reveals together, in page order, staggered
		const reveal = () => {
			if (heroScroll.get() < HERO_ZOOM_END || !waiting.size) return;
			const batch = tiles.filter(tile => waiting.has(tile));
			batch.forEach((tile, index) => {
				tile.style.setProperty('--reveal-delay', `${index * STAGGER_MS}ms`);
				tile.dataset.reveal = 'shown';
				waiting.delete(tile);
				observer.unobserve(tile);
			});
		};

		const observer = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					const tile = entry.target as HTMLElement;
					if (entry.isIntersecting) waiting.add(tile);
					else waiting.delete(tile);
				}
				reveal();
			},
			{ threshold: THRESHOLD }
		);
		for (const tile of tiles) observer.observe(tile);
		const unsubscribe = heroScroll.subscribe(reveal);

		return () => {
			observer.disconnect();
			unsubscribe();
		};
	}, []);

	// Render
	return <span ref={markerRef} hidden />;
};

// Exports
// ------------
ScrollReveal.displayName = 'ScrollReveal';
export default ScrollReveal;
