// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, Aside } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isLight?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Aside)<StylesInterface>(
	({ $isLight }) => css`
        --offset: var(--line-mobile-dist);

        position: absolute;
        z-index: 0;
        inset: 0 0 0 -1px;
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
            width: 1px;
            background: ${$isLight ? getGlobal('luxuryWhite', 20) : getBrand('bc5')};
        }

        &:before {
            left: var(--offset);
        }

        &:after {
            right: var(--offset);
        }
    `
);
