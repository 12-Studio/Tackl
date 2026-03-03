// Imports
// ------------

import { bp, Div, getBrand, getEase, getGap, getGlobal, getRadius, H2, P, Section } from '@tackl';
import { captionL } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface StylesInterface {
	$isModalOpen?: boolean;
	$isLoaderFinished?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)<StylesInterface>(
	({ $isLoaderFinished }) => css`
		width: 100%;
		padding: ${getGap('l')};
		background: linear-gradient(
			to top,
			${getGlobal('black')},
			${getGlobal('black', 0)}
		);

		transform: translateY(${$isLoaderFinished ? 0 : 100}%);
		transition: transform 1s ${getEase('bezzy2')};
	`
);

export const Heading = styled(Div)(
	() => css`
		--grad: ${getGlobal('white', 20)}, ${getGlobal('white', 0)};

		position: relative;
		width: 100%;
		height: 1px;

		display: flex;
		align-items: center;
		gap: ${getGap('m')};
		margin-bottom:  ${getGap('m')};

		&::before,
		&::after {
			content: '';
			height: 1px;
			flex: 1;
		}

		&:before {
			background: linear-gradient(to left, var(--grad));
		}

		&:after {
			background: linear-gradient(to right, var(--grad));
		}

		h2 {
			${captionL}
			text-align: center;
			color: ${getGlobal('luxuryWhite', 60)};
		}
	`
);

export const Marquee = styled(Div)<StylesInterface>(
	({ $isModalOpen, $isLoaderFinished }) => css`
		--gap: ${getGap('xxl')};
		--max: 90.6rem;

		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
		width: 100%;
		max-width: var(--max);
		margin: 0 auto;

		// Apply a gradient mask to fade marquee content in and out at edges
		mask-image: linear-gradient(
			270deg,
			${getGlobal('white', 0)} 0%,
			${getGlobal('white')} 20%,
			${getGlobal('white')} 50%,
			${getGlobal('white')} 80%,
			${getGlobal('white', 0)} 100%
		);

		ul {
			flex-shrink: 0;
			display: flex;
			justify-content: space-around;
			min-width: 100%;
			gap: var(--gap);

			animation: scroll 10s linear infinite paused;

			${
				$isLoaderFinished &&
				css`
				animation-play-state: running;
			`
			}

			${
				$isModalOpen &&
				css`
				animation-play-state: paused;
			`
			}

			

			li {
				--height: 3rem;

				min-width: 3.2rem; 
				min-height: var(--height);	
				max-width: 12rem;
				max-height: var(--height);
				opacity: 0.4;

				svg {
					width: 100%;
					height: 100%;
					object-fit: contain;
					object-position: center;
					fill: ${getGlobal('luxuryWhite')} !important;
					

					* { fill: inherit !important; }
				}
			}
		}

		@keyframes scroll {
			from {
				transform: translateX(0);
			}
			to {
				transform: translateX(calc(-100% - var(--gap)));
			}
		}
	`
);
