// Property Documentation
// ------------

// NOTE • Raw font values only — no next/font calls, so the style generator
// (scripts/build-styles.ts) can import this file outside Next's compiler.
// The next/font instances live in ./index.ts.

// SECTION • Font Registry
// NOTE • Every next/font instance is registered here — key is the font's
// name, value is the CSS variable it exposes on <html>. Add new fonts here
// and reference their variable in the font stacks below.
export const fontVariables = {
	inter: '--inter',
};

// SECTION • Raw Font Stacks
// NOTE • Emitted as --font-{key} on :root in the generated tokens.css.
// --inter is set on <html> by next/font (see app/(site)/layout.tsx)
export const fontFamilies = {
	heading: `var(--inter), Arial, sans-serif`,
	body: `var(--inter), Arial, sans-serif`,
	mono: `var(--inter), Arial, sans-serif`,
	script: `var(--inter), Arial, sans-serif`,
	// NOTE • A system stack — no font download (used by the CookieBar heading)
	serif: `Georgia, 'Times New Roman', serif`,
};

// SECTION • Raw Font Weights
// NOTE • Emitted as --weight-{key} on :root in the generated tokens.css
export const fontWeights = {
	light: 300,
	regular: 400,
	medium: 500,
	semi: 600,
	bold: 700,
	heavy: 800,
	black: 900,
};
