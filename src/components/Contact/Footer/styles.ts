// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, Footer } from '@tackl';
import { bodyL, captionL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isLegal?: boolean;
	$isRight?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Footer)<StylesInterface>(
	() => css`
		position: relative;

        display: flex;
        flex-direction: column;
        gap: ${getGap('sm')};
        width: 100%;
        padding-top: ${getGap('s')};

        ${bp.l`
            gap: ${getGap('xxl')};
            padding-top: ${getGap('l')};
        `}

        .frame.bottom {
            position: absolute;
            bottom: var(--mobile-pad);
            left: 0;

            ${bp.l`
                bottom: ${getGap('m')};
            `}
        }
	`
);

export const ContactDetails = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
	`
);

export const GridBlock = styled(Div)<StylesInterface>(
	({ $isLegal }) => css`
		position: relative;
        display: flex;
        flex-direction: column;
        
        justify-content: space-between;
        gap: ${$isLegal ? getGap('sm') : getGap('m')};
        width: 100%;

        ${bp.l`
            flex-direction: row;
            align-items: center;
            gap: ${getGap('m')};
        `}
	`
);

export const GridBlockItem = styled(Div)<StylesInterface>(
	({ $isRight, $isLegal }) => css`
		position: relative;
        flex: ${$isRight ? '0 0 auto' : '1'};

        display: flex;
        flex-direction: column;
        gap: ${getGap('s')};
        height: 100%;

        ${bp.l`
            gap: ${getGap('m')};
        `}

        h3 {
            ${bodyL}

            color: ${getBrand('bc3', 60)};
        }

        a {
            ${$isLegal ? captionL : bodyL}

            display: inline-block;

            width: max-content;
            color: ${$isLegal ? getBrand('bc1') : getGlobal('black')};
            transition: color 0.5s ${getEase('bezzy3')};
            
            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    color: ${$isLegal ? getBrand('bc1', 20) : getBrand('bc1')};
                }
            }
        }

        ul {
            display: flex;
            gap: ${getGap('m')};

            ${bp.l`
                height: 100%;
                align-items: center;
            `}
        }

        p {
            ${captionL}

            display: flex;
            align-items: center;

            color: ${getGlobal('black', 40)};

            span {
                color: inherit;
                display: inline-block;

                ${bp.l`
                    display: none;
                `}
            }
        }
	`
);

export const Legals = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
        padding-block: var(--mobile-pad) var(--mobile-extra-pad);

        ${bp.l`
            padding-block: ${getGap('m')} ${getGap('xxl')};
        `}

        .frame.top {
            position: absolute;
            top: 0;
            left: 0;
        }
	`
);
