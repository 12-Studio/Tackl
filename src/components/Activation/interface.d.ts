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
	isCtaOverridden: boolean;
	ctaOverrideHeading?: string;
	ctaOverrideButtonLabel?: string;
	ctaHeading: string;
	ctaButtonLabel: string;
	email: string;
	linkedin?: string;
	twitter?: string;
	contactTitle: string;
	legalTitle: string;
}
