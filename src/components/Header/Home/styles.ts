// Imports
// ------------
import styled, { css } from 'styled-components';
import { Button, getEase } from '@tackl';

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
        --fade: 0.4;
    
        position: relative;

        padding: 0;
        margin: 0;

        display: grid;
        place-items: center;
        height: 100%;
        cursor: pointer;


    @media (hover: hover) and (pointer: fine) {
        &:hover {
            svg {
                // Animate each of the 4 paths with an opacity in a mexican wave on hover, on repeat.
                path {
                    opacity: 1;
                    animation: wave 1s ${getEase('bezzy2')} infinite;
                }
                path:nth-child(1) { animation-delay: 0s; }
                path:nth-child(2) { animation-delay: 0.125s; }
                path:nth-child(3) { animation-delay: 0.25s; }
                path:nth-child(4) { animation-delay: 0.375s; }

                @keyframes wave {
                    0%, 100% { opacity: 1; }
                    50% { opacity: var(--fade); }
                }
            }
        }

        // When not hovered, smoothly fade each path's opacity to 1 if animation was playing
        &:not(:hover) {
            svg {
                path {
                    animation: fadeToOne 0.5s ${getEase('bezzy2')} forwards;
                }
            }
        }

        @keyframes fadeToOne {
            from {
                opacity: var(--fade);
            }
            to {
                opacity: 1;
            }
        }
    }
    `
);
