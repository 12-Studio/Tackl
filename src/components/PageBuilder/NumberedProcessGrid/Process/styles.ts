// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getGap } from '@tackl';
import { bodyL, displayL, titleL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)(
	() => css`
        --aspect: 1/1;

        display: flex;
        flex-flow: column;
        justify-content: space-between;

        aspect-ratio: var(--aspect);
        padding-inline: 1.2rem;

        ${bp.l`
            aspect-ratio: unset;
            flex-direction: row;
            padding-inline: ${getGap('sm')};
        `}

        .frame.bottom {
            position: absolute;
            inset: auto 0 0 0;
            z-index: 2;
        }
    `
);

export const ProcessNumber = styled(Div)(
	() => css`

        display: grid;
        place-items: center;
        padding: 0 var(--mobile-pad) 0;
        margin: auto 0;


        width: 100%;
		position: relative;

        ${bp.l`
            aspect-ratio: var(--aspect);
            flex: 1 1 50%;
            padding: ${getGap('xxl')};
        `}

        

        span {
            ${displayL}
            display: block;

            background: linear-gradient(
                to bottom,
                ${getBrand('bc5', 100)} 0%,
                ${getBrand('bc5', 20)} 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            text-align: center;

            ${bp.l`
                text-align: left;
            `}
        }

        .char {
            display: inline-block;
            background: linear-gradient(
                to bottom,
                ${getBrand('bc5', 100)} 0%,
                ${getBrand('bc5', 20)} 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
        }
    `
);

export const Vertical = styled.span<StylesInterface>(
	() => css`
        flex: 0 0 1px;
		background: ${getGlobal('white', 20)};

        display: none;
        ${bp.l` display: block; `}
	`
);

export const ProcessContent = styled(Div)(
	() => css`
        position: relative;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: ${getGap('m')};
        padding: 0 var(--mobile-pad) ${getGap('l')};
        width: 100%;
        text-align: center;

        ${bp.l`
            flex: 1 1 50%;
            aspect-ratio: var(--aspect);
            gap: 0;
            padding: ${getGap('l')};
            text-align: left;
        `}

        h4 {
            ${titleL}
            color: ${getGlobal('luxuryWhite')};
        }

        p {
            ${bodyL}
            color: ${getGlobal('luxuryWhite', 60)};
            text-wrap: balance;

            
        }
    `
);
