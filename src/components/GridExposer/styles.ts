// Dev-only grid overlay — no imports from @/theme/tackl or waffl (avoids theme init race in Turbopack).

import styled, { css } from 'styled-components';

interface ColProps {
	$altColor?: boolean;
	$isMobile?: boolean;
	$isTablet?: boolean;
}

interface JacketProps {
	$showGrid?: boolean;
	$altColor?: boolean;
}

const negative = '#e53935';

export const ExposerGrid = styled.div`
	display: grid;
	contain: layout;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 2.4rem;
	padding-inline: 2.4rem;

	@media (min-width: 700px) {
		grid-template-columns: repeat(6, 1fr);
		column-gap: 2.4rem;
		padding-inline: calc(2.4rem / 2);
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(12, 1fr);
		column-gap: 3.6rem;
		padding-inline: calc(3.6rem / 2);
	}
`;

export const Col = styled.div<ColProps>(
	props => css`
		height: 100%;
		display: none;

		${props.$isMobile &&
		css`
			display: block;
		`}

		@media (min-width: 700px) {
			${props.$isTablet &&
			css`
				display: block;
			`}
		}

		@media (min-width: 1024px) {
			display: block;
		}

		span {
			--max: 100%;
			display: block;
			border-inline-style: dashed;
			border-inline-width: ${props.$altColor ? 1 : 0}px;
			border-inline-color: ${negative};
			width: var(--max);
			height: var(--max);
			transition: all 0.25s linear;

			&:after {
				content: '';
				opacity: ${props.$altColor ? 0.2 : 0.5};
				display: block;
				width: var(--max);
				height: var(--max);
				transition: all 0.25s linear;
				background-color: ${props.$altColor ? 'transparent' : negative};
			}
		}
	`
);

export const Jacket = styled.aside<JacketProps>(
	props => css`
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: ${props.$showGrid ? '100%' : '0%'};
		pointer-events: none;
		transition: height 1s cubic-bezier(0.83, 0, 0.17, 1);
		overflow: hidden;
	`
);
