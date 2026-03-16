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
	P,
} from '@tackl';
import { bodyL, headlineS } from '@tackl/type';

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
        min-height: clamp(50rem, 100svh, 1024rem);

        ${bp.l`
            padding-block: ${getGap('uber')};
            min-height: clamp(70rem, 100svh, 1024rem);
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
    `
);

export const Top = styled(Section)(
	() => css`
        display: flex;
        flex-direction: column;
        gap: ${getGap('m')};

		position: relative;
        padding-bottom: ${getGap('m')};

        ${bp.l`
            padding-bottom: ${getGap('xxl')};
            gap: ${getGap('l')};
        `}

        .frame.bottom {
            position: absolute;
            z-index: 2;
            bottom: 0;
        }

        > * {
            &:nth-child(2) {
                row-gap: ${getGap('sm')};
            }
        }
	`
);

export const TitlePosition = styled(Div)(
	() => css`
		/*  */
	`
);

export const Heading = styled(H2)(
	() => css`
        ${headlineS}

		position: relative;
		z-index: 1;

        color: ${getGlobal('black')};
        margin-bottom: ${getGap('s')};
        

        ${bp.l`
            margin-bottom: 0;
        `}
	`
);

export const Desc = styled(P)(
	() => css`
        ${bodyL}
		position: relative;
		z-index: 1;

        color: ${getGlobal('black', 60)};
        text-wrap: balance;
	`
);
