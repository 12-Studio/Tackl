// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Section,
	Div,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
	Header,
	P,
	H3,
	Picture,
} from '@tackl';
import { bodyL, headlineL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isModalOpen?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Header)<StylesInterface>(
	() => css`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: ${getGap('xxl')};
        width: 100%;
        min-height: clamp(70rem, 100svh, 1024rem);

        > .frame {
            position: absolute;
            z-index: 2;

            &.top {
                top: var(--line-mobile-dist);

                ${bp.l`
                    top: var(--line-desktop-dist);
                `}
            }

            &.bottom {
                bottom: var(--line-mobile-dist);

                ${bp.l`
                    bottom: var(--line-desktop-dist);
                `}
            }
        }
    `
);

export const Top = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
        flex: 0 1 auto;
	`
);

export const Bottom = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;

        waffl-grid {
            flex: 1;
            min-height: 0;
            display: grid;
            grid-template-rows: 1fr;
            align-content: stretch;
        }
	`
);

export const SectionTitlePosition = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
	`
);

export const Heading = styled(H3)<StylesInterface>(
	() => css`
        ${headlineL}
        color: ${getGlobal('black')};
        margin: ${getGap('m')} 0;

        user-select: none;
        pointer-events: none;
        text-wrap: balance;

        ${bp.l`
            margin: ${getGap('m')} 0 ${getGap('xxl')};
        `}
	`
);

export const Desc = styled(P)<StylesInterface>(
	() => css`
        ${bodyL}
        color: ${getGlobal('black', 50)};

        user-select: none;
        pointer-events: none;
	`
);

export const FeaturedImage = styled(Picture)<StylesInterface>(
	({ $isModalOpen }) => css`
		position: relative;
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        // Animate each <path> in the Logo with a staggered, infinite opacity wave animation
        svg {
            --fade: 0.1;

            width: 40%;
            overflow: visible;
                // Animate each of the 4 paths with an opacity in a mexican wave on hover, on repeat.
                path {
                    opacity: 1;
                    transform-origin: center center;
                    animation: mexicanWave 2s ease-in-out infinite;
                    animation-play-state: ${$isModalOpen ? 'running' : 'paused'};
                }
                path:nth-child(1) { animation-delay: 0s; }
                path:nth-child(2) { animation-delay: 0.2s; }
                path:nth-child(3) { animation-delay: 0.4s; }
                path:nth-child(4) { animation-delay: 0.6s; }

                @keyframes mexicanWave {
                    0%, 100% { opacity: 1; }
                    50% {
                        opacity: var(--fade);
                        filter: blur(1px);
                    }
                }
            }

        img {
            position: relative;
            z-index: -1;
            width: 100%;
            height: 100%;
            object-fit: cover;  
        }
	`
);
