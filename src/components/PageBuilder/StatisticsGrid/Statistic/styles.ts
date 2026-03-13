// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, getBrand, getGap, P, ListItem } from '@tackl';
import { displayL, titleS } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
	$hasBeforeSymbol?: boolean;
}

// Exports
// ------------
export const Jacket = styled(ListItem)<StylesInterface>(
	() => css`
        --aspect: 1/1;

        grid-column: span 1;
        position: relative;
        display: flex;
        width: 100%;
        flex-flow: column;
        align-items: flex-start;
        justify-content: space-between;
        aspect-ratio: var(--aspect);
        padding: ${getGap('sm')} ${getGap('sm')} 0 ${getGap('sm')};
        
        ${bp.l`
            padding: ${getGap('l')};
            border-right: 1px solid ${getBrand('bc5')};
        `}
    `
);

const sharedTextStyles = css`
    background: linear-gradient(
            to bottom,
            ${getBrand('bc3')},
            ${getBrand('bc4')}
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
`;

export const AnimatedNumber = styled(P)<StylesInterface>(
	({ $hasBeforeSymbol }) => css`
        ${displayL}
        ${sharedTextStyles}

        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: ${getGap('s')};

        

        
        &:before, &:after {
            position: relative;
            display: inline-block;
            background: ${getBrand('bc5')};
            
        }

        &:before {
            ${displayL}
            ${sharedTextStyles}

            ${
				$hasBeforeSymbol &&
				css`
                content: attr(data-symbol-before);
            `
			}
        }

        &:after {
            ${titleS}
            ${sharedTextStyles}
            content: attr(data-symbol-after);
            top: 18%;
        }
    `
);
