// Imports
// ------------
import type { SplitFeatureGridProps } from './SplitFeatureGrid/interface';
import type { NumberedProcessGridProps } from './NumberedProcessGrid/interface';
import type { StatisticsGridProps } from './StatisticsGrid/interface';
import type { AlternatingMediaRowProps } from './AlternatingMediaRow/interface';
import type { ComparisonTableProps } from './ComparisonTable/interface';
import type { EditorialStoryCtaStatProps } from './EditorialStoryCtaStat/interface';
import type { ParallaxProps } from './Parallax/interface';
import type { AnimatedStoryProps } from './AnimatedStory/interface';
import type { TeamMembersProps } from './TeamMembers/interface';

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
	animatedStory?: AnimatedStoryProps['animatedStory'];
	buttonLabel?: AnimatedStoryProps['buttonLabel'];
	teamMembers?: TeamMembersProps['teamMembers'];
};

export type PageBuilderProps = {
	pageBuilder?: PageBuilderBlock[];
};
