// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div } from '@tackl';

// Exports
// ------------
export const Svg = styled.svg`
    user-select: none;

    width: 100%;
    aspect-ratio: 144 / 24;
    overflow: visible;
    display: block;

    font-size: 9.6rem;
    font-weight: 700;
    font-family: 'Sequel 100 Wide', sans-serif;
    letter-spacing: 5px;
    text-transform: uppercase;
    line-height: 1;

    fill: white;
`;

export const Jacket = styled.div`
    background: #0030ac;
    min-height: 100svh;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;

    padding-bottom: 8.333vw;
`;
