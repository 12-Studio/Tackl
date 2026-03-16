'use client';

// Imports
// ------------
import { Fragment } from 'react';
import dynamic from 'next/dynamic';

// Lazy Load Components
// ------------
const SplitFeatureGrid = dynamic(() => import('./SplitFeatureGrid'), { ssr: true });
const NumberedProcessGrid = dynamic(() => import('./NumberedProcessGrid'), { ssr: true });
const StatisticsGrid = dynamic(() => import('./StatisticsGrid'), { ssr: true });
const AlternatingMediaRow = dynamic(() => import('./AlternatingMediaRow'), { ssr: true });
const ComparisonTable = dynamic(() => import('./ComparisonTable'), { ssr: true });
const EditorialStoryCtaStat = dynamic(() => import('./EditorialStoryCtaStat'), { ssr: true });
const HeadingDescription = dynamic(() => import('./HeadingDescription'), { ssr: true });
const Parallax = dynamic(() => import('./Parallax'), { ssr: true });
const AnimatedStory = dynamic(() => import('./AnimatedStory'), { ssr: true });
const TeamMembers = dynamic(() => import('./TeamMembers'), { ssr: true });
const Faqs = dynamic(() => import('./Faqs'), { ssr: true });
const BigIconTextGrid = dynamic(() => import('./BigIconTextGrid'), { ssr: true });
const StandardContent = dynamic(() => import('./StandardContent'), { ssr: true });

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const renderBlock = (block: I.PageBuilderBlock, contactTitle?: string | null) => {
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
					contactTitle={contactTitle ?? null}
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
					contactTitle={contactTitle ?? null}
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
			return (
				<Faqs
					heading={block.heading}
					desc={block.desc ?? ''}
					allFaqs={block.faqs ?? []}
					background={block.background}
				/>
			);
		case 'BigIconTextGridRecord':
			return (
				<BigIconTextGrid
					heading={block.heading}
					desc={block.desc ?? ''}
					sections={block.sections ?? []}
				/>
			);
		case 'StandardContentRecord':
			return <StandardContent heading={block.heading} text={block.text} />;
		default:
			return null;
	}
};

const PageBuilder = ({ pageBuilder, contactTitle }: I.PageBuilderProps) => (
	<>
		{(pageBuilder ?? []).map(block => (
			<Fragment key={`${block.__typename}-${block.id}`}>
				{renderBlock(block, contactTitle ?? null)}
			</Fragment>
		))}
	</>
);

// Exports
// ------------
PageBuilder.displayName = 'PageBuilder';
export default PageBuilder;
