// Imports
// ------------

import { Aside, bp, getBrand, getGap, getGlobal, Section } from '@tackl';
import { bodyM, displayS } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Section)(
	() => css`
        position: relative;
        overflow: hidden;
        z-index: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        

        width: 100%;
        height: 100svh;
        padding-bottom: ${getGap('m')};
        background: linear-gradient(to top, ${getBrand('bc4', 20)}, ${getGlobal('black')});

        ${bp.l`
            padding-bottom: 0;
            background: ${getGlobal('black')};
        `}
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
        justify-content: flex-end;
        gap: ${getGap('sm')};
        padding: 0 ${getGap('m')};

        ${bp.l`
            justify-content: center;
            gap: ${getGap('xxl')};
            padding: calc(${getGap('mega')} + ${getGap('s')}) ${getGap('l')};
        `}


        h1, p {
            text-align: center;
            width: 100%;

            .line, .char, span {
                color: inherit;
            }
        }

        h1 {
            ${displayS}

            max-width: 40rem;
            color: ${getGlobal('luxuryWhite')};

            ${bp.l` max-width: 90.6rem; `}
        }

        p {
            ${bodyM}
            
            max-width: 55.2rem;
            color: ${getGlobal('luxuryWhite', 60)};
            padding: 0 ${getGap('m')};

            ${bp.l` padding: 0; `}         
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
