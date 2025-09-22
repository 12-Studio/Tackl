// Imports
// ------------
import { bp, getBrand, getEase } from '@tackl';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled.a(
	props => css`
		--size: 6rem;
		--size-l: 8.4rem;

		position: relative;
		display: inline-block;

		width: var(--size);
		height: var(--size);
		border-radius: var(--size);

		${bp.l`
            width: var(--size-l);
            height: var(--size-l);
            border-radius: var(--size-l);
        `}

		&:hover {
			${bp.l`
                cursor: pointer;

                &:before {
                    transform: scale(1);
                }

                &:after {
                    transform: scale(1.4);
                    opacity: 0;
                }

                svg {
                    &:nth-child(1) {
                        transform: translate(-50%, -50%);
                        opacity: 1;
                    }

                    &:nth-child(2) {
                        transform: translate(-50%, ${props.$isDown ? 300 : -300}%);
                    }
                }
            `}
		}

		&:before,
		&:after {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: var(--size-l);

			transition:
				transform 0.5s ${getEase('bezzy')},
				opacity 0.5s ${getEase('bezzy')};
		}

		/* Fill */
		&:before {
			z-index: 1;
			background: ${getBrand('bc5')};
			transform: scale(0);
		}

		/* Outline */
		&:after {
			z-index: 2;
			border: 2px solid ${getBrand('bc5')};
			opacity: 0.2;
		}

		svg {
			--size: 2.4rem;
			--size-l: 3.6rem;

			position: absolute;
			z-index: 3;
			inset: 50% auto auto 50%;

			display: block;
			width: var(--size);
			height: var(--size);
			fill: none;
			stroke: ${getBrand('bc5')};
			stroke-width: 0.2rem;
			transition:
				transform 0.5s ${getEase('bezzy')},
				opacity 0.5s ${getEase('bezzy')};

			${bp.l`
                width: var(--size-l);
                height: var(--size-l);
            `}

			&:nth-child(1) {
				stroke: ${getBrand('bc1')};
				transform: translate(-50%, ${props.isDown ? 300 : -300}%);
				opacity: 0;
			}

			&:nth-child(2) {
				transform: translate(-50%, -50%);
			}
		}
	`
);

export const Arrows = styled.div(
	props => css`
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	`
);
