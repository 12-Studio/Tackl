// Imports
// ------------
import { Div, Section } from '@tackl';
import {} from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		position: fixed;
		z-index: 1;
		inset: 0;

		background: white;
		padding-block: 6rem;
	`
);

export const Content = styled(Div)(
	props => css`
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: minmax(100px, auto);
		height: 100%;
		width: 100%;
	`
);
