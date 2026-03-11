// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, Picture } from '@tackl';
import { bodyL, bodyM, captionL, titleL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isEven?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	() => css`
        position: sticky;
        top: 0;
        left: 0;
        background: ${getGlobal('luxuryWhite')};
    `
);

export const Content = styled(Div)<StylesInterface>(
	({ $isEven }) => css`
        --aspect: 1/1;

        display: flex;
        flex-flow: column;
        
        gap: ${getGap('sm')};
        width: 100%;
        padding: 0 var(--mobile-extra-pad)  ${getGap('l')};

        ${bp.m`
            gap: ${getGap('l')};
            padding-inline: ${getGap('uber')};
            flex-flow: ${$isEven ? 'row' : 'row-reverse'};
        `}
    `
);

export const Media = styled(Picture)(
	() => css`
        position: relative;
        display: flex;
        flex: 1 1 50%;
        aspect-ratio: var(--aspect);

        img {
            display: block;
            object-fit: contain;
            width: 100%;
            height: 100%;
            mix-blend-mode: multiply;
        }
    `
);

export const Texts = styled(Div)(
	() => css`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: ${getGap('sm')};

        text-align: center;

        ${bp.l`
            flex: 1 1 50%;
            align-items: flex-start;
            aspect-ratio: var(--aspect);
            gap: ${getGap('l')};
            text-align: left;
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

            ${bp.l`
                
                
            `}
        }

        ul {
            display: flex;
            gap: ${getGap('xs')};

            li {
                ${captionL}
                color: ${getBrand('bc3')};

                &:after {
                    content: '•';
                    margin-left: ${getGap('xs')};
                }

                &:last-child {
                    &:after {
                        content: none;
                    }
                }
            }
        }
    `
);
