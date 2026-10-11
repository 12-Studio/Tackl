// Exports
// ------------
export type CodeLanguage = 'tsx' | 'scss' | 'shell';

export interface CodeProps {
	// NOTE • The file or language shown above the block, e.g. 'page.tsx'
	label?: string;
	code: string;
	// NOTE • Inferred from the label when not set (see highlight.ts)
	language?: CodeLanguage;
	className?: string;
}
