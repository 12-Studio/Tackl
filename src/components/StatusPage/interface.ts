// Exports
// ------------
export interface StatusPageProps {
	// NOTE • Small label above the title, e.g. '404'
	code?: string;
	title: string;
	message?: string;
	// NOTE • Actions — links or buttons, styled with the exported actionClass
	children?: React.ReactNode;
}
