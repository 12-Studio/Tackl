// Imports
// ------------

// Exports
// ------------
export type FrameProps = {
	dir?: 'v' | 'h';
	className?: string;
	isLight?: boolean;
	lineRef?: React.RefObject<HTMLDivElement>;
	firstPlusRef?: React.RefObject<HTMLSpanElement>;
	lastPlusRef?: React.RefObject<HTMLSpanElement>;
};
