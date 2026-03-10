// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Section,
	Div,
	Span,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
	H3,
} from '@tackl';
import { bodyL, displayL, headlineL, headlineS, titleL } from '@tackl/type';

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

        background: linear-gradient(
            to bottom,
            ${getBrand('bc3')} 0%,
            ${getBrand('bc4')} 100%
        );

        padding-bottom: var(--mobile-pad);

        ${bp.l`
            padding-bottom: ${getGap('sm')};
        `}
    `
);

export const Top = styled(Section)(
	() => css`
        position: relative;
        z-index: 1;

        padding-block: var(--mobile-pad);

        ${bp.l`
            padding-block: ${getGap('sm')} 0;
        `}
    `
);

export const Heading = styled(H3)(
	() => css`
        ${headlineS}
        position: relative;
        z-index: 1;

        color: ${getGlobal('luxuryWhite')};
        margin-block: ${getGap('xxl')};
        text-wrap: balance;

        ${bp.l`
            margin-block: ${getGap('xxl')} ${getGap('huge')};
        `}
    `
);

export const AllProcesses = styled(Section)(
	() => css`
        position: relative;
        display: flex;
        flex-direction: column;
    `
);
