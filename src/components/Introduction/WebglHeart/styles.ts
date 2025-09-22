// Imports
// ------------
import { Canvas, getBrand } from '@tackl';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Canvas)(
	props => css`
		position: absolute;
		z-index: -1;
		inset: 0 auto auto 0;
		width: 100%;
		height: 100%;
		background: ${getBrand('bc1', 20)};
		pointer-events: none;
	`
);
