// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, H3 } from '@tackl';
import { bodyL, headlineS, titleL, titleS } from '@tackl/type';

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

        padding-block: var(--mobile-pad);

        ${bp.l`
            padding-block: ${getGap('sm')};
        `}
    `
);

export const Heading = styled(H3)(
	() => css`
		${headlineS}
	`
);

export const Content = styled(Div)(
	() => css`
        display: flex;
        flex-direction: column;
        gap: ${getGap('l')};
        padding-block: ${getGap('l')};

        ${bp.l`
            gap: ${getGap('uber')};
            padding-block: ${getGap('xxl')};
        `}
	`
);

export const TextBlock = styled(Div)(
	() => css`
        display: flex;
        flex-direction: column;
        gap: ${getGap('xxl')};


        h2, h3 {
            color: ${getGlobal('luxuryWhite')};
        }


        h2 {
            ${titleL}
        }

        h3 {
            ${titleS}
        }

        p {
            ${bodyL}
            color: ${getGlobal('luxuryWhite', 60)};
        }

        ul {
            display: flex;
            flex-direction: column;
            gap: ${getGap('sm')};

            li {
                position: relative;
                padding-left: ${getGap('sm')};

                &:before {
                    --size: 0.4rem;

                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0.7em;
                    width: var(--size);
                    height: var(--size);
                    border-radius: 50%;
                    background: ${getGlobal('luxuryWhite')};
                    display: inline-block;
                }
            }
        }
	`
);
