// Imports
// ------------
import { Aside, bp, Div, getBrand, H1, Section } from '@tackl';
import { bodyS, headingXXL } from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
const sharedHeroStyles = css`
	min-height: 80rem;
	height: 100svh;
`;

export const Jacket = styled(Section)(
	props => css`
		${sharedHeroStyles}

		position: fixed;
		z-index: 10;
		inset: 0 0 auto 0;
		background: ${getBrand('bc1')};
	`
);

export const FakeJacket = styled(Aside)(
	props => css`
		${sharedHeroStyles}
	`
);

export const Content = styled(Div)(
	props => css`
		position: relative;
		z-index: 4;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 2;
		padding-block: 10.2rem 20.3rem;

		${bp.l`
			padding-block: 0;
		`}
	`
);

export const Title = styled(H1)(
	props => css`
		${headingXXL}
		text-align: center;
		padding-inline: 1.2rem;

		${bp.l`
			text-align: left;
			padding-inline: 0;
		`}
	`
);

export const SubContent = styled(Div)(
	props => css`
		position: absolute;
		inset: auto 0 0 0;

		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		gap: 2.4rem;

		padding: 3.6rem 0;

		${bp.l`
			flex-flow: row;
			justify-content: flex-start;
			gap: 3.6rem;

			bottom: 8.4rem;
			padding: 0;
		`}

		&:before,
    	&:after {
			content: '';
			position: absolute;
			top: 5.4rem;

			width: 48%;
			height: 1px;
			background: ${getBrand('bc5')};
			opacity: 0.2;

			${bp.l` display: none; `}
		}

		&:before {
			left: -3.6rem;
		}
		&:after {
			right: -3.6rem;
		}

		svg {
			--icon-size: 3.6rem;
			--icon-size-l: 4.8rem;

			display: block;
			aspect-ratio: 1/1;
			width: var(--icon-size);
			height: auto;

			fill: none;
			stroke: ${getBrand('bc5')};
			stroke-width: 3px;

			${bp.l`
				width: var(--icon-size-l);
			`}
		}
	`
);

export const SubText = styled.p(
	props => css`
		${bodyS}
		opacity: 0.8;
		text-align: center;

		${bp.l`
			text-align: left;
			max-width: 69.6rem;
		`}

		${bp.xl` max-width: 78rem; `}
	`
);

export const ScrollButtonPos = styled(Div)(
	props => css`
		display: none;

		${bp.l`
			display: block;
			position: absolute;
			inset: auto 0 8.4rem auto;
		`}
	`
);

export const Media = styled(Div)(
	props => css`
		--offset: 30%;

		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		background: ${getBrand('bc1')};

		pointer-events: auto;
		user-select: none;

		&:before,
		&:after {
			content: '';
			position: absolute;
			inset: 0;
		}

		&:before {
			z-index: 1;
			background: ${getBrand('bc2')};
			mix-blend-mode: overlay;
		}

		&:after {
			z-index: 2;
			background: linear-gradient(0deg, ${getBrand('bc1')} 0%, ${getBrand('bc1', 0)} 100%);

			${bp.l`
                background: linear-gradient(90deg, ${getBrand('bc1')} var(--offset), ${getBrand('bc1', 0)} 100%);
            `}
		}

		video {
			object-fit: cover;
			width: 100%;
			height: 100%;

			${bp.l`
                transform: translateX(var(--offset));
            `}
		}
	`
);
