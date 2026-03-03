// Imports
// ------------

import { Aside, bp, Div, getEase, getGap, getGlobal, Section } from '@tackl';
import { bodyM, displayS } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface StylesInterface {
	$isLoaderFinished?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)(
	() => css`
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100svh;
    `
);

export const Scaler = styled(Div)<StylesInterface>(
	({ $isLoaderFinished }) => css`
		position: relative;
        z-index: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;

        height: 100%;
        width: 100%;
        background: ${getGlobal('black')};

        .unicorn {
            position: absolute !important;
            z-index: -1;
            inset: 0 auto auto 0;
            transform: rotate(180deg);

            ${bp.l`
                transform: rotate(0deg);
            `}
        }
	`
);

export const Content = styled(Section)(
	() => css`
        --space: ${getGap('xxl')};

        flex: 1;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: ${getGap('l')};
        padding: 0 ${getGap('m')} ${getGap('xxl')};

        ${bp.l`
            gap: ${getGap('xxl')};
            padding: 0 ${getGap('xxl')} ${getGap('xxl')};
        `}

        h1 {
            ${displayS}

            max-width: 90.6rem;
            text-align: center;
            color: ${getGlobal('luxuryWhite')};
        }

        p {
            ${bodyM}
            
            max-width: 55.2rem;
            text-align: center;
            color: ${getGlobal('luxuryWhite', 60)};
        }
    `
);

export const FullFrame = styled(Aside)(
	() => css`
        --offset: var(--line-mobile-dist);

        position: absolute;
        z-index: 1;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        user-select: none;

        ${bp.l`
            --offset: var(--line-desktop-dist);
        `}

        &:before,
        &:after {
            content: '';
            position: absolute;
            top: 0; bottom: 0;
            background: ${getGlobal('luxuryWhite', 20)};
            width: 1px;
        }

        &:before {
            left: var(--offset);
        }

        &:after {
            right: var(--offset);
        }

        .frame {
            position: absolute;

            &.top {
                top: var(--offset);
            }

            &.bottom {
                bottom: var(--offset);
            }
        }
    `
);
