// Imports
// ------------
import type { SpanProps } from '@waffl';
import type { StaticImageData } from 'next/image';

// Exports
// ------------
export interface TileProps extends SpanProps {
	children: React.ReactNode;
	as?: 'div' | 'article' | 'li';
	// NOTE • 'glow' adds the brand-colour bloom used on hero tiles
	tone?: 'default' | 'glow';
	// NOTE • A full-bleed background photo, rebuilt from WebGL particles
	// (see ParticleImage), with a scrim so the text at the bottom stays
	// legible. Decorative — the tile's text carries the meaning.
	image?: StaticImageData;
	// NOTE • The tile's rendered width, for the image's srcset
	imageSizes?: string;
	className?: string;
	'aria-labelledby'?: string;
}
