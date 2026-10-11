// Imports
// ------------
import type { StaticImageData } from 'next/image';

// Exports
// ------------
export interface ParticleImageProps {
	// NOTE • The photo to rebuild from particles — also shown as-is until
	// the particles are ready, and instead of them without WebGL2
	image: StaticImageData;
	// NOTE • The rendered width, for the fallback image's srcset
	sizes?: string;
	className?: string;
}
