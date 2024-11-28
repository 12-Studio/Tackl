// Imports
// ------
import { css } from 'styled-components';
import { breakpointUp as bp } from './breakpoints';
import { semantics, gridSemantics } from './semantics';
import { theme } from '../';

// Pre-compute commonly used values
const {
	font: {
		weight: { reg, semi, medium },
		type: { heading, body },
	},
} = theme;

// Shared styles as constants to avoid recalculation
const baseHeadingStyles = css`
	font-weight: ${reg};
	font-family: ${heading};
	${gridSemantics}
	${semantics}
`;

const baseBodyStyles = css`
	font-family: ${body};
	font-weight: ${reg};
	${gridSemantics}
	${semantics}
`;

// Heading styles with memoized shared styles
export const h0Styles = css`
	${baseHeadingStyles}
	font-size: 6rem;
	line-height: 1.2;
	${bp.smedium`font-size: 6.8rem;`}
	${bp.xlarge`font-size: 16.8rem;`}
`;

export const h1Styles = css`
	${baseHeadingStyles}
	font-size: 5.8rem;
	line-height: 1.2;
	${bp.xlarge`
		font-size: 14.4rem;
		line-height: 1;
	`}
`;

export const h2Styles = css`
	${baseHeadingStyles}
	font-size: 4.8rem;
	line-height: 1.2;
	${bp.xlarge`font-size: 9rem;`}
`;

export const h3Styles = css`
	${baseHeadingStyles}
	font-size: 4rem;
	line-height: 1.32;
	${bp.xlarge`font-size: 6rem;`}
`;

export const h4Styles = css`
	${baseHeadingStyles}
	font-size: 3rem;
	line-height: 1.32;
	${bp.large`font-size: 4.8rem;`}
`;

export const h5Styles = css`
	${baseHeadingStyles}
	font-size: 2.4rem;
	line-height: 1.32;
	${bp.large`font-size: 4rem;`}
`;

export const h6Styles = css`
	${baseHeadingStyles}
	font-size: 1.2rem;
	line-height: 1.32;
	font-weight: ${semi};
	text-transform: uppercase;
	${bp.large`font-size: 1.4rem;`}
`;

// Body styles with memoized shared styles
export const pStyles = css`
	${baseBodyStyles}
	font-size: 1.6rem;
	line-height: 1.44;
	${bp.xlarge`font-size: 2.2rem;`}
`;

export const spanStyles = css`
	${baseBodyStyles}
	font-size: 1.4rem;
	line-height: 1.32;
	${bp.xlarge`font-size: 1.8rem;`}
`;

export const emStyles = css`
	${baseBodyStyles}
	display: inline-block;
	font-style: normal;
	font-weight: ${medium};
	font-size: 1rem;
	line-height: 1.32;
	${bp.xlarge`font-size: 1.2rem;`}
`;
