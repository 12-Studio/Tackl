// Property Documentation
// ------------

// NOTE • This file exports the helpers that turn raw token values into CSS
// custom properties. Raw values are emitted once on :root (see GlobalStyle in
// @theme), and the theme object exposes var() references to them — so the same
// tokens work in styled-components, plain CSS and Server Components, and can
// be overridden at runtime (e.g. html[data-theme='dark']).

// Exports
// ------------
// ANCHOR • Map raw token values to var() references
// NOTE • Usage: toVarRefs('space', { s: '4.8rem' }) → { s: 'var(--space-s)' }
export const toVarRefs = <T extends Record<string, string | number>>(
	prefix: string,
	values: T
): { [K in keyof T]: string } => {
	return Object.fromEntries(Object.keys(values).map(key => [key, `var(--${prefix}-${key})`])) as {
		[K in keyof T]: string;
	};
};

// ANCHOR • Serialise raw token values as CSS custom property declarations
// NOTE • Usage: toVarDeclarations('space', { s: '4.8rem' }) → '--space-s: 4.8rem;'
export const toVarDeclarations = (prefix: string, values: Record<string, string | number>): string =>
	Object.entries(values)
		.map(([key, value]) => `--${prefix}-${key}: ${value};`)
		.join('\n');
