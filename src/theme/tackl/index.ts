// Imports
// -----------------
import { theme } from '@theme';
import { getVw as useVw, getVwMobile as useVwMobile, getVwTablet as useVwTablet } from '@utils/getVw';

// SECTION • Grid Column
// ------------
// NOTE • The grid child with responsive spans — pick the tag with `as`:
//   <Col as='article' $m='2/6' $l='3/9'>…</Col>
// Children without spans don't need it: every direct child of a grid spans
// the full width by default (see the waffl-grid rules in src/css/global.scss).
export { default as Col } from './col';

// SECTION • Breakpoints for JS
// ------------
// NOTE • The same values that generate the SCSS bp() / bpd() mixins — use
// these in gsap.matchMedia, matchMedia listeners and the like:
//   breakpoints.m → '700px'
//   mq.up.m       → '(min-width: 700px)'
//   mq.down.m     → '(max-width: 699.98px)' (0.02px under, so up/down never overlap)
export const breakpoints = theme.grid.breakpoints;

type BreakpointKey = keyof typeof breakpoints;

const toQueries = (query: (size: number) => string) =>
	Object.fromEntries(Object.entries(breakpoints).map(([key, size]) => [key, query(parseFloat(size))])) as Record<
		BreakpointKey,
		string
	>;

export const mq = {
	up: toQueries(size => `(min-width: ${size}px)`),
	down: toQueries(size => `(max-width: ${size - 0.02}px)`),
};

// SECTION • Color Utilities
// ------------
// NOTE • Mixes any color with transparency via color-mix — same name and
// signature as alpha() in SCSS. Accepts a CSS variable name ('--brand-c1'), a theme token
// (already a var() reference), or any color value. The browser resolves it,
// so runtime theme overrides still apply to the translucent result.
// Usage: gsap.to(el, { backgroundColor: alpha('--brand-c1', 20) });
//        style={{ borderColor: alpha(theme.colors.global.white, 15) }}
export const alpha = (color: string, opacity: number): string => {
	const value = color.startsWith('--') ? `var(${color})` : color;
	// NOTE • Out-of-range or non-finite opacity would emit invalid color-mix —
	// clamp to 0–100 and treat garbage as fully opaque
	const clamped = Number.isFinite(opacity) ? Math.min(100, Math.max(0, opacity)) : 100;
	return clamped >= 100 ? value : `color-mix(in srgb, ${value} ${clamped}%, transparent)`;
};

// SECTION • Viewport Utilities
// ------------
// NOTE • px → vw against the design widths — the JS twins of vw() in SCSS
export const getVw = useVw;
export const getVwMobile = useVwMobile;
export const getVwTablet = useVwTablet;
