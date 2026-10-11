// Exports
// ------------
export interface SectionProps {
	id?: string;
	// NOTE • The section number shown in the label column, e.g. '02'
	index: string;
	eyebrow: string;
	title: string;
	intro?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
}
