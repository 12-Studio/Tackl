// Imports
// ------------
import type { Feature } from '@parts/SplitFeatureGrid/interface';
import type { Process } from '@parts/NumberedProcessGrid/interface';
import type { Statistics } from '@parts/StatisticsGrid/interface';

// Exports
// ------------
export type PageBuilderBlock = {
	__typename: string;
	id: string;
	heading: string;
	features?: Feature[];
	processes?: Process[];
	statistics?: Statistics[];
};

export type PageBuilderProps = {
	pageBuilder: PageBuilderBlock;
};
