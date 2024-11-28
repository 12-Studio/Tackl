// Imports
// ---------
import styled, { css } from 'styled-components';
import { semantics, gridSemantics } from './semantics';
import {
	h1Styles,
	h2Styles,
	h3Styles,
	h4Styles,
	h5Styles,
	h6Styles,
	pStyles,
	spanStyles,
	emStyles,
} from './type';
import { breakpointUp, breakpointDown } from './breakpoints';

// Base semantic components with shared styles
const SemanticBase = css`
	${semantics}
	${gridSemantics}
`;

// --------------
// 1. Semantics
// --------------
export const Section = styled.section`
	${SemanticBase}
`;
export const Div = styled.div`
	${SemanticBase}
`;
export const Main = styled.main`
	${SemanticBase}
`;
export const Nav = styled.nav`
	${SemanticBase}
`;
export const Article = styled.article`
	${SemanticBase}
`;
export const Aside = styled.aside`
	${SemanticBase}
`;
export const Header = styled.header`
	${SemanticBase}
`;
export const Footer = styled.footer`
	${SemanticBase}
`;
export const List = styled.ul`
	${SemanticBase}
`;
export const ListItem = styled.li`
	${SemanticBase}
`;

// --------------
// 2. Typography
// --------------
export const H1 = styled.h1`
	${h1Styles}
`;
export const H2 = styled.h2`
	${h2Styles}
`;
export const H3 = styled.h3`
	${h3Styles}
`;
export const H4 = styled.h4`
	${h4Styles}
`;
export const H5 = styled.h5`
	${h5Styles}
`;
export const H6 = styled.h6`
	${h6Styles}
`;
export const P = styled.p`
	${pStyles}
`;
export const Em = styled.em`
	${emStyles}
`;
export const Span = styled.span`
	${spanStyles}
`;
export const Quote = styled.q`
	${gridSemantics}
`;

// --------------
// 3. Breakpoints
// --------------
export const bp = breakpointUp;
export const bpd = breakpointDown;

// --------------
// 4. Content
// --------------
const sharedBlockStyles = css`
	h1,
	h2 {
		${h2Styles}
	}
	h3 {
		${h3Styles}
	}
	h4 {
		${h4Styles}
	}
	h5 {
		${h5Styles}
	}
	h6 {
		${h6Styles}
	}
	p {
		${pStyles}
	}
`;

export const ContentBlock = styled.div`
	${sharedBlockStyles}
	${gridSemantics}
`;

export const ContentBlockStyles = css`
	${sharedBlockStyles}
`;
