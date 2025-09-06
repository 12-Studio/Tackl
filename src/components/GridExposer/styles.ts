// Imports
// ------
import styled, { css } from 'styled-components';
import { Main, bp, Div, Aside, getEase, getGlobal, getFeedback } from '@tackl';
import { Theme } from '@theme';


// Interfaces
// ------
interface ColProps {
    $altColor?: boolean;
}

interface JacketProps {
    $showGrid?: boolean;
    $altColor?: boolean;
}

// Exports
// ------
export const Col = styled(Div)<ColProps>(
    props => css`
        height: 100%;

        span {
            display: block;
            opacity: ${props.$altColor ? 0.5 : 0.2};
            background-color: ${props.$altColor
                ? getFeedback('negative')
                : getGlobal('white')};

            width: 100%;
            height: 100%;
            transition: all 0.25s linear;
        }
    `
);

export const Jacket = styled(Aside)<JacketProps>(
    props => css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: ${props.$showGrid ? `100%` : `0%`};
        pointer-events: none;
        transition: all 1s ${getEase('bezzy')};

        > .grid {
            height: 100%;
        }
    `
);
