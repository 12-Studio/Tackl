// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getEase, getGap, getRadius, ListItem, P } from '@tackl';
import { bodyM } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isActive?: boolean;
}

// Exports
// ------------
export const RadioContainer = styled(Div)<StylesInterface>(
	() => css`
        position: relative;
        grid-column: span 1;
		display: grid;
        place-items: center;
	`
);

export const Radio = styled(Div)<StylesInterface>(
	({ $isActive }) => css`
        --size: 2.4rem;

		position: relative;
		z-index: 1;

        width: var(--size);
        height: var(--size);
        border-radius: 50%;

        &:before {
            --size: ${$isActive ? 50 : 0}%;
            background: ${getGlobal('luxuryWhite')};
            transition: background 0.5s ${getEase('bezzy2')};
        }

        &:before, &:after {
            content: '';
            position: absolute;
            inset: 50% auto auto 50%;
            transform: translate(-50%, -50%);

            width: var(--size);
            height: var(--size);

            border-radius: 50%;
        }

        &:after {
            --size: 100%;

            border: 1px solid ${getGlobal('luxuryWhite')};
            transition: border-color 0.5s ${getEase('bezzy2')};
        }
        
	`
);

export const FeatureName = styled(P)<StylesInterface>(
	() => css`
        ${bodyM}

		position: relative;
		z-index: 1;
        grid-column: span 1;

        text-align: center;
        color: ${getGlobal('luxuryWhite')};
        transition: color 0.5s ${getEase('bezzy2')};
	`
);

export const Jacket = styled(ListItem)<StylesInterface>(
	() => css`
        position: relative;
        z-index: 1;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        width: 100%;
        padding: ${getGap('sm')} 0;
        border-top: 1px solid ${getGlobal('luxuryWhite', 20)};

        transition: background 0.5s ${getEase('bezzy2')};

        ${bp.l`
            padding: ${getGap('m')} ${getGap('sm')};
        `}

        @media (hover: hover) and (pointer: fine) {
            &:hover {
            &:before {
                opacity: 1;
                scale: 1;
            }

            ${FeatureName} {
                color: ${getBrand('bc3')};
            }

            ${Radio} {
                &:before {
                    background: ${getBrand('bc3')};
                }

                &:after {
                    border-color: ${getBrand('bc3')};
                }
            }
        }
        }

        &:before {
            content: '';
            position: absolute;
            inset: 0 -${getGap('s')};
            z-index: -1;
            background: ${getBrand('bc5')};
            opacity: 0;
            scale: 0.98;
            transition: opacity 0.5s ${getEase('bezzy2')}, scale 0.5s ${getEase('bezzy2')};
            border-radius: ${getRadius('s')};
        }
    `
);
