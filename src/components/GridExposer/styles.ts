// Imports
// ------

import styled, { css } from 'styled-components';
import { Aside, bp, Div, getEase, getFeedback } from '@/theme/tackl';

// Interfaces
// ------
interface ColProps {
	$altColor?: boolean;
	$isMobile?: boolean;
	$isTablet?: boolean;
	$isDesktop?: boolean;
}

interface JacketProps {
	$showGrid?: boolean;
	$altColor?: boolean;
}

// Exports
// ------
export const Col = styled(Div)<ColProps>(
	props => css`
		height: 100%;
		display: none;

		${
			props.$isMobile &&
			css`
			display: block;
		`
		}

		${bp.m`
            ${
				props.$isTablet &&
				css`
					display: block;
				`
			}
        `}

        ${bp.l`
            display: block;
        `}

        span {
			--max: 100%;
			display: block;

			border-inline-style: dashed;
			border-inline-width: ${!props.$altColor ? 0 : 1}px;
			border-inline-color: ${getFeedback('negative')};

			width: var(--max);
			height: var(--max);
			transition: all 0.25s linear;

			&:after {
				content: '';
				opacity: ${!props.$altColor ? 0.5 : 0.2};
				display: block;
				width: var(--max);
				height: var(--max);
				transition: all 0.25s linear;
				background-color: ${!props.$altColor ? getFeedback('negative') : 'transparent'};
			}
		}
	`
);

export const Jacket = styled(Aside)<JacketProps>(
	props => css`
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: ${props.$showGrid ? `100%` : `0%`};
		pointer-events: none;
		transition: all 1s ${getEase('bezzy')};

		> .grid {
			height: 100%;
		}
	`
);
