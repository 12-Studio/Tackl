// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getEase } from '@tackl';
import { } from '@tackl/type';


// Exports
// ------------
export const Jacket = styled(Div)(
    props => css`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100svh;
        background: ${getBrand('bc2')};
        overflow: hidden;
    `
);

export const Background = styled.div(
    props => css`
        position: absolute;
        inset: 0;
    `
);


export const Col = styled(Div)(
    props => css`
        height: 10rem;
        background: yellow;
    `
);