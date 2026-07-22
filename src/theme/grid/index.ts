// Property Documentation
// ------------

// NOTE • This file exports the grid object, the grid object is used to store all the grid values for the application.

// Exports
// ------------
// NOTE • Grid values stay literal (no CSS variables) — media queries can't
// read custom properties, so these are build-time tokens
export const grid = {
	columns: {
		s: 2,
		m: 6,
		l: 12,
	},
	breakpoints: {
		s: '320px',
		sm: '390px',
		m: '700px',
		l: '1024px',
		xl: '1200px',
		xxl: '1400px',
		huge: '1600px',
		uber: '1800px',
	},
	gutter: {
		s: '2.4rem',
		m: '2.4rem',
		l: '3.6rem',
	},
	maxSize: '1440px',
	design: {
		mobile: 390,
		tablet: 700,
		desktop: 1440,
	},
};
