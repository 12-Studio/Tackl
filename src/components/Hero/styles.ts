// Imports
// ------------

import { bp, Div, getBrand, getEase, getGap, getGlobal, getRadius, Section } from '@tackl';
import { displayS } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)<StylesInterface>(
	() => css`
        position: relative;
        z-index: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 100lvh;
        width: 100%;
        background: ${getGlobal('black')};


        .unicorn {
            position: absolute !important;
            z-index: -1;
            inset: 0 auto auto 0;
        }


        h1 {
            ${displayS}
        }

        p {

        }

    `
);
