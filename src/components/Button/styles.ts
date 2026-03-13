// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, getBrand, getGlobal, getEase, getGap, getRadius } from '@tackl';
import { bodyM } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$onLight?: boolean;
}

// Exports
// ------------
export const Jacket = styled.button<StylesInterface>(
	({ $onLight }) => css`
        ${bodyM}

        display: flex;
        align-items: center;
        justify-content: center;
        
        padding-inline: ${getGap('m')};
        height: 4rem;


        color: ${getGlobal('luxuryWhite')};
        background: ${getBrand('bc1')};

        border-radius: ${getRadius('s')};
        border: none;
        cursor: pointer;
        transition: background 0.5s ${getEase('bezzy3')};

        ${bp.l`
            height: 4.8rem;
        `}

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                background: ${$onLight ? getGlobal('black') : getBrand('bc1', 20)};
            }
        }

        &:active {
            background: ${getBrand('bc1', 10)};
            transition: background 0s linear;
        }
    `
);
