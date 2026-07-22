// Grid Types / Interfaces
// ------------

// SECTION • Grid
// NOTE — The main grid object structure
export interface Grid {
	columns: Columns;
	breakpoints: Breakpoints;
	gutter: Gutter;
	maxSize: string;
	design: DesignWidths;
}

// NOTE — Reference artboard widths (in px) the designs are produced at.
// Used by getVw/getVwTablet/getVwMobile to convert px values to vw units.
export interface DesignWidths {
	mobile: number;
	tablet: number;
	desktop: number;
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
