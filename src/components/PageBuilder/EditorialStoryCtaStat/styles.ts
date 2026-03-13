// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, P } from '@tackl';
import { bodyL, headlineS, titleL } from '@tackl/type';

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
      padding-bottom: var(--mobile-pad);

      ${bp.l`
        padding-bottom: ${getGap('sm')};
      `}

      .frame.top {
        position: absolute;
        z-index: 2;
        top: var(--mobile-pad);

        ${bp.l`
            top: ${getGap('sm')};
        `}
      }
    `
);

export const Top = styled(Section)(
	() => css`
		position: relative;
		z-index: 1;
	`
);

export const Texts = styled(Div)(
	() => css`
		position: relative;
		z-index: 1;

        display: flex;
        flex-direction: column;
        gap: ${getGap('l')};
	`
);

export const AnimatedText = styled(P)(
	() => css`
        ${headlineS}
        color: ${getGlobal('black')};

		position: relative;
		z-index: 1;

        * {
            color: inherit;
        }
	`
);

export const Middle = styled(Section)(
	() => css`
		position: relative;
		z-index: 1;
        overflow: hidden;

        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: ${getGap('sm')};

        padding: ${getGap('xxl')} var(--mobile-extra-pad);

        background: ${getGlobal('black')};
        margin: 0  var(--mobile-extra-pad) var(--mobile-pad);
        border-radius: ${getRadius('s')};

        ${bp.l`
            gap: ${getGap('m')};
            margin: 0 ${getGap('l')} ${getGap('sm')};
            padding: ${getGap('huge')};
        `}


        h4 {
            ${titleL}
            color: ${getGlobal('luxuryWhite')};
        }

        p {
            ${bodyL}
            color: ${getGlobal('luxuryWhite', 60)};
            margin-bottom: ${getGap('s')};

            ${bp.l`
                margin-bottom: 0;
            `}
        }

        picture {
            position: absolute;
            inset: -20% 0;;
            z-index: -1;

            &:after {
                content: '';
                position: absolute;
                inset: 0;
                z-index: 1;
                background: linear-gradient(to right, ${getGlobal('black')} 0%, ${getGlobal('black', 60)} 100%);

                ${bp.l`
                    background: linear-gradient(to right, ${getGlobal('black')} 20%, transparent 100%);
                `}
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
	`
);

export const Bottom = styled(Section)(
	() => css`
        position: relative;
        padding-inline: var(--mobile-pad);
        width: 100%;

        ${bp.l`
            padding-inline: ${getGap('sm')};
        `}

        ul {
            position: relative;
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 0;
            width: 100%;

            ${bp.l`
                grid-template-columns: repeat(2, 1fr);
            `}

            li:first-child {
                border-bottom: 1px solid ${getBrand('bc5')};

                ${bp.l`
                    border-bottom: none;
                `}
            }
        }
    `
);
