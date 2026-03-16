// Imports
// ------------
import type { Logo } from './LogoMarquee/interface';
import type { MobileNavProps } from './MobileNav/interface';

// Exports
// ------------
export interface HeroProps extends MobileNavProps {
	title: string;
	description: string;
	logos: Logo[];
	unicornId: string;
	video?: {
		muxPlaybackId?: string;
		streamingUrl?: string;
		mp4High?: string;
		mp4Med?: string;
		mp4Low?: string;
		width?: number;
		height?: number;
	} | null;
}
