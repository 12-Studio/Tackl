// Exports
// ------------
export interface CopyButtonProps {
	text: string;
	// NOTE • With a label, renders just the button (for copying code blocks);
	// without one, shows the text as a shell command beside it
	label?: string;
	className?: string;
}
