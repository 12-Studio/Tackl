// Imports
// ------------
import { bp, Div, Figure, getBrand, Section } from '@tackl';
import { headingXL } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface AltProp {
	$isAlt?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		waffl-grid {
			justify-content: flex-start;
		}
	`
);

export const StickyMedia = styled(Figure)<AltProp>(
	props => css`
		display: block;
		position: sticky;
		z-index: 1;
		top: 12rem;
		left: 0;
		order: 0;
		background: ${getBrand('bc1')};

		${bp.l`
            order: ${props.$isAlt ? 0 : 1};
            transform: translateY(-8.333vw);
            height: 70%;
        `}

		video {
			mix-blend-mode: lighten;
			object-fit: contain;
		}
	`
);

export const Content = styled(Div)<AltProp>(
	props => css`
		position: relative;
		order: 1;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3.6rem;
		height: auto;

		${bp.l`
            order: ${props.$isAlt ? 1 : 0};
            gap: 6rem;
            align-items: flex-start;
        `}

		&:after {
			content: '';
			position: absolute;
			z-index: -1;
			inset: 0;
			display: block;
			background: linear-gradient(
				0deg,
				${getBrand('bc1')} 90%,
				${getBrand('bc1', 0)} 100%
			);
			opacity: 0.9;
		}

		p {
			text-align: center;

			${bp.l`
                text-align: left;
            `}
		}
	`
);

export const Title = styled.h2(
	props => css`
		${headingXL}

		text-wrap: balance;
		max-inline-size: 10ch;
		text-align: center;

		background: linear-gradient(
			90deg,
			${getBrand('bc3')} 0%,
			${getBrand('bc5')} 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		${bp.l`
            text-align: left;
        `}
	`
);
