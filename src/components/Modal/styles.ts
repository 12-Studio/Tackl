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
	Aside,
	Button,
} from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isOpen?: boolean;
	$isEnd?: boolean;
	type?: 'button';
	ariaLabel?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}

// Exports
// ------------
export const Jacket = styled(Aside)<StylesInterface>(
	({ $isOpen }) => css`
        position: fixed;
        z-index: 997;
        inset: 0;

        display: flex;
        align-items: flex-start;
        justify-content: flex-end;

        pointer-events: ${$isOpen ? 'auto' : 'none'};
    `
);

export const Content = styled(Section)<StylesInterface>(
	({ $isOpen }) => css`
        --size: 100%;   

        position: relative;
        width: var(--size);
        min-height: 100svh;
        
        ${bp.l`  --size: 80rem; `}
        ${bp.xl` --size: 95rem; `}
    `
);

export const Clip = styled(Div)<StylesInterface>(
	({ $isOpen }) => css`
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: ${getGlobal('luxuryWhite')};

        clip-path: inset(${$isOpen ? '0% 0% 0% 0%' : '100% 0% 0% 0%'});
        transition: clip-path 1.2s ${getEase('bezzy3')};

        ${bp.l`
            clip-path: inset(${$isOpen ? '0% 0% 0% 0%' : '0% 0% 0% 100%'});
        `}
    `
);

export const VerticalLine = styled(Div)<StylesInterface>(
	({ $isOpen }) => css`
        display: none;

        position: absolute;
        z-index: -1;
        top: 0;
        right: 80rem;
        z-index: 0;
        width: 1px;
        height: 100%;
        background: ${getGlobal('luxuryWhite', 20)};

        transform: translateX(${$isOpen ? -1.6 : 1.6}rem);
        transition: transform 1.2s ${getEase('bezzy3')};

        ${bp.l`
            display: block;
            right: calc(100% + ${getGap('sm')});
            transform: translateX(${$isOpen ? 0 : 83}rem);
        `}

        ${bp.xl`
            transform: translateX(${$isOpen ? 0 : 98}rem);
        `}
    `
);

export const VerticalLinePlus = styled.span<StylesInterface>(
	({ $isEnd }) => css`
        --thickness: 1px;
        --length: 1rem;
        --distance: var(--line-mobile-dist);

        position: absolute;
        left: 50%;
        z-index: 1;

        width: var(--length);
        height: var(--length);

        ${
			$isEnd
				? css`
            top: var(--distance);
            transform: translate(-50%, -0.45rem);
            `
				: css`
            bottom: var(--distance);
            transform: translate(-50%, 0.45rem);
            `
		}

        ${bp.l`
            --distance: var(--line-desktop-dist);
        `}


        &:before,
        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            background: ${getGlobal('luxuryWhite')};

            width: var(--length);
            height: var(--thickness);
        }

        &:before {
            transform: translate(-50%, -50%);
        }

        &:after {
            transform: translate(-50%, -50%) rotate(90deg);
        }
    `
);

export const CloseButton = styled(Button)<StylesInterface>(
	({ $isOpen }) => css`
        --size: 4rem;
        --icon-size: 1.6rem;
        --distance: ${getGap('l')};

        position: fixed;
        z-index: 2;
        top: ${getGap('m')};
        right: ${getGap('m')};
        transform: translateY(${$isOpen ? 0 : -200}%);
        

        width: var(--size);
        height: var(--size);

        display: grid;
        place-items: center;

        background: ${getBrand('bc1')};
        border-radius: ${getRadius('s')};
        cursor: pointer;
        transition:
            transform 1.1s ${getEase('bezzy3')} ${$isOpen ? 0.1 : 0}s,
            background 0.5s ${getEase('bezzy3')};

        ${bp.l`
            --size: 5.6rem;
            --icon-size: 2.4rem;

            z-index: -1;
            top: ${getGap('l')};
            right: calc(80rem + var(--distance));
            transform: translateX(${$isOpen ? 0 : 'calc(80rem + var(--distance) + var(--size))'});
        `}

        ${bp.xl`
            right: calc(95rem + var(--distance));
            transform: translateX(${$isOpen ? 0 : 'calc(95rem + var(--distance) + var(--size))'});
        `}

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                background: ${getBrand('bc1', 20)};
            }
        }

        svg {
            width: var(--icon-size);
            height: var(--icon-size);

            fill: ${getGlobal('luxuryWhite')};
        }
    `
);
