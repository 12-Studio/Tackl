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
import { theme } from '@theme';

// --------------
// 1. Semantics
// --------------
export const Section = styled.section`
	${semantics}
	${gridSemantics}
`;
export const Div = styled.div`
	${semantics}
	${gridSemantics}
`;
export const Main = styled.main`
	${semantics}
	${gridSemantics}
`;
export const Nav = styled.nav`
	${semantics}
	${gridSemantics}
`;
export const Article = styled.article`
	${semantics}
	${gridSemantics}
`;
export const Aside = styled.aside`
	${semantics}
	${gridSemantics}
`;
export const Header = styled.header`
	${semantics}
	${gridSemantics}
`;
export const Footer = styled.footer`
	${semantics}
	${gridSemantics}
`;

export const List = styled.ul`
	${semantics}
	${gridSemantics}
`;

export const ListItem = styled.li`
	${semantics}
	${gridSemantics}
`;

// --------------
// 3. Typography
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
const sharedBlockStyles = (props) => css`
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
	}

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

	ul {
		li {
		}
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
