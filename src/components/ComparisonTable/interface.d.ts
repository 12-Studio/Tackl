// Imports
// ------------
import type { TableRowProps } from './TableRow/interface';

// Exports
// ------------
export interface ComparisonTableProps {
	heading: string;
	desc: string;
	background?: {
		url: string;
		alt: string;
	};
	table: TableRowProps[];
}
