// Imports
// ------------

// Exports
// ------------
export type SplitFeatureGridProps = {
	heading: string;
	features?: Feature[];
};

export interface Feature {
	heading: string;
	desc: string;
	media: Media;
}
export interface Media {
	url: string;
	alt: string;
}
