// Imports
// ------------
import type { SingleFaqProps } from './SingleFaq/interface';

// Exports
// ------------
export interface FaqsProps {
	heading: string;
	desc: string;
	allFaqs: SingleFaqProps[];
	background?: {
		url: string;
		alt: string;
		blur?: string;
	};
}
