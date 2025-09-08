// Imports
// ---------
import styled, { css } from 'styled-components';
import type { RuleSet } from 'styled-components/dist/types';
import { getVw as useVw, getVwMobile as useVwMobile, getVwTablet as useVwTablet } from '@utils/getVw';
import { semantics, gridSemantics, SemanticProps } from './semantics';
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
export const Section = styled.section<SemanticProps>`
	${SemanticBase}
`;
export const Div = styled.div<SemanticProps>`
	${SemanticBase}
`;
export const Main = styled.main<SemanticProps>`
	${SemanticBase}
`;
export const Waffl = styled('waffl-grid')<SemanticProps>`
	${SemanticBase}
`;
export const Nav = styled.nav<SemanticProps>`
	${SemanticBase}
`;

export const Form = styled.form<SemanticProps>`
	${SemanticBase}
`;
export const Article = styled.article<SemanticProps>`
	${SemanticBase}
`;
export const Aside = styled.aside<SemanticProps>`
	${SemanticBase}
`;
export const Header = styled.header<SemanticProps>`
	${SemanticBase}
`;
export const Footer = styled.footer<SemanticProps>`
	${SemanticBase}
`;
export const List = styled.ul<SemanticProps>`
	${SemanticBase}
`;
export const ListItem = styled.li<SemanticProps>`
	${SemanticBase}
`;

// Additional HTML5 tags
export const Figure = styled.figure<SemanticProps>`
	${SemanticBase}
`;
export const FigCaption = styled.figcaption<SemanticProps>`
	${SemanticBase}
`;
export const Mark = styled.mark<SemanticProps>`
	${SemanticBase}
`;
export const Time = styled.time<SemanticProps>`
	${SemanticBase}
`;
export const Output = styled.output<SemanticProps>`
	${SemanticBase}
`;
export const Details = styled.details<SemanticProps>`
	${SemanticBase}
`;
export const Summary = styled.summary<SemanticProps>`
	${SemanticBase}
`;
export const Dialog = styled.dialog<SemanticProps>`
	${SemanticBase}
`;
export const Progress = styled.progress<SemanticProps>`
	${SemanticBase}
`;
export const Meter = styled.meter<SemanticProps>`
	${SemanticBase}
`;

// --------------
// 2. Typography
// --------------
export const H1 = styled.h1<SemanticProps>`
	${SemanticBase}
`;
export const H2 = styled.h2<SemanticProps>`
	${SemanticBase}
`;
export const H3 = styled.h3<SemanticProps>`
	${SemanticBase}
`;
export const H4 = styled.h4<SemanticProps>`
	${SemanticBase}
`;
export const H5 = styled.h5<SemanticProps>`
	${SemanticBase}
`;
export const H6 = styled.h6<SemanticProps>`
	${SemanticBase}
`;
export const P = styled.p<SemanticProps>`
	${SemanticBase}
`;
export const Em = styled.em<SemanticProps>`
	${SemanticBase}
`;
export const Span = styled.span<SemanticProps>`
	${SemanticBase}
`;
export const Quote = styled.q<SemanticProps>`
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

export const ContentBlock = styled(Div)<SemanticProps>`
	${sharedBlockStyles}
	${gridSemantics}
`;

export const ContentBlockStyles: SemanticStyles = css`
	${sharedBlockStyles}
`;


export const getGlobal = (color: keyof Theme['colors']['global'], opacity?: number) => (props: any) => {
    const global = props.theme.colors.global;
    return global?.[color]?.[opacity !== undefined ? opacity : 100];
};

export const getBrand = (color: keyof Theme['colors']['brand'], opacity?: number) => (props: any) => {
	const brand = props.theme.colors?.brand;
    return brand?.[color]?.[opacity !== undefined ? opacity : 'solid'];
};


export const getFeedback = (color: keyof Theme['colors']['feedback']) => (props: any) => {
    return props.theme.colors.feedback[color];
};

export const getGap = (gapSize: keyof Theme['gap']) => (props: any) => {
    return props.theme.gap[gapSize];
};

export const getSpace = (spaceSize: keyof Theme['space']) => (props: any) => {
    return props.theme.space[spaceSize];
};

export const getFont = (fontFamily: keyof Theme['font']['family']) => (props: any) => {
    return props.theme.font.family[fontFamily];
};

export const getFontWeight = (fontWeight: keyof Theme['font']['weight']) => (props: any) => {
    return props.theme.font.weight[fontWeight];
};

export const getRadius = (radiusSize: keyof Theme['br']) => (props: any) => {
    return props.theme.br[radiusSize];
};

export const getEase = (easeSize: keyof Theme['easing']) => (props: any) => {
    return props.theme.easing[easeSize];
};

export const getVw = useVw;
export const getVwMobile = useVwMobile;
export const getVwTablet = useVwTablet;