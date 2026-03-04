// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, Button } from '@tackl';
import { bodyS } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isModalOpen?: boolean;
	type?: 'button';
	ariaLabel?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}

// Exports
// ------------
export const Jacket = styled(Button)<StylesInterface>(
	({ $isModalOpen }) => css`
        position: relative;
        overflow: hidden;
    
        opacity: ${$isModalOpen ? 0 : 1};
        pointer-events: ${$isModalOpen ? 'none' : 'auto'};

		display: grid;
		place-items: center;

		width: 10.8rem;
		height: 100%; 
		background: ${getBrand('bc1')};
		cursor: pointer;
		transition: opacity 0.5s ${getEase('bezzy3')}, pointer-events 0.5s ${getEase('bezzy3')}, background 0.5s ${getEase('bezzy3')};
		transition-delay: ${$isModalOpen ? 0 : 0.25}s;

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				/* background: ${getGlobal('luxuryWhite')}; */

				> span {
					scale: 0.5;
					opacity: 0;
				}

				svg {
					transform: translate(-50%, -50%);
				}
			}

			&:active {
				background: ${getBrand('bc1', 20)};
			}
		}

		span {
			${bodyS}
			display: inline-flex;
			align-items: center;
			justify-content: center;
			transform-origin: center center;
			overflow: hidden;

			color: ${getGlobal('luxuryWhite')};
			transition: scale 0.5s ${getEase('bezzy3')}, opacity 0.5s ${getEase('bezzy3')};
		}

		svg {
			--size: 1.6rem;
			position: absolute;
			top: 50%; left: 50%;
			transform: translate(-50%, 5.6rem);
			transition: transform 0.5s ${getEase('bezzy3')};
			fill: ${getGlobal('luxuryWhite')};
		}
    `
);
