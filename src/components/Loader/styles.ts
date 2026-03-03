// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Aside, Div, getBrand, getGlobal, getEase, getGap, getRadius } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Aside)<StylesInterface>(
	() => css`
        position: fixed;
        inset: 0;
        z-index: 999;

        display: grid;
        place-items: center;

        height: 100lvh;
        width: 100%;
        padding-bottom: env(safe-area-inset-bottom);
        background: ${getGlobal('black')};
        
    `
);
