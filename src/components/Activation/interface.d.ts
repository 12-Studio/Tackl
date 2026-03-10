// Imports
// ------------
import type { Logo } from './Hero/LogoMarquee/interface';
import type { PageBuilderBlock } from '@parts/PageBuilder/interface';

// Exports
// ------------
export interface ActivationProps {
	title: string;
	heading: string;
	desc: string;
	logoMarquee: Logo[];
	pageBuilder: PageBuilderBlock[];
	isCtaOverriden?: boolean;
	ctaHeading?: string;
	ctaButtonLabel?: string;
}
