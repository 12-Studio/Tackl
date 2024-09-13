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
		color: ${theme.colors.brand.bc2};
		margin: 0 0 1.2rem;

		${bp.$large` margin: 0 0 2.4rem; `}
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
		display: flex;
		flex-flow: column;
		gap: 1.2rem;
		margin: 0 0 1.2rem;

		${bp.$large` margin: 0 0 2.4rem; `}

		li {
			${spanStyles}
			color: ${theme.colors.brand.bc280};

			position: relative;
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			padding-left: 1.8rem;

			&:before {
				content: '';
				position: absolute;
				top: 0.8rem;
				left: 0;

				width: 0.4rem;
				height: 0.4rem;

				background: ${theme.colors.brand.bc1};

				${bp.$large`
					top: 1rem;
				`}
			}
		}
	}

	p {
		${pStyles}
		color: ${theme.colors.brand.bc260};
		margin: 0 0 1.2rem;

		${bp.$large` margin: 0 0 2.4rem; `}

		span, a, strong, em {
			color: ${theme.colors.brand.bc260};
		}

		&:last-child {
			margin: 0;
		}

		strong,
		a {
			font-weight: ${(props) => theme.font.weight.bold};
		}

		a {
			text-decoration: underline;
			transition: ${theme.easing.ease};

			&:hover {
				color: ${theme.colors.brand.bc1};
			}
		}
	}
`;
export const ContentBlock = styled.div`
	${sharedBlockStyles}
	${gridSemantics}
`;

export const ContentBlockStyles = css`
	${sharedBlockStyles}
`;
