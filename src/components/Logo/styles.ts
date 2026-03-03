// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled.svg<StylesInterface>(
	() => css`
        aspect-ratio: 84 / 14;
        width: 8.4rem;
        height: auto;
        fill: ${getGlobal('luxuryWhite')};
    `
);
