// Imports
// ------------
import { bp, Div, getBrand } from '@tackl';
import { bodyM } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Div)(
	props => css`
		display: flex;
		flex-direction: column;
		gap: 1.8em;
		width: 100%;

		${bp.l`
            gap: 3.6em;
        `}

		p {
			${bodyM}
			color: ${getBrand('bc5', 60)};
		}
	`
);
