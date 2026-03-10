'use client';

// Imports
// ------------
import SplitFeatureGrid from '@parts/SplitFeatureGrid';
import NumberedProcessGrid from '@parts/NumberedProcessGrid';
import StatisticsGrid from '@parts/StatisticsGrid';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const PageBuilder = ({ pageBuilder }: I.PageBuilderProps) => {
	switch (pageBuilder.__typename) {
		case 'SplitFeatureGridRecord':
			return (
				<SplitFeatureGrid
					heading={pageBuilder.heading}
					features={pageBuilder.features ?? []}
				/>
			);
		case 'NumberedProcessGridRecord':
			return (
				<NumberedProcessGrid
					heading={pageBuilder.heading}
					processes={pageBuilder.processes ?? []}
				/>
			);
		case 'StatisticsGridRecord':
			return (
				<StatisticsGrid
					heading={pageBuilder.heading}
					statistics={pageBuilder.statistics ?? []}
				/>
			);
		default:
			return null;
	}
};

// Exports
// ------------
PageBuilder.displayName = 'PageBuilder';
export default PageBuilder;
