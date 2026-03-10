// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, H2 } from '@tackl';
import { captionL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(H2)<StylesInterface>(
	() => css`
        ${captionL}

        position: relative;
        width: fit-content;

        padding: ${getGap('sm')};
        background: ${getBrand('bc4', 10)};
        border-radius: ${getRadius('s')};
        color: ${getBrand('bc3')};

        user-select: none;
        pointer-events: none;
    `
);
