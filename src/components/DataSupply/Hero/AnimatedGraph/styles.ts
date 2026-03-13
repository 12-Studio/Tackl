// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getGlobal, getGap } from '@tackl';
import { captionL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
	$isActive?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	() => css`
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: ${getGap('sm')};
        width: 100%;
    `
);

export const Graph = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
        flex: 1;
        min-height: 0;
        display: flex;
        gap: ${getGap('xs')};

        ${bp.l`
            gap: ${getGap('s')};
        `}
	`
);

export const Bar = styled(Div)<StylesInterface>(
	({ $isActive }) => css`
		position: relative;
		width: 100%;
		height: 100%;
		background: ${$isActive ? getBrand('bc4') : getGlobal('black', 5)};
		transform-origin: bottom;
		transform: scaleY(0);
	`
);

export const Labels = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${getGap('sm')};

        hr {
            flex: 1;
            background: ${getBrand('bc5')};
            border: none;
            height: 1px;
        }

        span {
            ${captionL}
            display: block;
            color: ${getBrand('bc3')};
        }
	`
);
