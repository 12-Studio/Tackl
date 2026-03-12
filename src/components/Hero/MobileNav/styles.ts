// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, List } from '@tackl';
import { captionL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(List)<StylesInterface>(
	() => css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: ${getGap('xs')};

        width: 100%;
        padding-inline: ${getGap('m')};

        ${bp.s` gap: ${getGap('s')};`}
        ${bp.l` display: none; `}


        li {
            width: 100%;

            button {
                --color: ${getGlobal('luxuryWhite')};


                ${captionL}

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: ${getGap('sm')};

                padding-block: ${getGap('sm')};
                border-radius: ${getRadius('s')};

                width: 100%;
                background: ${getGlobal('luxuryWhite', 10)};
                backdrop-filter: blur(2.4rem);

                svg {
                    fill: none;
                    stroke: var(--color);
                }

                span {
                    color: var(--color);
                }

                &:active {
                    opacity: 0.2;
                }
            }
        }
    `
);
