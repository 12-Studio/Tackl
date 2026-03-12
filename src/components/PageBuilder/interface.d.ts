// Imports
// ------------
import type { SplitFeatureGridProps } from '@parts/SplitFeatureGrid/interface';
import type { NumberedProcessGridProps } from '@parts/NumberedProcessGrid/interface';
import type { StatisticsGridProps } from '@parts/StatisticsGrid/interface';
import type { AlternatingMediaRowProps } from '@parts/AlternatingMediaRow/interface';
import type { ComparisonTableProps } from '@parts/ComparisonTable/interface';
import type { EditorialStoryCtaStatProps } from '@parts/EditorialStoryCtaStat/interface';
import type { ParallaxProps } from '@parts/Parallax/interface';

// Exports
// ------------
export type PageBuilderBlock = {
	__typename: string;
	id: string;
	heading: string;
	features?: SplitFeatureGridProps['features'];
	processes?: NumberedProcessGridProps['processes'];
	statistics?: StatisticsGridProps['statistics'];
	desc?: string;
	rows?: AlternatingMediaRowProps['rows'];
	table?: ComparisonTableProps['table'];
	background?: ComparisonTableProps['background'];
	editorialStoryCtaStat?: EditorialStoryCtaStatProps['statistics'];
	animatedText?: EditorialStoryCtaStatProps['animatedText'];
	inlineCallToAction?: EditorialStoryCtaStatProps['inlineCallToAction'];
	parallaxSections?: ParallaxProps['sections'];
};

export type PageBuilderProps = {
	pageBuilder?: PageBuilderBlock[];
};
