// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Aside, Div, getGlobal } from '@tackl';

// Interfaces
// ------------
interface StylesInterface {
	$isLeft?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Aside)<StylesInterface>(
	() => css`
        position: fixed;
        inset: 0 auto auto 0;
        z-index: 1000;

        display: grid;
        place-items: center;

        height: 100svh;
        width: 100%;
        background: ${getGlobal('black')};
    `
);

export const Frame = styled(Div)(
	() => css`
        --offset: var(--line-mobile-dist);

		position: absolute;
		inset: 0;
		z-index: 0;

        ${bp.l`
            --offset: var(--line-desktop-dist);
        `}


        .frame {
            position: absolute;
            left: 0;

            &.top {
                top: var(--offset);
            }

            &.bottom {
                bottom: var(--offset);
            }
        }
	`
);

export const Vertical = styled(Div)<StylesInterface>(
	({ $isLeft }) => css`
		position: absolute;
		z-index: 0;

        width: 1px;
        height: 100%;
        background: ${getGlobal('luxuryWhite', 20)};

        ${
			$isLeft
				? css`
            left: var(--offset);
        `
				: css`
            right: var(--offset);
        `
		}

        ${bp.l`
            --offset: var(--line-desktop-dist);
        `}
	`
);
