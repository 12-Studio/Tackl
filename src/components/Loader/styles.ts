// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Aside, Div, getBrand, getGlobal, getEase, getGap, getRadius } from '@tackl';
import {} from '@tackl/type';

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
        inset: 0;
        z-index: 999;

        display: grid;
        place-items: center;

        height: 100lvh;
        width: 100%;
        padding-bottom: env(safe-area-inset-bottom);
        background: ${getGlobal('black')};
        
    `
);

export const Frame = styled(Div)(
	() => css`
		position: absolute;
		inset: 0;
		z-index: 0;


        .frame {
            position: absolute;
            left: 0;
            --offset: var(--line-mobile-dist);

            ${bp.l`
                --offset: var(--line-desktop-dist);
            `}

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
