// Imports
// ------------
import styled, { css } from 'styled-components';
import { getGlobal } from '@tackl';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled.svg<StylesInterface>(
	() => css`
        --width: 8.4rem;
    
        aspect-ratio: 84 / 14;
        width: var(--width);
        min-width: var(--width);
        height: auto;
        fill: ${getGlobal('luxuryWhite')};
    `
);
