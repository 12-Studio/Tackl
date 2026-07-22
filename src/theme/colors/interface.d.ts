// Color Types / Interfaces
// ------------

// SECTION • Colors
// NOTE — Every color token is a var() reference string; opacity is applied
// at the point of use (getters or color-mix in CSS), not stored per shade
export type Colors = {
	brand: BrandColors;
	global: GlobalColors;
	feedback: FeedbackColors;
};

// SECTION • Brand Colors
export type BrandColors = {
	bc1: string;
	bc2: string;
	bc3: string;
	bc4?: string;
	bc5?: string;
	bc6?: string;
};

// SECTION • Global Colors
export type GlobalColors = {
	white: string;
	black: string;
};

// SECTION • Feedback Colors
export type FeedbackColors = {
	positive: string;
	negative: string;
	warning: string;
};
