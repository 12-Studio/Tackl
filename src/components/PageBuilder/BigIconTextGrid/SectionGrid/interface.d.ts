// Imports
// ------------

import type { StructuredText } from 'react-datocms/structured-text';

// Exports
// ------------
export interface SectionGridProps {
	id?: string;
	subHeading: string;
	heading: string;
	desc: StructuredText;
	icon: {
		url: string;
		alt: string;
		blur?: string;
	};
}
