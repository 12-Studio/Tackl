// Imports
// ------------
import type { PageBuilderBlock } from '@parts/PageBuilder/interface';
import type { HeroProps } from './Hero/interface';

// Exports
// ------------
export interface AboutProps extends HeroProps {
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
}
