// Imports
// ------------
import type { PageBuilderBlock } from '@parts/PageBuilder/interface';

// Exports
// ------------
export interface DataSupplyProps {
	title: string;
	heading: string;
	desc: string;
	usaCoverage: number;
	pageBuilder?: PageBuilderBlock[];
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
