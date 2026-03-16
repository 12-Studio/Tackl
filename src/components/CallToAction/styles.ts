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
	Footer,
	H2,
} from '@tackl';
import { bodyL, captionL, headlineL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isRight?: boolean;
	$isLegal?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Footer)<StylesInterface>(
	() => css`
        position: relative;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        width: 100%;
        height: 100svh;
        background: ${getGlobal('luxuryWhite')};

        > .frame {
            position: absolute;
            z-index: 2;

            &.top {
                top: var(--mobile-pad);

                ${bp.l`
                    top: ${getGap('sm')};
                `}
            }

            &.bottom {
                bottom: var(--mobile-pad);

                ${bp.l`
                    bottom: ${getGap('sm')};
                `}
            }
        }
    `
);

export const Top = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
        flex: 1;
        padding-right: ${getGap('uber')};
        padding: ${getGap('l')} ${getGap('uber')} ${getGap('l')} 0;

        ${bp.l`
            padding: ${getGap('uber')} 0 ${getGap('uber')};
        `}

        waffl-grid {
            row-gap: ${getGap('m')};

            ${bp.l`
                row-gap: ${getGap('xxl')};
            `}
        }
	`
);

export const Heading = styled(H2)<StylesInterface>(
	() => css`
        ${headlineL}
        
		position: relative;

        color: ${getGlobal('black')};
        text-wrap: balance;
	`
);

export const Button = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
	`
);

export const Bottom = styled(Section)<StylesInterface>(
	() => css`
		position: relative;

        display: flex;
        flex-direction: column;
        gap: ${getGap('sm')};
        width: 100%;

        ${bp.l`
            gap: ${getGap('xxl')};
        `}
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
            padding-block: ${getGap('m')} ${getGap('xl')};
        `}

        .frame.top {
            position: absolute;
            top: 0;
            left: 0;
        }
	`
);
