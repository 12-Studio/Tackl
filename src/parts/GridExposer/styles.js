// Imports
// ------
import styled, { css } from 'styled-components';
import { Main, bp, Div, Aside } from '@tackl';

// Exports
// ------
export const Col = styled(Div)(
	(props) => css`
		height: 100%;

		span {
			display: block;
			opacity: ${props.$altColor ? 0.5 : 0.2};
			background-color: ${props.$altColor
				? props.theme.colors.feedback.negative
				: props.theme.colors.global.white.solid};

			width: 100%;
			height: 100%;
			transition: all 0.25s linear;
		}
	`
);

export const Jacket = styled(Aside)(
	(props) => css`
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: ${props.$showGrid ? `100%` : `0%`};
		pointer-events: none;
		transition: all 1s ${props.theme.easing.bezzy};
		padding: 0 1.2rem;

		${bp.large`
			padding: 0;
		`}

		> .grid {
			height: 100%;
		}
	`
);
