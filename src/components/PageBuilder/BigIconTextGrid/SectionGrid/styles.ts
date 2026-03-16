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
	Picture,
	H3,
	H2,
	P,
} from '@tackl';
import { bodyL, titleL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(ListItem)<StylesInterface>(
	() => css`
        position: relative;
        display: flex;
        flex-direction: column;
        gap: ${getGap('sm')};
        padding-bottom: ${getGap('l')};

        ${bp.l`
            gap: ${getGap('l')};
            padding-bottom: ${getGap('xxl')};
        `}

        .frame.bottom {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 2;
        }
    `
);

export const Icon = styled(Picture)(
	() => css`
		position: relative;

		width: 100%;
		height: 100%;
        aspect-ratio: 1/1;
        background: ${getGlobal('luxuryWhite')};
        
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            mix-blend-mode: multiply;

        }
	`
);

export const Heading = styled(H2)(
	() => css`
		${titleL}
		color: ${getGlobal('black')};
        margin-bottom: ${getGap('sm')};

        ${bp.l`
            margin-bottom: none;
        `}
	`
);

export const Description = styled(Div)(
	() => css`
        
        

        p {
            ${bodyL}
            color: ${getGlobal('black', 60)};
            text-wrap: pretty;
        }
    `
);
