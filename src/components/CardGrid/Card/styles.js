// Imports
// ------------
import {} from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled.div(
	props => css`
		background: white;
		border: 1px solid grey;
		position: relative;
		height: 24rem;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;

		padding: 2.4rem;

		h3 {
			font-size: 2.4rem;
			font-weight: 600;
			margin: 0;
		}

		p {
			font-size: 1.6rem;
			margin: 0;
		}
	`
);
