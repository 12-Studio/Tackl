// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$dir?: 'v' | 'h';
	$isLight?: boolean;
	$isEnd?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(({ $dir, $isLight }) => css`
    --thickness: 1px;

    position: relative;
    z-index: 0;
    background: ${$isLight ? getGlobal('luxuryWhite', 20) : getBrand('bc5')};

    ${$dir === 'v' && css`
        width: var(--thickness);
        height: 100%;
    `}

    ${$dir === 'h' && css`
        width: 100%;
        height: var(--thickness);
    `}
`);


export const Plus = styled.span<StylesInterface>(({ $isLight, $dir, $isEnd }) => css`
    --length: 11px;
    --distance: var(--line-mobile-dist);

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    width: var(--length);
    height: var(--length);

    ${$isEnd ? css`
        right: var(--distance);
        transform: translate(50%, -50%);
    ` : css`
        left: var(--distance);
        transform: translate(-50%, -50%);
    `}

    ${bp.l`
        --distance: var(--line-desktop-dist);
    `}


    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        background: ${$isLight ? getGlobal('luxuryWhite') : getBrand('bc3')};

        width: var(--length);
        height: var(--thickness);
    }

    &:before {
        transform: translate(-50%, -50%);
    }

    &:after {
        transform: translate(-50%, -50%) rotate(90deg);
    }
`);