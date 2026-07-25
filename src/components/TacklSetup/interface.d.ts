// Imports
// ------------

// Exports
// ------------
export type TokenGroup =
	| 'brand'
	| 'global'
	| 'feedback'
	| 'fonts'
	| 'space'
	| 'gap'
	| 'radius'
	| 'time'
	| 'easing'
	| 'headingXXL'
	| 'headingXL'
	| 'headingL'
	| 'headingM'
	| 'headingSM'
	| 'headingS'
	| 'bodyM'
	| 'bodyS'
	| 'emphasis';

export type TokenValues = Record<TokenGroup, Record<string, string>>;

export type FieldKind = 'color' | 'text';

export type FieldDef = {
	group: TokenGroup;
	key: string;
	label: string;
};

export type StepDef = {
	id: string;
	title: string;
	intro: string;
	kind: FieldKind;
	fields: FieldDef[];
};

export type Screen = 'welcome' | 'review' | 'done' | number;
