// Imports
// ---------
import styled, { css } from 'styled-components';
import type { RuleSet } from 'styled-components/dist/types';
import { getVw as useVw, getVwMobile as useVwMobile, getVwTablet as useVwTablet } from '@utils/getVw';
import { semantics, gridSemantics } from './semantics';
import { breakpointUp, breakpointDown } from './breakpoints';
import { Theme } from '../';
import {
	headingXXL,
	headingXL,
	headingL,
	headingM,
	headingSM,
	headingS,
	bodyM,
} from './type';


// Types
// ------
type SemanticStyles = RuleSet<object>;


// Base semantic components with shared styles
const SemanticBase: SemanticStyles = css`
	${semantics}
	${gridSemantics}
`;

// --------------
// 1. Semantics
// --------------
export const Section = styled.section<{}>`
	${SemanticBase}
`;
export const Div = styled.div<{}>`
	${SemanticBase}
`;
export const Main = styled.main<{}>`
	${SemanticBase}
`;
export const Waffl = styled('waffl-grid')<{}>`
	${SemanticBase}
`;
export const Nav = styled.nav<{}>`
	${SemanticBase}
`;

export const Form = styled.form<{}>`
	${SemanticBase}
`;
export const Article = styled.article<{}>`
	${SemanticBase}
`;
export const Aside = styled.aside<{}>`
	${SemanticBase}
`;
export const Header = styled.header<{}>`
	${SemanticBase}
`;
export const Footer = styled.footer<{}>`
	${SemanticBase}
`;
export const List = styled.ul<{}>`
	${SemanticBase}
`;
export const ListItem = styled.li<{}>`
	${SemanticBase}
`;

// Additional HTML5 tags
export const Figure = styled.figure<{}>`
	${SemanticBase}
`;
export const FigCaption = styled.figcaption<{}>`
	${SemanticBase}
`;
export const Mark = styled.mark<{}>`
	${SemanticBase}
`;
export const Time = styled.time<{}>`
	${SemanticBase}
`;
export const Output = styled.output<{}>`
	${SemanticBase}
`;
export const Details = styled.details<{}>`
	${SemanticBase}
`;
export const Summary = styled.summary<{}>`
	${SemanticBase}
`;
export const Dialog = styled.dialog<{}>`
	${SemanticBase}
`;
export const Progress = styled.progress<{}>`
	${SemanticBase}
`;
export const Meter = styled.meter<{}>`
	${SemanticBase}
`;

// --------------
// 2. Typography
// --------------
export const H1 = styled.h1<{}>`
	${SemanticBase}
`;
export const H2 = styled.h2<{}>`
	${SemanticBase}
`;
export const H3 = styled.h3<{}>`
	${SemanticBase}
`;
export const H4 = styled.h4<{}>`
	${SemanticBase}
`;
export const H5 = styled.h5<{}>`
	${SemanticBase}
`;
export const H6 = styled.h6<{}>`
	${SemanticBase}
`;
export const P = styled.p<{}>`
	${SemanticBase}
`;
export const Em = styled.em<{}>`
	${SemanticBase}
`;
export const Span = styled.span<{}>`
	${SemanticBase}
`;
export const Quote = styled.q<{}>`
	${SemanticBase}
`;

// --------------
// 3. Breakpoints
// --------------
export const bp = breakpointUp;
export const bpd = breakpointDown;

// --------------
// 4. Content
// --------------
const sharedBlockStyles: SemanticStyles = css`
	h1 {
		${headingXXL}
	}
	h2 {
		${headingXL}
	}
	h3 {
		${headingL}
	}
	h4 {
		${headingM}
	}
	h5 {
		${headingSM}
	}
	h6 {
		${headingS}
	}
	p {
		${bodyM}
	}
`;

export const ContentBlock = styled(Div)<{}>`
	${sharedBlockStyles}
	${gridSemantics}
`;

export const ContentBlockStyles: SemanticStyles = css`
	${sharedBlockStyles}
`;


export const getGlobal = (color: keyof Theme['colors']['global'], opacity?: number) => (props: { theme: Theme }) => {
	const global = props.theme.colors?.global;
    return global?.[color]?.[opacity !== undefined ? opacity : 100];
};

export const getBrand = (color: keyof Theme['colors']['brand'], lightness: keyof Theme['colors']['brand'][keyof Theme['colors']['brand']], opacity?: number) => (props: { theme: Theme }) => {
	const brand = props.theme.colors?.brand;
    return brand?.[color]?.[lightness]?.[opacity !== undefined ? opacity : 100];
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

export const getVw = useVw;
export const getVwMobile = useVwMobile;
export const getVwTablet = useVwTablet;