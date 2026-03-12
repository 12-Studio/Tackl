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
}
