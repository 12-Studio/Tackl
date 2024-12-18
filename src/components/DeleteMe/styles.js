// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section } from '@tackl';
import {} from '@tackl/type';

// Exports
// ------------
export const Jacket = styled(Section)(
    props => css`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100svh;
        background: ${props.theme.colors.brand.bc2[100]};
        overflow: hidden;

        picture {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }

        img {
            position: relative;
            z-index: 3;
            width: 100%;
            max-width: 30vw;
            height: auto;
        }

        span {
            position: absolute;
            z-index: 4;
            pointer-events: none;
            inset: auto auto 6rem 50%;
            transform: translateX(-50%);

            color: ${props.theme.colors.global.white[100]};
            text-align: center;
            font-family: ${props.theme.font.family.heading};
            font-size: 1rem;
            font-style: normal;
            font-weight: ${props.theme.font.weight.bold};
            line-height: normal;
            letter-spacing: 1rem;
            text-transform: uppercase;
        }
    `
);
