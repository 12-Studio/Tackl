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
	| 'displayL'
	| 'displayS'
	| 'headlineL'
	| 'headlineS'
	| 'titleL'
	| 'titleS'
	| 'bodyL'
	| 'bodyS'
	| 'captionL'
	| 'captionS';

export type TokenValues = Record<TokenGroup, Record<string, string>>;

export type FieldKind = 'color' | 'text' | 'px' | 'select';

export type FieldDef = {
	group: TokenGroup;
	key: string;
	label: string;
	kind?: FieldKind;
	options?: string[];
	optionsKey?: 'fonts';
	optional?: boolean;
};

export type RowDef = {
	label?: string;
	fields: FieldDef[];
};

export type SectionDef = {
	title?: string;
	rows: RowDef[];
	dynamic?: 'brand';
};

export type StepDef = {
	id: string;
	title: string;
	intro: string;
	kind: FieldKind;
	sections: SectionDef[];
	hasFontUpload?: boolean;
};

export type UploadedFont = {
	exportName: string;
	cssVariable: string;
	varRef: string;
};

export type Screen = 'welcome' | 'review' | 'done' | number;
