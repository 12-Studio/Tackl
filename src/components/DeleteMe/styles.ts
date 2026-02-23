// Imports
// ------------
import { Div, getGlobal } from '@/theme/tackl';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Div)(
	props => css`
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100svh;
		background: ${getGlobal('black')};
		overflow: hidden;

		color: ${getGlobal('white')};
	`
);

export const Background = styled.div(
	props => css`
		position: absolute;
		inset: 0;
		z-index: 1;
	`
);

export const Col = styled(Div)(
	props => css`
		height: 10rem;
		background: yellow;
	`
);
