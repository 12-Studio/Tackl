// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, H3 } from '@tackl';
import { headlineS } from '@tackl/type';

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
            ${getGlobal('luxuryWhite')} 0%,
            ${getBrand('bc5', 20)} 100%
        );
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

        color: ${getGlobal('black')};
        margin-block: ${getGap('xxl')};
        text-wrap: balance;

        ${bp.l`
            margin-block: ${getGap('xxl')} ${getGap('huge')};
        `}
    `
);

export const Statistics = styled(Section)(
	() => css`
        position: relative;
        padding-inline: var(--mobile-pad);

        ${bp.l`
            padding-inline: ${getGap('sm')};
        `}

        .frame {
            position: relative;
            z-index: 2;
            width: calc(100% + var(--mobile-pad) * 2);
            left: calc(var(--mobile-pad) * -1);

            ${bp.l`
                width: calc(100% + ${getGap('sm')} * 2);
                left: -${getGap('sm')};
            `}

            &.mobile-only {
                ${bp.l`
                    display: none;
                `}
            }

            &.bottom {
                display: none;

                ${bp.l`
                    display: flex;
                `}
            }
        }

        ul {
            position: relative;
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 0;

            ${bp.l`
                grid-template-columns: repeat(2, 1fr);
            `}
        }
    `
);
