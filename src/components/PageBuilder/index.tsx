'use client';

// Imports
// ------------
import SplitFeatureGrid from '@parts/SplitFeatureGrid';
import NumberedProcessGrid from '@parts/NumberedProcessGrid';

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
		default:
			return null;
	}
};

// Exports
// ------------
PageBuilder.displayName = 'PageBuilder';
export default PageBuilder;
