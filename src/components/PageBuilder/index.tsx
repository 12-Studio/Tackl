// Imports
// ------------
import { Fragment } from 'react';
import SplitFeatureGrid from '@parts/SplitFeatureGrid';
import NumberedProcessGrid from '@parts/NumberedProcessGrid';
import StatisticsGrid from '@parts/StatisticsGrid';
import AlternatingMediaRow from '@parts/AlternatingMediaRow';
import ComparisonTable from '@parts/ComparisonTable';
import EditorialStoryCtaStat from '@parts/EditorialStoryCtaStat';
import HeadingDescription from '@parts/HeadingDescription';

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
