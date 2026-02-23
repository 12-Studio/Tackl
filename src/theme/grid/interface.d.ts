// Grid Types / Interfaces
// ------------

// SECTION • Grid
// NOTE — The main grid object structure
export interface Grid {
	columns: Columns;
	breakpoints: Breakpoints;
	gutter: Gutter;
	maxSize: string;
}

export interface Columns {
	s?: number;
	m?: number;
	l?: number;
}

export interface Breakpoints {
	s?: string;
	sm?: string;
	m?: string;
	l?: string;
	xl?: string;
	xxl?: string;
	huge?: string;
	uber?: string;
}

export interface Gutter {
	s?: string;
	m?: string;
	l?: string;
}
