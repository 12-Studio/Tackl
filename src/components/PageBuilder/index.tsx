// Imports
// ------------
import { Fragment } from 'react';
import SplitFeatureGrid from './SplitFeatureGrid';
import NumberedProcessGrid from './NumberedProcessGrid';
import StatisticsGrid from './StatisticsGrid';
import AlternatingMediaRow from './AlternatingMediaRow';
import ComparisonTable from './ComparisonTable';
import EditorialStoryCtaStat from './EditorialStoryCtaStat';
import HeadingDescription from './HeadingDescription';
import Parallax from './Parallax';
import AnimatedStory from './AnimatedStory';
import TeamMembers from './TeamMembers';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const renderBlock = (block: I.PageBuilderBlock) => {
	switch (block.__typename) {
		case 'SplitFeatureGridRecord':
			return <SplitFeatureGrid heading={block.heading} features={block.features ?? []} />;
		case 'NumberedProcessGridRecord':
			return (
				<NumberedProcessGrid heading={block.heading} processes={block.processes ?? []} />
			);
		case 'StatisticsGridRecord':
			return <StatisticsGrid heading={block.heading} statistics={block.statistics ?? []} />;
		case 'AlternatingMediaRowRecord':
			return (
				<AlternatingMediaRow
					heading={block.heading}
					desc={block.desc ?? ''}
					rows={block.rows ?? []}
				/>
			);
		case 'ComparisonTableRecord':
			return (
				<ComparisonTable
					heading={block.heading}
					desc={block.desc ?? ''}
					background={block.background}
					table={block.table ?? []}
				/>
			);
		case 'EditorialStoryCtaStatRecord':
			return (
				<EditorialStoryCtaStat
					heading={block.heading}
					animatedText={block.animatedText}
					inlineCallToAction={block.inlineCallToAction}
					statistics={block.statistics}
				/>
			);
		case 'HeadingDescriptionRecord':
			return <HeadingDescription heading={block.heading} desc={block.desc} />;
		case 'ParallaxRecord':
			return <Parallax parallaxSections={block.parallaxSections} />;
		case 'AnimatedStoryRecord':
			return (
				<AnimatedStory
					desc={block.desc}
					animatedText={block.animatedText}
					buttonLabel={block.buttonLabel}
				/>
			);
		case 'MembersTeamRecord':
			return (
				<TeamMembers
					heading={block.heading}
					desc={block.desc}
					teamMembers={block.teamMembers ?? []}
				/>
			);
		case 'FaqRecord':
			return null;
		case 'BigIconTextGridRecord':
			return null;
		default:
			return null;
	}
};

const PageBuilder = ({ pageBuilder }: I.PageBuilderProps) => (
	<>
		{(pageBuilder ?? []).map(block => (
			<Fragment key={`${block.__typename}-${block.id}`}>{renderBlock(block)}</Fragment>
		))}
	</>
);

// Exports
// ------------
PageBuilder.displayName = 'PageBuilder';
export default PageBuilder;
