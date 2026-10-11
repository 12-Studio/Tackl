// Exports
// ------------
export interface ExampleProps {
	id: string;
	title: string;
	children: React.ReactNode;
	demo: React.ReactNode;
	// NOTE • Optional for demos that render their own (live) code
	code?: string;
	label?: string;
}
