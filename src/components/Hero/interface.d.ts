// Imports
// ------------
import type { Logo } from './LogoMarquee/interface';

// Exports
// ------------
export interface HeroProps {
	title: string;
	description: string;
	logos: Logo[];
	unicornId: string;
	video: string;
}
