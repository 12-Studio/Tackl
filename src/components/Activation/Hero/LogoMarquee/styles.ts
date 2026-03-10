// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$speed?: number;
	$direction?: 'left' | 'right';
	$isPlaying?: boolean;
	$isModalOpen?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	() => css`
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
    `
);

export const Row = styled(Div)<StylesInterface>(
	({ $speed, $direction, $isPlaying, $isModalOpen }) => css`
		--gap: 0rem;

		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
		width: 100%;
		margin: 0 auto;
		pointer-events: none;

		&:nth-child(2) {
			border-block: 1px solid ${getGlobal('black', 10)};
		}

		/* .marquee__content: each block is full width, animates out so the duplicate takes its place */
		ul {
			--play-state: ${$isModalOpen && $isPlaying ? 'running' : 'paused'};

			flex-shrink: 0;
			display: flex;
			justify-content: space-around;
			min-width: 100%;
			gap: var(--gap);
            opacity: var(--opacity);

            will-change: transform;
			backface-visibility: hidden;
			-webkit-backface-visibility: hidden;

            transition: opacity 1.2s ${getEase('bezzy3')};
			animation: marquee-${$direction ?? 'left'} ${($speed ?? 1) * 20}s linear infinite var(--play-state);

            ${bp.l`
                animation: marquee-${$direction ?? 'left'} ${($speed ?? 1) * 10}s linear infinite var(--play-state);
            `}
		}

		@keyframes marquee-left {
			from {
				transform: translateX(0);
			}
			to {
				transform: translate3d(calc(-100% - var(--gap)), 0, 0);
			}
		}

		@keyframes marquee-right {
			from {
				transform: translate3d(calc(-100% - var(--gap)), 0, 0);
			}
			to {
				transform: translateX(0);
			}
		}

		li {
			--width: 18rem;
			--height: 8rem;

			display: grid;
			place-items: center;
			width: var(--width);
			height: var(--height);
			border-right: 1px solid ${getGlobal('black', 10)};
			padding-inline: ${getGap('m')};

			${bp.l`
				--width: 24rem;
				--height: 12rem;
				padding-inline: ${getGap('s')};
			`}

			img {
				width: 12rem;
				height: 4rem;
				object-fit: contain !important;
				object-position: center !important;

				${bp.l`
					max-width: 16rem;
					max-height: 16rem;
				`}
			}
		}
	`
);
