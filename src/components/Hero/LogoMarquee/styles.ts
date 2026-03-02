// Imports
// ------------

import { bp, Div, getBrand, getEase, getGap, getGlobal, getRadius, Section } from '@tackl';
import {} from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	() => css`
		--gap: 1rem;

		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
		width: 100%;

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

			animation: scroll 10s linear infinite;

			li {
				width: 100%;
				height: 100%;

				max-width: 12rem;
				max-height: 3.2rem;

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
