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
	Picture,
	H2,
	P,
	H3,
} from '@tackl';
import { bodyL, headlineS } from '@tackl/type';

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
        z-index: 1;
        overflow: hidden;
        height: 75svh;

        ${bp.l`
            height: 100svh;
        `}

        .frame {
            position: absolute;
            left: 0;

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

export const Background = styled(Picture)<StylesInterface>(
	() => css`
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        user-select: none;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            scale: 1.2;
        }
    `
);

export const Content = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
        z-index: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;

        padding-block: ${getGap('xl')};
        width: 100%;
        height: 100%;

        ${bp.l`
            padding-block: ${getGap('huge')};
        `}

        &:before {
            content: '';
            position: absolute;
            z-index: -1;
            inset: 0;
            z-index: 1;
            background: linear-gradient(
                to top,
                ${getGlobal('black', 90)} 0%,
                ${getGlobal('black', 0)} 100%
            );

            ${bp.l`
                inset: 50% 0 0 0;
                background: linear-gradient(
                to top,
                ${getGlobal('black', 80)} 0%,
                ${getGlobal('black', 0)} 100%
            );
            `}
        }

        waffl-grid {
            position: relative;
            z-index: 1;
            row-gap: ${getGap('m')};

            ${bp.l`
                row-gap: ${getGap('xxl')};
            `}
        }
	`
);

export const Heading = styled(H3)<StylesInterface>(
	() => css`
        ${headlineS}
		color: ${getGlobal('white')};
        text-wrap: balance;
	`
);

export const Desc = styled(P)<StylesInterface>(
	() => css`
        ${bodyL}
		color: ${getGlobal('white', 60)};
        text-wrap: balance;
	`
);
