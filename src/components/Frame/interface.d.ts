// Imports
// ------------

// Exports
// ------------
export type FrameProps = {
	dir?: 'v' | 'h';
	className?: string;
	isLight?: boolean;
	lineRef?: React.RefObject<HTMLDivElement | null>;
	firstPlusRef?: React.RefObject<HTMLSpanElement | null>;
	lastPlusRef?: React.RefObject<HTMLSpanElement | null>;
};
