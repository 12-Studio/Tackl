// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius } from '@tackl';
import {} from '@tackl/type';
import Link from 'next/link';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Link)<StylesInterface>(
	() => css`
        --size: 4rem;

        display: flex;
        align-items: center;
        justify-content: center;
        
        width: var(--size);
        height: var(--size);

        color: ${getGlobal('luxuryWhite')};
        background: ${getBrand('bc1')};
        backdrop-filter: blur(10px);

        border-radius: ${getRadius('s')};
        border: none;
        cursor: pointer;
        transition: background 0.5s ${getEase('bezzy3')};

        ${bp.l`
            --size: 5.6rem;
        `}

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                background: ${getGlobal('black')};
            }
        }

        &:active {
            background: ${getGlobal('black', 10)};
            transition: background 0s linear;
        }

        svg {
            --size: 2.4rem;

            fill: ${getGlobal('luxuryWhite')};
        }
    `
);
