// Imports
// ------------

// Exports
// ------------
export interface EditorialStoryCtaStatProps {
	contactTitle: string;
	heading: string;
	animatedText?: string;
	inlineCallToAction?: {
		description?: string;
		buttonLabel?: string;
		heading?: string;
		overrideBackground?: boolean;
		backgroundImage?: {
			url: string;
			alt: string;
			blur?: string;
		};
	};
	statistics?: {
		symbolBeforeNumber?: string;
		symbolAfterNumber?: string;
		number?: string;
		hasSymbolBefore?: boolean;
		heading?: string;
		id?: string;
	}[];
}
