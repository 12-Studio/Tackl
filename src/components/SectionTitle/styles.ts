// Imports
// ------------
import styled, { css } from 'styled-components';
import { getBrand, getGap, getGlobal, getRadius, H2 } from '@tackl';
import { captionL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isLight?: boolean;
}

// Exports
// ------------
export const Jacket = styled(H2)<StylesInterface>(
	({ $isLight }) => css`
        ${captionL}

        position: relative;
        width: fit-content;

        padding: ${getGap('sm')};
        background: ${$isLight ? getGlobal('luxuryWhite', 5) : getBrand('bc4', 10)};
        border-radius: ${getRadius('s')};
        color: ${$isLight ? getGlobal('luxuryWhite') : getBrand('bc3')};

        user-select: none;
        pointer-events: none;
    `
);
