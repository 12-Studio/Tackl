// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getGlobal, getGap, H3, P, Header } from '@tackl';
import { bodyL, headlineL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Header)<StylesInterface>(
	() => css`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        min-height: clamp(70rem, 100svh, 1024rem);
        padding-bottom: var(--mobile-pad);

        ${bp.l`
            padding-bottom: ${getGap('sm')};
        `}

        > .frame.top {
            position: absolute;
            z-index: 2;
            top: var(--line-mobile-dist);

            ${bp.l`
                top: var(--line-desktop-dist);
            `}
        }
    `
);

export const Col = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
	`
);

export const Heading = styled(H3)<StylesInterface>(
	() => css`
        ${headlineL}
        color: ${getGlobal('black')};
        margin: ${getGap('m')} 0;

        user-select: none;
        pointer-events: none;

        ${bp.l`
            margin: ${getGap('m')} 0 ${getGap('xxl')};
        `}
	`
);

export const Desc = styled(P)<StylesInterface>(
	() => css`
        ${bodyL}
        color: ${getGlobal('black', 50)};

        user-select: none;
        pointer-events: none;
	`
);

export const Top = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
        margin-bottom: auto;
	`
);

export const Bottom = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
	`
);
