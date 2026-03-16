// Imports
// ------------
import styled, { css } from 'styled-components';
import { Div, getBrand, getGap, getGlobal } from '@tackl';
import { captionL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isLight?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	({ $isLight }) => css`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: ${getGap('s')};


        h2, h3, h4, h5, p, span, em {
            ${captionL}
            color: ${$isLight ? getGlobal('luxuryWhite') : getBrand('bc3')};
        }
    `
);

export const Flasher = styled.span<StylesInterface>(
	({ $isLight }) => css`
        display: inline-block;
        width: 0.4rem;
        height: 0.8rem;
        background: ${$isLight ? getGlobal('luxuryWhite') : getBrand('bc3')};
        animation: flash 0.75s ease-in-out infinite;


        @keyframes flash {
            0%, 100% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
        }

        
    `
);
