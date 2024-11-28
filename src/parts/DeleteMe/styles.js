// Imports
// ------------
import styled, { css, keyframes } from 'styled-components';
import { bp, Section } from '@tackl';
import {} from '@tackl/type';

// Exports
// ------------
const pulse = (props) => keyframes`
	from {
		transform: scale(1) translate(-50%, -50%);
		border-color: ${props.theme.colors.global.white.solid};
	}

	to {
		transform: scale(4) translate(-50%, -50%);
		border-color: transparent;
	}
`;

export const Jacket = styled(Section)(
	(props) => css`
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100svh;
		background: ${props.theme.colors.brand.bc2};
		overflow: hidden;

		picture {
			position: relative;
			z-index: 2;
			display: flex;
			align-items: center;
			justify-content: center;

			width: 24rem;
			height: 24rem;
			background: ${props.theme.colors.global.white.solid};
			border-radius: 50%;

			&:before {
				content: '';
				position: absolute;
				z-index: 1;
				inset: 0.6rem;
				background: ${props.theme.colors.brand.bc1};
				border-radius: 50%;
			}

			&:after {
				content: '';
				position: absolute;
				z-index: 2;
				inset: 1.2rem;
				background: ${props.theme.colors.global.white.solid};
				border-radius: 50%;
			}
		}

		img {
			position: relative;
			z-index: 3;
			width: 100%;
			max-width: 12rem;
			height: auto;
		}
	`
);

export const Pulse = styled.div(
	(props) => css`
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		z-index: 1;
		width: 24rem;
		height: 24rem;
		border-radius: 100%;

		span {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: block;
			width: 100%;
			height: 100%;

			&:before,
			&:after {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				transform-origin: top left;
				content: '';
				width: 90%;
				height: 90%;
				border: 1px solid ${props.theme.colors.global.white.solid};
				border-radius: 100%;
				animation: ${pulse} 3s ease-in-out infinite;
			}

			&:first-child {
				&:before {
					animation-delay: 1s;
				}
				&:after {
					animation-delay: 1.5s;
				}
			}

			&:last-child {
				&:before {
					animation-delay: 0s;
				}
				&:after {
					animation-delay: 0.5s;
				}
			}
		}
	`
);
