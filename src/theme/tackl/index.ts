// Imports
// -----------------
import type { Theme } from '@theme/interface';
import { getVw as useVw, getVwMobile as useVwMobile, getVwTablet as useVwTablet } from '@utils/getVw';
import styled from 'styled-components';
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

// SECTION • Theme Getters
// ------------
export const getGlobal = (color: keyof Theme['colors']['global'], opacity?: number) => (props: { theme: Theme }) => {
	const global = props.theme.colors.global;
	return global?.[color]?.[opacity !== undefined ? opacity : 100];
};

export const getBrand = (color: keyof Theme['colors']['brand'], opacity?: number) => (props: { theme: Theme }) => {
	const brand = props.theme.colors?.brand;
	return brand?.[color]?.[opacity !== undefined ? opacity : 'solid'];
};

export const getFeedback =
	(color: 'positive' | 'negative' | 'warning', opacity?: number) => (props: { theme: Theme }) => {
		const feedback = props.theme.colors.feedback[color];
		return feedback?.[opacity !== undefined ? opacity : 'solid'];
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

export const getUtil = (util: keyof Theme['utils']) => (props: { theme: Theme }) => {
	return props.theme.utils[util];
};

// SECTION • Viewport Utilities
// ------------
export const getVw = useVw;
export const getVwMobile = useVwMobile;
export const getVwTablet = useVwTablet;
