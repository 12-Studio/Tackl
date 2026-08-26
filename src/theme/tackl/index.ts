// Imports
// -----------------
import type { Theme } from '@theme/interface';
import { getVw as useVw, getVwMobile as useVwMobile, getVwTablet as useVwTablet } from '@utils/getVw';
import styled, { css, type RuleSet } from 'styled-components';
import { breakpointDown, breakpointUp } from './breakpoints';
import { gridSemantics, semantics } from './semantics';
import type { SemanticProps } from './semantics/interface';

// SECTION • Semantic Component
// ------------
// NOTE • One polymorphic base — pick the rendered tag with the `as` prop:
//   <Div as='section' $pad>…</Div>
//   <Div as='h1' $m='2/6' $l='3/9'>…</Div>
// Every tag gets the same spacing props ($mar/$pad…) and responsive grid
// span props ($s/$m/$l…). Elements without span props are made full-width
// by the grid itself (see the waffl-grid rule in src/css/global.css).
export const Div = styled.div<SemanticProps>`
	${props => semantics(props)}
	${props => gridSemantics(props)}
`;

// SECTION • Breakpoints
// ------------
export const bp = breakpointUp;
export const bpd = breakpointDown;

// SECTION • Color Utilities
// ------------
// NOTE • Mixes any color with transparency via color-mix. Accepts a CSS
// variable name ('--brand-c1'), a theme token (already a var() reference),
// or any color value. The browser resolves it, so runtime theme overrides
// still apply to the translucent result.
// Usage: background: ${alpha('--brand-c1', 20)};
//        border-color: ${props => alpha(props.theme.colors.global.white, 15)};
export const alpha = (color: string, opacity: number): string => {
	const value = color.startsWith('--') ? `var(${color})` : color;
	// NOTE • Out-of-range or non-finite opacity would emit invalid color-mix —
	// clamp to 0–100 and treat garbage as fully opaque
	const clamped = Number.isFinite(opacity) ? Math.min(100, Math.max(0, opacity)) : 100;
	return clamped >= 100 ? value : `color-mix(in srgb, ${value} ${clamped}%, transparent)`;
};

// SECTION • Theme Getters
// ------------
// NOTE • Optional opacity (0–100) applies alpha() to the token
const withOpacity = (color?: string, opacity?: number) =>
	color === undefined || opacity === undefined ? color : alpha(color, opacity);

export const getGlobal = (color: keyof Theme['colors']['global'], opacity?: number) => (props: { theme: Theme }) => {
	return withOpacity(props.theme.colors.global[color], opacity);
};

export const getBrand = (color: keyof Theme['colors']['brand'], opacity?: number) => (props: { theme: Theme }) => {
	return withOpacity(props.theme.colors.brand[color], opacity);
};

export const getFeedback =
	(color: 'positive' | 'negative' | 'warning', opacity?: number) => (props: { theme: Theme }) => {
		return withOpacity(props.theme.colors.feedback[color], opacity);
	};

export const getGap = (gapSize: keyof Theme['gap']) => (props: { theme: Theme }) => {
	return props.theme.gap[gapSize];
};

export const getSpace = (spaceSize: keyof Theme['space']) => (props: { theme: Theme }) => {
	return props.theme.space[spaceSize];
};

export const getFont = (fontFamily: keyof Theme['font']['family']) => (props: { theme: Theme }) => {
	return props.theme.font.family[fontFamily];
};

export const getFontWeight = (fontWeight: keyof Theme['font']['weight']) => (props: { theme: Theme }) => {
	return props.theme.font.weight[fontWeight];
};

export const getRadius = (radiusSize: keyof Theme['br']) => (props: { theme: Theme }) => {
	return props.theme.br[radiusSize];
};

export const getEase = (easeSize: keyof Theme['easing']) => (props: { theme: Theme }) => {
	return props.theme.easing[easeSize];
};

export const getTime = (timeSize: keyof Theme['time']) => (props: { theme: Theme }) => {
	return props.theme.time[timeSize];
};

// SECTION • Style Utilities
// ------------
// NOTE • Hides scrollbars while keeping the element scrollable
// Usage: ${noscrollbars}
export const noscrollbars: RuleSet = css`
	scrollbar-width: none;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		width: 0;
		height: 0;
		background: transparent;
	}
`;

// SECTION • Viewport Utilities
// ------------
export const getVw = useVw;
export const getVwMobile = useVwMobile;
export const getVwTablet = useVwTablet;
