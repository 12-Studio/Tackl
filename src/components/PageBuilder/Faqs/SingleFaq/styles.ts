// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Section,
	Div,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
	ListItem,
} from '@tackl';
import { bodyM, headlineS, titleL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(ListItem)<StylesInterface>(
	() => css`
        --offset: ${getGap('huge')};

        position: sticky;
        top: var(--mobile-pad); left: 0;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: ${getGap('m')};

        width: 100%;
        height: 50svh;
        

        padding: ${getGap('l')};
        background: ${getGlobal('luxuryWhite')};
        border-radius: ${getRadius('xs')};

        ${bp.l`
            position: relative;
            top: auto;
            left: auto;
            height: calc(100svh - var(--offset) * 4);
            max-width: 40rem;
            padding: ${getGap('l')};
        `}


        h3 {
            ${titleL}
            color: ${getGlobal('black')};
            text-wrap: balance;
        }

        p {
            ${bodyM}
            color: ${getGlobal('black', 60)};
            text-wrap: balance;
        }
    `
);
