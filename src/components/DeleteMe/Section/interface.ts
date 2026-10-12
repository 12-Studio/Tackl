// Exports
// ------------
export interface SectionProps {
	id?: string;
	title: string;
	intro?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
	// NOTE • Give the header its own stage (PinnedStage): it pins centre
	// screen while the Hero fades it in, holds while the section's content
	// rises to meet it, then the two scroll on together
	isPinned?: boolean;
}
