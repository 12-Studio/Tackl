// Imports
// ------
import { css } from 'styled-components';
import { breakpointUp } from './breakpoints';
import { theme } from '../';

// Exports
// --------------
// 1. Margin
// --------------
const marginStyles = (props) => css`
	${props.$marBottom &&
	css`
		margin-bottom: ${theme.space.small};

		${breakpointUp.medium` margin-bottom: ${theme.space.medium}; `}
		${breakpointUp.large` margin-bottom: ${theme.space.large}; `}
	`}

	${props.$marTop &&
	css`
		margin-top: ${theme.space.small};

		${breakpointUp.medium` margin-top: ${theme.space.medium}; `}
		${breakpointUp.large` margin-top: ${theme.space.large}; `}
	`}
    
    ${props.mar &&
	css`
		margin-top: ${theme.space.small};
		margin-bottom: ${theme.space.small};

		${breakpointUp.medium`
            margin-top: ${theme.space.medium};
            margin-bottom: ${theme.space.medium};
        `}

		${breakpointUp.large`
            margin-top: ${theme.space.large};
            margin-bottom: ${theme.space.large};
        `}
	`}
`;

// --------------
// 2. Padding
// --------------
const paddingStyles = (props) => css`
	${props.$mpad &&
	css`
		padding-left: ${theme.space.mpad};
		padding-right: ${theme.space.mpad};

		${breakpointUp.large`
            padding-left: 0px;
            padding-right: 0px;
        `}
	`}

	${props.$mpadLarge &&
	css`
		padding-left: ${theme.space.mpad};
		padding-right: ${theme.space.mpad};
	`}

    ${props.padBottom &&
	css`
		padding-bottom: ${theme.space.small};

		${breakpointUp.medium` padding-bottom: ${theme.space.medium}; `}
		${breakpointUp.large` padding-bottom: ${theme.space.large}; `}
	`}

	${props.$padBottomSmall &&
	css`
		padding-bottom: calc(${theme.space.small} / 2);

		${breakpointUp.medium` padding-bottom: calc(${theme.space.medium} /2);`}
		${breakpointUp.large` padding-bottom: calc(${theme.space.large} /2);`}
	`}

    ${props.$padTop &&
	css`
		padding-top: ${theme.space.small};

		${breakpointUp.medium` padding-top: ${theme.space.medium}; `}
		${breakpointUp.large` padding-top: ${theme.space.large}; `}
	`}
    
    ${props.$pad &&
	css`
		padding-top: ${theme.space.small};
		padding-bottom: ${theme.space.small};

		${breakpointUp.medium`
            padding-top: ${theme.space.medium};
            padding-bottom: ${theme.space.medium};
        `}

		${breakpointUp.large`
            padding-top: ${theme.space.large};
            padding-bottom: ${theme.space.large};
        `}
	`}
`;

// --------------
// 7. Export: Container Styles
// --------------
export const semantics = css`
	${paddingStyles}
	${marginStyles}
`;

// --------------
// 8. Export: Grid Semantics
// --------------

export const gridSemantics = (props) => css`
	/* Create a function that returns css for each breakpoint defined from an object of breakpoints */
	${Object.keys(theme.grid.breakpoints).map(
		(key) => css`
			${props[`$${key}`] &&
			css`
				${breakpointUp[key]` grid-column: ${props[`$${key}`]};
			`}
			`}
		`
	)}
`;

// make the code above compliant with styled-components v6
// https://styled-components.com/docs/migrating-to-v5#deprecated-apis
// https://styled-components.com/docs/api#deprecated-keyframes-interpolation
// https://styled-components.com/docs/api#deprecated-fontface-interpolation
// https://styled-components.com/docs/api#deprecated-css-interpolation
// https://styled-components.com/docs/api#deprecated-attr-interpolation
