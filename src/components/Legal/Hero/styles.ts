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
	Header,
	H2,
	H3,
} from '@tackl';
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

        padding-block: ${getGap('l')};
        width: 100%;
        min-height: clamp(70rem, 100svh, 1024rem);

        ${bp.l`
            padding-block: ${getGap('uber')};
        `}

        > .frame {
            position: absolute;
            z-index: 2;

            &.top {
                top: var(--line-mobile-dist);

                ${bp.l`
                    top: var(--line-desktop-dist);
                `}
            }

            &.bottom {
                bottom: var(--line-mobile-dist);

                ${bp.l`
                    bottom: var(--line-desktop-dist);
                `}
            }
        }

        waffl-grid {
            row-gap: ${getGap('sm')};

            ${bp.l`
                row-gap: ${getGap('l')};
            `}
        }
    `
);

export const TitlePosition = styled(Div)(
	() => css`
		/*  */
	`
);

export const LastUpdated = styled(H2)(
	() => css`
        
	`
);

export const Heading = styled(H3)(
	() => css`
        ${headlineL}

        color: ${getGlobal('luxuryWhite')};
	`
);

export const Text = styled(Div)(
	() => css`
        ${bodyL}

        display: flex;
        flex-direction: column;
        gap: ${getGap('m')};

        * {
            color: ${getGlobal('luxuryWhite', 40)};
            text-wrap: balance;
        }
	`
);
