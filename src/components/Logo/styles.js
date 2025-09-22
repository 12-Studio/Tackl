// Imports
// ------------
import { bp } from '@tackl';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled.svg(
	props => css`
		width: 7.875rem;
		height: 3rem;

		${bp.l`
            width: 11.739rem;
            height: 4.5rem;
        `}
	`
);
